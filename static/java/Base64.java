/**
 * Created at 2020/7/14 23:56.
 *
 * @author Liangcheng Juves
 */
public final class Base64 {

    private static final char[] alphabet = {
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
    };

    private Base64() {
    }


    public static final byte[] encode(byte[] src) {
        int srcLen = src.length;
        int rder = srcLen % 3;
        byte[] cpy = new byte[srcLen + (3 - (rder != 0 ? rder : 3))];
        System.arraycopy(src, 0, cpy, 0, srcLen);
        byte[] dst = new byte[cpy.length / 3 * 4];

        for (int cpyi = 0, dsti = 0; dsti < dst.length; cpyi += 3, dsti += 4) {
            int cpyi1 = cpyi + 1,
                    cpyi2 = cpyi + 2,
                    // Alphabet unsigned indexes.
                    albeti0 = cpy[cpyi] & 0xff,
                    albeti1 = cpy[cpyi1] & 0xff,
                    albeti2 = cpy[cpyi2] & 0xff;

            dst[dsti] = (byte) alphabet[albeti0 >> 2];
            dst[dsti + 1] = (byte) alphabet[(albeti0 & 0x3) << 4 | albeti1 >> 4];
            dst[dsti + 2] = cpy[cpyi1] != '\0' && cpyi1 != srcLen
                    ? (byte) alphabet[(albeti1 & 0xf) << 2 | albeti2 >> 6]
                    : (byte) '=';
            dst[dsti + 3] = cpy[cpyi2] != '\0' && cpyi2 != srcLen + 1
                    ? (byte) alphabet[albeti2 & 0x3f]
                    : (byte) '=';
        }
        return dst;
    }


    public static void main(String[] args) throws Exception {
        System.out.println(new String(encode("我们都一样".getBytes())));
    }

}
