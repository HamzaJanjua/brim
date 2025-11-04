-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 04, 2025 at 06:31 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mern_2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'janjua', 'janjua@gmail.com', '12345', '2025-10-29 06:03:14', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `description` text NOT NULL,
  `sku` varchar(30) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `description`, `sku`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Spicy Smashdown', 787, 45, 'Beef patty smashed with fiery jalapeños, topped with Pepper X sauce, crisp lettuce, diced onions & sriracha mayo in a soft seeded potato bun.', 'SKU_101', 'https://g-cdn.blinkco.io/ordering-system/55578/dish_image/1750347540089.jpg', '2025-10-13 08:34:06', '2025-11-03 11:22:00', NULL),
(2, 'Brim Maniac', 2965, 45, '5 Patties, 5 Cheese Layers, Caramelised Onions, Our Brim Burger Sauce and Signature Sauce With 2 Slices of Bacon & 2 Onion Rings In a Seeded Brioche Bun', 'SKU_102', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725569546.jpg', '2025-10-15 06:57:40', NULL, NULL),
(3, 'Fiery Brimstone', 688, 45, 'Jalapenos, Cheese, Lettuce, Wild West Sauce, Signature Sauce & Brim Burger Sauce In Seeded Potato Bun', 'SKU_103', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725569506.jpg', '2025-10-15 06:59:03', NULL, NULL),
(4, 'The Meltdown', 688, 45, 'Hot Cheese Sauce, Signature Sauce, Lettuce, Onions & Brim Burger Sauce In a Seeded Potato Bun', 'SKU_104', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725569445.jpg', '2025-10-15 07:01:12', NULL, NULL),
(5, 'Oklahoma Onion Smash', 765, 45, 'Sliced onions smashed into beef patty, Mustard, Cheese slice, Gherkins, Lettuce, Caramelised onions & brim sauce in a seeded potato bun.', 'SKU_105', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725569445.jpg', '2025-10-15 07:45:34', NULL, NULL),
(6, 'Smashed Shrooms', 742, 45, 'Grilled Mushrooms, Grilled Onions, Cheese, Signature sauce & Brim Burger Sauce In Seeded Potato Bun', 'SKU_106', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725569480.jpg', '2025-10-15 07:47:59', NULL, NULL),
(7, 'BBQ Rasher', 918, 45, 'Cheese, Rasher Of Bacon, Onion Ring, Lettuce, Caramelised Onions, Bbq North & Our Brim Burger Sauce In Seeded Potato Bun', 'SKU_107', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1713338586.jpg', '2025-10-15 07:58:38', NULL, NULL),
(8, 'Classic Smashed Burger', 643, 45, 'Sliced Cheese, Brim Burger Sauce & Signature Sauce In a Seeded Potato Bun', 'SKU_108', 'https://em-cdn.eatmubarak.pk/55578/dish_image/1725571648.jpg', '2025-10-15 08:00:15', NULL, NULL),
(9, 'Test Smashed Burger', 900, 50, 'A juicy double-patty smashed burger with melted cheese, lettuce, tomato, and our special house sauce.', 'SMASH-BURGER-001', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1760', '2025-10-31 06:31:07', '2025-10-31 10:42:15', '2025-10-31 10:43:41'),
(10, '203Smashed Burger', 1785, 25, 'Classic Smashed made with love', 'SKU_110', 'https://g-cdn.blinkco.io/ordering-system/55578/dish_image/1750347540089.jpg', '2025-10-31 10:38:17', NULL, NULL),
(11, '101 Spicy Smashdown', 1250, 40, 'Hello ji........', 'Sku_1023', 'https://g-cdn.blinkco.io/ordering-system/55578/dish_image/1750347540089.jpg', '2025-11-03 10:52:32', NULL, '2025-11-03 11:10:21'),
(12, 'Butt Karahi', 123321, 323, 'sdfdsf..jkadsf', 'sdfds_sdf', 'https://g-cdn.blinkco.io/ordering-system/55578/dish_image/1750347540089.jpg', '2025-11-03 10:54:38', NULL, '2025-11-03 10:54:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone_number` varchar(13) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `address` text NOT NULL,
  `dob` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updatede_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `gender`, `address`, `dob`, `created_at`, `updatede_at`, `deleted_at`) VALUES
(1, 'Hamza Janjua', 'tohamzajanjua@gmail.com', 'hello_ji', '03236444123', 'male', '99-k Johar Town, Lahore', '1996-02-04', '2025-10-13 08:48:07', NULL, NULL),
(2, 'Usama Tarar', 'usama@gmail.com', 'fogi', '090078601', 'male', 'Sukh Chain, Garden', '1995-04-23', '2025-10-13 11:57:28', NULL, NULL),
(3, 'Asimr', 'asim@gmail.com', 'fogi', '090078601', 'male', 'Gulshan Ravi, Lahore', '1995-04-23', '2025-10-14 11:57:28', NULL, NULL),
(4, 'Asad', 'asad@gmail.com', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-16 11:03:08', NULL, NULL),
(5, 'Asadsss', 'asad@gmail.com', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-16 11:05:05', NULL, NULL),
(6, 'AsadssQ', 'asad@gmail.com', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-17 09:34:25', NULL, NULL),
(7, 'AsadssQ', 'asadkjkjk', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-17 10:10:44', NULL, NULL),
(8, 'AsadssQ', 'asad@gmail.com', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-17 10:18:14', NULL, NULL),
(9, 'AsadssQ', 'asad@gmail.com', '12345', '090078601', 'Male', 'Gulberg, Lahore', '1992-02-03', '2025-10-17 10:19:21', NULL, NULL),
(10, 'Hamza Janjua', 'hamza@ababeel.com', '123456', '03001234567', 'Male', 'Islamabad, Pakistan', '1995-05-20', '2025-10-22 10:43:59', NULL, NULL),
(11, 'Hamza Janjua', 'hamzaJ@ababeel.com', '123456', '03237654986', 'Male', 'Lahore, Pakistan', '1995-02-04', '2025-10-22 10:46:24', NULL, NULL),
(12, 'Asad Awan', 'asad@test.com', '123456', '03237654986', 'Male', 'Lahore, Pakistan', '1995-02-04', '2025-10-22 11:11:39', NULL, NULL),
(13, 'Hamza Younas', 'hamzayounas@gmail.com', '12345', '090078601', 'male', 'Lahore, Pakistan', '2004-06-17', '2025-10-23 11:56:25', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
