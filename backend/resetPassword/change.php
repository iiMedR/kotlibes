<?php

include '../DbConnect.php';
include '../password.php';

header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT,DELETE');
header('Access-Control-Allow-Headers: * ');

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $password = hashPassword($user->password);
        $confirm = $user->confirm;
        $id = $user->id;
        $token = $user->token;

        // Check if the id and token are valid
        $sql = "SELECT * FROM resetpassword WHERE token = :token";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        $resetPasswordResult = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$resetPasswordResult) {
            $response = ['status' => 0, 'message' => 'Error: Invalid token.'];
            echo json_encode($response);
            exit;
        }

        $sql = "SELECT * FROM users WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $userResult = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$userResult) {
            $response = ['status' => 0, 'message' => 'Error: Invalid user id.'];
            echo json_encode($response);
            exit;
        }

        // Check if the passwords match
        if (!verifyPassword($confirm, $password)) {
            $response = ['status' => 0, 'message' => 'Error: Passwords do not match.'];
            echo json_encode($response);
            exit;
        }

        // Update the user's password
        $sql = "UPDATE users SET password = :password WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        //make the link expired by change the state of the link in the table
        $sql = "UPDATE resetpassword SET is_used = 1 WHERE token = :token";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();

        $response = ['status' => 1, 'message' => 'Success: Password updated.'];
        echo json_encode($response);
}

?>
