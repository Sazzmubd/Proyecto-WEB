-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2021 a las 17:37:45
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

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
-- Estructura de tabla para la tabla `anuncios`
--

CREATE TABLE `anuncios` (
  `imagen` longblob NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campos`
--

CREATE TABLE `campos` (
  `idCampos` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `campos`
--

INSERT INTO `campos` (`idCampos`, `id`, `color`) VALUES
(1, 2, 'red'),
(2, 3, 'orange'),
(3, 3, 'pink');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombreapellidosempresa` varchar(255) NOT NULL,
  `tipo` enum('empresa','particular') NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombreapellidosempresa`, `tipo`, `correo`, `telefono`) VALUES
(1, 'Francisco Esteve Cortes', 'empresa', 'fran@gmail.com', 63274823),
(2, 'Carlos Prieto Marinez', 'particular', 'carlosp@gmail.com', 637383883),
(3, 'Paco Sanz Gorriz', 'particular', 'paco@gmail.com', 63274822);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `esquinas`
--

CREATE TABLE `esquinas` (
  `idCampos` int(11) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `esquinas`
--

INSERT INTO `esquinas` (`idCampos`, `lat`, `lng`) VALUES
(1, 39.4295, -0.5613),
(1, 39.4286, -0.55051),
(1, 39.4186, -0.569585),
(1, 39.4141, -0.550895),
(2, 38.9956, -0.16627),
(2, 38.9956, -0.165789),
(2, 38.9963, -0.165747),
(2, 38.9961, -0.166115);

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
  `luminosidad` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mediciones`
--

INSERT INTO `mediciones` (`idSensor`, `idMedicion`, `humedad`, `salinidad`, `temperatura`, `luminosidad`, `fecha`) VALUES
(1, 1, 30.4, 10.9, 23.02, 1, '2021-05-26 06:00:00'),
(1, 2, 32.5, 13.9, 25.02, 2, '2021-05-26 10:00:00'),
(1, 3, 31.2, 12.4, 28.03, 2, '2021-05-26 14:00:00'),
(1, 4, 33.2, 11.4, 26.2, 1, '2021-05-26 18:00:00'),
(1, 5, 31.2, 12.8, 22.1, 0, '2021-05-26 22:00:00'),
(1, 6, 30.1, 13.2, 19.2, 0, '2021-05-27 02:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `idSensor` int(11) NOT NULL,
  `idCampos` int(11) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `estado` enum('activo','fallo') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`idSensor`, `idCampos`, `lat`, `lng`, `estado`) VALUES
(1, 1, 39.44, -0.619591, 'activo'),
(2, 1, 39.4185, -0.543725, 'activo'),
(3, 3, 38.9738, -0.188165, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idSolicitudes` int(11) NOT NULL,
  `nombreApellidosEmpresa` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` int(9) NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `provincia` varchar(255) NOT NULL,
  `fechasolicitud` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idSolicitudes`, `nombreApellidosEmpresa`, `tipo`, `correo`, `telefono`, `motivo`, `provincia`, `fechasolicitud`) VALUES
(22, 'aaaaaaaaaaaaaaaaaaa', 'Particular', 'mmmmmmmmmmmmmmmmmmmm', 65556493, 'mmmmmmmmmmmmmmmmmmmmm', 'mmmmmmmmmmmmmmmmmm', '2021-05-25'),
(23, 'qqqqqqqqqqqqqqq', 'Particular', 'qqqqqqqqqqqqqqq', 65556493, 'qqqqqqqqqqqqqqqq', 'qqqqqqqqqqqqq', '2021-05-25'),
(24, 'iiiiiiiiiiiii', 'Particular', 'iiiiiiiiiiii', 65556493, 'iiiiiiiiiiiii', 'iiiiiiiiiiiiiiiiiiii', '2021-05-25'),
(25, '333333333333', 'Particular', '33333333333', 0, '33333333333', '33333333333333', '2021-05-28'),
(26, 'yyyyyyyyyyyyy', 'Particular', 'yyyyyyyyyyyyyyyy', 65556493, 'yyyyyyyyyyyyyyyyyyyy', 'yyyyyyyyyyyyyyyyyyy', '2021-06-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasenya` int(11) NOT NULL,
  `rol` enum('admin','normal') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `idUsuario`, `nombre`, `contrasenya`, `rol`) VALUES
(1, 1, 'admin', 1234, 'admin'),
(2, 2, 'usuario1', 1234, 'normal'),
(3, 3, 'usuario2', 1234, 'normal');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `esquinas`
--
ALTER TABLE `esquinas`
  ADD KEY `idCampos` (`idCampos`);

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
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anuncios`
--
ALTER TABLE `anuncios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `campos`
--
ALTER TABLE `campos`
  MODIFY `idCampos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mediciones`
--
ALTER TABLE `mediciones`
  MODIFY `idMedicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `idSensor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idSolicitudes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `campos`
--
ALTER TABLE `campos`
  ADD CONSTRAINT `campos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `clientes` (`id`);

--
-- Filtros para la tabla `esquinas`
--
ALTER TABLE `esquinas`
  ADD CONSTRAINT `esquinas_ibfk_1` FOREIGN KEY (`idCampos`) REFERENCES `campos` (`idCampos`);

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
