<?php
include 'DbConnect.php';
include 'password.php';

$objDb = new DbConnect;
$cnx = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
  case 'POST':
    $user = json_decode(file_get_contents('php://input'));

    $user_id = $user->Id;
    $currentPass = $user->currentPass;
    $newPasswordHashed = hashPassword($user->newPass);
    $confirmPass = $user->confirmPass;
    
    if ($user_id === '' || $currentPass === '' || $confirmPass === '' || $newPasswordHashed === '') {
      $response = ['status' => 1, 'message' => 'All fields are required'];
      echo json_encode($response);
      exit();
    }

    /***********************CHECK IF THE CURRENT PASSWORD IS CORRECT AND NEW PASSWORD = CONFIRM PASSWORD**************************/
    $sql1 = "SELECT * FROM users WHERE id = :id";
    $stmt = $cnx->prepare($sql1);
    $stmt->bindParam(':id', $user_id);
    $stmt->execute();
    $Result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$Result) {
      $response = ['status' => 1, 'message' => 'User not found'];
      echo json_encode($response);
      exit;
    }

    if (!verifyPassword($currentPass, $Result['password'])) {
      $response = ['status' => 1, 'message' => 'Error: Incorrect password'];
      echo json_encode($response);
      exit;
    }

    if ($user->newPass !== $confirmPass) {
      $response = ['status' => 1, 'message' => 'Error: Passwords do not match'];
      echo json_encode($response);
      exit;
    }
    /*************************************************************************************************************************/

}
?>
