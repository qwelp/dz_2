<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$phone = $_POST['phone'];
$msg = $_POST['msg'];
$day = $_POST['day'];
$hours = $_POST['hours'];

//действия с данными

$message = '';
$message .= 'Имя: '.$name."\r\n";
$message .= 'Телефон: '.$phone."\r\n";
$message .= 'Комментарий: '.$msg."\r\n";
$message .= 'Время : '.$day.' часа : '.$hours.' минут';

sleep(1);

$result = true;

mail('qwelp@mail.ru', 'Заказан звонок', $message);

echo json_encode(array(
	'status' => $result,
	'dump' => $_POST
));

?>