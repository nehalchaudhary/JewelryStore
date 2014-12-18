/* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class check_sku extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        String sku = request.getParameter("sku");
	String Result = "";
	PrintWriter out = response.getWriter();
	Vector<String []> answer = DBHelper.doQuery("select p.sku,c.category_name,v.vendor_name,p.manu_id,p.description,p.feature,p.cost,p.retail,p.image from products p INNER JOIN category c ON p.category_key = c.category_key INNER JOIN vendor v ON p.vendor_key = v.vendor_key WHERE p.sku ='"+sku+"'");
	if(!answer.isEmpty())
	{
    		for(int i=0; i < answer.size(); i++) 
		{
    			String [] tmp = answer.elementAt(i);
			for(int j=0; j < tmp.length; j++)			
				Result += tmp[j] + "||";
		}
	}
	else 
		Result = "not OK";	
	out.print(Result);
    }    
}


