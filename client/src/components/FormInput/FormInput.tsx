import styles from './FormInput.module.css';

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  onChange?: (e: React.SyntheticEvent) => void;
  [key: string]: unknown;
}

export const FormInput = ({
  type,
  name,
  label,
  placeholder,
  onChange,
}: FormInputProps) => {
  return (
    <div className={styles.conatiner}>
      <input
        type={type}
        name={name}
        id={name}
        className={styles.input}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
        required
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    </div>
  );
};
