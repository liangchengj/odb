import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.Socket;
import java.util.Set;
import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.element.TypeElement;

/**
 * Created at 2020/7/13 21:21.
 *
 * @author Liangcheng Juves
 */
public class Test extends AbstractProcessor implements HexConvert, Stream {

    public static void main(String[] args) throws IOException {

        Socket socket = new Socket("185.199.108.153", 80);

        StringBuilder sb = new StringBuilder();
        sb.append("GET /index.html");

//        Test test = new Test();
//
//
////        ByteArrayInputStream byteArrayInputStream =
////                new ByteArrayInputStream("邓捷"
////                        .getBytes());
////
////        test.readAndWrite(byteArrayInputStream,System.out,
////                new FileOutputStream(
////                new File("a.txt")
////        ));
//
//        String hex = test.convertToHex("C#敏捷开发实践");
//        System.out.println(hex);
//        System.out.println(hex.length());
//        System.out.println(test.parseHex("68656C6C6F2C776F726C642C68656C6C6F2C6B616E6B616E"));
//        traverse("C:\\Users\\LiangchengJ\\Desktop\\kxnet\\ChromeGo",(f->{
//            System.out.println(f.getAbsolutePath());
//        }));
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        return false;
    }

//    private static void traverse(String dirPath,
//                                 TraverseDirListener traverseDirListener)
//            throws IOException {
//        File file = new File(dirPath);
//        if (file.isDirectory()) {
//            for (File f : file.listFiles()) {
//                if (f.isDirectory()) {
//                    traverse(f.getAbsolutePath(), traverseDirListener);
//                } else {
//                    traverseDirListener.onTraversing(f);
//                }
//            }
//        } else {
//            throw new IOException("不能遍历文件");
//        }
//    }
}
