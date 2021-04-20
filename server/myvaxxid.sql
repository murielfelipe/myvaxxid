-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2021 a las 10:32:36
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `myvaxxid`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patientdata`
--

CREATE TABLE `patientdata` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `HealthCardID` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `Email` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `Phone` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `PhotoURL` text COLLATE latin1_spanish_ci NOT NULL,
  `DateOfBird` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `VaccineId` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `ProductName` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `manufacturer` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `quantityDose` int(11) NOT NULL,
  `doseNumber` int(11) NOT NULL,
  `inmunityDate` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `vaccinationDate` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `LotNumber` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `hash` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `nonceNumber` varchar(255) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `lastName` varchar(255) COLLATE latin1_spanish_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `createdAt`, `updatedAt`) VALUES
(1, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:47:29', '2021-04-17 02:47:29'),
(2, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:25', '2021-04-17 02:52:25'),
(3, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:26', '2021-04-17 02:52:26'),
(4, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:27', '2021-04-17 02:52:27'),
(5, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:27', '2021-04-17 02:52:27'),
(6, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:27', '2021-04-17 02:52:27'),
(7, 'asfdasfasf', 'lastNamesfdsdf', '2021-04-17 02:52:27', '2021-04-17 02:52:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `manufacturer` varchar(255) COLLATE latin1_spanish_ci NOT NULL,
  `quantityDose` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `inmunityDate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `vaccines`
--

INSERT INTO `vaccines` (`id`, `productName`, `manufacturer`, `quantityDose`, `createdAt`, `updatedAt`, `inmunityDate`) VALUES
(1, 'Moderna', 'Moderna', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 15),
(2, 'Janssen', 'Janssen', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 10),
(3, 'Pfizer-BioNTech', 'Pfizer-BioNTech', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 14),
(4, 'AstraZeneca/COVISHIELD', 'AstraZeneca/COVISHIELD', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 18);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `patientdata`
--
ALTER TABLE `patientdata`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `patientdata`
--
ALTER TABLE `patientdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
