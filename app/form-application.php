<?php

$recepient = "zhilin_lesha@tut.by";
$sitename = "проектдома.бел";
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: проектдома.бел <postmaster@xn--80ahculiddjx.xn--90ais>\r\n";

$message = '';
if(!empty($_POST['name-form'])){
	$message .= "Заявка с формы: " . $_POST['name-form'] . '</br>';
}
if(!empty($_POST['name'])){
	$message .= "Ваше имя: " . $_POST['name'] . '</br>';
}
$message .= "Ваш номер телефона: " . $_POST['phone'] . '</br>';

$pagetitle = "Новая заявка с нашего сайта " . $sitename;

if(mail($recepient, $pagetitle, $message, $headers)){
	echo 'Успешно отправлено!';
} else {
	echo 'Отправка не удалась!';
}