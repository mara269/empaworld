-- phpMyAdmin SQL Dump
-- version 4.6.5.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-10-2017 a las 21:16:47
-- Versión del servidor: 5.6.34
-- Versión de PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `angels`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `breakouts`
--

CREATE TABLE `breakouts` (
  `id_breakout` int(11) NOT NULL,
  `name_breakout` varchar(255) NOT NULL,
  `available` int(11) NOT NULL,
  `occupied` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `breakouts`
--

INSERT INTO `breakouts` (`id_breakout`, `name_breakout`, `available`, `occupied`, `total`) VALUES
(1, 'bo1', 6, 39, 45),
(2, 'bo2', 17, 28, 45),
(3, 'bo3', 0, 45, 45),
(4, 'bo4', 21, 24, 45),
(5, 'bo5', 4, 41, 45),
(6, 'bo6', 24, 21, 45),
(7, 'bo7', 1, 44, 45),
(8, 'bo8', 15, 30, 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_pregunta`
--

CREATE TABLE `encuesta_pregunta` (
  `idencuesta_pregunta` int(11) NOT NULL,
  `pregunta` varchar(500) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `numero_encuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `encuesta_pregunta`
--

INSERT INTO `encuesta_pregunta` (`idencuesta_pregunta`, `pregunta`, `tipo`, `numero_encuesta`) VALUES
(1, 'nombre', 'abierta', 1),
(2, 'La calidad de los ponentes fue la esperada, fueron claros y ofrecieron información de importancia', 'opcion', 1),
(3, '¿Fueron claros los contenidos de las presentaciones? ', 'opcion', 1),
(4, '¿Aportaron valor a su práctica diaria?', 'opcion', 1),
(5, 'En general, ¿se cumplieron sus expectativas?', 'opcion', 1),
(6, 'Asistiría a otro evento organizado por Boehringer-Ingelheim:', 'opcion', 1),
(7, 'Nombre', 'no', 2),
(8, '¿Qué tan probable es que usted recomiende un evento de Boehringer-Ingelheim a sus colegas?', 'opion', 2),
(9, '¿El programa científico cubrió sus expectativas?', 'abierta', 2),
(10, '¿Al llegar al aeropuerto lo estaban esperando con el logo de Boehringer-Ingelheim México?', 'opcion', 2),
(11, 'A su llegada / salida ¿el transporte estuvo en el horario confirmado?', 'abierta', 2),
(12, '¿Encontro todo en orden con su reservación en el hotel a su llegada y con el check out a su salida?', 'opcion', 2),
(13, '¿Las instalaciones del hotel están en buenas condiciones?', 'abierta', 2),
(14, '¿La agencia Destinos atendió y dio repuesta a sus solicitudes?', 'abierta', 2),
(15, '¿Por favor nos podría compratir sus comentarios del evento en general?', 'abierta', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_respondio`
--

CREATE TABLE `encuesta_respondio` (
  `idencuesta_respondio` int(11) NOT NULL,
  `idencuesta_pregunta` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `opcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_respuesta`
--

CREATE TABLE `encuesta_respuesta` (
  `idencuesta_respuesta` int(11) NOT NULL,
  `idencuesta_pregunta` int(11) NOT NULL,
  `opcion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_usuario`
--

CREATE TABLE `encuesta_usuario` (
  `idencuesta_pregunta` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `idlogin` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `idnotas` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `nota` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tanger_live`
--

CREATE TABLE `tanger_live` (
  `idtanger_live` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL,
  `comentario` text,
  `estado` int(11) NOT NULL,
  `mostrada` int(11) DEFAULT '0',
  `presentacion` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `workplace` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `externo` int(11) NOT NULL,
  `send` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_breakouts`
--

CREATE TABLE `users_breakouts` (
  `users_id_user` int(11) NOT NULL,
  `breakouts_id_breakout` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `nombre` varchar(500) DEFAULT NULL,
  `correo` varchar(500) NOT NULL,
  `password` varchar(100) NOT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `nombre`, `correo`, `password`, `tipo`) VALUES
(1, 'raul', 'raul', '123', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_pregunta`
--

CREATE TABLE `voto_pregunta` (
  `idvoto_pregunta` int(11) NOT NULL,
  `nombre` varchar(500) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `estado` int(11) DEFAULT '0',
  `presentacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `voto_pregunta`
--

INSERT INTO `voto_pregunta` (`idvoto_pregunta`, `nombre`, `tipo`, `estado`, `presentacion`) VALUES
(1, '¿Que tratamiento antiagregante plaquetario coadyuvante daría?', 'caso1 Marko', 0, 6),
(2, '¿Qué esquemas anticoagulantes, podría dar?', 'caso1 Marko', 0, 6),
(3, '¿Algún tratamiento antiisquémico contraindicado o no adecuado?', 'caso1 Marko', 0, 6),
(4, 'Presento a los 90 min, disminución del ST de más del 50%, dolor precordial 1/10. ¿Cual es el siguiente paso?', 'caso1 Marko', 0, 6),
(5, 'Solicita traslado a Centro con sala de  hemodinámica, es aceptado. Pero se retrasa “una semana”. Continua asintomático cardiovascular y con disminución del ST de más del 50% ¿Cual es el siguiente paso?', 'caso1 Marko', 0, 6),
(6, '¿Qué esquemas anticoagulantes, podría dar?', 'caso2 Marko', 0, 6),
(7, '¿Que tratamiento antiagregante plaquetario coadyuvante daría?', 'caso2 Marko', 0, 6),
(8, '¿Cual es el siguiente paso?', 'caso2 Marko', 0, 6),
(9, '¿Qué porcentaje de pacientes no reperfunden con trombólisis?', 'caso2 Marko', 0, 6),
(10, 'Se reporta enfermedad trivascular con enfermedad de tronco coronario distal de 80% ¿Cual es el siguiente paso?', 'caso2 Marko', 0, 6),
(11, '¿Cuáles son los factores de riesgo cardiovascular MAYORES?', 'multiple', 0, 9),
(12, '¿Cuáles son los factores de riesgo cardiovascular MAYORES?', 'multiple', 0, 9);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voto_usuario`
--

CREATE TABLE `voto_usuario` (
  `idvoto_pregunta` int(11) NOT NULL,
  `idusuarios` int(11) NOT NULL,
  `idrespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `breakouts`
--
ALTER TABLE `breakouts`
  ADD PRIMARY KEY (`id_breakout`);

--
-- Indices de la tabla `encuesta_pregunta`
--
ALTER TABLE `encuesta_pregunta`
  ADD PRIMARY KEY (`idencuesta_pregunta`);

--
-- Indices de la tabla `encuesta_respondio`
--
ALTER TABLE `encuesta_respondio`
  ADD PRIMARY KEY (`idencuesta_respondio`),
  ADD KEY `FK_encuesta_resr` (`idencuesta_pregunta`);

--
-- Indices de la tabla `encuesta_respuesta`
--
ALTER TABLE `encuesta_respuesta`
  ADD PRIMARY KEY (`idencuesta_respuesta`),
  ADD KEY `fk_encuesta_respuesta_encuesta_pregunta1_idx` (`idencuesta_pregunta`);

--
-- Indices de la tabla `encuesta_usuario`
--
ALTER TABLE `encuesta_usuario`
  ADD PRIMARY KEY (`idencuesta_pregunta`,`idusuarios`),
  ADD KEY `fk_encuesta_pregunta_has_usuarios_usuarios1_idx` (`idusuarios`),
  ADD KEY `fk_encuesta_pregunta_has_usuarios_encuesta_pregunta1_idx` (`idencuesta_pregunta`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`idlogin`),
  ADD KEY `fk_login_usuarios1_idx` (`idusuarios`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD PRIMARY KEY (`idnotas`),
  ADD KEY `fk_notas_usuarios1_idx` (`idusuarios`);

--
-- Indices de la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  ADD PRIMARY KEY (`idtanger_live`),
  ADD KEY `fk_tanger_live_usuarios1_idx` (`idusuarios`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `users_breakouts`
--
ALTER TABLE `users_breakouts`
  ADD PRIMARY KEY (`users_id_user`,`breakouts_id_breakout`),
  ADD KEY `fk_users_has_breakouts_breakouts1_idx` (`breakouts_id_breakout`),
  ADD KEY `fk_users_has_breakouts_users_idx` (`users_id_user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`);

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
-- Indices de la tabla `voto_usuario`
--
ALTER TABLE `voto_usuario`
  ADD PRIMARY KEY (`idvoto_pregunta`,`idusuarios`),
  ADD KEY `fk_voto_pregunta_has_usuarios_usuarios1_idx` (`idusuarios`),
  ADD KEY `fk_voto_pregunta_has_usuarios_voto_pregunta1_idx` (`idvoto_pregunta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `breakouts`
--
ALTER TABLE `breakouts`
  MODIFY `id_breakout` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `encuesta_pregunta`
--
ALTER TABLE `encuesta_pregunta`
  MODIFY `idencuesta_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `encuesta_respondio`
--
ALTER TABLE `encuesta_respondio`
  MODIFY `idencuesta_respondio` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `encuesta_respuesta`
--
ALTER TABLE `encuesta_respuesta`
  MODIFY `idencuesta_respuesta` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `idlogin` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `notas`
--
ALTER TABLE `notas`
  MODIFY `idnotas` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  MODIFY `idtanger_live` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `voto_pregunta`
--
ALTER TABLE `voto_pregunta`
  MODIFY `idvoto_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `voto_respuesta`
--
ALTER TABLE `voto_respuesta`
  MODIFY `idvoto_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuesta_respondio`
--
ALTER TABLE `encuesta_respondio`
  ADD CONSTRAINT `FK_encuesta_resr` FOREIGN KEY (`idencuesta_pregunta`) REFERENCES `encuesta_pregunta` (`idencuesta_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `encuesta_respuesta`
--
ALTER TABLE `encuesta_respuesta`
  ADD CONSTRAINT `fk_encuesta_respuesta_encuesta_pregunta1` FOREIGN KEY (`idencuesta_pregunta`) REFERENCES `encuesta_pregunta` (`idencuesta_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `encuesta_usuario`
--
ALTER TABLE `encuesta_usuario`
  ADD CONSTRAINT `fk_encuesta_pregunta_has_usuarios_encuesta_pregunta1` FOREIGN KEY (`idencuesta_pregunta`) REFERENCES `encuesta_pregunta` (`idencuesta_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_encuesta_pregunta_has_usuarios_usuarios1` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `fk_login_usuarios1` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `fk_notas_usuarios1` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tanger_live`
--
ALTER TABLE `tanger_live`
  ADD CONSTRAINT `fk_tanger_live_usuarios1` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users_breakouts`
--
ALTER TABLE `users_breakouts`
  ADD CONSTRAINT `fk_users_has_breakouts_breakouts1` FOREIGN KEY (`breakouts_id_breakout`) REFERENCES `breakouts` (`id_breakout`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_has_breakouts_users` FOREIGN KEY (`users_id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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

--
-- Filtros para la tabla `voto_usuario`
--
ALTER TABLE `voto_usuario`
  ADD CONSTRAINT `fk_voto_pregunta_has_usuarios_usuarios1` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_voto_pregunta_has_usuarios_voto_pregunta1` FOREIGN KEY (`idvoto_pregunta`) REFERENCES `voto_pregunta` (`idvoto_pregunta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
