<?php

function bookRoom(){
	$result = array("head" => array(), "body" => array() );
	$head = array("status" => "", "message" => "" );
	$body = array();
	
	$data = json_decode($_POST['data']);
	
	if (  isset($data["name"]) && !empty($data["name"]) && isset($data["email"]) && !empty($data["email"]) && isset($data["phone"]) && !empty($data["phone"]) && isset($data["nperson"]) && !empty($data["nperson"]) && isset($data["date"]) && !empty($data["date"]) && isset($data["time_from"]) && !empty($data["time_from"]) && isset($data["time_upto"]) && !empty($data["time_upto"]) && isset($data["reason"]) && !empty($data["reason"])  )
	{
		
		//open config file and see issuer no.
		$issuer = 1;
	
		$query = "INSERT INTO `roomissue` VALUES(".mysql_real_escape_string($data["name"]).",".mysql_real_escape_string($data["email"]).",".mysql_real_escape_string($data["phone"]).",".mysql_real_escape_string($data["nperson"]).",".mysql_real_escape_string($data["date"]).",".mysql_real_escape_string($data["time_from"]).",".mysql_real_escape_string($data["time_upto"]).",".mysql_real_escape_string($data["reason"]).",".mysql_real_escape_string($issuer).")";
		
		if($query_run = mysql_query($query)) {
			//if_ok then send mail to ehc, room_issuer, user
			$head["status"] = 200;
		}else {
			$head["status"] = 400;
		}
	}
	
    $result["head"] = $head;
    $result["body"] = $body;
    return $result;

}

?>