<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: *');

require_once 'DbConnect.php';

$db = new DbConnect();
$conn = $db->connect();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['idClient'];
    $usageDate = $data['date'];

    // Check if the user exists in the users table
    $stmt = $conn->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $response = array('success' => false, 'message' => 'User not found');
        echo json_encode($response);
        return;
    }

    $currentDate = date('Y-m-d');

    // Check daily usage
    $dailyUsage = 0;
    $dailyUsagePrice = 0;
    $dailyUsageDate = date('Y-m-d', strtotime($currentDate . ' + 1 day'));

    if ($usageDate < $dailyUsageDate) {
        $stmt = $conn->prepare('SELECT SUM(tu.usage_count) AS total_usage_count, SUM(tu.usage_count * t.price) AS usage_price
                                FROM toolusage tu, tool t
                                Where tu.tool_id = t.tool_id
                                AND tu.client_id = :clientId AND tu.usage_date > :usageDate');
        $stmt->bindParam(':clientId', $id);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $dailyUsage = $row['total_usage_count'];
        $dailyUsagePrice = $row['usage_price'];
    }

    // Check weekly usage
    $weeklyUsage = 0;
    $weeklyUsagePrice = 0;
    $weeklyUsageDate = date('Y-m-d', strtotime($currentDate . ' + 1 week'));

    if ($usageDate < $weeklyUsageDate) {
        $stmt = $conn->prepare('SELECT SUM(tu.usage_count) AS total_usage_count, SUM(tu.usage_count * t.price) AS usage_price
                                FROM toolusageweekly tu, tool t
                                Where tu.tool_id = t.tool_id
                                AND tu.client_id = :clientId AND tu.usage_date > :usageDate');
        $stmt->bindParam(':clientId', $id);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $weeklyUsage = $row['total_usage_count'];
        $weeklyUsagePrice = $row['usage_price'];
    }

    // Check yearly usage
    $yearlyUsage = 0;
    $yearlyUsagePrice = 0;
    $yearlyUsageDate = date('Y-m-d', strtotime($currentDate . ' + 1 year'));

    if ($usageDate < $yearlyUsageDate) {
        $stmt = $conn->prepare('SELECT SUM(tu.usage_count) AS total_usage_count, SUM(tu.usage_count * t.price) AS usage_price
                                FROM toolusageyearly tu, tool t
                                WHERE tu.tool_id = t.tool_id
                                AND tu.client_id = :clientId AND tu.usage_date > :usageDate');
        $stmt->bindParam(':clientId', $id);
        $stmt->bindParam(':usageDate', $usageDate);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $yearlyUsage = $row['total_usage_count'];
        $yearlyUsagePrice = $row['usage_price'];
    }

    // Prepare and send the response
    $response = array(
        'success' => true,
        'daily' => $dailyUsage,
        'dailyPrice' => $dailyUsagePrice,
        'weekly' => $weeklyUsage,
        'weeklyPrice' => $weeklyUsagePrice,
        'yearly' => $yearlyUsage,
        'yearlyPrice' => $yearlyUsagePrice,
    );
    echo json_encode($response);
}
?>
