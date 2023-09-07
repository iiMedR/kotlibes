<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: *');

require_once 'DbConnect.php';

$db = new DbConnect();
$conn = $db->connect();

?>
