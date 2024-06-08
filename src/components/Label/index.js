import classNames from 'classnames/bind';
import styles from './Label.module.scss';

const cx = classNames.bind(styles);
function Label({
    children,
    primary = false,
    outline = false,
    circle = false,
    onlyIcon = false,
    text = false,
    small = false,
    large = false,
    leftIcon,
    rightIcon,
    className,
    disable = false,
    ...passProps
}) {
    let Comp = 'label';
    const props = {
        ...passProps,
    };
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        circle,
        text,
        disable,
        small,
        large,
        onlyIcon,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Label;
