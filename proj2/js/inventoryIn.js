$(document).ready(
function() 
{
	$('div#tabs > ul').tabs();   
	$('#busy_wait').hide();
	$('#busy_wait_submit').hide();
	$("#submit").prop("disabled", true);
  	$('#sku').focus();
  	$('#sku').attr('maxlength',7); 
	$('#sku').attr('disabled',false);
	$('#date').attr("disabled",true); 
	$('#category').attr("disabled",true); 
	$('#vendor').attr("disabled",true); 
	$('#manu_id').attr("disabled",true); 
	$('#desc').attr("disabled",true); 
	$('#feat').attr("disabled",true); 
	$('#cost').attr("disabled",true); 
	$('#retail').attr("disabled",true);  
	$('#product_image').attr("disabled",true);  
	showDate();
	$.post("/jadrn005/servlet/fetch_category",add_category);
	$.post("/jadrn005/servlet/fetch_vendor",add_vendor);
	
	$('#quantity').on('blur',function()
	{
		var value = $('#quantity').val();
		value = $.trim(value);
		var pattern = /^[0-9]+$/;
		if((pattern.test(value)&&value>0) || value=="")
		{
			$('#message_line2').css('color','red');
			$('#message_line2').html("");
			$('#submit').attr("disabled",false);
		}
		else
		{
			$('#message_line2').css('color','red');
			$('#message_line2').html("Quantity appears to be invalid");
			$('#submit').attr("disabled",true);
		}
	});
	function showDate()
	{
	 	var date = new Date();
	    	var day = date.getDate();
    		var month = date.getMonth() + 1;
    		var year = date.getFullYear();

    		if (month < 10) month = "0" + month;
    		if (day < 10) day = "0" + day;

    		var today = year + "-" + month + "-" + day;       
    		$("#date").attr("value", today);
	}
    
	$('#sku').on('keyup', function() 
	{
	 	clear_error();
       		var currentVal = $('#sku').val().toUpperCase();
       		$('#sku').val(currentVal);
       		if(currentVal.length == 3)
           		$('#sku').val(currentVal+"-");        	
    	});  
	 
	$('#sku').on('blur', function() 
	{ 
        	var inputValue =  $.trim( $('#sku').val() );  
        	if( inputValue == "") return; // if no input do nothing
        	if(validate_sku()) 
		{
			clear_error();    
        	}
        	else
		{ 
			$('#sku').focus();
			$("#sku").attr("disabled", false); 
           		write_error("The SKU format appears to be invalid");
		}
   	});
	
	function validate_sku() {
		var value = $('#sku').val();
   		value = $.trim(value);
	 	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	    	if(pattern.test(value))
	        	return true;
	    	return false;
    	}
	
	function write_error(msg) 
	{
		$('#message_line1').css('color','red');
   		$('#message_line1').html("<b>"+msg+"</b>");   
   	}
	 
	function clear_error() 
	{
   		$('#message_line1').html("");   
   	}
	
	$('#clear').bind('click', function(e)
	{
		$('#sku').focus();
		$('#message_line2').html("");
		$('#message_line1').html("");
		$('#status').html("");
		$("#submit").prop("disabled", true);
		$("#sku").prop("disabled", false); 
		$('#pic').html("");
	});
	
	$('#get_info').bind('click', function(e) 
	{
		$("#submit").prop("disabled", false);
		$('#status').html("");	
		$('#sku').attr('disabled',true);
		$.post("/jadrn005/servlet/check_sku?sku="+$('#sku').val(),show_info);
				
	});
	
	$('#sku').keyup(function(e) 
	{
		if(e.keyCode == 13)
		{
			$("#submit").prop("disabled", false);		
			$('#status').html("");
			$("#sku").attr("disabled", "disabled"); 
			$.post("/jadrn005/servlet/check_sku?sku="+$('#sku').val(),show_info);
		}
	});
	
	function show_info(response)
	{
		//alert(response);
		if(response != "not OK")
		{
			clear_error();
			var tmpStr = response.split("||");
//			$('#e_message_line1').html(tmpStr); 
			//alert(tmpStr[1]);
			$('#quantity').val(1);
			$('#category').val(tmpStr[1]);
			$('#vendor').val(tmpStr[2]);
			$('#manu_id').val(tmpStr[3]);
			$('#desc').val(tmpStr[4]);
			$('#feat').val(tmpStr[5]);
			$('#cost').val(tmpStr[6]);
			$('#retail').val(tmpStr[7]);
			var fileName = tmpStr[8];
			var src = "/~jadrn005/proj1/foo/"+fileName;
			$('#pic').html("<img src="+src+" width='100' height='100'>");
		}
		else
		{
			$("#sku").attr("disabled", false); 
			write_error("Sorry, No such SKU");
		}
	}
	
	function add_category(response)
	 {
	 	var toWrite = "<option value=\"-1\">Select Category</option>";
	 	var tmpStr = response.split("||");
	   	for(i=0; i<tmpStr.length; i++) 
		{
      			tmp = tmpStr[i].split("=");
        		toWrite += "<option value=" + tmp[0] + ">"+tmp[0]+"</option>\n";
      		}
	 	$('#category').append(toWrite);
	 }	

	function add_vendor(response_vendor)
	 {
	 	var toWrite = "<option value=\"-1\">Select Vendor</option>";
	 	var tmpStr = response_vendor.split("||");
	   	for(i=0; i<tmpStr.length; i++) 
		{
      			tmp = tmpStr[i].split("=");
        		toWrite += "<option value=" + tmp[0] + ">"+tmp[0]+"</option>\n";
      		}
	 	$('#vendor').append(toWrite);
	 }
	 
	$('#submit').bind('click', function(e) 
	{
		$('#busy_wait').show();		
		e.preventDefault();
		if(check_validation())
		{
	       		send_file();
		}
		else
		{
			$('#busy_wait').hide();
			$("#submit").prop("disabled", true);	
			$('#status').html("All the criterias have not been met !! Check again");
		}
   	});
        
	function check_validation()
	{
		if($('#message_line1').text().length > 0 ||
  		$('#message_line2').text().length > 0)
			return false;
		else
			return true;
	}
		
//source from ~jadrn000/ajax_upload/file_upload_ajax.js
    	function send_file() 
	{    
		var data = "?sku=";
		data += $('#sku').val() + "&date=";
		data += $('#date').val() + "&quantity=";
		data += $('#quantity').val();
		$.ajax({
            		url: "/jadrn005/servlet/merchandise_in" + data,
            		type: "post",
            		processData: false,
            		contentType: false,
            		success: function(response) 
			{
				//$('#sku').attr('disabled',false);
	    			$('#busy_wait').hide();
				//$('#sku').focus();
				$("#submit").prop("disabled", true);
               			$('#status').css('color','blue');
               			$('#status').html("Merchandise successfully received.<br />");
               			//$('#clear').click();
                	},
            		error: function(response) 
			{
				$('#sku').focus();
				$('#sku').attr('disabled',false);
				$("#submit").prop("disabled", true);
	    			$('#busy_wait').hide();
               			$('#status').css('color','red');
               			$('#status').html("Sorry, an error occurred, "+response.statusText);
                	}
            	});
        }
});
