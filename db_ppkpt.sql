-- phpMyAdmin SQL Dump
-- version 5.2.3deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 23, 2026 at 01:13 AM
-- Server version: 8.4.13
-- PHP Version: 8.5.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_ppkpt`
--

-- --------------------------------------------------------

--
-- Table structure for table `tabel_alur`
--

CREATE TABLE `tabel_alur` (
  `id` int NOT NULL,
  `nomor` varchar(10) DEFAULT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tabel_alur`
--

INSERT INTO `tabel_alur` (`id`, `nomor`, `judul`, `deskripsi`) VALUES
(1, '01', 'Utamakan keselamatan', 'Jika ada bahaya langsung, menjauh ke tempat aman dan cari bantuan segera dari pihak yang dapat merespons.'),
(2, '02', 'Hubungi kanal yang tersedia', 'Gunakan kontak resmi yang telah diverifikasi atau sampaikan kebutuhan bantuan kepada petugas yang berwenang.'),
(3, '03', 'Sampaikan informasi secukupnya', 'Ceritakan hal yang relevan dengan aman. Jangan membagikan detail sensitif lewat kanal yang belum dipastikan keamanannya.'),
(4, '04', 'Ikuti arahan petugas', 'Petugas yang berwenang menjelaskan langkah lanjutan sesuai kebijakan, prosedur, dan kebutuhan pihak yang melapor.');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_kekerasan`
--

CREATE TABLE `tabel_kekerasan` (
  `id` int NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tabel_kekerasan`
--

INSERT INTO `tabel_kekerasan` (`id`, `icon`, `judul`, `deskripsi`) VALUES
(1, 'bi-person-hearts', 'Seksual', 'Perilaku bernuansa seksual yang tidak dikehendaki atau merendahkan martabat seseorang.'),
(2, 'bi-bandaid', 'Fisik', 'Tindakan yang menggunakan kekuatan fisik dan dapat menyebabkan luka atau membahayakan keselamatan.'),
(3, 'bi-people', 'Perundungan', 'Perilaku merendahkan, mengintimidasi, atau menyakiti orang lain, termasuk melalui media digital.'),
(4, 'bi-slash-circle', 'Diskriminasi / intoleransi', 'Perlakuan atau pembatasan yang tidak adil karena identitas atau kondisi tertentu.'),
(5, 'bi-chat-square-heart', 'Psikis', 'Perilaku yang menyerang martabat atau kondisi psikologis, misalnya ancaman, penghinaan, dan intimidasi.');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_laporan`
--

CREATE TABLE `tabel_laporan` (
  `id` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `kontak` varchar(100) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `ringkasan` text,
  `waktu_lapor` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tabel_laporan`
--

INSERT INTO `tabel_laporan` (`id`, `nama`, `kontak`, `kategori`, `ringkasan`, `waktu_lapor`) VALUES
(1, 'Anonim', '-', 'Seksual', 'Contoh data 1', '2026-10-22 06:54:57'),
(2, 'Anonim', '-', 'Fisik', 'Contoh data 2', '2026-10-22 06:54:57'),
(3, 'Anonim', '-', 'Fisik', 'Contoh data 3', '2026-10-22 06:54:57'),
(4, 'Anonim', '-', 'Perundungan', 'Contoh data 4', '2026-10-22 06:54:57'),
(5, 'Anonim', '-', 'Psikis', 'Contoh data 5', '2026-10-22 06:54:57'),
(6, 'ACHA', '123', 'Perundungan', 'HUHU', '2026-10-22 07:31:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tabel_alur`
--
ALTER TABLE `tabel_alur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabel_kekerasan`
--
ALTER TABLE `tabel_kekerasan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tabel_laporan`
--
ALTER TABLE `tabel_laporan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tabel_alur`
--
ALTER TABLE `tabel_alur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tabel_kekerasan`
--
ALTER TABLE `tabel_kekerasan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tabel_laporan`
--
ALTER TABLE `tabel_laporan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
