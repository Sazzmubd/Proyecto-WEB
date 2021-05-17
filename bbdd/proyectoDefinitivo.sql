-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2021 a las 20:01:49
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campos`
--

CREATE TABLE `campos` (
  `idCampos` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `esquinas` float NOT NULL,
  `color` varchar(255) NOT NULL,
  `poligonoLatitud` float NOT NULL,
  `poligonoLongitud` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombreApellidosEmpresa` varchar(255) NOT NULL,
  `tipo` enum('empresa','particular') NOT NULL,
  `e-mail` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombreApellidosEmpresa`, `tipo`, `e-mail`, `telefono`) VALUES
(1, 'Francisco Esteve Cortes', 'empresa', 'fran@gmail.com', 63274823),
(2, 'Carlos Prieto Marinez', 'particular', 'carlosp@gmail.com', 637383883);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mediciones`
--

CREATE TABLE `mediciones` (
  `idSensor` int(11) NOT NULL,
  `idMedicion` int(11) NOT NULL,
  `humedad` float NOT NULL,
  `salinidad` float NOT NULL,
  `temperatura` float NOT NULL,
  `Luminosidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `idSensor` int(11) NOT NULL,
  `idCampos` int(11) NOT NULL,
  `latitud` float NOT NULL,
  `longitud` float NOT NULL,
  `estado` enum('activo','fallo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitudes` int(11) NOT NULL,
  `nombreApellidosEmpresa` varchar(255) NOT NULL,
  `tipo` enum('empresa','paricular') NOT NULL,
  `e-mail` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `rol` enum('admin','normal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contrasenya`, `rol`) VALUES
(1, 'admin', '1234', 'admin'),
(2, 'usuario1', '1234', 'normal');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campos`
--
ALTER TABLE `campos`
  ADD PRIMARY KEY (`idCampos`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD PRIMARY KEY (`idMedicion`),
  ADD KEY `idSensor` (`idSensor`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`idSensor`),
  ADD KEY `idCampos` (`idCampos`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idSolicitudes`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campos`
--
ALTER TABLE `campos`
  MODIFY `idCampos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  MODIFY `idMedicion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `idSensor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitudes` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `campos`
--
ALTER TABLE `campos`
  ADD CONSTRAINT `campos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `mediciones`
--
ALTER TABLE `mediciones`
  ADD CONSTRAINT `mediciones_ibfk_1` FOREIGN KEY (`idSensor`) REFERENCES `sensor` (`idSensor`);

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`idCampos`) REFERENCES `campos` (`idCampos`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
