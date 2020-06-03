import java.lang.reflect.Field;

/**
 * @author Liangcheng Juves
 * Created at 2020/06/01 22:27
 */
public abstract class Abstract {
    protected Abstract() {
        for (Field field : getClass().getDeclaredFields()) {
            field.setAccessible(true);
            if (field.isAnnotationPresent(V.class)) {
                V v = field.getAnnotation(V.class);
                try {
                    field.set(this, "" + v.value());
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
                System.out.println(v.value());
                try {
                    System.out.println(field.get(this));
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
