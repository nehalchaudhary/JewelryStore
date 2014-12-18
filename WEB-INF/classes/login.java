/* source : servlet example jadrn000*/

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import sdsu.*;



public class login extends HttpServlet {
    	private ServletContext context=null;
	private RequestDispatcher dispatcher = null;
        private String toDo = "";  
          
    public void doPost(HttpServletRequest request,
              HttpServletResponse response)
                        throws IOException, ServletException  {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        if(PasswordUtilities.isValidLogin(username,password)) 
	{
		//set attribute to distinguish if session is new or old	
            toDo = "/jadrn005/proj2/jsp/menu.jsp";
            HttpSession session = request.getSession(true);
	    session.setAttribute("user", "Nehal");
        }
        else
	{
            toDo = "/jadrn005/proj2/err_login.html";
	}
        context = getServletContext();      
        //dispatcher = request.getRequestDispatcher(toDo); 
        //dispatcher.forward(request, response);                  
	response.sendRedirect(toDo);
    }    
}


