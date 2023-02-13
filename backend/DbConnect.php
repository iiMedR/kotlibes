<?php
/**
 * Database Connection
 */

header('Access-Control-Allow-Origin: * ');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT,DELETE');
header('Access-Control-Allow-Headers: * ');

class DbConnect
{
    private $server = 'REPLACE_WITH_YOUR_VALUE'; // Replace with the actual host name provided by 000webhost
	private $dbname = 'REPLACE_WITH_YOUR_VALUE';
	private $user = 'REPLACE_WITH_YOUR_VALUE';
	private $pass = 'REPLACE_WITH_YOUR_VALUE';

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
?>
