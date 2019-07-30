@Controller
@RequestMapping("/dataCollection")
public class DataCollection {
  @RequestMapping(value = "log.gif")
  public void analysis(String args, HttpServletResponse response) throws IOException {
    System.out.println(args);
        
    //日志收集 
    response.setHeader("Pragma", "No-cache");
    response.setHeader("Cache-Control", "no-cache");
    response.setDateHeader("Expires", 0);
    response.setContentType("image/gif");
    OutputStream out = response.getOutputStream();
    BufferedImage image = new BufferedImage(1, 1, BufferedImage.TYPE_INT_RGB);
    ImageIO.write(image, "gif", out);
    out.flush();
  }
}