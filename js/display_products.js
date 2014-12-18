$(document).ready(function() 
{
	$.post("/jadrn005/servlet/fetch_necklace",display_necklaces);
	$.post("/jadrn005/servlet/fetch_bracelets",display_bracelets);
	$.post("/jadrn005/servlet/fetch_earring",display_earrings);
	$.post("/jadrn005/servlet/fetch_rings",display_rings);
	$.post("/jadrn005/servlet/fetch_watches",display_watches);
	function display_necklaces(response)
	{
		var answer = getHTML(response);
		$('#necklace_display').html(answer);
		$('#necklace_body').html(answer);
	}
	function display_bracelets(response)
	{
		//alert(response);
		var answer = getHTML(response);
		$('#bracelet_display').html(answer);
		$('#bracelet_body').html(answer);
	}
	function display_earrings(response)
	{
		//alert(response);
		var answer = getHTML(response);
		$('#earrings_display').html(answer);
		$('#earrings_body').html(answer);
	}
	function display_watches(response)
	{
		//alert(response);
		var answer = getHTML(response);
		$('#watches_display').html(answer);
		$('#watches_body').html(answer);
	}
	function display_rings(response)
	{
		//alert(response);
		var answer = getHTML(response);
		$('#rings_display').html(answer);
		$('#rings_body').html(answer);
	}
	function getHTML(response)
	{
		//alert("hi");
		var records = new Array();    
    	records = response.split("||");
    	var answer = "<table class=\"products_table\">";
		var k=0;
    	for(i=0; i < (records.length/4); i++) 
		{
			var count = 0;
			answer += "<tr>";
			while(count<4)
			{
				var fields = new Array();
				if(k<records.length)
				{
	        		fields = records[k].split("|");
        			answer += "<div class=\"products\" name=\"product_detail\"><td class=\"product\">";
					answer += "<img src = \"/~jadrn005/proj1/foo/"+fields[6] +"\" width='170'></img><p class=\"product_name\">";
					answer += fields[3].split("`")[0] + "</p><p class=\"product_price\">$";
            		answer += fields[5] + "&nbsp;&nbsp;&nbsp;&nbsp;<font color=\"red\">";
            		if(fields[7] == "-1")
            			answer += "Coming Soon!";
            		else if(fields[7] == "0")
            			answer += "More On Way!";
            		else
            			answer += "Now in Stock!";
            		answer += "</font></p><p hidden class=\"records\">"+records[k]+"</p>";
					answer += "</td></div>";
					k++;
				}
				count++;
			}
        	answer += "</tr>";
		}
    	answer += "</table>";
    	return answer;
	}

    $("#ui-dialog").dialog( {
		height: 500,
		width: 700,
		modal: true,
		autoOpen: false,
		});

	$(document).on("click",".product",function(e){
		$("#ui-dialog").dialog('open');    
		var fields = new Array();
		fields = $(this).find("p.records").html().split("|");
		var product_details = "<table class=\"product_details\"><tr>";
		product_details += "<td><img src = \"/~jadrn005/proj1/foo/"+fields[6] +"\" width='230'></img><br>";
		product_details += "<input type=\"text\" id=\"stock\" value=\""+fields[7]+"\" hidden></input><font color=\"red\" size=\"3\">";
		if(fields[7] == "-1")
            product_details += "Not in Stock yet! Coming Soon!";
        else if(fields[7] == "0")
            product_details += "More On Way!";
        else
            product_details += "Now in Stock!";
		product_details += "</font><br><input type=\"number\" id=\"quantity\" value=\"1\"";
		if(fields[7]=="-1" || fields[7] == "0")
			product_details += "disabled";
			product_details += "></input>";
			product_details += "<input type=\"text\" id=\"sku\" hidden value=\""+fields[0]+"\"></input>";	
			product_details += "<input type=\"button\" id=\"addToCart\" value=\"Add to cart\"";
		if(fields[7]=="-1" || fields[7] == "0")
			product_details += "disabled";
			product_details += "></input><p id=\"err_message_stock\"></p></td>";
			product_details += "<td><table>";
			product_details += "<tr><td>Name: </td><td>"+fields[3].split("`")[0]+"</td></tr>";
			product_details += "<tr><td>Vendor: </td><td>"+fields[1]+"</td></tr>";
			product_details += "<tr><td>Cost: </td><td>$"+fields[5]+"</td></tr>";
			product_details += "<tr><td>Description: </td><td class=\"smallFont\">"+fields[3]+"</td></tr>";
			product_details += "<tr><td>Features: </td><td class=\"smallFont\">"+fields[4]+"</td></tr>";
		product_details += "</table></td></tr></table>";
   			$("#ui-dialog").html(product_details);
	});
	    
});
