<?php

function getRecentBlogsFromDb($year, $month){
	$result = array("head" => array(), "body" => array() );
	$head = array("status" => "", "message" => "" );
	$body = array();
	$blog = array("title" => "", "date" => "", "author" => "", "post" => "");
    $month = mysql_real_escape_string($month);
    $year = mysql_real_escape_string($year);
    //last three month
    if($month == 0){
	    $query = "SELECT * FROM `blogs` WHERE ( `year` = '$year' AND `month` = '$month' ) OR ( `year` = '".(string)($year-1)."'AND (`month` = '11' OR `month` =  '10') )";
    }else if($month == 1){
        $query = "SELECT * FROM `blogs` WHERE ( `year` = '$year' AND (`month` = '$month' OR `month` =  '".(string)($month-1)."' ) ) OR ( `year` = '".(string)($year-1)."'AND `month` = '11' )";
    }else{
        $query = "SELECT * FROM `blogs` WHERE `year` = '$year' AND ( `month` = '$month' OR `month` =  '".(string)($month-1)."' OR `month` =  '".(string)($month-2)."')";
    }
    if($query_run = mysql_query($query)) {
        $query_num_rows = mysql_num_rows($query_run);
        if($query_num_rows == 0) {
            $head["status"] = 404;
        }
        else {
        	for($i = 0; $i < $query_num_rows ; $i++){
        		$blog["title"] = mysql_result($query_run, $i, 'Title');
        		$blog["date"]= mysql_result($query_run, $i, 'Date');
        		$blog["author"] = mysql_result($query_run, $i, 'Author');
        		$blog["post"] = mysql_result($query_run, $i, 'Post');

        		$body[$i] = $blog;
        	}

    	    $head["status"] = 200;

        }
    }else {
    $head["status"] = 400;
    }

    $result["head"] = $head;
    $result["body"] = $body;
    return $result;
}

function fetchRecentBlogs(){
	$result = array("head" => array(), "body" => array() );
	$head = array("status" => "", "message" => "" );
	$body = array();

	if(isset($_POST['year']) && isset($_POST['month']) ) {
        $year = $_POST['year'];
        $month = $_POST['month'];
        if (!empty($year) ) {//no need to check empty on month
        	if($month < 12){
	            $result = getRecentBlogsFromDb($year, $month);
	            return $result;
	        }//else badRequest
        } //else badRequest
    }//else badRequest

    $head["status"] = 400;
    $result["head"] = $head;
    $result["body"] = $body;
    return $result;
}

?>