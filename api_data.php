<?php
header('Content-Type: application/json'); // Beritahu browser bahwa ini adalah data JSON
include 'koneksi.php';

$response = [
    'kekerasan' => [],
    'alur' => [],
    'chart' => [
        'labels' => [],
        'data' => []
    ]
];

// 1. Ambil data Kekerasan
$sql_kekerasan = "SELECT * FROM tabel_kekerasan";
$result_kekerasan = $conn->query($sql_kekerasan);
while ($row = $result_kekerasan->fetch_assoc()) {
    $response['kekerasan'][] = $row;
}

// 2. Ambil data Alur (urut berdasarkan ID)
$sql_alur = "SELECT * FROM tabel_alur ORDER BY id ASC";
$result_alur = $conn->query($sql_alur);
while ($row = $result_alur->fetch_assoc()) {
    $response['alur'][] = $row;
}

// 3. Ambil data Statistik untuk Grafik
$sql_chart = "SELECT kategori, COUNT(*) as jumlah FROM tabel_laporan GROUP BY kategori";
$result_chart = $conn->query($sql_chart);
while ($row = $result_chart->fetch_assoc()) {
    $response['chart']['labels'][] = $row['kategori'];
    $response['chart']['data'][] = (int)$row['jumlah']; // Jadikan integer
}

// Kirim data dalam format JSON
echo json_encode($response);
$conn->close();
?>