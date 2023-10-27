<?php
// Your Lemon Squeezy API Key
$apiKey = "REPLACE_WITH_YOUR_VALUE";

// Create a stream context to set the Authorization header with the API key
$context = stream_context_create([
    'http' => [
        'header' => "Authorization: Bearer $apiKey\r\n" .
                    "Accept: application/vnd.api+json\r\n" .
                    "Content-Type: application/vnd.api+json\r\n"
    ]
]);

// Make a GET request to the Lemon Squeezy API to fetch products
$url = 'https://api.lemonsqueezy.com/v1/products';
$response = file_get_contents($url, false, $context);

// Decode the JSON response
$data = json_decode($response, true);

// Check if the request was successful
if (isset($data['data']) && is_array($data['data'])) {
    foreach ($data['data'] as $product) {
        // Extract and display product ID and store ID
        $productId = $product['id'];
        $variant = $product['attributes']['price'];
        $storeId = $product['attributes']['store_id'];
        echo "Product ID: $productId, Store ID: $storeId, variant $variant" . PHP_EOL;
        echo "<br/>";
    }
} else {
    // Display an error message if the request failed
    echo "Failed to fetch products. Error: " . $data['errors'][0]['detail'] . PHP_EOL;
}
