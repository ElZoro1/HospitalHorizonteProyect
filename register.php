<?php
// register.php

// Verificar si se recibió una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $rutOrPassport = $_POST['rut_or_passport'];

    // Conéctate a la base de datos
    $host = 'localhost'; // Cambia esto si es necesario
    $dbname = 'hospital_horizonte'; // Nombre de tu base de datos
    $username = 'root'; // Cambia esto por tu usuario de MySQL
    $password = ''; // Cambia esto por tu contraseña de MySQL

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Inserción en la base de datos en el campo rut_or_passport
        $stmt = $conn->prepare("INSERT INTO user_registrations (rut_or_passport, created_at) VALUES (:rut_or_passport, CURRENT_TIMESTAMP())");
        $stmt->bindParam(':rut_or_passport', $rutOrPassport);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se pudo registrar.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>
