<?php
// Includi il file di autoloading di Composer
require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// carichiamo le variabili d'ambiente attraverso  la libreria vlucas/phpdotenv
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Crea un'istanza di PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Ottieni gli indirizzi email dall'array $_POST
//$emails = $_POST['emails'];

//$data = json_decode(file_get_contents('php://input'), true);

$arrayRicevuto = $_POST['emails'];
$allEmails = [];

$mail = new PHPMailer(true); // True abilita le eccezioni

foreach ($arrayRicevuto as $email) {

    //$allEmails[] = $email;


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
    $mail->setFrom('eros.sav@gmail.com', 'Eros'); // Indirizzo email mittente
    
    // Configura il contenuto dell'email
    $mail->isHTML(true); // Abilita il supporto HTML
    $mail->Subject = 'Test Email'; // Oggetto dell'email
    $mail->Body = 'Questo è un test di invio email con PHPMailer!'; // Corpo dell'email

    // Aggiungi il destinatario
    $mail -> addAddress($email);

    // Invia l'email
    if (!$mail -> send()) {
        echo "Errore nell'invio della mail a " . $email . ": " . $mail -> ErrorInfo . "<br>";
    } else {
        echo "Email inviata a " . $email . "<br>";
    }

    // Cancella il destinatario per la prossima email
    $mail->clearAddresses();

}
//var_dump($allEmails);

?>