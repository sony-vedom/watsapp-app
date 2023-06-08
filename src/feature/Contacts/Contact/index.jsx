import { useSelector } from "react-redux"

import clsx from "clsx"

import { setActiveNumber } from "@redux/reducers/active"

import styles from "./styles.module.scss"

const Contact = ({ id, active: { number }, i, previousActive, dispatch }) => {
  const chatData = useSelector((state) => state.chat.chatData)
  const chatDataSort = [...chatData[id].outgoing, ...chatData[id].incoming].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  )
  const standardizeMessage = (message) => {
    if (message.length > 40) {
      return `${message.substring(0, 40)}...`
    }
    return message
  }
  const lastMessage = chatDataSort.length > 0 ? standardizeMessage(chatDataSort[chatDataSort.length - 1].text) : " "
  return (
    <div
      className={clsx(styles.Contact, {
        [styles["Contact_active"]]: number === id,
        [styles["Contact-notActive"]]: number !== id,
      })}
      id={id}
      onClick={() => {
        dispatch(setActiveNumber(id))
      }}
    >
      <div className={styles.ContactData}>
        <p className={clsx(styles["ContactData-Item"], styles.Title)}>{`+${parseInt(id)}`}</p>
        <p className={clsx(styles["ContactData-Item"], styles.Message)}>{lastMessage}</p>
      </div>
      <div
        className={clsx(styles["Contact-Hr"], {
          [styles["Contact-Hr_active"]]: number === id || previousActive === i,
        })}
      ></div>
    </div>
  )
}

export default Contact
