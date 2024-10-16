<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Cargar el autoload de Composer

// Conexión a la base de datos (ajusta estos valores)
$conn = new mysqli('localhost', 'root', '', 'hospital_horizonte');
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => "Conexión fallida: " . $conn->connect_error]));
}

// Recibir datos del formulario
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    die(json_encode(['success' => false, 'message' => "No se recibieron datos válidos."]));
}

// Extraer datos
$patient_name = $data['name'];
$appointment_date = $data['date'];
$appointment_time = $data['time'];
$exam_type = $data['exam-type'];
$reason = $data['reason'];

// Log de datos recibidos (puedes ver esto en tu consola de PHP)
error_log("Datos recibidos: " . json_encode($data));

// Guardar en la base de datos
$stmt = $conn->prepare("INSERT INTO appointments (patient_name, appointment_date, appointment_time, exam_type, reason) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $patient_name, $appointment_date, $appointment_time, $exam_type, $reason);

// Verificar la ejecución de la inserción
if ($stmt->execute()) {
    // Configuración del servidor SMTP
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'sandbox.smtp.mailtrap.io';  // Servidor SMTP de Mailtrap
        $mail->SMTPAuth   = true;
        $mail->Username   = 'd14529eb210299';            // Usuario de Mailtrap
        $mail->Password   = '12193313d0e42f';            // Contraseña de Mailtrap
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Activar TLS
        $mail->Port       = 2525;                        // Puerto SMTP

        // Destinatarios
        $mail->setFrom('from@example.com', 'Hospital Horizonte'); // Cambia 'from@example.com' por tu dirección de correo
        $mail->addAddress('ingbakanes@hotmail.com', 'Nombre del Destinatario'); // Cambia el correo y nombre del destinatario

        // Contenido del correo
        $mail->isHTML(true);  // Establecer formato HTML
        $mail->Subject = 'Nueva cita agendada';
        $mail->Body    = "Se ha agendado una nueva cita:<br>
                          Nombre del paciente: $patient_name<br>
                          Fecha: $appointment_date<br>
                          Hora: $appointment_time<br>
                          Tipo de examen: $exam_type<br>
                          Motivo: $reason";
        $mail->AltBody = 'Detalles de la cita agendada: Nombre del paciente: ' . $patient_name . ', Fecha: ' . $appointment_date . ', Hora: ' . $appointment_time . ', Tipo de examen: ' . $exam_type . ', Motivo: ' . $reason;

        // Enviar el correo
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'La cita ha sido agendada y el correo ha sido enviado.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "No se pudo enviar el mensaje. Error: {$mail->ErrorInfo}"]);
    }
} else {
    // Mensaje de error detallado en caso de fallo
    echo json_encode(['success' => false, 'message' => 'Error al registrar la cita: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
