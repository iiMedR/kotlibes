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

            $verificationToken = bin2hex(random_bytes(16));
            $expiration = date('Y-m-d H:i:s', strtotime('+10 minutes'));
            //echo($verificationToken); echo($expiration);
            $requet = "INSERT INTO resetpassword(token_id , token , expiration_date , id,is_used) VALUES (null,:token,:expiration_date,:id,0)";
            $stmt1 = $conn->prepare($requet);
            $stmt1->bindParam(':token', $verificationToken);
            $stmt1->bindParam(':expiration_date', $expiration);
            $id = $result['id'];
            $stmt1->bindParam(':id', $id);
            if($stmt1->execute()){
                //$response = "good";
                //echo json_encode($response);
                $response = ['status' => 0, 'message' => 'Message has been sent, check Your email inbox !.'];

            }
        }else{
            $response = ['status' => 1, 'message' => 'did not find this email'];
            echo json_encode($response);
            exit();
        }


}

?>
