-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 30-10-2017 a las 20:16:33
-- Versión del servidor: 5.5.42
-- Versión de PHP: 5.6.10

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
-- Estructura de tabla para la tabla `tanger_live`
--

CREATE TABLE `tanger_live` (
  `idtanger_live` int(11) NOT NULL,
  `comentario` text,
  `estado` int(11) NOT NULL,
  `mostrada` int(11) DEFAULT '0',
  `presentacion` int(11) DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tanger_live`
--

INSERT INTO `tanger_live` (`idtanger_live`, `comentario`, `estado`, `mostrada`, `presentacion`) VALUES
(1, '1', 0, 0, 1),
(2, '1', 0, 0, 1),
(3, 'hola perras', 0, 0, 1),
(4, 'hola de nuevo', 0, 0, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `voto_pregunta`
--

INSERT INTO `voto_pregunta` (`idvoto_pregunta`, `nombre`, `tipo`, `estado`, `breakout`, `presentacion`) VALUES
(1, '¿Que tratamiento antiagregante plaquetario coadyuvante daría?', 'caso1 Marko', 0, NULL, 6),
(2, '¿Qué esquemas anticoagulantes, podría dar?', 'caso1 Marko', 0, NULL, 6),
(3, '¿Algún tratamiento antiisquémico contraindicado o no adecuado?', 'caso1 Marko', 0, NULL, 6),
(4, 'Presento a los 90 min, disminución del ST de más del 50%, dolor precordial 1/10. ¿Cual es el siguiente paso?', 'caso1 Marko', 0, NULL, 6),
(5, 'Solicita traslado a Centro con sala de  hemodinámica, es aceptado. Pero se retrasa “una semana”. Continua asintomático cardiovascular y con disminución del ST de más del 50% ¿Cual es el siguiente paso?', 'caso1 Marko', 0, NULL, 6),
(6, '¿Qué esquemas anticoagulantes, podría dar?', 'caso2 Marko', 0, NULL, 6),
(7, '¿Que tratamiento antiagregante plaquetario coadyuvante daría?', 'caso2 Marko', 0, NULL, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_respondieron`
--

CREATE TABLE `voto_respondieron` (
  `idvoto_pregunta` int(11) NOT NULL,
  `idrespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `voto_respondieron`
--

INSERT INTO `voto_respondieron` (`idvoto_pregunta`, `idrespuesta`) VALUES
(1, 2),
(2, 12),
(3, 18),
(4, 21),
(5, 24),
(6, 28),
(7, 29);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_respuesta`
--

CREATE TABLE `voto_respuesta` (
  `idvoto_respuesta` int(11) NOT NULL,
  `idvoto_pregunta` int(11) NOT NULL,
  `opcion` varchar(500) DEFAULT NULL COMMENT '				',
  `respuesta` varchar(500) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `voto_respuesta`
--

INSERT INTO `voto_respuesta` (`idvoto_respuesta`, `idvoto_pregunta`, `opcion`, `respuesta`) VALUES
(1, 1, 'No, le daría más tiempo a las MEVs', '0'),
(2, 1, 'Sí, un inhibidor de a-glucosidasa', '0'),
(3, 1, 'Sí, un análogo de GLP-1', '0'),
(4, 1, 'Sí, un inhibidor DPP4', '0'),
(5, 1, 'Sí, un inhibidor de SGLT-2', '0'),
(6, 1, 'No, mejor añadiría insulina basal', '0'),
(7, 2, 'No por ahora; recomendaría MEV más estrictas', '0'),
(8, 2, 'Sí, fenofibrato', '0'),
(9, 2, 'Sí, ezetimibe', '0'),
(10, 2, 'Sí, niacina de liberación prolongada', '0'),
(11, 2, 'Sí, colesevelam', '0'),
(12, 2, 'Sí, i-PCSK9', '0'),
(13, 3, 'Se encuentra en estadio B de insuficiencia cardiaca, guía FACC/AHA 2013', '0'),
(14, 3, 'Se encuentra en estadio C de insuficiencia cardiaca, guía FACC/AHA 2013', '0'),
(15, 3, 'Tiene insuficiencia cardiaca con FE reducida', '0'),
(16, 3, 'Tiene insuficiencia cardiaca con FE preservada', '0'),
(17, 3, 'Está en clase funcional I de la NYHA', '0'),
(18, 3, 'No tiene insuficiencia cardiaca', '0'),
(19, 4, 'Los estudios experimentales no aplican a los humanos.', '0'),
(20, 4, 'Los estudios clínicos en fases tempranas son de muy corta duración.', '0'),
(21, 4, 'Los eventos adversos cardiovasculares no son iguales a los desenlaces cardiovasculares', '0'),
(22, 4, 'Los estudios a largo plazo permiten balancear el efecto favorable con posibles efectos adversos cardiovasculares', '0'),
(23, 5, 'Si, porque es un efecto de clase.', '0'),
(24, 5, 'No, porque se requiere un estudio para cada molecula.', '0'),
(25, 5, 'Depende.', '0'),
(26, 6, 'Si, porque es un efecto de clase.', '0'),
(27, 6, 'No, porque se requiere un estudio para cada molécula.', '0'),
(28, 6, 'No, porque hay diferencias en el mecanismo de acción de las moléculas.', '0'),
(29, 7, 'No, porque se logró equipoise ', '0'),
(30, 7, 'No, porque la diferencia entre los grupos fue mínima ', '0');

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  MODIFY `idtanger_live` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `voto_pregunta`
--
ALTER TABLE `voto_pregunta`
  MODIFY `idvoto_pregunta` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `voto_respuesta`
--
ALTER TABLE `voto_respuesta`
  MODIFY `idvoto_respuesta` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
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
