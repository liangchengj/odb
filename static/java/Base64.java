import java.util.Arrays;

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


    public static final byte[] encode(byte[] src, boolean isURL) {
        char[] cpybet = Arrays.copyOf(alphabet, alphabet.length);
        if (isURL) {
            cpybet[cpybet.length - 2] = '-';
            cpybet[cpybet.length - 1] = '_';
        }
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

            dst[dsti] = (byte) cpybet[albeti0 >> 2];
            dst[dsti + 1] = (byte) cpybet[(albeti0 & 0x3) << 4 | albeti1 >> 4];
            dst[dsti + 2] = cpy[cpyi1] != '\0' && cpyi1 != srcLen
                    ? (byte) cpybet[(albeti1 & 0xf) << 2 | albeti2 >> 6]
                    : (byte) '=';
            dst[dsti + 3] = cpy[cpyi2] != '\0' && cpyi2 != srcLen + 1
                    ? (byte) cpybet[albeti2 & 0x3f]
                    : (byte) '=';
            if (isURL) {
                replace(dst, (byte) '-', (byte) '+');
                replace(dst, (byte) '_', (byte) '/');
            }
        }
        return dst;
    }

    private static void replace(byte[] src, byte oldc, byte newc) {
        for (int i = 0; i < src.length; i++) {
            if (src[i] == oldc) {
                src[i] = newc;
            }
        }
    }


    public static void main(String[] args) throws Exception {

        System.out.println("https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&tn=baidu&wd=vscode%E5%BF%AB%E9%80%9F%E5%A4%8D%E5%88%B6%E5%BD%93%E5%89%8D%E4%BB%A3%E7%A0%81%E5%88%B0%E4%B8%8B%E4%B8%80%E8%A1%8C&oq=masm%2526lt%253B2%25E8%25BF%2590%25E8%25A1%258C%25E6%25B1%2587%25E7%25BC%2596&rsv_pq=bc5c89dc00058fcb&rsv_t=052cR8KOSpr0009M%2Bk9d0SgMTNWVOXCCdYDGqYkWaUJgy8v5I97gP%2BkYtr4&rqlang=cn&rsv_enter=1&rsv_dl=ts_1&rsv_btype=t&inputT=24907&rsv_sug3=640&rsv_sug1=442&rsv_sug7=100&rsv_sug2=1&prefixsug=VS%2520%2526lt%253Bodekuaisu&rsp=1&rsv_sug4=24907".equals("https://www.baidu.com/s?ie=utf-8&f=3&" +
                "rsv_bp=1&tn=baidu&wd=vscode%E5%BF%" +
                "AB%E9%80%9F%E5%A4%8D%E5%88%B6%E5%BD%9" +
                "3%E5%89%8D%E4%BB%A3%E7%A0%81%E5%88%B0%E4%" +
                "B8%8B%E4%B8%80%E8%A1%8C&oq=masm%2526lt%253B2%" +
                "25E8%25BF%2590%25E8%25A1%258C%25E6%25B1%2587%25E7%" +
                "25BC%2596&rsv_pq=bc5c89dc00058fcb&rsv_t=052cR8KOSp" +
                "r0009M%2Bk9d0SgMTNWVOXCCdYDGqYkWaUJgy8v5I97gP%2BkYtr4" +
                "&rqlang=cn&rsv_enter=1&rsv_dl=ts_1&rsv_btype=t&inputT=24" +
                "907&rsv_sug3=640&rsv_sug1=442&rsv_sug7=100&rsv_sug2=1&pre" +
                "fixsug=VS%2520%2526lt%253Bodekuaisu&rsp=1&rsv_sug4=24907"));

        System.out.println(
                new String(encode(
                        ("https://www.baidu.com/s?ie=utf-8&f=3&" +
                                "rsv_bp=1&tn=baidu&wd=vscode%E5%BF%" +
                                "AB%E9%80%9F%E5%A4%8D%E5%88%B6%E5%BD%9" +
                                "3%E5%89%8D%E4%BB%A3%E7%A0%81%E5%88%B0%E4%" +
                                "B8%8B%E4%B8%80%E8%A1%8C&oq=masm%2526lt%253B2%" +
                                "25E8%25BF%2590%25E8%25A1%258C%25E6%25B1%2587%25E7%" +
                                "25BC%2596&rsv_pq=bc5c89dc00058fcb&rsv_t=052cR8KOSp" +
                                "r0009M%2Bk9d0SgMTNWVOXCCdYDGqYkWaUJgy8v5I97gP%2BkYtr4" +
                                "&rqlang=cn&rsv_enter=1&rsv_dl=ts_1&rsv_btype=t&inputT=24" +
                                "907&rsv_sug3=640&rsv_sug1=442&rsv_sug7=100&rsv_sug2=1&pre" +
                                "fixsug=VS%2520%2526lt%253Bodekuaisu&rsp=1&rsv_sug4=24907").getBytes(), false)));
    }

}
