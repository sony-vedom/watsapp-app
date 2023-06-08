import { useEffect, useRef, useState } from "react"

import clsx from "clsx"

import { ReactComponent as CheckMessage } from "@assets/icon/check.svg"
import { ReactComponent as LoaderMessage } from "@assets/icon/clock.svg"

import styles from "./style.module.scss"

const Message = ({ outgoing, timestamp, children, status }) => {
  const myDate = new Date(timestamp * 1000)
  const standardizeTime = (time) => {
    if (String(time).length === 1) {
      return `0${time}`
    }
    return time
  }
  const ref = useRef()
  const [isBigMessage, setIsBigMessage] = useState(false)
  useEffect(() => {
    const widthEl = ref.current?.offsetWidth + 94
    const maxWidth = Math.round(window.innerWidth * 0.3)
    widthEl >= maxWidth ? setIsBigMessage(true) : setIsBigMessage(false)
  }, [ref.current?.innerWidth])
  return (
    <div className={styles.MessageContainer}>
      <div
        className={clsx(styles["MessageContainer-Message"], styles.Message, {
          [styles["MessageContainer-Message_outgoing"]]: outgoing,
          [styles["Message_outgoing"]]: outgoing,
          [styles["Message_bigMessage"]]: isBigMessage,
        })}
      >
        <div
          className={clsx(styles["Message-Body"], {
            [styles["Message-Body_bigMessage"]]: isBigMessage,
          })}
          ref={ref}
        >
          {children}
        </div>
        <div
          className={clsx(styles.Data, {
            [styles["Data_outgoing"]]: outgoing,
          })}
        >
          <div>{standardizeTime(myDate.getHours()) + ":" + standardizeTime(myDate.getMinutes())}</div>
          {outgoing && (
            <div
              className={clsx(styles["Data-Icon"], {
                [styles["Data-Icon_changeColor"]]: status === "read",
              })}
            >
              {status === "sent" ? <LoaderMessage /> : <CheckMessage />}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
