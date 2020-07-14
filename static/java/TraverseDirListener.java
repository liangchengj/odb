/**
 * Created at 2020/7/13 22:04.
 *
 * @author Liangcheng Juves
 */

import java.io.File;

/**
 * @author Liangcheng Juves
 * Created at 2020/05/23 12:08
 */
public interface TraverseDirListener {
    void onTraversing(boolean isNotSameDir, String parentDir, File file);
}
