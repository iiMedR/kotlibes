<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: *');

require_once 'DbConnect.php';

$db = new DbConnect();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $idClient = $data['idClient'];
    $idTool = $data['idTool'];
    $usageDate = $data['usageDate'];

    // Check if the client exists
    $stmt = $conn->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->bindParam(':id', $idClient);
    $stmt->execute();
    $client = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$client) {
        $response = array('success' => false, 'message' => 'Client not found');
        echo json_encode($response);
        return;
    }

}
?>
