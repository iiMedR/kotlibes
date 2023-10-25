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

// Handle subscription_created event
if ($eventType === 'subscription_created') {
    $subscriptionData = $data['data']['attributes'];

    // Get the user ID from the user's email
    $query = "SELECT id FROM users WHERE email = :userEmail";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':userEmail', $subscriptionData['user_email']);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    
    if (!$user) {
        echo "User not found for email: ". $subscriptionData['user_email'] . PHP_EOL;
        http_response_code(404); // User not found
        exit;
    }



    $subsId = $data['data']['id'];
    $userId = $user['id']; // hadi maja mn data base dyali based on email
    $variantId = $subscriptionData['variant_id'];
    $userEmail = $subscriptionData['user_email'];
    $createdAt = $subscriptionData['created_at'];
    $renewsAt = $subscriptionData['renews_at'];
    $updatedAt = $subscriptionData['updated_at'];
    $cardBrand = $subscriptionData['card_brand'];
    $cardLastFour = $subscriptionData['card_last_four'];
    $customerIdLs = $subscriptionData['customer_id'];
    $userName = $subscriptionData['user_name'];

    // Insert subscription data into the database
    $query = "INSERT INTO subscriptions (subs_id, user_id, variant_id, user_email, created_at, renews_at, updated_at, card_brand, card_last_four, customer_id_ls, user_name)
              VALUES (:subsId, :userId, :variantId, :userEmail, :createdAt, :renewsAt, :updatedAt, :cardBrand, :cardLastFour, :customerIdLs, :userName)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':subsId', $subsId);
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':variantId', $variantId);
    $stmt->bindParam(':userEmail', $userEmail);
    $stmt->bindParam(':createdAt', $createdAt);
    $stmt->bindParam(':renewsAt', $renewsAt);
    $stmt->bindParam(':updatedAt', $updatedAt);
    $stmt->bindParam(':cardBrand', $cardBrand);
    $stmt->bindParam(':cardLastFour', $cardLastFour);
    $stmt->bindParam(':customerIdLs', $customerIdLs);
    $stmt->bindParam(':userName', $userName);

    if ($stmt->execute()) {
        echo "Subscription data inserted into the database." . PHP_EOL;
    } else {
        echo "Error inserting subscription data into the database." . PHP_EOL;
        http_response_code(500); // Internal server error
    }


} else {
    echo "Unknown Event Type: $eventType" . PHP_EOL;
    http_response_code(400);
    exit;
}
?>
