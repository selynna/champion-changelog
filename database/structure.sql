-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2018 at 08:43 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `riotpatchnotes`
--

-- --------------------------------------------------------

--
-- Table structure for table `champions`
--

CREATE TABLE `champions` (
  `id` smallint(3) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `displayName` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `champion_items`
--

CREATE TABLE `champion_items` (
  `championId` int(10) UNSIGNED NOT NULL,
  `itemId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `champion_runes`
--

CREATE TABLE `champion_runes` (
  `championId` int(10) UNSIGNED NOT NULL,
  `runeId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` smallint(4) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch`
--

CREATE TABLE `patch` (
  `id` varchar(255) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_champion_changes`
--

CREATE TABLE `patch_champion_changes` (
  `patchId` varchar(255) NOT NULL,
  `championId` int(10) UNSIGNED NOT NULL,
  `changes` mediumtext NOT NULL,
  `overview` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_item_changes`
--

CREATE TABLE `patch_item_changes` (
  `patchId` varchar(255) NOT NULL,
  `itemId` int(10) UNSIGNED NOT NULL,
  `changes` mediumtext NOT NULL,
  `overview` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_rune_changes`
--

CREATE TABLE `patch_rune_changes` (
  `patchId` varchar(255) NOT NULL,
  `runeId` int(10) UNSIGNED NOT NULL,
  `changes` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `champions`
--
ALTER TABLE `champions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `champion_items`
--
ALTER TABLE `champion_items`
  ADD PRIMARY KEY (`championId`,`itemId`);

--
-- Indexes for table `champion_runes`
--
ALTER TABLE `champion_runes`
  ADD PRIMARY KEY (`championId`,`runeId`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patch`
--
ALTER TABLE `patch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patch_champion_changes`
--
ALTER TABLE `patch_champion_changes`
  ADD PRIMARY KEY (`patchId`,`championId`);

--
-- Indexes for table `patch_item_changes`
--
ALTER TABLE `patch_item_changes`
  ADD PRIMARY KEY (`patchId`,`itemId`);

--
-- Indexes for table `patch_rune_changes`
--
ALTER TABLE `patch_rune_changes`
  ADD PRIMARY KEY (`patchId`,`runeId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
