$(document).ready(
function() 
{
	$('#o_busy_wait').hide();
	$('#o_busy_wait_submit').hide();
	$("#o_submit").prop("disabled", true);
  	$('#o_sku').focus();
  	$('#o_sku').attr('maxlength',7); 
	$('#o_sku').attr('disabled',false);
	$('#o_date').attr("disabled",true); 
	$('#o_category').attr("disabled",true); 
	$('#o_vendor').attr("disabled",true); 
	$('#o_manu_id').attr("disabled",true); 
	$('#o_desc').attr("disabled",true); 
	$('#o_feat').attr("disabled",true); 
	$('#o_cost').attr("disabled",true); 
	$('#o_retail').attr("disabled",true);  
	$('#o_product_image').attr("disabled",true);  
	showDate();
	$.post("/jadrn005/servlet/fetch_category",add_category);
	$.post("/jadrn005/servlet/fetch_vendor",add_vendor);
	
	$('#o_quantity').on('blur',function()
	{
		var value = $('#o_quantity').val();
		value = $.trim(value);
		var pattern = /^[0-9]+$/;
		if((pattern.test(value)&&value>0) || value=="")
		{
			$('#o_message_line2').css('color','red');
			$('#o_message_line2').html("");
			$('#o_submit').attr("disabled",false);
		}
		else
		{
			$('#o_message_line2').css('color','red');
			$('#o_message_line2').html("Quantity appears to be invalid");
			$('#o_submit').attr("disabled",true);
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
    		$("#o_date").attr("value", today);
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
	 	$('#o_category').append(toWrite);
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
	 	$('#o_vendor').append(toWrite);
	 }
	 
	 $('#o_sku').on('keyup', function() 
	{
	 	clear_error();
       		var currentVal = $('#o_sku').val().toUpperCase();
       		$('#o_sku').val(currentVal);
       		if(currentVal.length == 3)
           		$('#o_sku').val(currentVal+"-");        	
    	});  
	 
	$('#o_sku').on('blur', function() 
	{ 
        	var inputValue =  $.trim( $('#o_sku').val() );  
        	if( inputValue == "") return; // if no input do nothing
        	if(validate_sku()) 
		{
			clear_error();    
        	}
        	else
		{ 
			$('#o_sku').focus();
			$("o_#sku").attr("disabled", false); 
           		write_error("The SKU format appears to be invalid");
		}
   	});
	
	function validate_sku() {
		var value = $('#o_sku').val();
   		value = $.trim(value);
	 	var pattern = /^[A-Z]{3}-[0-9]{3}$/;
	    	if(pattern.test(value))
	        	return true;
	    	return false;
    	}
	
	function write_error(msg) 
	{
		$('#o_message_line1').css('color','red');
   		$('#o_message_line1').html("<b>"+msg+"</b>");   
   	}
	 
	function clear_error() 
	{
   		$('#o_message_line1').html("");   
   	}
	
	$('#o_clear').bind('click', function(e)
	{
		$('#o_sku').focus();
		$('#o_message_line2').html("");
		$('#o_message_line1').html("");
		$('#o_status').html("");
		$("#o_submit").prop("disabled", true);
		$("#o_sku").prop("disabled", false); 
		$('#o_pic').html("");
	});
	
	$('#o_get_info').bind('click', function(e) 
	{
		$("#o_submit").prop("disabled", false);
		$('#o_status').html("");	
		$('#o_sku').attr('disabled',true);
		$.post("/jadrn005/servlet/check_sku_out?sku="+$('#o_sku').val(),show_info);
				
	});
	$('#o_sku').keyup(function(e) 
	{
		if(e.keyCode == 13)
		{
			$("#o_submit").prop("disabled", false);		
			$('#o_status').html("");
			$("#o_sku").attr("disabled", "disabled"); 
			$.post("/jadrn005/servlet/check_sku_out?sku="+$('#o_sku').val(),show_info);
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
			$('#o_quantity').val(1);
			$('#o_category').val(tmpStr[1]);
			$('#o_vendor').val(tmpStr[2]);
			$('#o_manu_id').val(tmpStr[3]);
			$('#o_desc').val(tmpStr[4]);
			$('#o_feat').val(tmpStr[5]);
			$('#o_cost').val(tmpStr[6]);
			$('#o_retail').val(tmpStr[7]);
			var fileName = tmpStr[8];
			var src = "/~jadrn005/proj1/foo/"+fileName;
			$('#o_pic').html("<img src="+src+" width='100' height='100'>");
		}
		else
		{
			$("#o_sku").attr("disabled", false); 
			write_error("Sorry,this product has not been recieved");
		}
	}
	$('#o_submit').bind('click', function(e) 
	{
		$('#o_busy_wait').show();		
		e.preventDefault();
		var data = "?sku=";
		data += $('#o_sku').val() + "&quantity=";
		data += $('#o_quantity').val();
		$.post("/jadrn005/servlet/check_quantity" + data,function(response){
//		alert(response);
			if(response == "ok")
			{
				alert("hi");
//				$('#o_message_line1').text().length > 0 ||
  //				$('#o_message_line2').text().length > 0)
				send_file();
				return true;
			}
			else
			{
				$('#o_busy_wait').hide();
				$("#o_submit").prop("disabled", true);	
				$('#o_status').html("Quantity is more than the on_hand quantity");
				return false;
			}
		});
   	});
        
//source from ~jadrn000/ajax_upload/file_upload_ajax.js
    	function send_file() 
	{    
		var data = "?sku=";
		data += $('#o_sku').val() + "&date=";
		data += $('#o_date').val() + "&quantity=";
		data += $('#o_quantity').val();
		$.ajax({
            		url: "/jadrn005/servlet/merchandise_out" + data,
            		type: "post",
            		processData: false,
            		contentType: false,
            		success: function(response) 
			{
				//$('#sku').attr('disabled',false);
	    			$('#o_busy_wait').hide();
				//$('#sku').focus();
				$("#o_submit").prop("disabled", true);
               			$('#o_status').css('color','blue');
               			$('#o_status').html("Merchandise successfully sent out.<br />");
               			//$('#clear').click();
                	},
            		error: function(response) 
			{
				$('#o_sku').focus();
				$('#o_sku').attr('disabled',false);
				$("#o_submit").prop("disabled", true);
	    			$('#o_busy_wait').hide();
               			$('#o_status').css('color','red');
               			$('#o_status').html("Sorry, an error occurred, "+response.statusText);
                	}
            	});
        }	
	$('#sec').bind('click',function(e)
	{
		$('#o_sku').focus();
	});
});
