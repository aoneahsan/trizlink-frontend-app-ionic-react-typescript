-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 10:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel_zaions_zlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_events`
--

CREATE TABLE `action_events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `batch_id` char(36) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `actionable_type` varchar(255) NOT NULL,
  `actionable_id` bigint(20) UNSIGNED NOT NULL,
  `target_type` varchar(255) NOT NULL,
  `target_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED DEFAULT NULL,
  `fields` text NOT NULL,
  `status` varchar(25) NOT NULL DEFAULT 'running',
  `exception` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `original` mediumtext DEFAULT NULL,
  `changes` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_keys`
--

CREATE TABLE `api_keys` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `api_key_name` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `custom_domains`
--

CREATE TABLE `custom_domains` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `custom_domain` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `embedded_scripts`
--

CREATE TABLE `embedded_scripts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `canCodeJs` tinyint(1) DEFAULT 0,
  `canCodeHtml` tinyint(1) DEFAULT 0,
  `jsCode` text DEFAULT NULL,
  `HTMLCode` text DEFAULT NULL,
  `displayAt` varchar(255) DEFAULT NULL,
  `delay` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `animation` tinyint(1) DEFAULT 0,
  `closingOption` tinyint(1) DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `isStared` tinyint(1) DEFAULT 0,
  `isHidden` tinyint(1) DEFAULT 0,
  `isFavorite` tinyint(1) DEFAULT 0,
  `isPasswordProtected` tinyint(1) DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bios`
--

CREATE TABLE `link_in_bios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `theme` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`theme`)),
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  `poweredBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`poweredBy`)),
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_blocks`
--

CREATE TABLE `link_in_bio_blocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `link_in_bio_id` varchar(255) NOT NULL,
  `blockType` varchar(255) DEFAULT NULL,
  `blockContent` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`blockContent`)),
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_folders`
--

CREATE TABLE `link_in_bio_folders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `isStared` tinyint(1) DEFAULT 0,
  `isHidden` tinyint(1) DEFAULT 0,
  `isFavorite` tinyint(1) DEFAULT 0,
  `isPasswordProtected` tinyint(1) DEFAULT 0,
  `password` varchar(255) DEFAULT NULL,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_predefined_blocks`
--

CREATE TABLE `link_in_bio_predefined_blocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `link_in_bio_predefined_blocks`
--

INSERT INTO `link_in_bio_predefined_blocks` (`id`, `unique_id`, `user_id`, `type`, `icon`, `title`, `isActive`, `orderNo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22b800a6', 1, 'button', 'buttonBlock', 'Button', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(2, '6422a22b8015e', 1, 'text', 'textBlock', 'Text', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(3, '6422a22b801fa', 1, 'countdown', 'timerBlock', 'Timer', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(4, '6422a22b80294', 1, 'card', 'cardClipBlock', 'Card', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(5, '6422a22b80337', 1, 'carousel', 'carouselBlock', 'Carousel', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(6, '6422a22b803d1', 1, 'RSS', 'RssBlock', 'RSS', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(7, '6422a22b8046a', 1, 'audio', 'audioBlock', 'Audio', 1, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39'),
(8, '6422a22b80502', 1, 'video', 'videoBlock', 'Video', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(9, '6422a22b8059c', 1, 'calendar', 'calenderBlock', 'Calendar', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(10, '6422a22b80634', 1, 'magento', 'magento', 'Magento', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(11, '6422a22b806cd', 1, 'wordpress', 'wordpress', 'Wordpress', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(12, '6422a22b8076d', 1, 'map', 'map', 'Maps', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(13, '6422a22b80806', 1, 'music', 'music', 'Music', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(14, '6422a22b808a0', 1, 'QAndA', 'QAndABlock', 'Q&A', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(15, '6422a22b80939', 1, 'messenger', 'messengerBlock', 'Messenger', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(16, '6422a22b809d2', 1, 'form', 'formBlock', 'Form', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(17, '6422a22b80a6b', 1, 'social', 'socialBlock', 'Social', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(18, '6422a22b80b0b', 1, 'VCard', 'vcardBlock', 'Vcard', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(19, '6422a22b80ba5', 1, 'Iframe', 'IframeBlock', 'Iframe', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(20, '6422a22b80c3e', 1, 'spacing', 'spacingBlock', 'Spacing', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(21, '6422a22b80cd7', 1, 'separator', 'separatorBlock', 'Separator', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(22, '6422a22b80d6f', 1, 'avatar', 'avatarBlock', 'Avatar', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40');

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_pre_defined_messenger_platforms`
--

CREATE TABLE `link_in_bio_pre_defined_messenger_platforms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `link_in_bio_pre_defined_messenger_platforms`
--

INSERT INTO `link_in_bio_pre_defined_messenger_platforms` (`id`, `unique_id`, `user_id`, `type`, `icon`, `title`, `isActive`, `orderNo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22d50977', 1, 'email', 'emailLogo', 'Email', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(2, '6422a22d50afc', 1, 'whatsapp', 'whatsAppLogo', 'whatsApp', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(3, '6422a22d50c52', 1, 'messenger', 'messengerLogo', 'Messenger', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(4, '6422a22d50dd2', 1, 'call', 'callLogo', 'Call', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(5, '6422a22d50ee7', 1, 'sms', 'smsLogo', 'SMS', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(6, '6422a22d50f6d', 1, 'telegram', 'telegramLogo', 'Telegram', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(7, '6422a22d50fe5', 1, 'skype', 'skypeLogo', 'Skype', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(8, '6422a22d5105c', 1, 'wechat', 'wechatLogo', 'WeChat', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(9, '6422a22d510d1', 1, 'line', 'lineLogo', 'Line', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(10, '6422a22d511b9', 1, 'viber', 'viberLogo', 'Viber', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42');

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_pre_defined_music_platforms`
--

CREATE TABLE `link_in_bio_pre_defined_music_platforms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `link_in_bio_pre_defined_music_platforms`
--

INSERT INTO `link_in_bio_pre_defined_music_platforms` (`id`, `unique_id`, `user_id`, `type`, `icon`, `title`, `isActive`, `orderNo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22cb7bcb', 1, 'spotify', 'spotifyLogo', 'Spotify', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(2, '6422a22cb7d09', 1, 'soundCloud', 'soundCloudLogo', 'Sound Cloud', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(3, '6422a22cb7e31', 1, 'googleMusic', 'googleMusicLogo', 'Google Music', 1, NULL, NULL, '2023-03-28 03:15:40', '2023-03-28 03:15:40'),
(4, '6422a22cb805f', 1, 'appleMusic', 'appleMusicLogo', 'Apple Music', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(5, '6422a22cb81aa', 1, 'youtube', 'youtubeLogo', 'Youtube', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(6, '6422a22cb8256', 1, 'deezer', 'deezerLogo', 'Deezer', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(7, '6422a22cb82ce', 1, 'amazonMusic', 'amazonMusicLogo', 'Amazon Music', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41'),
(8, '6422a22cb8345', 1, 'napster', 'napsterLogo', 'Napster', 1, NULL, NULL, '2023-03-28 03:15:41', '2023-03-28 03:15:41');

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_pre_defined_social_platforms`
--

CREATE TABLE `link_in_bio_pre_defined_social_platforms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `link_in_bio_pre_defined_social_platforms`
--

INSERT INTO `link_in_bio_pre_defined_social_platforms` (`id`, `unique_id`, `user_id`, `type`, `icon`, `title`, `isActive`, `orderNo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22e3c52a', 1, 'tiktok', 'tiktokLogo', 'Tiktok', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(2, '6422a22e3c5d9', 1, 'facebook', 'facebookLogo', 'Facebook', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(3, '6422a22e3c655', 1, 'instagram', 'instagramLogo', 'Instagram', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(4, '6422a22e3c71b', 1, 'twitter', 'twitterLogo', 'Twitter', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(5, '6422a22e3c82b', 1, 'linkedin', 'linkedinLogo', 'Linkedin', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(6, '6422a22e3c938', 1, 'slack', 'slackLogo', 'Slack', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(7, '6422a22e3ca46', 1, 'youtube', 'youtubeLogo', 'Youtube', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(8, '6422a22e3cb60', 1, 'pinterest', 'pinterestLogo', 'Pinterest', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42');

-- --------------------------------------------------------

--
-- Table structure for table `link_in_bio_pre_defined_themes`
--

CREATE TABLE `link_in_bio_pre_defined_themes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `background` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`background`)),
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lin_in_bio_pre_defined_form_fields`
--

CREATE TABLE `lin_in_bio_pre_defined_form_fields` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lin_in_bio_pre_defined_form_fields`
--

INSERT INTO `lin_in_bio_pre_defined_form_fields` (`id`, `unique_id`, `user_id`, `type`, `icon`, `title`, `isActive`, `orderNo`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22eac9d8', 1, 'title', 'headingIcon', 'Title', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(2, '6422a22eacbda', 1, 'firstName', 'userIcon_1', 'First Name', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(3, '6422a22eacd69', 1, 'lastName', 'userIcon_2', 'Last Name', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(4, '6422a22eace65', 1, 'email', 'emailLogo', 'Email', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(5, '6422a22eacf51', 1, 'phone', 'callLogo', 'Phone', 1, NULL, NULL, '2023-03-28 03:15:42', '2023-03-28 03:15:42'),
(6, '6422a22eacfd4', 1, 'text', 'textIcon', 'Text', 1, NULL, NULL, '2023-03-28 03:15:43', '2023-03-28 03:15:43'),
(7, '6422a22ead0a1', 1, 'date', 'calenderIcon', 'Date', 1, NULL, NULL, '2023-03-28 03:15:43', '2023-03-28 03:15:43'),
(8, '6422a22ead1a2', 1, 'website', 'linkIcon', 'Website', 1, NULL, NULL, '2023-03-28 03:15:43', '2023-03-28 03:15:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2014_10_12_200000_add_two_factor_columns_to_users_table', 1),
(4, '2018_01_01_000000_create_action_events_table', 1),
(5, '2018_08_08_100000_create_telescope_entries_table', 1),
(6, '2019_05_10_000000_add_fields_to_action_events_table', 1),
(7, '2019_08_19_000000_create_failed_jobs_table', 1),
(8, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(9, '2021_08_25_193039_create_nova_notifications_table', 1),
(10, '2022_04_26_000000_add_fields_to_nova_notifications_table', 1),
(11, '2022_11_24_115806_create_permission_tables', 1),
(12, '2022_12_19_000000_create_field_attachments_table', 1),
(13, '2023_01_18_102648_create_pixel_accounts_table', 1),
(14, '2023_01_18_102721_create_utm_tag_templates_table', 1),
(15, '2023_01_18_102737_create_folders_table', 1),
(16, '2023_01_18_135522_create_groups_table', 1),
(17, '2023_01_18_152113_create_embedded_scripts_table', 1),
(18, '2023_01_18_152542_create_api_keys_table', 1),
(19, '2023_01_18_152742_create_custom_domains_table', 1),
(20, '2023_01_18_153110_create_short_links_table', 1),
(21, '2023_01_31_142620_create_link_in_bios_table', 1),
(22, '2023_02_22_123502_create_link_in_bio_folders_table', 1),
(23, '2023_02_24_154436_create_link_in_bio_pre_defined_themes_table', 1),
(24, '2023_03_03_174132_create_link_in_bio_blocks_table', 1),
(25, '2023_03_08_064418_create_link_in_bio_predefined_blocks_table', 1),
(26, '2023_03_16_101417_create_link_in_bio_pre_defined_music_platforms_table', 1),
(27, '2023_03_16_155950_create_link_in_bio_pre_defined_messenger_platforms_table', 1),
(28, '2023_03_17_071916_create_link_in_bio_pre_defined_social_platforms_table', 1),
(29, '2023_03_20_121628_create_lin_in_bio_pre_defined_form_fields_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(4, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `nova_field_attachments`
--

CREATE TABLE `nova_field_attachments` (
  `id` int(10) UNSIGNED NOT NULL,
  `attachable_type` varchar(255) NOT NULL,
  `attachable_id` bigint(20) UNSIGNED NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nova_notifications`
--

CREATE TABLE `nova_notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nova_pending_field_attachments`
--

CREATE TABLE `nova_pending_field_attachments` (
  `id` int(10) UNSIGNED NOT NULL,
  `draft_id` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth', 'c225494fdd314d9cc18d46184558173538b8a81bc4a0918e7c1801dbcc94beb1', '[\"*\"]', '2023-03-28 03:16:53', NULL, '2023-03-28 03:16:44', '2023-03-28 03:16:53');

-- --------------------------------------------------------

--
-- Table structure for table `pixel_accounts`
--

CREATE TABLE `pixel_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pixelId` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', '2023-03-28 03:15:36', '2023-03-28 03:15:36'),
(2, 'Shop Manager', 'web', '2023-03-28 03:15:36', '2023-03-28 03:15:36'),
(3, 'Creator', 'web', '2023-03-28 03:15:36', '2023-03-28 03:15:36'),
(4, 'Viewer', 'web', '2023-03-28 03:15:37', '2023-03-28 03:15:37');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `short_links`
--

CREATE TABLE `short_links` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `folderId` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `target` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`target`)),
  `featureImg` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `pixelIds` varchar(255) DEFAULT NULL,
  `utmTagInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`utmTagInfo`)),
  `shortUrl` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shortUrl`)),
  `notes` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `abTestingRotatorLinks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`abTestingRotatorLinks`)),
  `geoLocationRotatorLinks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`geoLocationRotatorLinks`)),
  `linkExpirationInfo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`linkExpirationInfo`)),
  `password` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`password`)),
  `favicon` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`favicon`)),
  `isActive` tinyint(1) DEFAULT NULL,
  `isFavorite` tinyint(1) DEFAULT NULL,
  `orderNo` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `telescope_entries`
--

CREATE TABLE `telescope_entries` (
  `sequence` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) NOT NULL,
  `batch_id` char(36) NOT NULL,
  `family_hash` varchar(255) DEFAULT NULL,
  `should_display_on_index` tinyint(1) NOT NULL DEFAULT 1,
  `type` varchar(20) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `telescope_entries`
--

INSERT INTO `telescope_entries` (`sequence`, `uuid`, `batch_id`, `family_hash`, `should_display_on_index`, `type`, `content`, `created_at`) VALUES
(1, '98cb5912-78b8-4621-9676-0c47ad4e6bc7', '98cb5913-5619-4a12-99ca-4a4db4101cd4', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/login\",\"method\":\"OPTIONS\",\"controller_action\":null,\"middleware\":[],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"accept\":\"*\\/*\",\"access-control-request-method\":\"POST\",\"access-control-request-headers\":\"authorization,content-type\",\"origin\":\"http:\\/\\/localhost:8100\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"en-US,en;q=0.9\"},\"payload\":[],\"session\":[],\"response_status\":204,\"response\":\"Empty Response\",\"duration\":921,\"memory\":10,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:42'),
(2, '98cb5915-39f4-43c8-9c15-5aa634bff093', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'cache', '{\"type\":\"missed\",\"key\":\"a75f3f172bfb296f2e10cbfc6dfc1883\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:43'),
(3, '98cb5915-ba28-4e0a-8b61-faa0bddfc908', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `users` where `email` = \'ahsan@zaions.com\' and `users`.`deleted_at` is null limit 1\",\"time\":\"3.07\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\AuthController.php\",\"line\":56,\"hash\":\"d06708775103e5457dda3c7fd2d95fe6\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:43'),
(4, '98cb5915-bc4f-409a-a995-762174ef1545', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'model', '{\"action\":\"retrieved\",\"model\":\"App\\\\Models\\\\User\",\"count\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:43'),
(5, '98cb5916-707a-4e1a-8580-29f286f566a7', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"insert into `personal_access_tokens` (`name`, `token`, `abilities`, `expires_at`, `tokenable_id`, `tokenable_type`, `updated_at`, `created_at`) values (\'auth\', \'c225494fdd314d9cc18d46184558173538b8a81bc4a0918e7c1801dbcc94beb1\', \'[\\\\\\\"*\\\\\\\"]\', null, 1, \'App\\\\Models\\\\User\', \'2023-03-28 08:16:44\', \'2023-03-28 08:16:44\')\",\"time\":\"74.95\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\AuthController.php\",\"line\":60,\"hash\":\"b2fb64d914c0a4b156c509f66ca8dcc4\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:44'),
(6, '98cb5916-81a0-48cd-a1db-ed54436d064b', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'model', '{\"action\":\"created\",\"model\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken:1\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:44'),
(7, '98cb5917-a5e7-4039-a6cd-ac6e12758f2a', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'cache', '{\"type\":\"hit\",\"key\":\"a75f3f172bfb296f2e10cbfc6dfc1883\",\"value\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:45'),
(8, '98cb5917-a6f5-47b5-b0d4-452df273ec39', '98cb5917-a8df-4f5f-84a4-f5dbf4e35b3b', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/login\",\"method\":\"POST\",\"controller_action\":\"App\\\\Http\\\\Controllers\\\\ZLink\\\\AuthController@login\",\"middleware\":[\"api\"],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"content-length\":\"51\",\"sec-ch-ua\":\"\\\"Brave\\\";v=\\\"111\\\", \\\"Not(A:Brand\\\";v=\\\"8\\\", \\\"Chromium\\\";v=\\\"111\\\"\",\"accept\":\"application\\/json\",\"content-type\":\"application\\/json\",\"sec-ch-ua-mobile\":\"?0\",\"authorization\":\"********\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-ch-ua-platform\":\"\\\"Windows\\\"\",\"sec-gpc\":\"1\",\"accept-language\":\"en-US,en\",\"origin\":\"http:\\/\\/localhost:8100\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\"},\"payload\":{\"email\":\"ahsan@zaions.com\",\"password\":\"********\"},\"session\":[],\"response_status\":201,\"response\":{\"success\":true,\"errors\":[],\"data\":{\"user\":{\"id\":\"6422a22932908\",\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\",\"username\":\"aoneahsan\",\"firstname\":\"Ahsan\",\"lastname\":\"Mahmood\",\"phonenumber\":\"03001234567\",\"description\":\"Hi everyone, I\'m ahsan the admin of the site\",\"website\":\"https:\\/\\/zaions.com\",\"language\":\"Urdu\",\"countrycode\":null,\"country\":null,\"address\":null,\"city\":null,\"profileimage\":null,\"avatar\":null,\"createdAt\":\"2023-03-28T08:15:37.000000Z\",\"updatedAt\":\"2023-03-28T08:15:37.000000Z\",\"email_verified_at\":null},\"token\":{\"accessToken\":{\"name\":\"auth\",\"abilities\":[\"*\"],\"expires_at\":null,\"tokenable_id\":1,\"tokenable_type\":\"App\\\\Models\\\\User\",\"updated_at\":\"2023-03-28T08:16:44.000000Z\",\"created_at\":\"2023-03-28T08:16:44.000000Z\",\"id\":1},\"plainTextToken\":\"1|rykBUsffEEbPOMx5BSkwIJIdGdyAR2Y41wnnjEMv\"}},\"message\":\"Request Completed Successfully!\",\"status\":201},\"duration\":2643,\"memory\":8,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:45'),
(9, '98cb5921-6c1d-4296-859d-74d8ad81f223', '98cb5921-6da7-435b-8648-0065abdad389', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/user\\/link-in-bio\",\"method\":\"OPTIONS\",\"controller_action\":null,\"middleware\":[],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"accept\":\"*\\/*\",\"access-control-request-method\":\"GET\",\"access-control-request-headers\":\"authorization\",\"origin\":\"http:\\/\\/localhost:8100\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"en-US,en;q=0.9\"},\"payload\":[],\"session\":[],\"response_status\":204,\"response\":\"Empty Response\",\"duration\":230,\"memory\":6,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(10, '98cb5921-e11d-4986-9061-bf09060ab8f3', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `personal_access_tokens` where `personal_access_tokens`.`id` = \'1\' limit 1\",\"time\":\"2.34\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"ab6a9c88c015fb0515300add876e7e0b\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(11, '98cb5921-e1fa-4452-91fe-d26a53d03cfc', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'model', '{\"action\":\"retrieved\",\"model\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken\",\"count\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(12, '98cb5921-fef1-4654-bff8-7adc5eff1ebb', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `users` where `users`.`id` = 1 and `users`.`deleted_at` is null limit 1\",\"time\":\"0.76\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"bafce275a965b8d54647d79c72f8060f\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(13, '98cb5921-ff7c-4e6c-a98c-3c744a00f512', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'model', '{\"action\":\"retrieved\",\"model\":\"App\\\\Models\\\\User\",\"count\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(14, '98cb5922-0a45-4ad6-bb17-a4eb6251666e', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'event', '{\"name\":\"Laravel\\\\Sanctum\\\\Events\\\\TokenAuthenticated\",\"payload\":{\"token\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken:1\"},\"listeners\":[],\"broadcast\":false,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(15, '98cb5922-3817-4b8b-8b15-72924b4a071a', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"update `personal_access_tokens` set `last_used_at` = \'2023-03-28 08:16:51\', `personal_access_tokens`.`updated_at` = \'2023-03-28 08:16:51\' where `id` = 1\",\"time\":\"90.96\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"f8d5b91f9ee8fbd8a9b15b39e56f4176\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(16, '98cb5922-3a0a-4d53-883e-2e867fa7523b', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'model', '{\"action\":\"updated\",\"model\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken:1\",\"changes\":{\"last_used_at\":\"2023-03-28 08:16:51\",\"updated_at\":\"2023-03-28 08:16:51\"},\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:51'),
(17, '98cb5922-3fc3-45c1-8e3e-3650552d8ba2', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'cache', '{\"type\":\"missed\",\"key\":\"f1f70ec40aaa556905d4a030501c0ba4\",\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:51'),
(18, '98cb5922-5e65-41a2-9f98-9a214258bdfa', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select count(*) as aggregate from `link_in_bios` where `user_id` = 1 and `link_in_bios`.`deleted_at` is null\",\"time\":\"21.70\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioController.php\",\"line\":22,\"hash\":\"40db69820eae771b91fd03646f390d01\",\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:52'),
(19, '98cb5922-5fe1-44d1-aa31-5e76b2eb70e9', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `link_in_bios` where `user_id` = 1 and `link_in_bios`.`deleted_at` is null\",\"time\":\"0.71\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioController.php\",\"line\":23,\"hash\":\"65c2c0c00e38f7621348e3edc36057e2\",\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:52'),
(20, '98cb5922-73fc-4e1a-8e62-8accac103f0b', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'cache', '{\"type\":\"hit\",\"key\":\"f1f70ec40aaa556905d4a030501c0ba4\",\"value\":1,\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:52'),
(21, '98cb5922-74d9-4c63-8308-512bdd8be403', '98cb5922-7647-45c2-9a62-9a1ebcb3cca8', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/user\\/link-in-bio\",\"method\":\"GET\",\"controller_action\":\"App\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioController@index\",\"middleware\":[\"api\",\"auth:sanctum\"],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"sec-ch-ua\":\"\\\"Brave\\\";v=\\\"111\\\", \\\"Not(A:Brand\\\";v=\\\"8\\\", \\\"Chromium\\\";v=\\\"111\\\"\",\"accept\":\"application\\/json\",\"sec-ch-ua-mobile\":\"?0\",\"authorization\":\"********\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-ch-ua-platform\":\"\\\"Windows\\\"\",\"sec-gpc\":\"1\",\"accept-language\":\"en-US,en\",\"origin\":\"http:\\/\\/localhost:8100\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\"},\"payload\":[],\"session\":[],\"response_status\":200,\"response\":{\"success\":true,\"errors\":[],\"message\":\"Request Completed Successfully!\",\"data\":{\"items\":[],\"itemsCount\":0},\"status\":200},\"duration\":633,\"memory\":6,\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:52'),
(22, '98cb5922-e660-44d1-8c1a-8138c06e6e87', '98cb5922-e742-451a-889d-81b3cbd45a92', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/user\\/link-in-bio-folders\",\"method\":\"OPTIONS\",\"controller_action\":null,\"middleware\":[],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"accept\":\"*\\/*\",\"access-control-request-method\":\"GET\",\"access-control-request-headers\":\"authorization\",\"origin\":\"http:\\/\\/localhost:8100\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"en-US,en;q=0.9\"},\"payload\":[],\"session\":[],\"response_status\":204,\"response\":\"Empty Response\",\"duration\":230,\"memory\":6,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:52'),
(23, '98cb5924-38a5-4a1a-b47c-812e548d9807', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `personal_access_tokens` where `personal_access_tokens`.`id` = \'1\' limit 1\",\"time\":\"3.72\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"ab6a9c88c015fb0515300add876e7e0b\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(24, '98cb5924-3a6d-42e4-9d72-b5a8b251f7b5', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'model', '{\"action\":\"retrieved\",\"model\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken\",\"count\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(25, '98cb5924-3e9d-4025-9866-a8e46684870d', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `users` where `users`.`id` = 1 and `users`.`deleted_at` is null limit 1\",\"time\":\"1.15\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"bafce275a965b8d54647d79c72f8060f\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(26, '98cb5924-3f7c-4ba6-b749-e9a976ddf973', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'model', '{\"action\":\"retrieved\",\"model\":\"App\\\\Models\\\\User\",\"count\":1,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(27, '98cb5924-4052-4bf8-9c8f-c6eaf024e5b7', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'event', '{\"name\":\"Laravel\\\\Sanctum\\\\Events\\\\TokenAuthenticated\",\"payload\":{\"token\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken:1\"},\"listeners\":[],\"broadcast\":false,\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(28, '98cb5924-532f-44f4-b13d-93154df7d160', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"update `personal_access_tokens` set `last_used_at` = \'2023-03-28 08:16:53\', `personal_access_tokens`.`updated_at` = \'2023-03-28 08:16:53\' where `id` = 1\",\"time\":\"35.82\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\public\\\\index.php\",\"line\":52,\"hash\":\"f8d5b91f9ee8fbd8a9b15b39e56f4176\",\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(29, '98cb5924-542d-4f77-ad21-2c1c3c8a7d77', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'model', '{\"action\":\"updated\",\"model\":\"Laravel\\\\Sanctum\\\\PersonalAccessToken:1\",\"changes\":{\"last_used_at\":\"2023-03-28 08:16:53\",\"updated_at\":\"2023-03-28 08:16:53\"},\"hostname\":\"DESKTOP-PTJ35UG\"}', '2023-03-28 08:16:53'),
(30, '98cb5924-5779-4b3e-bf8d-092fd0a2d956', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'cache', '{\"type\":\"hit\",\"key\":\"f1f70ec40aaa556905d4a030501c0ba4\",\"value\":1,\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:53'),
(31, '98cb5924-600a-4a6e-9a75-bbe6736a3193', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select count(*) as aggregate from `link_in_bio_folders` where `user_id` = 1 and `link_in_bio_folders`.`deleted_at` is null\",\"time\":\"12.45\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioFolderController.php\",\"line\":25,\"hash\":\"dcf768f3111f8b9f3570d46d2abc5c9d\",\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:53'),
(32, '98cb5924-6288-4f4a-a5ec-380bf3c673d5', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'query', '{\"connection\":\"mysql\",\"bindings\":[],\"sql\":\"select * from `link_in_bio_folders` where `user_id` = 1 and `link_in_bio_folders`.`deleted_at` is null order by `orderNo` asc\",\"time\":\"1.15\",\"slow\":false,\"file\":\"D:\\\\work\\\\laravel-projects\\\\personal\\\\bitly-clone-ionic-react-laravel\\\\app\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioFolderController.php\",\"line\":26,\"hash\":\"7a978f0e62fd555a3bd5b84484a046f4\",\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:53'),
(33, '98cb5924-66ae-4161-8dd3-9f6552e28b61', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'cache', '{\"type\":\"hit\",\"key\":\"f1f70ec40aaa556905d4a030501c0ba4\",\"value\":2,\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:53'),
(34, '98cb5924-69a6-47f7-9ec1-9d5010e9ea30', '98cb5924-6c0a-4bc3-ac97-afdd1a3b3c8c', NULL, 1, 'request', '{\"ip_address\":\"127.0.0.1\",\"uri\":\"\\/api\\/zlink\\/v1\\/user\\/link-in-bio-folders\",\"method\":\"GET\",\"controller_action\":\"App\\\\Http\\\\Controllers\\\\ZLink\\\\LinkInBioFolderController@index\",\"middleware\":[\"api\",\"auth:sanctum\"],\"headers\":{\"host\":\"localhost:8000\",\"connection\":\"keep-alive\",\"sec-ch-ua\":\"\\\"Brave\\\";v=\\\"111\\\", \\\"Not(A:Brand\\\";v=\\\"8\\\", \\\"Chromium\\\";v=\\\"111\\\"\",\"accept\":\"application\\/json\",\"sec-ch-ua-mobile\":\"?0\",\"authorization\":\"********\",\"user-agent\":\"Mozilla\\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\\/537.36 (KHTML, like Gecko) Chrome\\/111.0.0.0 Safari\\/537.36\",\"sec-ch-ua-platform\":\"\\\"Windows\\\"\",\"sec-gpc\":\"1\",\"accept-language\":\"en-US,en\",\"origin\":\"http:\\/\\/localhost:8100\",\"sec-fetch-site\":\"same-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http:\\/\\/localhost:8100\\/\",\"accept-encoding\":\"gzip, deflate, br\"},\"payload\":[],\"session\":[],\"response_status\":200,\"response\":{\"success\":true,\"errors\":[],\"message\":\"Request Completed Successfully!\",\"data\":{\"items\":[],\"itemsCount\":0},\"status\":200},\"duration\":670,\"memory\":6,\"hostname\":\"DESKTOP-PTJ35UG\",\"user\":{\"id\":1,\"name\":\"Ahsan Mahmood\",\"email\":\"ahsan@zaions.com\"}}', '2023-03-28 08:16:53');

-- --------------------------------------------------------

--
-- Table structure for table `telescope_entries_tags`
--

CREATE TABLE `telescope_entries_tags` (
  `entry_uuid` char(36) NOT NULL,
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `telescope_entries_tags`
--

INSERT INTO `telescope_entries_tags` (`entry_uuid`, `tag`) VALUES
('98cb5915-bc4f-409a-a995-762174ef1545', 'App\\Models\\User'),
('98cb5916-81a0-48cd-a1db-ed54436d064b', 'Laravel\\Sanctum\\PersonalAccessToken:1'),
('98cb5921-e1fa-4452-91fe-d26a53d03cfc', 'Laravel\\Sanctum\\PersonalAccessToken'),
('98cb5921-ff7c-4e6c-a98c-3c744a00f512', 'App\\Models\\User'),
('98cb5922-0a45-4ad6-bb17-a4eb6251666e', 'Laravel\\Sanctum\\PersonalAccessToken:1'),
('98cb5922-3a0a-4d53-883e-2e867fa7523b', 'Laravel\\Sanctum\\PersonalAccessToken:1'),
('98cb5922-3fc3-45c1-8e3e-3650552d8ba2', 'Auth:1'),
('98cb5922-5e65-41a2-9f98-9a214258bdfa', 'Auth:1'),
('98cb5922-5fe1-44d1-aa31-5e76b2eb70e9', 'Auth:1'),
('98cb5922-73fc-4e1a-8e62-8accac103f0b', 'Auth:1'),
('98cb5922-74d9-4c63-8308-512bdd8be403', 'Auth:1'),
('98cb5924-3a6d-42e4-9d72-b5a8b251f7b5', 'Laravel\\Sanctum\\PersonalAccessToken'),
('98cb5924-3f7c-4ba6-b749-e9a976ddf973', 'App\\Models\\User'),
('98cb5924-4052-4bf8-9c8f-c6eaf024e5b7', 'Laravel\\Sanctum\\PersonalAccessToken:1'),
('98cb5924-542d-4f77-ad21-2c1c3c8a7d77', 'Laravel\\Sanctum\\PersonalAccessToken:1'),
('98cb5924-5779-4b3e-bf8d-092fd0a2d956', 'Auth:1'),
('98cb5924-600a-4a6e-9a75-bbe6736a3193', 'Auth:1'),
('98cb5924-6288-4f4a-a5ec-380bf3c673d5', 'Auth:1'),
('98cb5924-66ae-4161-8dd3-9f6552e28b61', 'Auth:1'),
('98cb5924-69a6-47f7-9ec1-9d5010e9ea30', 'Auth:1');

-- --------------------------------------------------------

--
-- Table structure for table `telescope_monitoring`
--

CREATE TABLE `telescope_monitoring` (
  `tag` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `countrycode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `profileimage` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `account_delete_reason` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `unique_id`, `name`, `firstname`, `lastname`, `username`, `email`, `phonenumber`, `description`, `website`, `language`, `countrycode`, `country`, `address`, `city`, `profileimage`, `avatar`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `account_delete_reason`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '6422a22932908', 'Ahsan Mahmood', 'Ahsan', 'Mahmood', 'aoneahsan', 'ahsan@zaions.com', '03001234567', 'Hi everyone, I\'m ahsan the admin of the site', 'https://zaions.com', 'Urdu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$6dIMVGogZziq9zsCgumw1eE6O.rFheVhBdRmj8eDXYA0iGZqQ.RAC', NULL, NULL, NULL, NULL, NULL, '2023-03-28 03:15:37', '2023-03-28 03:15:37'),
(2, '6422a22a1b463', 'Billy Bills', 'Billy', 'Bills', 'BB', 'shopManager@zaions.com', '03001236745', 'Hi everyone, I\'m BB the shop manager of the site', 'https://zaions.com', 'English', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$sjb6D7SO8aNa/Ya3tLOtiuB0.dXmHsHobWuYS6LgwaQZ6I9X//SeK', NULL, NULL, NULL, NULL, NULL, '2023-03-28 03:15:38', '2023-03-28 03:15:38'),
(3, '6422a22a70baa', 'Dan Jackson', 'Dan', 'Jackson', 'DJ', 'creator@zaions.com', '03001236745', 'Hi everyone, I\'m DJ the work as creator in the site', 'https://zaions.com', 'English', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$.Y0Jr7o9nV/4Mq/vx5204.CcZOoZZ8DIxwvoleE4jkipvDGVRlMFi', NULL, NULL, NULL, NULL, NULL, '2023-03-28 03:15:38', '2023-03-28 03:15:38'),
(4, '6422a22ab73af', 'Kavin Edwin', 'Kavin', 'Edwin', 'KE', 'viewer@zaions.com', '03001236745', 'Hi everyone, I\'m KE I\'m a subscriber/viewer of this site greate site', 'https://zaions.com', 'English', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$iogtFakGrRuqdr9EpeDZiuIW33NvLcGSVXJUF1S.YMvNY5F3valI6', NULL, NULL, NULL, NULL, NULL, '2023-03-28 03:15:39', '2023-03-28 03:15:39');

-- --------------------------------------------------------

--
-- Table structure for table `utm_tag_templates`
--

CREATE TABLE `utm_tag_templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unique_id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `templateName` varchar(255) DEFAULT NULL,
  `utmCampaign` varchar(255) DEFAULT NULL,
  `utmMedium` varchar(255) DEFAULT NULL,
  `utmSource` varchar(255) DEFAULT NULL,
  `utmTerm` varchar(255) DEFAULT NULL,
  `utmContent` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_events`
--
ALTER TABLE `action_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `action_events_actionable_type_actionable_id_index` (`actionable_type`,`actionable_id`),
  ADD KEY `action_events_target_type_target_id_index` (`target_type`,`target_id`),
  ADD KEY `action_events_batch_id_model_type_model_id_index` (`batch_id`,`model_type`,`model_id`),
  ADD KEY `action_events_user_id_index` (`user_id`);

--
-- Indexes for table `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_domains`
--
ALTER TABLE `custom_domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `embedded_scripts`
--
ALTER TABLE `embedded_scripts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bios`
--
ALTER TABLE `link_in_bios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_blocks`
--
ALTER TABLE `link_in_bio_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_folders`
--
ALTER TABLE `link_in_bio_folders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_predefined_blocks`
--
ALTER TABLE `link_in_bio_predefined_blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_pre_defined_messenger_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_messenger_platforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_pre_defined_music_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_music_platforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_pre_defined_social_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_social_platforms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `link_in_bio_pre_defined_themes`
--
ALTER TABLE `link_in_bio_pre_defined_themes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lin_in_bio_pre_defined_form_fields`
--
ALTER TABLE `lin_in_bio_pre_defined_form_fields`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `nova_field_attachments`
--
ALTER TABLE `nova_field_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nova_field_attachments_attachable_type_attachable_id_index` (`attachable_type`,`attachable_id`),
  ADD KEY `nova_field_attachments_url_index` (`url`);

--
-- Indexes for table `nova_notifications`
--
ALTER TABLE `nova_notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nova_notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `nova_pending_field_attachments`
--
ALTER TABLE `nova_pending_field_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nova_pending_field_attachments_draft_id_index` (`draft_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pixel_accounts`
--
ALTER TABLE `pixel_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `short_links`
--
ALTER TABLE `short_links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `telescope_entries`
--
ALTER TABLE `telescope_entries`
  ADD PRIMARY KEY (`sequence`),
  ADD UNIQUE KEY `telescope_entries_uuid_unique` (`uuid`),
  ADD KEY `telescope_entries_batch_id_index` (`batch_id`),
  ADD KEY `telescope_entries_family_hash_index` (`family_hash`),
  ADD KEY `telescope_entries_created_at_index` (`created_at`),
  ADD KEY `telescope_entries_type_should_display_on_index_index` (`type`,`should_display_on_index`);

--
-- Indexes for table `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD KEY `telescope_entries_tags_entry_uuid_tag_index` (`entry_uuid`,`tag`),
  ADD KEY `telescope_entries_tags_tag_index` (`tag`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `utm_tag_templates`
--
ALTER TABLE `utm_tag_templates`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action_events`
--
ALTER TABLE `action_events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_domains`
--
ALTER TABLE `custom_domains`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `embedded_scripts`
--
ALTER TABLE `embedded_scripts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link_in_bios`
--
ALTER TABLE `link_in_bios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link_in_bio_blocks`
--
ALTER TABLE `link_in_bio_blocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link_in_bio_folders`
--
ALTER TABLE `link_in_bio_folders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `link_in_bio_predefined_blocks`
--
ALTER TABLE `link_in_bio_predefined_blocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `link_in_bio_pre_defined_messenger_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_messenger_platforms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `link_in_bio_pre_defined_music_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_music_platforms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `link_in_bio_pre_defined_social_platforms`
--
ALTER TABLE `link_in_bio_pre_defined_social_platforms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `link_in_bio_pre_defined_themes`
--
ALTER TABLE `link_in_bio_pre_defined_themes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lin_in_bio_pre_defined_form_fields`
--
ALTER TABLE `lin_in_bio_pre_defined_form_fields`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `nova_field_attachments`
--
ALTER TABLE `nova_field_attachments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nova_pending_field_attachments`
--
ALTER TABLE `nova_pending_field_attachments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pixel_accounts`
--
ALTER TABLE `pixel_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `short_links`
--
ALTER TABLE `short_links`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `telescope_entries`
--
ALTER TABLE `telescope_entries`
  MODIFY `sequence` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `utm_tag_templates`
--
ALTER TABLE `utm_tag_templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
