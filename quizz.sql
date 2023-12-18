-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 18 déc. 2023 à 16:06
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `quizz`
--

-- --------------------------------------------------------

--
-- Structure de la table `bareme`
--

CREATE TABLE `bareme` (
  `idBareme` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `score` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

CREATE TABLE `candidats` (
  `idCandidat` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `dateNaissance` date NOT NULL,
  `login` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  `idNiveau` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `candidats`
--

INSERT INTO `candidats` (`idCandidat`, `name`, `lastname`, `dateNaissance`, `login`, `mdp`, `idNiveau`) VALUES
(1, 'Antoine', 'Griezman', '2000-01-01', 'Griezman.Antoine', '01012000', NULL),
(2, 'Paul', 'Pogba', '2000-02-01', 'Pogba.Paul', '01022000', NULL),
(3, 'Florian', 'Thauvin', '2000-03-01', 'Thauvin.Florian', '01032000', NULL),
(4, 'Hugo', 'Lloris', '2000-04-01', 'Lloris.Hugo', '01042000', NULL),
(5, 'Kylian', 'Mbappé', '2000-05-01', 'Mbappé.Kylian', '01052000', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

CREATE TABLE `niveau` (
  `idNiveau` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `idQuestion` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `answers1` varchar(255) NOT NULL,
  `answers2` varchar(255) NOT NULL,
  `answers3` varchar(255) DEFAULT NULL,
  `answers4` varchar(255) DEFAULT NULL,
  `answers5` varchar(255) DEFAULT NULL,
  `bonneAnswer` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`idQuestion`, `libelle`, `answers1`, `answers2`, `answers3`, `answers4`, `answers5`, `bonneAnswer`) VALUES
(1, 'Que veut dire faille XSS ?', 'extra-small-small', 'cross-iste-scripting', 'x-box-series-s', NULL, NULL, 2),
(2, 'Qu\'est ce qu\'un man in the middle ?', 'un milieu de terrain au football', 'un homme ni trop grand ni trop petit', 'une attaque qui a pour but d\'intercepter les communications entre 2 parties', 'la suite malcolm in the middle', NULL, 3),
(3, 'Qu\'est ce que la plateforme root me ?', 'groot qui aurait perdu son g', 'une plateforme de jardinage', 'une plateforme permettant à chacun de tester ses connaissances en cybersécurité', 'une plateforme d\'outils malveillants gratuits', NULL, 3),
(4, 'Qu\'est ce que Wannacry ?', 'un groupe de disco des années 70', 'le prochain jeu sur Playstation 6', 'un ransomware', 'une plateforme d\'outils de cyberattaque gratuits', NULL, 3),
(5, 'Qui a marqué 2 fois en finale de la coupe du monde 98 ?', 'zinedine zidane', 'emmanuel petit', 'christophe dugarry', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `idSession` int(6) NOT NULL,
  `dateSession` date NOT NULL,
  `ReponseDonnee` int(11) DEFAULT NULL,
  `idCandidat` int(11) DEFAULT NULL,
  `idQuestion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bareme`
--
ALTER TABLE `bareme`
  ADD PRIMARY KEY (`idBareme`);

--
-- Index pour la table `candidats`
--
ALTER TABLE `candidats`
  ADD PRIMARY KEY (`idCandidat`),
  ADD KEY `idNiveau` (`idNiveau`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`idNiveau`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`idQuestion`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`idSession`),
  ADD KEY `idCandidat` (`idCandidat`) USING BTREE,
  ADD KEY `idQuestion` (`idQuestion`) USING BTREE;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bareme`
--
ALTER TABLE `bareme`
  MODIFY `idBareme` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `candidats`
--
ALTER TABLE `candidats`
  MODIFY `idCandidat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `idNiveau` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `idSession` int(6) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `candidats`
--
ALTER TABLE `candidats`
  ADD CONSTRAINT `candidats_ibfk_1` FOREIGN KEY (`idNiveau`) REFERENCES `niveau` (`idNiveau`);

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`idCandidat`) REFERENCES `candidats` (`idCandidat`),
  ADD CONSTRAINT `session_ibfk_2` FOREIGN KEY (`idQuestion`) REFERENCES `questions` (`idQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
