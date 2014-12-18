/* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class check_quantity extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        String sku = request.getParameter("sku");
	String quantity = request.getParameter("quantity");
	int Result;
	PrintWriter out = response.getWriter();
	Vector<String[]> answer = DBHelper.doQuery("select on_hand_quantity from on_hand where sku = '"+sku+"'");
//	out.print(sku);
//	out.print(quantity);
//	out.print(answer);
//    	for(int i=0; i < answer.size(); i++) 
	//{
    		String [] tmp = answer.elementAt(0);
//		for(int j=0; j < tmp.length; j++)			
			Result = Integer.parseInt(tmp[0]);
	//}
	
	if(Result < Integer.parseInt(quantity))
		out.print("not ok");
	else
		out.print("ok");
    }    
}


