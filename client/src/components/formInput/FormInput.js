import styles from './FormInput.module.css';

const FormInput = ({
  label,
  Icon,
  type,
  name,
  handler,
  placeholder,
  isAvatar,
  SecondIcon,
  previewAvatar,
}) => (
  <div className={styles.inputGroup}>
    <label className={styles.label}>{label}</label>

    <div className={styles.inputContainer}>
      {<Icon className={styles.icon} />}

      {isAvatar === false && (
        <input
          className={styles.input}
          type={type}
          name={name}
          onChange={handler}
          placeholder={placeholder}
        />
      )}

      {isAvatar === true && (
        <div className={styles.uploadButton}>
          <span className={styles.uploadText}>
            {previewAvatar !== null ? 'Selected avatar' : 'Upload avatar...'}
          </span>
          <input
            className={styles.uploadInput}
            type="file"
            accept="images/*"
            name="avatar"
            onChange={handler}
          />
          {previewAvatar !== null && (
            <SecondIcon
              style={{ color: 'green', position: 'absolute', right: 0 }}
            />
          )}
        </div>
      )}
    </div>

    <div className={styles.outsideLine}>
      <div className={styles.insideLine}></div>
    </div>
  </div>
);

export default FormInput;
