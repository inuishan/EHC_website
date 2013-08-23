$(document).ready(function(){
	////////////////////////_____LOGIN________////////////////////////////

	if(isLoggedIn()){
		loginInterfaceToLogout();
	}
	
	$("#bar a").click(function(){ 
		if( $(this).find('h1#logInOut').text() == 'LOGIN' ){
			event.preventDefault();
			$("#LoginMenu, #siteLogin").fadeIn('slow');
		}else if( $(this).find('h1#logInOut').text() == 'LOGOUT' ){
			logout();
			logoutInterfaceToLogin();
		}
	});
	
	$("#siteLogin").click(function(e) {
        event.preventDefault();
		$("#LoginMenu, #siteLogin").fadeOut('slow');
	});
	
	$('#loginButton').click(function(e) {
		if( $('#LoginMenu').find('form')[0].checkValidity() ){ //writing 0 is of utter importance as find return collection of node instead we need a node
			login();
						
		} else {
			alert($('#LoginMenu').find('form')[0].checkValidity());
			//$('#LoginMenu').find('form')[0].submit();
		}
	});
});

function sendLoginRqst(){
	$.post("php/api.php", {method : 'login', username :$('#LoginMenu').find('form').find('input').eq(0).val() , password : $('#LoginMenu').find('form').find('input').eq(1).val()},function(retData){
		//alert(retData.head.status + retData.body.username);
		if(retData.head.status == 202){//accepted
			setCookie('username',retData.body.username);
			setCookie('fullname',retData.body.fullname);
			
			loginInterfaceToLogout();
			
		}else if(retData.head.status == 401){//unauthorized
			//wrong username or password
		}else if(retData.head.status == 400){//bad request
			//form not completly filled
		}
	}, "json");	
}

function loginInterfaceToLogout(){
	$("#LoginMenu, #siteLogin").fadeOut('slow');
	$('#bar a h1#hiUser').css('display', 'block');
	$('#bar a h1#hiUser').text('Hi, ' + getCookie('fullname'));
	$('#bar a h1#logInOut').text('LOGOUT');
}
function logoutInterfaceToLogin(){
	$('#bar a h1#hiUser').css('display', 'none');
	$('#bar a h1#logInOut').text('LOGIN');	
}
function logout(){
	if(!getCookie('username')){//not loggedIn	
	
	}
	else {//logged in
		$.post("php/api.php", {method : 'logout', username : getCookie('username')},function(retData){
			//alert(retData.head.status);
			if(retData.head.status == 200){//OK
				setCookie('username','',-1);
				setCookie('fullname','',-1);
			}else if(retData.head.status == 404){//not found, not logged in at server
				//
			}else if(retData.head.status == 409){//Conflict, Logged in at server with another account
				//form not completly filled
			}else if(retData.head.status == 400){//bad request
				//form not completly filled
			}
		}, "json");
	}
}

function login(){
	if(!getCookie('username')){//not loggedIn	
		sendLoginRqst();
	}
	else {
		if(getCookie('username') == $('#LoginMenu').find('form').find('input').eq(0).val()){//already loggedIn

			loginInterfaceToLogout();

		}else {//already logged in with other account
			logout();
			sendLoginRqst();
		}
	}	
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	//document.cookie=c_name + "=" + value;
}

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function isLoggedIn(){
	if(getCookie('username'))
		return true;
	else
		return false;
}