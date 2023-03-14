<?php

include 'password.php';
include 'DbConnect.php';

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        $email = $user->email;
        $query = "SELECT email FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $response = ['status' => 0, 'message' => 'Email already exists'];
            echo json_encode($response);
            exit();
        }

        $hashed_password = hashPassword($user->password);

        $sql = "INSERT INTO users(id, name, email, password, created_at) VALUES(null, :name, :email, :password, :created_at) ";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':created_at', $created_at);

        if ($stmt->execute()) {
            $sql = "SELECT id, name, email, phone FROM users WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $user->email);
            $stmt->execute();
            $user1 = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = [
                'status'=> 1,
                'message' => 'Record created successfully.',
                'name' => $user1['name'],
                'email' => $user1['email'],
                'id' => $user1['id'],
                'phone' => $user1['phone'],
            ];
        }
        echo json_encode($response);
}
