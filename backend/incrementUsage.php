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

    // Check if the tool exists
    $stmt = $conn->prepare('SELECT * FROM tool WHERE tool_id = :id');
    $stmt->bindParam(':id', $idTool);
    $stmt->execute();
    $tool = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$tool) {
        $response = array('success' => false, 'message' => 'Tool not found');
        echo json_encode($response);
        return;
    }

}

function updateUsageTable($conn, $tableName, $idClient, $idTool, $usageDate, $interval) {
    // Check if the usage entry exists
    $stmt = $conn->prepare("SELECT * FROM $tableName WHERE client_id = :clientId AND tool_id = :toolId");
    $stmt->bindParam(':clientId', $idClient);
    $stmt->bindParam(':toolId', $idTool);
    $stmt->execute();
    $usage = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usage) {
    } else {
        $stmt = $conn->prepare("INSERT INTO $tableName (client_id, tool_id, usage_count, usage_date) VALUES (:clientId, :toolId, 1, DATE_ADD(:usageDate, INTERVAL $interval))");
        $stmt->bindParam(':clientId', $idClient);
        $stmt->bindParam(':toolId', $idTool);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
    }
}

?>
