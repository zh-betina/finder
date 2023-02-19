SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `hotel_hotel`;
CREATE TABLE `hotel_hotel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hotel_hotel` (`id`, `name`) VALUES
(1,	'amor'),
(2,	'byzance'),
(3,	'caraibes');