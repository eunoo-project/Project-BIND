import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  size?: 'small' | 'big' | 'long';
  content?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
}

const darkMode = 'dark:bg-black dark:shadow-dark';

export const Button = ({
  size,
  content,
  className,
  as,
  ...args
}: ButtonProps) => {
  const TagName = as || 'button';
  return (
    <>
      <TagName
        className={classNames(
          styles.button,
          styles['button-' + size],
          className,
          darkMode
        )}
        {...args}>
        {content && content.length < 4 ? content?.split('').join(' ') : content}
      </TagName>
    </>
  );
};
