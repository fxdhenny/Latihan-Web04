<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $conn->real_escape_string($_POST['nama']);
    $kontak = $conn->real_escape_string($_POST['kontak']);
    $kategori = $conn->real_escape_string($_POST['kategoriKekerasan']);
    $ringkasan = $conn->real_escape_string($_POST['laporan']);

    $sql = "INSERT INTO tabel_laporan (nama, kontak, kategori, ringkasan) 
            VALUES ('$nama', '$kontak', '$kategori', '$ringkasan')";

    if ($conn->query($sql) === TRUE) {
        echo "Sukses";
    } else {
        echo "Error: " . $conn->error;
    }
}
$conn->close();
?>