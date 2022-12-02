import classNames from 'classnames';
import styles from './A11yHidden.module.css';

interface Props {
  as?: any;
  focusable?: boolean;
  className?: string;
  [key: string]: unknown;
}

export function A11yHidden({
  as: ComponentName,
  focusable,
  className,
  ...restProps
}: Props) {
  return (
    <ComponentName
      className={classNames(
        styles.srOnly,
        {
          [styles.focusable]: focusable,
        },
        className
      )}
      {...restProps}
    />
  );
}

A11yHidden.defaultProps = {
  as: 'span',
  focusable: false,
};
