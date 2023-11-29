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
if(!empty($_POST['area'])){
	$message .= "Планируемая площадь будущего дома в м2: " . $_POST['area'] . '</br>';
}
if(!empty($_POST['floor'])){
	$message .= "Планируемое количество этажей: " . $_POST['floor'] . '</br>';
}

if(!empty($_POST['project'])){
	$message .= "Тип проекта: " . $_POST['project'] . '</br>';
}
if(!empty($_POST['reconstruction-1']) || !empty($_POST['reconstruction-2']) || !empty($_POST['reconstruction-3']) || !empty($_POST['reconstruction-4'])){
	$message .= 'Что планируется в доме?' . '</br>';
	if(!empty($_POST['reconstruction-1'])){
		$message .= '- ' . $_POST['reconstruction-1'] . '; ';
	}
	if(!empty($_POST['reconstruction-2'])){
		$message .= '- ' $_POST['reconstruction-2'] . '; ';
	}
	if(!empty($_POST['reconstruction-3'])){
		$message .= '- ' $_POST['reconstruction-3'] . '; ';
	}
	if(!empty($_POST['reconstruction-4'])){
		$message .= '- ' $_POST['reconstruction-4'] . '; ';
	}
	$message .= '</br>';
}
if(!empty($_POST['type-roof'])){
	$message .= "Тип кровли: " . $_POST['type-roof'] . '</br>';
}

$message .= "Ваш номер телефона: " . $_POST['phone'] . '</br>';

$pagetitle = "Новая заявка с нашего сайта " . $sitename;

if(mail($recepient, $pagetitle, $message, $headers)){
	echo 'Успешно отправлено!';
} else {
	echo 'Отправка не удалась!';
}