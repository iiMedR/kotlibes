<?php
include 'password.php';
include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $email = $user->email1;
        $password = $user->password1;

        $query1 = "SELECT * FROM users WHERE email = :email";
        $stmt = $conn->prepare($query1);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user1 = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user1) {
            if (verifyPassword($password, $user1['password'])) {
                // Password is correct, check subscriptions
                $query2 = "SELECT * FROM subscriptions WHERE user_id = :user_id";
                $stmt2 = $conn->prepare($query2);
                $stmt2->bindParam(':user_id', $user1['id']);
                $stmt2->execute();
                $subscription = $stmt2->fetch(PDO::FETCH_ASSOC);

                // Calculate remaining days
                $remainingDays = 0; // Initialize to 0 by default

                if ($subscription && $subscription['renews_at']) {
                    $renewsAt = new DateTime($subscription['renews_at']);
                    $currentDate = new DateTime();
                    
                    // Compare the renewal date to the current date
                    if ($renewsAt > $currentDate) {
                        $interval = $currentDate->diff($renewsAt);
                        $remainingDays = $interval->days;
                    }
                }

                // Prepare response
                $response = [
                    'status' => 0,
                    'message' => 'Authentication successful',
                    'name' => $user1['name'],
                    'email' => $user1['email'],
                    'id' => $user1['id'],
                    'phone' => $user1['phone'],
                    'tokens' => $user1['tokens'],
                    'plan' => $user1['status'],
                    'created_at' => $subscription ? $subscription['created_at'] : null,
                    'renews_at' => $subscription ? $subscription['renews_at'] : null,
                    'card_brand' => $subscription ? $subscription['card_brand'] : null,
                    'card_last_four' => $subscription ? $subscription['card_last_four'] : null,
                    'remainingDays' => $remainingDays,
                ];
            } else {
                // Password is incorrect, return failure
                $response = ['status' => 1, 'message' => 'Incorrect email or password'];
            }
        } else {
            // Email doesn't exist, return failure
            $response = ['status' => 1, 'message' => 'Incorrect email or password'];
        }

        echo json_encode($response);
}
