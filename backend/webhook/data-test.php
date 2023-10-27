<?php
// Validate the incoming webhook request
$headers = getallheaders();
$requestBody = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
$secret = 'REPLACE_WITH_YOUR_VALUE'; // Replace with your actual signing secret

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

$eventType = $data['meta']['event_name'];

// Display different information based on the event type
if ($eventType === 'subscription_created') {
    $subscriptionInfo = $data['data']['attributes'];

    // Display subscription information
    echo "Subscription Created Event:" . PHP_EOL;
    echo "Store ID: " . $subscriptionInfo['store_id'] . PHP_EOL;
    echo "Customer ID: " . $subscriptionInfo['customer_id'] . PHP_EOL;
    echo "order id: " . $subscriptionInfo['order_id'] . PHP_EOL;
    echo "order item id: " . $subscriptionInfo['order_item_id'] . PHP_EOL;
    echo "product id: " . $subscriptionInfo['product_id'] . PHP_EOL;
    echo "variant id: " . $subscriptionInfo['variant_id'] . PHP_EOL;
    echo "Product Name: " . $subscriptionInfo['product_name'] . PHP_EOL;
    echo "Variant Name: " . $subscriptionInfo['variant_name'] . PHP_EOL;
    echo "User Name: " . $subscriptionInfo['user_name'] . PHP_EOL;
    echo "User Email: " . $subscriptionInfo['user_email'] . PHP_EOL;
    echo "Status: " . $subscriptionInfo['status'] . PHP_EOL;
    echo "Status formatted: " . $subscriptionInfo['status_formatted'] . PHP_EOL;
    echo "Card Brand: " . $subscriptionInfo['card_brand'] . PHP_EOL;
    echo "Card Last Four: " . $subscriptionInfo['card_last_four'] . PHP_EOL;
    echo "pause: " . $subscriptionInfo['pause'] . PHP_EOL;
    echo "cancelled: " . $subscriptionInfo['cancelled'] . PHP_EOL;
    echo "trial ends at: " . $subscriptionInfo['trial_ends_at'] . PHP_EOL;
    echo "Billing Anchor: " . $subscriptionInfo['billing_anchor'] . PHP_EOL;
    echo "url: " . $subscriptionInfo['urls']['update_payment_method'] . PHP_EOL;
    echo "renews at: " . $subscriptionInfo['renews_at'] . PHP_EOL;
    echo "ends at: " . $subscriptionInfo['ends_at'] . PHP_EOL;
    echo "created at: " . $subscriptionInfo['created_at'] . PHP_EOL;
    echo "updated at: " . $subscriptionInfo['updated_at'] . PHP_EOL;
    echo "test mode: " . $subscriptionInfo['test_mode'] . PHP_EOL;
    // ... You can display other relevant information here
} else {
    // Unknown event type, ignore or log as needed
    echo "Unknown Event Type: $eventType" . PHP_EOL;
    http_response_code(400); // Bad request
    exit;
}
?>
