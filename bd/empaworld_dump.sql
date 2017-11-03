-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 03-11-2017 a las 10:27:55
-- Versión del servidor: 5.6.35
-- Versión de PHP: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empaworld`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `surveys`
--

CREATE TABLE `surveys` (
  `id_survey` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `p_1` varchar(255) NOT NULL,
  `p_2` varchar(255) NOT NULL,
  `p_3` varchar(255) NOT NULL,
  `p_4` varchar(255) NOT NULL,
  `p_5` varchar(255) NOT NULL,
  `p_6` varchar(255) NOT NULL,
  `p_7` varchar(255) NOT NULL,
  `p_8` varchar(255) NOT NULL,
  `p_9` varchar(255) NOT NULL,
  `p_10` varchar(255) NOT NULL,
  `p_11` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tanger_live`
--

CREATE TABLE `tanger_live` (
  `idtanger_live` int(11) NOT NULL,
  `comentario` text,
  `estado` int(11) NOT NULL,
  `mostrada` int(11) DEFAULT '0',
  `presentacion` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_pregunta`
--

CREATE TABLE `voto_pregunta` (
  `idvoto_pregunta` int(11) NOT NULL,
  `nombre` varchar(500) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` int(11) DEFAULT '0',
  `breakout` int(11) DEFAULT NULL,
  `presentacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_respondieron`
--

CREATE TABLE `voto_respondieron` (
  `idvoto_pregunta` int(11) NOT NULL,
  `idrespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_respuesta`
--

CREATE TABLE `voto_respuesta` (
  `idvoto_respuesta` int(11) NOT NULL,
  `idvoto_pregunta` int(11) NOT NULL,
  `opcion` varchar(500) DEFAULT NULL COMMENT '				',
  `respuesta` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id_survey`);

--
-- Indices de la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  ADD PRIMARY KEY (`idtanger_live`);

--
-- Indices de la tabla `voto_pregunta`
--
ALTER TABLE `voto_pregunta`
  ADD PRIMARY KEY (`idvoto_pregunta`);

--
-- Indices de la tabla `voto_respondieron`
--
ALTER TABLE `voto_respondieron`
  ADD KEY `fk_algo` (`idvoto_pregunta`);

--
-- Indices de la tabla `voto_respuesta`
--
ALTER TABLE `voto_respuesta`
  ADD PRIMARY KEY (`idvoto_respuesta`),
  ADD KEY `fk_voto_respuesta_voto_pregunta_idx` (`idvoto_pregunta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id_survey` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  MODIFY `idtanger_live` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `voto_pregunta`
--
ALTER TABLE `voto_pregunta`
  MODIFY `idvoto_pregunta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `voto_respuesta`
--
ALTER TABLE `voto_respuesta`
  MODIFY `idvoto_respuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `voto_respondieron`
--
ALTER TABLE `voto_respondieron`
  ADD CONSTRAINT `fk_algo` FOREIGN KEY (`idvoto_pregunta`) REFERENCES `voto_pregunta` (`idvoto_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `voto_respuesta`
--
ALTER TABLE `voto_respuesta`
  ADD CONSTRAINT `fk_voto_respuesta_voto_pregunta` FOREIGN KEY (`idvoto_pregunta`) REFERENCES `voto_pregunta` (`idvoto_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
