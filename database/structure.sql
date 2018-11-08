--
-- Database: `riotpatchnotes`
--

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
  `changes` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_champion_items`
--

CREATE TABLE `patch_champion_items` (
  `patchId` varchar(255) NOT NULL,
  `championId` int(10) UNSIGNED NOT NULL,
  `itemId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_champion_runes`
--

CREATE TABLE `patch_champion_runes` (
  `patchId` varchar(255) NOT NULL,
  `championId` int(10) UNSIGNED NOT NULL,
  `runeId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patch_item_changes`
--

CREATE TABLE `patch_item_changes` (
  `patchId` varchar(255) NOT NULL,
  `itemId` int(10) UNSIGNED NOT NULL,
  `changes` mediumtext NOT NULL
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
-- Indexes for table `patch`
--
ALTER TABLE `patch`
  ADD PRIMARY KEY (`id`);
COMMIT;