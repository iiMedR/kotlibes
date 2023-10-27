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

// Handle different event types
if ($eventType === 'subscription_created') {
    // Handle subscription_created event
    $subscriptionId = $data['data']['id'];
    echo "Subscription Created - ID: $subscriptionId" . PHP_EOL;

    $userEmail = $data['data']['attributes']['user_email'];
    $variantId = $data['data']['attributes']['variant_id'];
    $currentPeriodEnd = $data['data']['attributes']['renews_at'];

    // Get the user ID from the user's email
    $query = "SELECT id FROM users WHERE email = :userEmail";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "User not found for email: $userEmail" . PHP_EOL;
        http_response_code(404); // User not found
        exit;
    }

    $userId = $user['id'];

    // Insert the subscription details into the 'subscriptions' table with the user ID
    $query = "INSERT INTO subscriptions (subscription_id, customer_id, variant_id, current_period_end, user_id) 
              VALUES (:subscriptionId, :customerId, :variantId, :currentPeriodEnd, :userId)";
    $stmt = $conn->prepare($query);
    $customerId = $data['data']['attributes']['customer_id']; // Use 'customer_id' from the payload
    $stmt->bindParam(':subscriptionId', $subscriptionId);
    $stmt->bindParam(':customerId', $customerId);
    $stmt->bindParam(':variantId', $variantId);
    $stmt->bindParam(':currentPeriodEnd', $currentPeriodEnd);
    $stmt->bindParam(':userId', $userId);

    if ($stmt->execute()) {
        echo "Subscription details inserted into the database." . PHP_EOL;
    } else {
        echo "Error inserting subscription details into the database." . PHP_EOL;
        http_response_code(500); // Internal server error
    }
} elseif ($eventType === 'subscription_updated') {
    // Handle subscription_updated event
    $subscriptionId = $data['data']['id'];
    echo "Subscription Updated - ID: $subscriptionId" . PHP_EOL;

    $userEmail = $data['data']['attributes']['user_email'];
    $variantId = $data['data']['attributes']['variant_id'];
    $currentPeriodEnd = $data['data']['attributes']['renews_at'];

    // Get the user ID from the user's email
    $query = "SELECT id FROM users WHERE email = :userEmail";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo "User not found for email: $userEmail" . PHP_EOL;
        http_response_code(404); // User not found
        exit;
    }

    $userId = $user['id'];

    // Update the 'subscriptions' table with the new variant ID and current period end
    $query = "UPDATE subscriptions 
              SET variant_id = :variantId, current_period_end = :currentPeriodEnd
              WHERE user_id = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':variantId', $variantId);
    $stmt->bindParam(':currentPeriodEnd', $currentPeriodEnd);
    $stmt->bindParam(':userId', $userId);

    if ($stmt->execute()) {
        echo "Subscription details updated in the database." . PHP_EOL;
    } else {
        echo "Error updating subscription details in the database." . PHP_EOL;
        http_response_code(500); // Internal server error
    }
} else {
    // Unknown event type, ignore or log as needed
    echo "Unknown Event Type: $eventType" . PHP_EOL;
    http_response_code(400); // Bad request
    exit;
}
?>
