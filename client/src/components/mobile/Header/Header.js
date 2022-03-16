import styles from './Header.module.css'
import { useRef } from 'react'

import SearchInput from '../SearchInput/SearchInput'
// import Contacts from '../Contacts/Contacts';

import { useDispatch, useSelector } from 'react-redux'
import { findUsersAction } from '../../../store/action/chat'

const Header = () => {
  const userData = useSelector((state) => state.chat.user)
  const dispatch = useDispatch()

  const userToSearchRef = useRef('')

  const searchUsers = (event) => {
    const { value } = event.target
    userToSearchRef.current = value

    dispatch(findUsersAction(value))
  }

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Chat Rooms</h1>

        <img
          className={styles.avatar}
          src={userData.avatar}
          alt={userData.fullname}
        />
      </div>

      <div className={styles.bottom}>
        <SearchInput
          userToSearch={userToSearchRef}
          searchUsersHandler={searchUsers}
        />

        {/* <Contacts /> */}
      </div>
    </header>
  )
}

export default Header
