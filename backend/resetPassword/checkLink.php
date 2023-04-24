<?php
include '../DbConnect.php';

header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT,DELETE');
header('Access-Control-Allow-Headers: * ');

$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $token = $_GET['token'];

        $sql = "SELECT is_used FROM resetpassword WHERE token = :token";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
        break;
    default:
        http_response_code(405);
        break;
}

?>