<%@ page import="javax.servlet.*, javax.servlet.http.*" %>
<%        
	session.invalidate();
%>
<!-- source from jadrn000/login.html-->
<!-- source from http://cssdeck.com/labs/ryn8lp74-->
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<script src="/jquery/jquery.js"></script>
<script src="/jquery/jQueryUI.js"></script>    
<script type="text/javascript">
if(!navigator.cookieEnabled) {
	alert("Cookies are disabled in your browser. " +
	      "You must enable cookies to use this application.");
	}
$(document).ready(
	function() 
  	{
  		$('#username').focus();
	}
);  
</script>

<meta charset="utf-8">
<link rel="stylesheet" href="/jadrn005/proj2/css/login.css">	
</head>
<body background>
	<h1>Welcome to Dazzle!!!</h1><br/>
	<div id="login">
		<h2>Sign In</h2>
		<form action="/jadrn005/servlet/login" method="POST" id="form">
			<label for="username">Username</label>
			<p><input type="text" name="username" id="username" value="Username" onBlur="if(this.value=='')this.value='Username'" onFocus="if(this.value=='Username')this.value=''"></input><br></p>
			<p><label for="password">Password</label></p>
			<p><input type="password" name="password" id="password" value="password" onBlur="if(this.value=='')this.value='password'" onFocus="if(this.value=='password')this.value=''"></input><br><p/>
			<p><input type="submit" name="submit" id="submit" value="Log In"></input></p>
			<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You have successfully logged out.</p>
		</form>
	</div>

</body>
</html>
