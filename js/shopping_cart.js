$(document).ready( function() {
    var cart = new shopping_cart("jadrn005");
//    updateDisplay();
    $(document).on("click","#addToCart",function() {
        if(parseInt($("#stock").val()) < parseInt($('#quantity').val()))
        {
            $('#err_message_stock').html('Available quantity is less. Please reduce quantity!');
            $('#err_message_stock').css('color','red');
        }
        else
        {
            cart.add($('#sku').val(), $('#quantity').val());
            $("#ui-dialog").dialog('close');
            updateDisplay();
        }
    }); 
    
    $(document).on("click",".delete", function() {
        //alert($(this).find("p").html());
        cart.delete($(this).find("p").html());
        updateDisplay();
        });   
    
    /*$('#quantityButton').on('click', function() {
        cart.setQuantity($('#sku').val(), $('#qty').val());
        updateDisplay();
        });                */
        
    $(document).on("click",".quantity",function()
    {
        cart.setQuantity($(this).find("p").html(), $(this).find("input").val());
        updateDisplay();
    });
    function printCart(response)
    {
       // alert(response) ;
        var cartArray = new Array();    
        cartArray = response.split("||");
        var toWrite = "<table id=\"cart_table\">";
        toWrite += "<tr class=\"cart_product\"><th></th><th>Product</th><th>Quantity</th><th>Price</th></tr>";
        //toWrite += "<tr><th>SKU</th><th>Quantity</th></tr>";
        var subTotal = 0;
        for(i=0; i < cartArray.length; i++) 
        {
            var cartElements = new Array();
            cartElements = cartArray[i].split("|");
            toWrite += "<tr>";
            toWrite += "<td><img src=\"/~jadrn005/proj1/foo/"+cartElements[0] +"\" width='30' height='30'></img></td>";
            toWrite += "<td class=\"cart_product\">"+cartElements[1].split("`")[0]+"</td>"; 
            toWrite += "<td hidden>"+cartElements[3]+"</td>";
            toWrite += "<td class=\"quantity\"><p hidden>"+cartElements[4]+"</p>&nbsp;<input type=\"number\" class=\"cart_quantity\" size=\"2\"value=\""+cartElements[5]+"\"></input></td>";
            toWrite += "<td class=\"cart_product\">$"+cartElements[2]*cartElements[5]+"</td>";
            subTotal += cartElements[2]*cartElements[5];
            toWrite += "<td class=\"sku\" hidden>$"+cartElements[4]+"</td>"; 
            toWrite += "<td class=\"delete\"><p hidden>"+cartElements[4]+"</p><font color=\"red\">Delete</font></td><br>"; 
            toWrite += "</tr>";
            toWrite += "<tr><td colspan=\"7\"";
            if(parseInt(cartElements[3])>=parseInt(cartElements[5]))    
                toWrite += "hidden";
            toWrite += "><p class=\"err_quantity\">Not in Stock,Reduce quantity</p></td></tr>"; 
        }
        //alert(toWrite);
        toWrite += "<table id=\"shipping_table\">";
        var Total = subTotal + 5 + subTotal/10;
        toWrite += "<br><br><br><table><tr><td class=\"total\">Sub-total:</td>";
        toWrite += "<td class=\"total_value\">$"+subTotal+"</td></tr>";
        toWrite += "<tr><td class=\"total\">Shipping:</td>";
        toWrite += "<td class=\"total_value\">$5.00</td></tr>";
        toWrite += "<tr><td class=\"total\">Sales Tax:</td>";
        toWrite += "<td class=\"total_value\">$"+(subTotal*0.08).toFixed(2)+"</td></tr>";
        toWrite += "<tr><td class=\"total\">Total:</td>";
        toWrite += "<td class=\"total_value\">$"+Total.toFixed(2)+"</td></tr></table>";
        toWrite += "<br><br><input type=\"button\" id=\"checkout\" value=\"Checkout\"></input>";
        $('#cart').html(toWrite); 
    }
    
    function updateDisplay() {
        //alert("update");
        var cartArray = cart.getCartArray();
        //alert(cartArray);
        $('#count').text(cart.size());     
        $.post("/jadrn005/servlet/fetch_cart_detail?sku="+cartArray+"",printCart);
    } 
        
      $( "#dialog-modal" ).dialog({
            height: 500,
            width: 600,
            modal: true,
            autoOpen: false
    });
    
    $(document).on("click","#checkout",function($e) {       
            //$("#dialog-modal").html("product_details");
            if($("p.err_quantity").is(':visible'))
            {
                updateDisplay();
            }
            else
            {
                $("#dialog-modal").dialog('open');
                $("#dialog-modal").html("product_details");
                $('#Name').focus();
                 showPaymentDetail();
            }
                       
    }); 

    validate();
    //$(document).on('keyup', function() 
    $(document).on("blur","#Zip,Zip_Shipping",function(){
         //alert("shiping");
            var value = $('#Zip').val();
            value = $.trim(value);
            var pattern = /^[0-9]+$/;
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Zip-code is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
    $(document).on("blur","#Zip_shipping",function(){
         //alert("shiping");
            var value = $('#Zip_shipping').val();
            value = $.trim(value);
            var pattern = /^[0-9]+$/;
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Zip-code is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
    $(document).on("blur","#Phone",function(){
        var value = $('#Phone').val();
            value = $.trim(value);
            var pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
            ///^[A-Z]{3}-[0-9]{3}$/
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Phone no. is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
    $(document).on("blur","#Phone_shipping",function(){
        var value = $('#Phone_shipping').val();
            value = $.trim(value);
            var pattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
            ///^[A-Z]{3}-[0-9]{3}$/
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Phone no. is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
    
     $(document).on("blur","#Security",function(){
            var value = $('#Security').val();
            value = $.trim(value);
            var pattern = /^[0-9]+$/;
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Security Code is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
     $(document).on("blur","#Credit",function(){
            var value = $('#Credit').val();
            value = $.trim(value);
            var pattern = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Credit Card Number is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }
    });
    $(document).on('keyup','#Phone', function() 
    {
        //clear_error();
            var currentVal = $('#Phone').val();
            //$('#sku').val(currentVal);
            if(currentVal.length == 3 || currentVal.length == 7)
                $('#Phone').val(currentVal+"-");          
        }); 
    $(document).on('keyup','#Phone_shipping', function() 
    {
        //clear_error();
            var currentVal = $('#Phone_shipping').val();
            //$('#sku').val(currentVal);
            if(currentVal.length == 3 || currentVal.length == 7)
                $('#Phone').val(currentVal+"-");          
        }); 

    $(document).on('keyup', '#Credit', function() 
    {
        //clear_error();
            var currentVal = $('#Credit').val();
            //$('#sku').val(currentVal);
            if(currentVal.length == 4 || currentVal.length == 9 || currentVal.length == 14)
                $('#Credit').val(currentVal+"-");          
        }); 
    $(document).on('keyup', '#Expiration', function(e) 
    {
        //clear_error();
            var currentVal = $('#Expiration').val();
            //$('#sku').val(currentVal);
            if(currentVal.length == 2)
                $('#Expiration').val(currentVal+"/");      
            if(currentVal.length == 5)    
                e.preventDefault();
        }); 
    $(document).on("blur","#Expiration",function(){
        var value = $('#Expiration').val();
            value = $.trim(value);
            var pattern = /^[0-9]{2}\/[0-9]{2}$/;
            if( value == "") return; // if no input do nothing
            if(!pattern.test(value))
            {   
                $('#billing_err').html("Expiration date is invalid");
                $('#billing_err').css('color','red');
                $("#dialog-modal").scrollTop("0");
            }
            else
            {
                $('#billing_err').html("");   
            }

    });
    function validate()
    {
            if ($('#Name').val() !=  ""   &&
            $('#Name_shipping').val() !=  ""  &&
            $('#Address').val() !=  ""  &&
            $('#Address_shipping').val() !=  ""  &&
            $('#State').val() !=  ""  &&
            $('#State_shipping').val() !=  ""  &&
            $('#Zip').val() !=  ""  &&
            $('#Zip_shipping').val() !=  ""  &&
            $('#Phone').val() !=  ""  &&
            $('#Phone_shipping').val() !=  ""  &&
            $('#Credit').val() !=  ""  &&
            $('#Expiration').val() !=  ""  &&
            $('#Security').val() !=  "" ) 
            {
                //$("#submit").prop("disabled", false);
                $('#status').html("");
                return true;
            }
            else 
            {
                return false;
               // $("#submit").prop("disabled", true);
            }
     }
    $(document).on("change","#Shipping",function()
    {
           if($('#Shipping').is(':checked'))
           {    
                $('#Name_shipping').val($('#Name').val());
                $('#Address_shipping').val($('#Address').val());
                $('#Address2_shipping').val($('#Address2').val());
                $('#State_shipping').val($('#State').val());
                $('#Zip_shipping').val($('#Zip').val());
                $('#Phone_shipping').val($('#Phone').val());
           } 
    });

    function showPaymentDetail()
    {
        var payment_form = "<form id=\"payment\">";
        //payment_form += ", Name, Address, Address, City, State, Zip, Phone, Credit Card Type, Credit Card Number, Credit Card Expiration Date, Security Code";
        payment_form += "<table id=\"payment_table\"><caption>Billing Information</caption>";
        payment_form += "<p id=\"billing_err\"></p>";
        payment_form += "<tr><td class=\"right_align\">Name*:</td><td class=\"left_align\"><input type=\"text\" id=\"Name\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Address*:</td><td class=\"left_align\"><input type=\"text\" id=\"Address\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Address 2:</td><td class=\"left_align\"><input type=\"text\" id=\"Address2\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">State*:</td><td class=\"left_align\"><input type=\"text\" id=\"State\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Zip Code*:</td><td class=\"left_align\"><input type=\"text\" id=\"Zip\" maxlength=\"5\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Phone No.*:</td><td class=\"left_align\"><input type=\"text\" id=\"Phone\" maxlength=\"12\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Credit Card No.*:</td><td class=\"left_align\"><input type=\"text\" id=\"Credit\" maxlength=\"19\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Expiration Date*:</td><td class=\"left_align\"><input type=\"text\" id=\"Expiration\" maxlength=\"5\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Security Code*:</td><td class=\"left_align\"><input type=\"text\" id=\"Security\" maxlength=\"3\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Shipping Information*:</td><td class=\"left_align\"><input type=\"checkbox\" id=\"Shipping\"></input> Same as above</td></tr>";
        payment_form += "<tr><td class=\"right_align\">Name*:</td><td class=\"left_align\"><input type=\"text\" id=\"Name_shipping\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Address*:</td><td class=\"left_align\"><input type=\"text\" id=\"Address_shipping\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Address 2:</td><td class=\"left_align\"><input type=\"text\" id=\"Address2_shipping\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">State*:</td><td class=\"left_align\"><input type=\"text\" id=\"State_shipping\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Zip Code*:</td><td class=\"left_align\"><input type=\"text\" id=\"Zip_shipping\" maxlength=\"5\"></input></td></tr>";
        payment_form += "<tr><td class=\"right_align\">Phone No.*:</td><td class=\"left_align\"><input type=\"text\" id=\"Phone_shipping\" maxlength=\"12\"></input></td></tr>";
        payment_form += "<tr><td colspan=\"2\"><input type=\"button\" id=\"submit\" value=\"Submit\"></input></td><tr></form><p id=\"status\"></p>";
        $("#dialog-modal").html(payment_form);
    }              

    $(document).on("click","#submit",function(){
        if(validate())
        {
            $("#dialog-modal").dialog('close');
            //alert($('#Name').val());
             var cartArray = cart.getCartArray();
            //alert(cartArray);
            $('#count').text(cart.size());     
            $.post("/jadrn005/servlet/fetch_cart_detail?sku="+cartArray+"",printSummary);
        }

        else
        {
            $('#status').html("Something seems to be wrong, please check again!");
            $('#status').css('color','red');
            $("#dialog-modal").scrollTop("0");
        }
    });

    function printSummary(response)
    {
            var cartArray = new Array();    
            cartArray = response.split("||");
            var toWrite = "<div id=\"shipping_tab\"><table id=\"cart_summary\">";
            toWrite += "<tr class=\"cart_product\"><th></th><th>Product</th><th>Quantity</th><th>Price</th></tr>";
            var subTotal = 0;
            for(i=0; i < cartArray.length; i++) 
            {
                var cartElements = new Array();
                cartElements = cartArray[i].split("|");
                toWrite += "<tr>";
                toWrite += "<td><img src=\"/~jadrn005/proj1/foo/"+cartElements[0] +"\" width='30' height='30'></img></td>";
                toWrite += "<td class=\"cart_product\">"+cartElements[1].split("`")[0]+"</td>"; 
                //toWrite += "<td hidden>"+cartElements[3]+"</td>";
                toWrite += "<td>&nbsp;"+cartElements[5]+"</td>";
                toWrite += "<td class=\"cart_product\">$"+cartElements[2]*cartElements[5]+"</td>";
                subTotal += cartElements[2]*cartElements[5];
                //toWrite += "<td class=\"sku\" hidden>$"+cartElements[4]+"</td>"; 
                //toWrite += "<td class=\"delete\"><font color=\"red\">Delete</font></td><br>"; 
                toWrite += "</tr>";
                //toWrite += "<tr><td colspan=\"4\"";
                //if(parseInt(cartElements[3])>parseInt(cartElements[5]))    
                //toWrite += "hidden";
            //toWrite += "><p class=\"err_quantity\">Not in Stock,Reduce quantity</p></td></tr>"; 
        }
        //alert(toWrite);
        toWrite += "</table id=\"shipping_table\">";
        var Total = subTotal + 5 + subTotal/10;
        toWrite += "<br><table><tr><td class=\"total\">Sub-total:</td>";
        toWrite += "<td class=\"total_value\">$"+subTotal+"</td></tr>";
        toWrite += "<tr><td class=\"total\">Shipping:</td>";
        toWrite += "<td class=\"total_value\">$5.00</td></tr>";
        toWrite += "<tr><td class=\"total\">Sales Tax:</td>";
        toWrite += "<td class=\"total_value\">$"+(subTotal*0.08).toFixed(2)+"</td></tr>";
        toWrite += "<tr><td class=\"total\">Total:</td>";
        toWrite += "<td class=\"total_value\">$"+Total.toFixed(2)+"</td></tr></table></div>";
        //toWrite += "<br><br>";

            var payment_form = toWrite;
            payment_form += "<div id=\"payment_sum\"><table id=\"payment_summary\"><tr><td colspan=\"2\"><b>Billing Information:</b></td></tr>";
            payment_form += "<tr><td class=\"right_align\">Name:</td><td class=\"left_align\">"+$('#Name').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Address:</td><td class=\"left_align\">"+$('#Address').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Address 2:</td><td class=\"left_align\">"+$('#Address2').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">State:</td><td class=\"left_align\">"+$('#State').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Zip Code:</td><td class=\"left_align\">"+$('#Zip').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Phone No.:</td><td class=\"left_align\">"+$('#Phone').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Credit Card No.:</td><td class=\"left_align\">xxxx-xxxx-xxxx-"+$('#Credit').val().split('-')[3]+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Expiration Date:</td><td class=\"left_align\">"+$('#Expiration').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Security Code:</td><td class=\"left_align\">"+$('#Security').val()+"</td></tr><br>";
            payment_form += "<tr><td class=\"right_align\" colspan=\"2\"><b>Shipping Information:</b></td></tr>";
            payment_form += "<tr><td class=\"right_align\">Name:</td><td class=\"left_align\">"+$('#Name_shipping').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Address:</td><td class=\"left_align\">"+$('#Address_shipping').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Address 2:</td><td class=\"left_align\">"+$('#Address2_shipping').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">State:</td><td class=\"left_align\">"+$('#State_shipping').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Zip Code:</td><td class=\"left_align\">"+$('#Zip_shipping').val()+"</td></tr>";
            payment_form += "<tr><td class=\"right_align\">Phone No.:</td><td class=\"left_align\">"+$('#Phone_shipping').val()+"'</td></tr></table></div>";
            payment_form += "<input type=\"button\" id=\"confirm\" value=\"Confirm Order\"></input>";
            payment_form += "<input type=\"button\" id=\"edit_cart\" value=\"Edit\"></input>";
            $('#cart').html(payment_form);
    }
    $(document).on('click', '#confirm', function()
    {
        var cartArray = cart.getCartArray();
        //alert(cartArray);
        $('#count').text(cart.size());     
        $.post("/jadrn005/servlet/update_products?sku="+cartArray+"",update_Cart);
        //alert("edit");
        //updateDisplay();
    });
    function update_Cart(response)
    {
        var cartArray = cart.getCartArray();
        //alert(cartArray);
        //var cartElements = cartArray.split(',');
        $('#cart').html("Your order has been confirmed! Shipment on its way!!");
        $('#count').text(0);
        for(var i=0;i<=cart.size();i++)
        {
            cart.delete(cartArray[i][0]);
            //alert(cartArray[i][0]);
        }
        //$.removeCookie("example");
    }
    $(document).on('click', '#edit_cart', function()
    {
        //alert("edit");
        updateDisplay();
    });
});