import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import clsx from "clsx"

import hooks from "@/hooks/"

import { setIsUpdateNotification } from "@redux/reducers/notifications"

import Background from "@components/Background"
import HeaderTotal from "@components/HeaderTotal"
import ModalError from "@components/ModalError"
import WrapperBefore from "@components/WrapperBefore"
import Chat from "@feature/Chat"
import Contacts from "@feature/Contacts"

import styles from "./style.module.scss"

const MainContent = () => {
  const dispatch = useDispatch()
  const { active, chatData, idInstance, apiTokenInstance, isUpdateNotification, statusInstance } = useSelector(
    (state) => ({
      active: state.active,
      chatData: state.chat.chatData,
      idInstance: state.auth.idInstance,
      apiTokenInstance: state.auth.apiTokenInstance,
      isUpdateNotification: state.notifications.isUpdateNotification,
      statusInstance: state.instance.statusInstance,
    }),
  )

  const isNotDesktop = hooks.useResultMediaQuery() !== "Desktop"
  useEffect(() => {
    if (!isUpdateNotification && statusInstance === "authorized") {
      dispatch(setIsUpdateNotification(true))
    }
  }, [isUpdateNotification, statusInstance, dispatch])
  let messages = []
  if (active.number) {
    messages = [...chatData[active.number]?.outgoing, ...chatData[active.number]?.incoming]?.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    )
  }
  const contacts = chatData ? Object.keys(chatData) : []

  if (!idInstance && !apiTokenInstance) return <Navigate to={`/`} />

  return (
    <div
      className={clsx(styles.MainContentContainer, {
        [styles["MainContentContainer-MainContent_stretching"]]: isNotDesktop,
      })}
    >
      <WrapperBefore main={true} invisible={isNotDesktop} />
      <HeaderTotal invisible={isNotDesktop} mainPage={true} />
      <div className={styles["MainContentContainer-Background"]}></div>
      <div
        className={clsx(styles["MainContentContainer-MainContent"], {
          [styles["MainContentContainer-MainContent_stretching"]]: isNotDesktop,
        })}
      >
        <Contacts active={active} contacts={contacts} messages={messages} />
        {active.number ? <Chat messages={messages} active={active} /> : <Background />}
      </div>
      <ModalError statusInstance={statusInstance} />
    </div>
  )
}

export default MainContent
