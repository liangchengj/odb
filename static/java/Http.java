import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created at 2020/7/11 15:42.
 *
 * @author Liangcheng Juves
 */
public class Http {


    private static AtomicInteger atomicInteger = new AtomicInteger(1);

    private static ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(
            Runtime.getRuntime().availableProcessors(),
            Runtime.getRuntime().availableProcessors(),
            0,
            TimeUnit.SECONDS,
            new LinkedBlockingQueue<>(),
            r -> new Thread(r, "Http >>> " + atomicInteger.getAndIncrement())
    );

    public static void main(String[] args) {
        Integer integer = Integer.valueOf(1);
        integer.intValue();
        threadPoolExecutor.execute(() -> {
            HttpURLConnection huc = null;
            try {
                huc = (HttpURLConnection) new URL("https://www.apple.com")
                        .openConnection();
                huc.setRequestMethod("GET");
                huc.setConnectTimeout(3000);
                huc.setReadTimeout(3000);
                huc.connect();

                final byte[] bytes = new byte[1024];
                for (int len; (len = huc.getInputStream().read(bytes)) != -1;
                     System.out.print(new String(bytes, 0, len)))
                    ;

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    huc.getInputStream().close();
                    huc.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }


}
