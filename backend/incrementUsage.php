<?php
/*


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

    // Check if the usage entry exists
    $stmt = $conn->prepare('SELECT * FROM toolusage WHERE client_id = :clientId AND tool_id = :toolId');
    $stmt->bindParam(':clientId', $idClient);
    $stmt->bindParam(':toolId', $idTool);
    $stmt->execute();
    $usage = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usage) {
        $stmt = $conn->prepare('SELECT usage_date FROM toolusage WHERE client_id = :clientId AND tool_id = :toolId');
        $stmt->bindParam(':clientId', $idClient);
        $stmt->bindParam(':toolId', $idTool);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $date = $row['usage_date'];

        if ($usageDate < $date) {
            $stmt = $conn->prepare('UPDATE toolusage SET usage_count = usage_count + 1 WHERE client_id = :clientId AND tool_id = :toolId');
            $stmt->bindParam(':clientId', $idClient);
            $stmt->bindParam(':toolId', $idTool);
            $stmt->execute();
        } else {
            $stmt = $conn->prepare('UPDATE toolusage SET usage_count = 1, usage_date = DATE_ADD(:usageDate, INTERVAL 1 DAY) WHERE client_id = :clientId AND tool_id = :toolId');
            $stmt->bindParam(':usageDate', $usageDate);
            $stmt->bindParam(':clientId', $idClient);
            $stmt->bindParam(':toolId', $idTool);
            $stmt->execute();
        }
    } else {
        $stmt = $conn->prepare('INSERT INTO toolusage (client_id, tool_id, usage_count, usage_date) VALUES (:clientId, :toolId, 1, DATE_ADD(:usageDate, INTERVAL 1 DAY))');
        $stmt->bindParam(':clientId', $idClient);
        $stmt->bindParam(':toolId', $idTool);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
    }

    $response = array('success' => true, 'message' => 'Usage incremented successfully');
    echo json_encode($response);
}

*/


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

    // Update or insert into toolusage table
    updateUsageTable($conn, 'toolusage', $idClient, $idTool, $usageDate, '1 DAY');

    // Update or insert into toolusageweekly table
    updateUsageTable($conn, 'toolusageweekly', $idClient, $idTool, $usageDate, '1 WEEK');

    // Update or insert into toolusageyearly table
    updateUsageTable($conn, 'toolusageyearly', $idClient, $idTool, $usageDate, '1 YEAR');

    $response = array('success' => true, 'message' => 'Usage incremented successfully');
    echo json_encode($response);
}

function updateUsageTable($conn, $tableName, $idClient, $idTool, $usageDate, $interval) {
    // Check if the usage entry exists
    $stmt = $conn->prepare("SELECT * FROM $tableName WHERE client_id = :clientId AND tool_id = :toolId");
    $stmt->bindParam(':clientId', $idClient);
    $stmt->bindParam(':toolId', $idTool);
    $stmt->execute();
    $usage = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usage) {
        $stmt = $conn->prepare("SELECT usage_date FROM $tableName WHERE client_id = :clientId AND tool_id = :toolId");
        $stmt->bindParam(':clientId', $idClient);
        $stmt->bindParam(':toolId', $idTool);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $date = $row['usage_date'];

        if ($usageDate < $date) {
            $stmt = $conn->prepare("UPDATE $tableName SET usage_count = usage_count + 1 WHERE client_id = :clientId AND tool_id = :toolId");
            $stmt->bindParam(':clientId', $idClient);
            $stmt->bindParam(':toolId', $idTool);
            $stmt->execute();
        } else {
            $stmt = $conn->prepare("UPDATE $tableName SET usage_count = 1, usage_date = DATE_ADD(:usageDate, INTERVAL $interval) WHERE client_id = :clientId AND tool_id = :toolId");
            $stmt->bindParam(':usageDate', $usageDate);
            $stmt->bindParam(':clientId', $idClient);
            $stmt->bindParam(':toolId', $idTool);
            $stmt->execute();
        }
    } else {
        $stmt = $conn->prepare("INSERT INTO $tableName (client_id, tool_id, usage_count, usage_date) VALUES (:clientId, :toolId, 1, DATE_ADD(:usageDate, INTERVAL $interval))");
        $stmt->bindParam(':clientId', $idClient);
        $stmt->bindParam(':toolId', $idTool);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
    }
}

?>
