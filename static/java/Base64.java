import java.util.regex.Pattern;

/**
 * Created at 2020/7/14 23:56.
 *
 * @author Liangcheng Juves
 */
public final class Base64 {

    private static final char[] toBase64 = {
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    };

    private Base64() {
    }


    public static final byte[] encode(byte[] bytes) {
        int bytesLen = bytes.length;
        int yu = bytesLen % 3;

        if (yu != 0) {
            byte[] cpy = new byte[bytesLen + (3 - yu)];
            System.arraycopy(bytes, 0, cpy, 0, bytesLen);
            bytes = cpy;
        }
        bytesLen = bytes.length;
        byte[] dst = new byte[bytesLen / 3 * 4];

        int i, j;

        for (i = 0, j = 0; i < dst.length; j += 3, i += 4) {
            dst[i] = (byte) toBase64[bytes[j] >> 2];
            dst[i + 1] = (byte) (toBase64[(bytes[j] & 0x3) << 4 | bytes[j + 1] >> 4]);
            if (bytes[j + 1] != '\0') {
                dst[i + 2] = (byte) (toBase64[(bytes[j + 1] & 0xf) << 2 | bytes[j + 2] >> 6]);
            } else {
                dst[i + 2] = '=';
            }
            if (bytes[j + 2] != '\0') {
                dst[i + 3] = (byte) (toBase64[bytes[j + 2] & 0x3f]);
            } else {
                dst[i + 3] = '=';
            }
        }

        return dst;
    }

    public static void main(String[] args) throws Exception {
        System.out.println(new String(encode("hello,world\n".getBytes())));
    }

}
