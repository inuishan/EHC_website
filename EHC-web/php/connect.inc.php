<?php
$conn_error = 'could not connect';
$mysql_host = 'localhost';
$mysql_user = 'root';
$mysql_pass = '';
$mysql_db = 'ehc_website';

if(@! mysql_connect($mysql_host,$mysql_user,$mysql_pass) || @! mysql_select_db($mysql_db))  //i think their must be and
    die($conn_error.mysql_error());
// else {
	// echo "string";
// }

?>

