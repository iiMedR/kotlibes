<?php
include 'DbConnect.php';
$objDb = new DbConnect;
$cnx = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        $user = json_decode( file_get_contents('php://input'));

            $user_id = $user->Id;
            $name = $user->FullName;
            $email = $user->Email;
            $phone = $user->Phone;
            if($user_id === '' || $name === '' || $phone === '' ){
                $response = ['status' => 1, 'message' => 'All the fields are required'];
                echo json_encode($response);
                exit();
            }


            $sql = "UPDATE users SET name=:name, phone=:phone WHERE id=:id";
            $stmt = $cnx->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':id', $user_id);
            if ($stmt->execute()) {
                $response = ['status' => 0, 'message' => 'User information updated successfully'];
                echo json_encode($response);
            } else {
                $response = ['status' => 1, 'message' => 'error'];
                echo json_encode($response);
            }


        }
        /****************************************************************************************** */





?>