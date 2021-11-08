import styles from './UsersFoundList.module.css';

const UsersFoundList = ({ list, display }) => {
  return (
    <div className={styles.usersFoundList}>
      {display === true && (
        <>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Users found</h2>
          </div>

          {console.log(list)}

          {list.map((user) => (
            <div className={styles.user} key={user.id}>
              <img
                className={styles.img}
                src={user.avatar}
                alt={user.fullname}
              />

              <span className={styles.name}>{user.fullname}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UsersFoundList;
