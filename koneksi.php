<?php
$host = "localhost";
$user = "nauta"; 
$pass = "asdf";  
$db   = "db_ppkpt";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>