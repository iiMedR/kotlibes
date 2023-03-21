<?php
include 'password.php';
include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $email = $user->email1;
        $password = $user->password1;

        $query1 = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query1);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user1 = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user1) {
            if (verifyPassword($password, $user1['password'])) {
            } else {
                // Password is incorrect, return failure
                $response = ['status' => 1, 'message' => 'Incorrect email or password'];
            }
        } else {
            // Email doesn't exist, return failure
            $response = ['status' => 1, 'message' => 'Incorrect email or password'];
        }

        echo json_encode($response);
}
