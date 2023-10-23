<?php
// Database connection
include '../DbConnect.php';
$db = new DbConnect();
$conn = $db->connect();

// Validate the incoming webhook request
$headers = getallheaders();
$requestBody = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
$secret = 'REPLACE_WITH_YOUR_VALUE'; // Replace 'kotlibes' with your actual signing secret

// Validate the webhook signature
if (!hash_equals($signature, hash_hmac('sha256', $requestBody, $secret))) {
    // Invalid webhook signature
    http_response_code(401);
    echo "Invalid Signature" . PHP_EOL;
    exit;
}

$data = json_decode($requestBody, true);

// Check if the webhook event type is set in the payload
if (!isset($data['meta']['event_name'])) {
    // Event type not found
    http_response_code(400);
    echo "Event type not found in the payload" . PHP_EOL;
    exit;
}

// Get the event type from the payload
$eventType = $data['meta']['event_name'];

