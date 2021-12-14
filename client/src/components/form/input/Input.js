import styles from './Input.module.css';

const Input = ({ label, type, name, value, icon, placeholder, onChange }) => {
  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>

      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>

        <input
          className={styles.input}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>

      <div className={styles.line}>
        <div className={styles.completedLine}></div>
      </div>
    </div>
  );
};

export default Input;
