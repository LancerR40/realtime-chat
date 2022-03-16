import styles from './ChatFeed.module.css'
import PropTypes from 'prop-types'

import Header from './Header'
import Message from './Message'
import MessageInput from '../MessageInput/MessageInput'

import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessageAction } from '../../../store/action/chat'

import { formatTimestamp } from '../../../utils/date'

import sendMessageSound from '../../../../public/assets/sounds/src_message_sent.mp3'

const ChatFeed = ({ chat, socket }) => {
  const dispatch = useDispatch()

  const currentChat = useSelector((state) => state.chat.currentChat)
  const messages = useSelector((state) => state.chat.currentChat.chat)

  const chatContainer = useRef('')
  const [messageText, setMessageText] = useState('')

  const messageTextHandler = (event) => {
    const { value } = event.target
    setMessageText(value)
  }

  const sendMessage = () => {
    if (messageText === '') {
      return
    }

    const message = {
      incomingUserId: currentChat.id,
      messageContent: messageText,
    }

    dispatch(sendMessageAction(message, socket))

    const audio = new Audio(sendMessageSound)
    audio.play()

    setMessageText('')
  }

  useEffect(() => {
    const { current: DOMElement } = chatContainer

    DOMElement.scrollTop = DOMElement.scrollHeight
  }, [messages])

  const renderMessages = messages?.map((message, index) =>
    message.outgoingUserId !== currentChat.id ? (
      <Message
        key={index}
        type="outgoing"
        text={message.content}
        time={formatTimestamp(message.datetime)}
      />
    ) : (
      <Message
        key={index}
        type="incoming"
        text={message.content}
        time={formatTimestamp(message.datetime)}
      />
    )
  )

  return (
    <>
      <Header userData={chat} />

      <div className={styles.chat} ref={chatContainer}>
        {renderMessages}
      </div>

      <MessageInput
        sendMessage={sendMessage}
        text={messageText}
        onChange={messageTextHandler}
      />
    </>
  )
}

ChatFeed.propTypes = {
  chat: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
}

export default ChatFeed
