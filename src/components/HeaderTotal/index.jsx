import Navbar from "react-bootstrap/Navbar"

import clsx from "clsx"

import logo from "@assets/image/logo.png"

import styles from "./style.module.scss"

const HeaderTotal = ({ mainPage, invisible }) => {
  return (
    <Navbar
      variant='dark'
      className={clsx(styles.Header, {
        [styles.Header_mainPage]: mainPage,
        [styles.Header_invisible]: invisible,
      })}
    >
      <div
        className={clsx(styles.Logo, {
          [styles.Logo_mainPage]: mainPage,
        })}
      >
        <div className={clsx(styles["Logo-Icon"], styles.WrapperLogoIcon)}>
          <img className={styles["WrapperLogoIcon-Img"]} alt={"logo"} src={logo} />
        </div>
        <Navbar.Brand href='https://green-api.com/index.html' target='_blank' className={styles["Logo-BrandName"]}>
          GREEN-APP
        </Navbar.Brand>
      </div>
    </Navbar>
  )
}

export default HeaderTotal
