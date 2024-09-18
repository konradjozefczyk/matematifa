<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Zbieranie danych z formularza i ich filtrowanie
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    $phone = htmlspecialchars(trim($_POST['phone']));

    // Walidacja adresu e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Nieprawidłowy adres email.";
        exit;
    }

    // Adres docelowy e-maila (Twój e-mail)
    $to = "konradjozefczyk@matematify.com";

    // Temat wiadomości
    $subject = "Nowa wiadomość z formularza kontaktowego";

    // Treść wiadomości
    $body = "Imię: $name\nEmail: $email\nWiadomość: $message\nNumer telefonu: $phone";

    // Nagłówki dla wiadomości do Ciebie
    $headers = "From: Formularz <no-reply@matematify.eu>\r\n"; // Adres nadawcy (Twoja domena)
    $headers .= "Reply-To: $email\r\n"; // Odpowiedź na adres e-mail użytkownika
    $headers .= "MIME-Version: 1.0\r\n"; // Ustawienie wersji MIME
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // Ustawienie typu treści na plain text
    $headers .= "Return-Path: no-reply@matematify.eu\r\n"; // Ustawienie ścieżki zwrotnej

    // Wysyłka e-maila do Ciebie
    if (mail($to, $subject, $body, $headers)) {
        echo "Twoja wiadomość została wysłana!";
    } else {
        echo "Wystąpił problem z wysyłką wiadomości.";
    }

    // Wysyłka e-maila do użytkownika
    $user_subject = "Dziękujemy za wypełnienie formularza na Matematify";
    $user_body = "Dzień dobry, \n\nDziękujemy za wypełnienie formularza na stronie www.matematify.eu.\nNasi doradcy skontaktują się z Tobą najszybciej jak to możliwe, najczęściej jest to do trzech godzin.\n\nPozdrawiamy,\nZespół Matematify";

    // Nagłówki dla wiadomości do użytkownika
    $user_headers = "From: Matematify <no-reply@matematify.eu>\r\n"; // Adres nadawcy (Twoja domena)
    $user_headers .= "MIME-Version: 1.0\r\n";
    $user_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Wysyłka e-maila do użytkownika
    mail($email, $user_subject, $user_body, $user_headers);
}
?>
