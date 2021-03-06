<!--source http://www.journaldev.com/1907/java-servlet-session-management-tutorial-with-examples-of-cookies-httpsession-and-url-rewriting-->
<%@ page import="javax.servlet.*, javax.servlet.http.*" %>
<%
	if(session.getAttribute("user")==null)
	{
		response.sendRedirect("/jadrn005/login.html");
	}
%>	    

<!DOCTYPE html>
<html>
<head>
<script type="text/javascript">
history.go(1);
</script>
	<meta charset="utf-8">
	<link rel="stylesheet" href="/jadrn005/proj2/css/tabs.css">
	<link rel="stylesheet" href="/jadrn005/proj2/css/forms.css">
	<script src="/jquery/jquery.js"></script>
   	<script src="/jquery/jQueryUI.js"></script>    
	<script src="/jadrn005/proj2/js/inventoryIn.js"></script>
	<script src="/jadrn005/proj2/js/inventoryOut.js"></script>
</head>
<body>

<h2 id="heading">Dazzle!!!</h2>
<a href="/jadrn005/proj2/jsp/logout.jsp">
<input type="button" name="logout" id="logout" value="Logout"></input></a>
	<div id="tabs">
      		<ul>
        		<li id="first_tab"><a id="first"href="#t1">Inventory in</a></li>
        		<li id="second_tab"><a id="sec" href="#t2">Inventory out</a></li>
      		</ul>
      		<div id="t1">
      			<form name="inventoryIn" 
				id="inventoryIn" 
				method="GET" 
				action="">
				<br>
				
			   	<div id="message_line1"></div>
			   	<div id="message_line2"></div>
			   	<div id="message_line3"></div>	
				<table name="in" id="in">
					<tr>
						<td><label for="sku">SKU: </label></td>
						<td class="alt"><input type="text" name="sku" id="sku"></input>
						<input type="button" name="get_info" id="get_info" value="Get Info">&nbsp;&nbsp;
						<img src="/~jadrn005/proj1/foo/busy_wait.gif" height="20" width="20" id="busy_wait">&nbsp;</img></td>
					</tr>
					<tr>
						<td><label for="date">Date: </label></td>
						<td class="alt"><input type="date" name="date" id="date"></input></td>
					</tr><tr>
						<td><label for="quantity">Quantity: </label></td>
						<td class="alt"><input type="text" name="quantity" id="quantity"></input></td>
					</tr>
					<tr>
						<td><label for="category" id="cat_label">Category: </label></td>
						<td class="alt"><select name="category" id="category"></select></td>
					</tr>
					<tr>
						<td><label for="vendor" >Vendor: </label></td>
						<td class="alt"><select name="vendor" id="vendor"></select></td>
					</tr><tr>
						<td><label for="manu_Id">Manufacturer's Id: </label></td>
						<td class="alt"><input type="text" name="manu_id" id="manu_id"></input></td>
					</tr><tr>
						<td><label for="desc">Product Description: </label></td>
						<td class="alt"><textarea name="desc" id="desc" rows="4" cols="50"></textarea></td>
					</tr><tr>
						<td><label for="feature">Product Feature: </label></td>
						<td class="alt"><textarea name="feat" id="feat" rows="4" cols="50"></textarea></td>
					</tr><tr>
						<td><label for="cost">Product Cost: </label></td>
						<td class="alt"><input type="text" name="cost" id="cost"></input></td>
					</tr><tr>
						<td><label for="retail">Retail Price: </label></td>
						<td class="alt"><input type="text" name="retail" id="retail"></input></td>
					</tr><tr>
						<td><label for="image">Product Image: </label></td>
						<td class="alt"><div id = "pic"></td>
					</tr><tr>
						<td><input type="reset" name="clear" id="clear" value="Clear Form"></input></td>
						<td class="alt"><input type="submit" name="submit" id='submit' value="Submit"></input></td>
					</tr>
				</table>
				<h2 id="status"></h2>
        </form>
		</div>
		<div id="t2">
			<form name="inventoryOut" 
				id="inventoryOut" 
				method="GET" 
				action="">
				<br>
				
			   	<div id="o_message_line1"></div>
			   	<div id="o_message_line2"></div>
			   	<div id="o_message_line3"></div>	
				<table name="out" id="out">
					<tr>
						<td><label for="o_sku">SKU: </label></td>
						<td class="alt"><input type="text" name="o_sku" id="o_sku"></input>
						<input type="button" name="o_get_info" id="o_get_info" value="Get Info">&nbsp;&nbsp;
						<img src="/~jadrn005/proj1/foo/busy_wait.gif" height="20" width="20" id="o_busy_wait">&nbsp;</img></td>
					</tr>
					<tr>
						<td><label for="o_date">Date: </label></td>
						<td class="alt"><input type="date" name="o_date" id="o_date"></input></td>
					</tr><tr>
						<td><label for="o_quantity">Quantity: </label></td>
						<td class="alt"><input type="text" name="o_quantity" id="o_quantity"></input></td>
					</tr>
					<tr>
						<td><label for="o_category" id="o_cat_label">Category: </label></td>
						<td class="alt"><select name="o_category" id="o_category"></select></td>
					</tr>
					<tr>
						<td><label for="o_vendor" >Vendor: </label></td>
						<td class="alt"><select name="o_vendor" id="o_vendor"></select></td>
					</tr><tr>
						<td><label for="o_manu_Id">Manufacturer's Id: </label></td>
						<td class="alt"><input type="text" name="o_manu_id" id="o_manu_id"></input></td>
					</tr><tr>
						<td><label for="o_desc">Product Description: </label></td>
						<td class="alt"><textarea name="o_desc" id="o_desc" rows="4" cols="50"></textarea></td>
					</tr><tr>
						<td><label for="o_feature">Product Feature: </label></td>
						<td class="alt"><textarea name="o_feat" id="o_feat" rows="4" cols="50"></textarea></td>
					</tr><tr>
						<td><label for="o_cost">Product Cost: </label></td>
						<td class="alt"><input type="text" name="o_cost" id="o_cost"></input></td>
					</tr><tr>
						<td><label for="o_retail">Retail Price: </label></td>
						<td class="alt"><input type="text" name="o_retail" id="o_retail"></input></td>
					</tr><tr>
						<td><label for="o_image">Product Image: </label></td>
						<td class="alt"><div id = "o_pic"></td>
					</tr><tr>
						<td><input type="reset" name="o_clear" id="o_clear" value="Clear Form"></input></td>
						<td class="alt"><input type="submit" name="o_submit" id='o_submit' value="Submit"></input></td>
					</tr>
				</table>
				<h2 id="o_status"></h2>
        </form>
		</div>
    	</div>
</body>
</html>
