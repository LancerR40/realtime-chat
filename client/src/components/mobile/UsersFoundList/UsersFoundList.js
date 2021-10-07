import styles from './UsersFoundList.module.css';

const UsersFoundList = ({ list, display }) => {
  return (
    <div className={styles.usersFoundList}>
      {display === true && (
        <>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Users found</h2>
          </div>

          {list.map((user) => (
            <div className={styles.user} key={user.cell}>
              <img
                className={styles.img}
                src={user.picture.medium}
                alt="Fake"
              />

              <span className={styles.name}>{user.name.first}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UsersFoundList;
