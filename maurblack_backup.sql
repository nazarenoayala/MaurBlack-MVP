-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: maurblack
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'nazaayala1@gmail.com','$2b$10$NS8vTbb/3kqR5aJhYBnqteUBC6lm2ZfCA29AsHJEcbhoU3E0VfqrS','admin');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `appointment_type` tinyint NOT NULL COMMENT '1: Flash, 2: Custom',
  `client_name` varchar(100) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `client_phone` varchar(20) NOT NULL,
  `flash_id` smallint unsigned DEFAULT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `custom_description` text,
  `reference_img_url` varchar(255) DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '1: Pending, 2: Confirmed, 3: Done',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appointment_id`),
  KEY `fk_appointments_flashes` (`flash_id`),
  CONSTRAINT `fk_appointments_flashes` FOREIGN KEY (`flash_id`) REFERENCES `flashes` (`flash_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `category_type` tinyint NOT NULL COMMENT '1: Tattoos, 2: Paints, 3: Merchandising, 4: Prints',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tattoos Portfolio',1),(2,'Paints Portfolio',2);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashes`
--

DROP TABLE IF EXISTS `flashes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashes` (
  `flash_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint unsigned NOT NULL,
  `flash_title` varchar(100) NOT NULL,
  `flash_img_url` varchar(255) NOT NULL,
  `alt_text` varchar(150) DEFAULT NULL,
  `price` int NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`flash_id`),
  KEY `fk_flashes_categories` (`category_id`),
  CONSTRAINT `fk_flashes_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashes`
--

LOCK TABLES `flashes` WRITE;
/*!40000 ALTER TABLE `flashes` DISABLE KEYS */;
INSERT INTO `flashes` VALUES (1,1,'Traditional Dagger','https://res.cloudinary.com/ddzvaugox/image/upload/c_fill,g_center,w_600,h_800/v1772031585/_MG_9187_wvznj6.jpg',NULL,150,1),(2,1,'Classic Rose','https://res.cloudinary.com/ddzvaugox/image/upload/c_fill,g_center,w_600,h_800/v1772031585/DSC09649_xp75sg.jpg',NULL,120,1),(3,1,'Ornamental Piece','https://res.cloudinary.com/ddzvaugox/image/upload/c_fill,g_center,w_600,h_800/v1772031585/IMG_5565_npuly9.jpg',NULL,180,1),(6,1,'japooooo','https://res.cloudinary.com/ddzvaugox/image/upload/v1772654720/maurblack/cynifdi9f9nu66jh4es9.jpg',NULL,200,1);
/*!40000 ALTER TABLE `flashes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` smallint unsigned NOT NULL,
  `product_name` varchar(150) DEFAULT NULL,
  `product_price` int DEFAULT NULL,
  `is_sold` tinyint(1) NOT NULL DEFAULT '0',
  `stock` smallint DEFAULT '1',
  `category_id` smallint unsigned NOT NULL,
  `product_img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_products_categories` (`category_id`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `works`
--

DROP TABLE IF EXISTS `works`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `works` (
  `work_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint unsigned NOT NULL,
  `work_title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `work_img_url` varchar(255) DEFAULT NULL,
  `alt_text` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`work_id`),
  KEY `fk_works_categories` (`category_id`),
  CONSTRAINT `fk_works_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `works`
--

LOCK TABLES `works` WRITE;
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` VALUES (1,1,'Pieza Blackwork','Tatuaje realizado en 2024','https://res.cloudinary.com/ddzvaugox/image/upload/c_fill,g_center,w_1000,h_1200/v1772031585/_MG_9187_wvznj6.jpg','Tatuaje'),(2,2,'Óleo sobre lienzo','Pintura original de Maur','https://res.cloudinary.com/ddzvaugox/image/upload/c_fill,g_center,w_1000,h_1200/v1772031585/DSC09649_xp75sg.jpg','Pintura'),(3,1,'Japanese Dragon','Full back piece, traditional style','https://res.cloudinary.com/ddzvaugox/image/upload/v1772031585/DSC09649_xp75sg.jpg',NULL),(5,2,'pinturita','fantastica','https://res.cloudinary.com/ddzvaugox/image/upload/v1772654239/maurblack/kryi0tsaswhoxmxmlo9l.jpg','undefined');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-09 14:17:12
