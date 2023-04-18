<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
include '../DbConnect.php';

header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT,DELETE');
header('Access-Control-Allow-Headers: * ');


$objDb = new DbConnect;
$conn = $objDb->connect();



$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        $email = $user->email;
        
        //echo $email;

        // check if email exist in users table
        $sql = "SELECT * FROM users where email = :email";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {

        }else{
            $response = ['status' => 1, 'message' => 'did not find this email'];
            echo json_encode($response);
            exit();
        }


}

?>
