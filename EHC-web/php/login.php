<?php

function loggedin()
{
    if(isset($_SESSION['username'])  &&  !empty($_SESSION['username']))
        return true;
    else
        return false;
}

function getUserField($field)
{
    $query = "SELECT `$field` FROM `users` WHERE `username`='".$_SESSION['username']."'";
    if($query_run=mysql_query($query))
    {
        if($query_result=mysql_result($query_run,0,$field))
        {
            return $query_result;
        }
    }
}

function logout(){
	if(isset($_POST['username']) ) {
        $username = $_POST['username'];
    
        if (!empty($username)) {
			if(loggedin()){
				if($_SESSION['username'] == $username){
					session_destroy();
					return 200;
				} else {
					session_destroy();
					return 409;
				}
			}else {
				return 404;
			}
		}else {
			if(loggedin()){
				session_destroy();
				return 400;
			}else {
				return 400;
			}
		}
	}else {
		if(loggedin()){
			session_destroy();
			return 400;
		}else {
			return 400;
		}		
	}
}

function login_query($username, $password){
    $password_hash = md5($password);
    $query = "SELECT `username` FROM `users` WHERE `username` = '".mysql_real_escape_string($username)."'AND `password` = '".mysql_real_escape_string($password_hash)."'";

    if($query_run = mysql_query($query)) {
        $query_num_rows = mysql_num_rows($query_run);
        if($query_num_rows == 0) {
            return 401;
        }
        else if($query_num_rows == 1) {
            $user_id = mysql_result($query_run, 0, 'username');
            $_SESSION['username'] = $user_id;
            return 202;
        }
    }
}

function login() {	
	if(isset($_POST['username']) && isset($_POST['password']) ) {
        $username = $_POST['username'];
        $password = $_POST['password'];
    
        if (!empty($username)  && !empty($password)) {
            if(loggedin()){
                if($_SESSION['username'] == $username){
                    return 202;            
                } else {
                    logout();
                    return login_query($username, $password);
                }
            } else {
                return login_query($username, $password);
            }
        } else {
            return 400;
        }
    }
}
?>