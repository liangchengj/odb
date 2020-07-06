import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;
import static java.io.File.separator;

/**
 * Created at 2020/7/4 6:30.
 *
 * @author Liangcheng Juves
 */
public final class DeployBooks {

    private DeployBooks() {
    }

    public static void main(String[] args) throws IOException {
        var execPath = new File("").getAbsolutePath();
        var pdfPath = execPath.substring(0, execPath.lastIndexOf(separator)) + separator + "pdf";
        var appendJson = "";
        for (var pdf : new File(pdfPath).listFiles()) {
            var pdfName = pdf.getName();
            if (pdfName.endsWith(".pdf")) {
                appendJson += "\"" + pdfName + "\",";
            }
        }
        appendJson = "[" + appendJson.substring(0, appendJson.length() - 1) + "]";
        try (var fos = new FileOutputStream(
                new File(execPath.substring(0, execPath.lastIndexOf(separator)) + separator + "json", "books.json"))) {
            fos.write(appendJson.getBytes("utf-8"));
            System.out.println("Deployed OK!   " + new Date());
        }
    }

    // 一段代码

}
