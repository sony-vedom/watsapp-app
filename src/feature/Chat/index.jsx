import { useState } from "react"
import { useEffect, useRef } from "react"

import ModalWarning from "@components/ModalWarning"
import Messages from "@feature/Messages"
import SendMessageForm from "@feature/SendMessageForm"

import styles from "./style.module.scss"

const Chat = ({ active, messages }) => {
  const [heightForm, setHeightForm] = useState("" | 0)
  const [heightChat, setHeightChat] = useState("" | 0)

  const ref = useRef()
  useEffect(() => {
    setHeightChat(ref.current.clientHeight)
  }, [ref.current?.clientHeight])
  return (
    <div className={styles.Chat} ref={ref}>
      <div className={styles.Header}>
        <div className={styles["HeaderTotal-ContactData"]}>{`+${parseInt(active.number)}`}</div>
      </div>
      <Messages heightChat={heightChat} heightForm={heightForm} messages={messages} />
      <SendMessageForm setHeightForm={setHeightForm} />
      <ModalWarning />
    </div>
  )
}

export default Chat
