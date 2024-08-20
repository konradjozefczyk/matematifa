<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ustawienia e-maila
    $to = "konradjozefczyk@matematify.com";  // Zmień to na swój adres e-mail
    $subject = "Nowa wiadomość z formularza kontaktowego";

    // Pobierz dane z formularza
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subjectField = htmlspecialchars($_POST['subject']);
    $level = htmlspecialchars($_POST['level']);
    $type = htmlspecialchars($_POST['type']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Zbuduj treść wiadomości
    $body = "Otrzymałeś nową wiadomość z formularza kontaktowego:\n\n";
    $body .= "Imię: $name\n";
    $body .= "Email: $email\n";
    $body .= "Numer telefonu: $phone\n";
    $body .= "Przedmiot: $subjectField\n";
    $body .= "Poziom: $level\n";
    $body .= "Rodzaj zajęć: $type\n";
    $body .= "Wiadomość:\n$message\n";

    // Nagłówki e-maila
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Wyślij e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Wiadomość została wysłana.";
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości.";
    }
} else {
    echo "Nieprawidłowa metoda żądania.";
}
?>
