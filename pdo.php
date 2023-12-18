<?php
// Connexion à la base de données
$pdo = new PDO('mysql:host=localhost;dbname=quizz', 'root', '');

// Récupération des données JSON
$data = json_decode(file_get_contents('php://input'), true);

// Extraction des données
$candidateId = $data['candidateId'];
$sessionId = $data['sessionId'];
$score = $data['score'];

// Préparation de la requête SQL
$query = $pdo->prepare("INSERT INTO participer (idCandidat, idSession, dateSession, scorePoint) VALUES (:candidateId, :sessionId, CURDATE(), :score)");
$query->bindParam(':candidateId', $candidateId);
$query->bindParam(':sessionId', $sessionId);
$query->bindParam(':score', $score);

// Exécution de la requête
$query->execute();

// Réponse au client
echo json_encode(['status' => 'success']);
?>
