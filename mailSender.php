<?php
// Includo il file di autoloading di Composer
require 'vendor/autoload.php';

// configurazione cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// carichiamo le variabili d'ambiente attraverso  la libreria vlucas/phpdotenv
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Crea un'istanza di PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Ricevi i dati JSON dall'input POST
$emailsJSON = file_get_contents('php://input');

// Decodifica il JSON in un array PHP
$emails = json_decode($emailsJSON, true);

$mail = new PHPMailer(true); // True abilita le eccezioni

foreach ($emails as $email) {

    // Configura il server SMTP
    // La mia prova è stata fatta con Gmail
    $mail->isSMTP(); 
    $mail->Host = $_ENV['SMTP_HOST']; // Indirizzo del server SMTP di Gmail
    $mail->SMTPAuth = true; // Abilita l'autenticazione SMTP
    $mail->Username = $_ENV['SMTP_USERNAME']; // Indirizzo email completo di Gmail
    $mail->Password = $_ENV['SMTP_PASSWORD']; // Password del tuo account Gmail
    $mail->SMTPSecure = 'tls'; // Tipo di crittografia, TLS è consigliato
    $mail->Port = $_ENV['SMTP_PORT']; // Porta SMTP per Gmail
    
    // Configura mittente
    $mail->setFrom($_ENV['SENDER_ADDRESS'], $_ENV['NAME_SENDER']); // Indirizzo email mittente
    
    // Configura il contenuto dell'email
    $mail->isHTML(true); // Abilita il supporto HTML
    $mail->Subject = $email["object"]; // Oggetto dell'email
    $mail->Body = $email["description"]; // Corpo dell'email

    // Aggiungi il destinatario
    $mail -> addAddress($email["email"]);

    // Invia l'email
    if (!$mail -> send()) {
        echo "Errore nell'invio della mail a " . $email["email"] . ": " . $mail -> ErrorInfo . "<br>";
    } else {
        echo "Email inviata a " . $email["email"] . "<br>";
    }

    // Cancella il destinatario per la prossima email
    $mail->clearAddresses();

}
?>