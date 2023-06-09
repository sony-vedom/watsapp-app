import { useEffect, useRef, useState } from "react"

import clsx from "clsx"

import hooks from "@/hooks/"

import { ReactComponent as DownIcon } from "@assets/icon/down.svg"
import Message from "@feature/Messages/Message"

import styles from "./style.module.scss"

const Messages = ({ messages, heightChat, heightForm }) => {
  const TypeDevise = hooks.useResultMediaQuery()

  const container = useRef(null)

  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight
  }, [messages])

  const [height, setHeight] = useState()
  useEffect(() => {
    const myHeightForm = heightForm < 100 ? 100 : heightForm
    TypeDevise === "Desktop"
      ? setHeight(heightChat - 50 - myHeightForm)
      : setHeight(window.innerWidth - 400 - myHeightForm)
  }, [heightChat, TypeDevise, heightForm])

  return (
    <div className={styles.MessagesContainer} style={{ height: `${height}px` }}>
      <div
        className={clsx(styles["MessagesContainer-Messages"], {
          [styles["MessagesContainer-Messages_tabletOrMobile"]]: TypeDevise === "Tablet" || TypeDevise === "Mobile",
        })}
        ref={container}
      >
        {messages.map(({ type, id, timestamp, text, status }) => {
          return (
            <Message outgoing={type === "outgoing"} id={id} key={id} status={status} timestamp={timestamp}>
              {text}
            </Message>
          )
        })}
      </div>
      <div
        className={styles["MessagesContainer-DownButtonContainer"]}
        onClick={() => {
          container.current.scrollTop = container.current.scrollHeight
        }}
      >
        <span>
          <div role='button' tabIndex='0' aria-label='Прокрутить вниз' className={styles.DownButton} data-tab='7'>
            <span data-testid='down' data-icon='down' className='_28HTg'>
              <DownIcon />
            </span>
          </div>
        </span>
      </div>
    </div>
  )
}

export default Messages
