<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Zbieranie danych z formularza
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $phone = htmlspecialchars($_POST['phone']);

    // Adres docelowy e-maila (Twój e-mail)
    $to = "konradjozefczyk@matematify.com";

    // Temat wiadomości
    $subject = "Nowa wiadomość z formularza kontaktowego";

    // Treść wiadomości
    $body = "Imię: $name\nEmail: $email\nWiadomość: $message\nNumer telefonu: $phone";

    // Nagłówki
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Wysyłka e-maila
    if (mail($to, $subject, $body, $headers)) {
        echo "Twoja wiadomość została wysłana!";
    } else {
        echo "Wystąpił problem z wysyłką wiadomości.";
    }
}
?>
