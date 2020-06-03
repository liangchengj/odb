import java.io.File;
import java.lang.reflect.Field;

/**
 * @author Liangcheng Juves
 * Created at 2020/05/28 02:26
 */
public class Test extends Abstract {

    @V(2)
    String string;

//    public static void main(String[] args) {
//        String basePath = "C:\\Users\\LiangchengJ\\Desktop";
//        File file = new File(basePath, "liangchengj" + File.separator +
//                "static" + File.separator + "pdf");
//        for (File f : file.listFiles()) {
//            System.out.println("\"" + f.getName() + "\",");
//        }
//    }


    public static void main(String[] args) {
        Test test = new Test();
    }

}
