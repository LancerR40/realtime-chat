import styles from './Chat.module.css'

import ChatMenu from '../../components/mobile/ChatMenu/ChatMenu'
import ChatFeed from '../../components/mobile/ChatFeed/ChatFeed'

import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { logoutAction } from '../../store/action/auth'
import {
  getUserDataAction,
  userMsgFromServerAction,
  updateContactsConnectionAction,
} from '../../store/action/chat'

import { io } from 'socket.io-client'
import { SOCKET_SERVER_ENDPOINT } from '../../constant/chat'

import recivedMessage from '../../../public/assets/sounds/src_message_received.mp3'

let socket = null

const MobileUI = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()

  const currentChat = useSelector((state) => state.chat.currentChat)

  const disconnect = () => {
    dispatch(logoutAction(push, socket))

    socket = null
  }

  useEffect(() => {
    dispatch(getUserDataAction())

    const token = localStorage.getItem('token')

    socket = io(SOCKET_SERVER_ENDPOINT, {
      query: {
        token,
      },
      transports: ['websocket'],
      upgrade: false,
    })
  }, [])

  useEffect(() => {
    socket.on('chat:message', (data) => {
      const audio = new Audio(recivedMessage)
      audio.play()

      dispatch(userMsgFromServerAction(data))
    })

    socket.on('chat:user-online', (data) => {
      dispatch(updateContactsConnectionAction(data))
    })

    socket.on('chat:user-offline', (data) => {
      dispatch(updateContactsConnectionAction(data))
    })

    return () => {
      if (socket !== null) {
        socket.off()
      }
    }
  }, [])

  const currentSection = Object.keys(currentChat).length

  return (
    <div className={styles.mobile}>
      {currentSection < 1 && <ChatMenu disconnect={disconnect} />}

      {currentSection > 0 && <ChatFeed chat={currentChat} socket={socket} />}
    </div>
  )
}

const Chat = () => <MobileUI />

export default Chat
