import { useEffect, useState } from "react"

import clsx from "clsx"

import { ReactComponent as SelectIcon } from "@assets/icon/select.svg"

import styles from "./style.module.scss"

const Header = ({ textOption, setShowModal }) => {
  const [isShowListOptions, setShowListOptions] = useState(false)
  useEffect(() => {
    const handlerClick = (e) => {
      if (isShowListOptions && e.target.id !== "wrapperSelectContacts" && e.target.id !== "selectContacts")
        setShowListOptions(false)
    }
    document.addEventListener("click", handlerClick)
    return () => {
      document.removeEventListener("input", handlerClick)
    }
  }, [isShowListOptions])
  return (
    <div className={styles.Header}>
      <div
        id={"wrapperSelectContacts"}
        className={clsx(styles.IconWrapper, {
          [styles.IconWrapper_active]: isShowListOptions,
        })}
        onClick={() => {
          setShowListOptions(!isShowListOptions)
        }}
      >
        <SelectIcon id={"selectContacts"} />
      </div>
      <div
        id='listOptions'
        className={clsx(styles["Header-ListOptions"], styles.ListOptions, {
          [styles.ListOptions_invisible]: !isShowListOptions,
        })}
      >
        <div
          className={styles["ListOptions-Options"]}
          onClick={() => {
            setShowModal(true)
          }}
          tabIndex='1'
          onFocus={() => {
            setShowListOptions(true)
          }}
          onBlur={() => {
            setShowListOptions(false)
          }}
        >
          {textOption}
        </div>
      </div>
    </div>
  )
}

export default Header
