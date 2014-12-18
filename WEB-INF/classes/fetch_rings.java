 /* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class fetch_rings extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
	String Result = "";
	PrintWriter out = response.getWriter();
	Vector<String []> answer = DBHelper.doQuery("SELECT distinct p.sku,v.vendor_name,p.manu_id,p.description,p.feature,p.cost,p.image FROM products p,category c, vendor v where p.category_key = (select category_key from category where category_name = 'Rings') and p.vendor_key=v.vendor_key");
	if(!answer.isEmpty())
	{
    		for(int i=0; i < answer.size(); i++) 
		{
    			String [] tmp = answer.elementAt(i);
			for(int j=0; j < tmp.length; j++)	
			{
				Result += tmp[j] + "|";
			}
			//Result = Result.substring(0,Result.length()-1);
			String stock;
			Vector<String []> on_hand_quantity_array= DBHelper.doQuery("select on_hand_quantity from on_hand where sku = '"+tmp[0]+"'");
			if(on_hand_quantity_array.isEmpty())
				Result += "-1";
			else
				Result += on_hand_quantity_array.elementAt(0)[0];
			Result += "||";
		}
		Result = Result.substring(0,Result.length()-1);
	}
	else 
		Result = "not OK";	
	out.print(Result);
    }    
}


