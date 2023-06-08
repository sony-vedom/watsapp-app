import { Suspense, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"

import clsx from "clsx"

import hooks from "@/hooks/"

import { setActiveNumber } from "@redux/reducers/active"

import { ReactComponent as LoaderIcon } from "@assets/icon/loader.svg"
import Header from "@components/Header"
import AddNumber from "@feature/AddNumber"
import Contact from "@feature/Contacts/Contact"

import styles from "./style.module.scss"

const Contacts = ({ active, contacts, messages }) => {
  const TypeDevise = hooks.useResultMediaQuery()

  const [isShowModal, setShowModal] = useState(false)
  const [height, setHeight] = useState("" | 0)
  const [isShowScrollbar, setShowScrollbar] = useState("" | 0)

  const dispatch = useDispatch()
  const scrollElement = useRef()
  useEffect(() => {
    if (!active.number && contacts[0]) {
      dispatch(setActiveNumber(contacts[0]))
    }
  }, [active, contacts])
  useEffect(() => {
    const scrollHeight = scrollElement.current?.scrollHeight ?? 0
    ;(async () => {
      await setHeight(0)
      await setHeight(`${scrollHeight}px`)
    })()
  }, [scrollElement.current?.scrollHeight])

  const previousActive = contacts.indexOf(active.number) - 1

  return (
    <div
      className={clsx(styles["ContactsContainer"], {
        [styles["ContactsContainer_widthTablet"]]: TypeDevise === "Tablet",
        [styles["ContactsContainer_widthMobile"]]: TypeDevise === "Mobile",
      })}
    >
      <AddNumber isShowModal={isShowModal} setShowModal={setShowModal} />
      <Header textOption={"Добавить номер"} setShowModal={setShowModal} />
      <Suspense fallback={<LoaderIcon />}>
        <div
          ref={scrollElement}
          onMouseOut={() => {
            setShowScrollbar(false)
          }}
          onMouseOver={() => {
            setShowScrollbar(true)
          }}
          className={clsx(styles["ContactsContainer-Contacts"], styles.Contacts, {
            [styles["Contacts_scrollbarHidden"]]: !isShowScrollbar,
            [styles["Contacts_desktop"]]: TypeDevise === "Desktop",
          })}
          style={{ height }}
        >
          {contacts.map((contact, i) => (
            <Contact
              id={contact}
              key={contact}
              i={i}
              previousActive={previousActive}
              active={active}
              messages={messages}
              dispatch={dispatch}
            />
          ))}
        </div>
      </Suspense>
    </div>
  )
}

export default Contacts
