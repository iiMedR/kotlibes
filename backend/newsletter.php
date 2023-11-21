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
        $query = "SELECT email FROM newsletter WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $response = ['status' => 0, 'message' => 'Email already exists'];
            echo json_encode($response);
            exit();
        }

        /************************check if the email in users table */
        $query = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $already_user = $result['id'];
            $isUser = 1;
        }else{
            $already_user = null;
            $isUser = 0;
        }


        $sql = "INSERT INTO newsletter(newsletter_id, email, user, date_inscreption, id) VALUES(null, :email, :user, :date_inscreption, :id) ";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':user', $isUser);
        $date_insc = date('Y-m-d');
        echo($date_insc);
        $stmt->bindParam(':date_inscreption', $date_insc);
        $stmt->bindParam(':id', $already_user);


}
