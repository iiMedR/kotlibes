<?php
  function hashPassword($password){
    return password_hash($password, PASSWORD_BCRYPT, array("cost" => 11));
  }
  function verifyPassword($password, $hashedPassword){
    return password_verify($password, $hashedPassword);
  }
?>