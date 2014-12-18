 /* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import sdsu.*;
import helpers.*;


public class fetch_vendor extends HttpServlet {
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
	String Result = "";
	PrintWriter out = response.getWriter();
	Vector<String []> answer = DBHelper.doQuery("SELECT * FROM vendor");
	if(!answer.isEmpty())
	{
    		for(int i=0; i < answer.size(); i++) 
		{
    			String [] tmp = answer.elementAt(i);
			//for(int j=0; j < tmp.length; j++)			
				Result += tmp[1] + "||";
		}
	}
	else 
		Result = "not OK";	
	out.print(Result);
    }    
}


