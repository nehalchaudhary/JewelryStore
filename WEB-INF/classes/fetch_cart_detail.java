 /* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class fetch_cart_detail extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
	String Result = "";
	String[] cart = new String[10];
	cart = request.getParameter("sku").split(",");
	PrintWriter out = response.getWriter();
	Vector<String []> answer;
	for(int i=0;i<cart.length;i=i+2)	
	{
		answer = DBHelper.doQuery("SELECT p.image,p.description,p.cost,o.on_hand_quantity,p.sku FROM products p,on_hand o where p.sku = '"+cart[i]+"' and p.sku=o.sku");
		String [] tmp = answer.elementAt(0);
		for(int j=0; j < tmp.length; j++)	
		{
			Result += tmp[j] + "|";
		}
		Result += cart[i+1] + "||";
	}
	Result = Result.substring(0,Result.length()-2);

	//Vector<String []> answer = DBHelper.doQuery("SELECT p.image,p.description,p.cost,o.on_hand_quantity FROM products p,on_hand o where p.sku = 'NNN-111' and p.sku=o.sku");
	/*if(!answer.isEmpty())
	{
    	String [] tmp = answer.elementAt(0);
		for(int j=0; j < tmp.length; j++)	
		{
			Result += tmp[j] + "|";
		}
		Result = Result.substring(0,Result.length()-1);
		Result += sku;
	}
	else 
		Result = "not OK";	*/
		/*for(int i=0; i < cart.size(); i++) 
		{
    		String [] tmp = cart.elementAt(i);
			for(int j=0; j < tmp.length; j++)	
			{
				Result += tmp[j] + "|";
			}
		}*/
	//	Result = cart[0];
	out.print(Result);
    }    
}


