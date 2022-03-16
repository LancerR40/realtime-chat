import styles from './Button.module.css'
import PropTypes from 'prop-types'

import Loader from '../loader/Loader'

const Button = ({ title, withAnimation }) => {
  return (
    <button className={styles.button} type="submit">
      {withAnimation && <Loader />}

      {!withAnimation && title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  withAnimation: PropTypes.bool,
}

export default Button
