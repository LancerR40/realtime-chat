import styles from './Input.module.css';
import PropTypes from 'prop-types';

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

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
