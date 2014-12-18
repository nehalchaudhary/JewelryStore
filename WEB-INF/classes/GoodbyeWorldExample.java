import java.io.IOException;
import java.io.PrintWriter;
import java.util.ResourceBundle;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class GoodbyeWorldExample extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            
            // StringBuffer is much faster than concatenating
            // strings.
            StringBuffer b = new StringBuffer();
            b.append("<html>\n");
            b.append("<head>\n");
            b.append("<title>GoodBye World</title>\n");
            b.append("</head>\n");
            b.append("<body>\n");
            b.append("<h1>GoodBye Cold Cruel World!</h1>\n");
            b.append("</body>\n");
            b.append("</html>\n");
            
            out.print(b.toString());
        }
        
    public void doPost(HttpServletRequest request,
                      HttpServletResponse response)
        throws IOException, ServletException  {
            doGet(request, response);
            }        
}



