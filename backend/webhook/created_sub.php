<?php
// Database connection
include '../DbConnect.php';
$db = new DbConnect();
$conn = $db->connect();

// Validate the incoming webhook request
$headers = getallheaders();
$requestBody = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
$secret = 'REPLACE_WITH_YOUR_VALUE'; // Replace with your actual webhook secret

// Validate the webhook signature
if (!hash_equals($signature, hash_hmac('sha256', $requestBody, $secret))) {
    // Invalid webhook signature
    http_response_code(401);
    echo "Invalid Signature" . PHP_EOL;
    exit;
}

