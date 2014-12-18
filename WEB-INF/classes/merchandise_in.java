 
/* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class merchandise_in extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
	PrintWriter out = response.getWriter();
	String sku = request.getParameter("sku");
	String date = request.getParameter("date");
	String quantity = request.getParameter("quantity");
	int answer = DBHelper.doUpdate("insert into merchandise_in values('"+sku+"','"+date+"',"+quantity+")");
	//int answer1 = DBHelper.doUpdate("select count(*) from on_hand where sku = '"+sku+"')");
	int answer1=DBHelper.doUpdate("update on_hand set last_date_modified = '"+date+"',on_hand_quantity = on_hand_quantity + "+quantity+" where sku = '"+sku+"'");		
	out.print(answer1);
	if(answer1 == 0)
		DBHelper.doUpdate("insert into on_hand values('"+sku+"','"+date+"',"+quantity+")");		
		
/*	if(!answer.isEmpty())
	{
    		for(int i=0; i < answer.size(); i++) 
		{
    			String [] tmp = answer.elementAt(i);
			//for(int j=0; j < tmp.length; j++)			
				Result += tmp[1] + "||";
		}
	}
	else 
		Result = "not OK";	*/
	out.print(answer);
    }    
}
