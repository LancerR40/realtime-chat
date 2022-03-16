import styles from './Input.module.css'
import PropTypes from 'prop-types'

const InputAvatar = ({
  label,
  type,
  name,
  value,
  icon,
  placeholder,
  onChange,
}) => {
  const fontColor = value === null ? 'lightslategrey' : 'black'

  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>

      <div className={styles.container}>
        <div className={styles.icon}>{icon}</div>

        <div className={styles.inputAvatarContainer}>
          <span className={styles.uploadText} style={{ color: fontColor }}>
            {placeholder}
          </span>

          <input
            className={styles.inputAvatar}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
          />
        </div>
      </div>

      <div className={styles.line}>
        <div className={styles.completedLine}></div>
      </div>
    </div>
  )
}

InputAvatar.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: (props) => {
    if (props === null || props !== null) {
      return
    }
  },
  icon: PropTypes.node,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InputAvatar
