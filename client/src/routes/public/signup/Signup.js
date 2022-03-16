import styles from './Signup.module.css'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { signupAction } from '../../../store/action/auth'

import Form from '../../../components/form/SignupForm'

const Signup = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    fullname: '',
    email: '',
    password: '',
    avatar: null,
  })

  const onChange = (e) => {
    const { name, value, files } = e.target

    if (files) {
      return setState((state) => ({ ...state, [name]: files[0] }))
    }

    setState((state) => ({ ...state, [name]: value }))
  }

  const signup = (event) => {
    event.preventDefault()

    const formData = new FormData()
    const { fullname, email, password, avatar } = state

    formData.append('fullname', fullname)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('avatar', avatar)

    dispatch(signupAction(formData, setState))
  }

  return (
    <div className={styles.signup}>
      <div className={styles.presentation}>
        <h1 className={styles.title}>Sign Up</h1>

        <small className={styles.description}>
          You and Your Friends always Connected
        </small>
      </div>

      <Form state={state} onChange={onChange} onSubmit={signup} />

      <div className={styles.linkContainer}>
        <span>
          Al ready have an account?{' '}
          {
            <Link className={styles.link} to="/login">
              Log in
            </Link>
          }
        </span>
      </div>
    </div>
  )
}

export default Signup
