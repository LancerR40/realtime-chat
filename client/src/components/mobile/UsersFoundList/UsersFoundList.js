import styles from './UsersFoundList.module.css'
import PropTypes from 'prop-types'

const UsersFoundList = ({ list, setChat }) => (
  <div className={styles.usersFoundList}>
    {list.length && (
      <>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Users found</h2>
        </div>

        {list.map((user) => (
          <div
            className={styles.user}
            key={user.id}
            onClick={() => setChat(user)}
          >
            <img className={styles.img} src={user.avatar} alt={user.fullname} />

            <span className={styles.name}>{user.fullname}</span>
          </div>
        ))}
      </>
    )}
  </div>
)

UsersFoundList.propTypes = {
  list: PropTypes.array.isRequired,
  setChat: PropTypes.func.isRequired,
}

export default UsersFoundList
