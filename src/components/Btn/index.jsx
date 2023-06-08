import { Button } from "react-bootstrap"

import clsx from "clsx"

import styles from "./style.module.scss"

const Btn = ({ disabled, variant, className, children }) => {
  return (
    <Button
      variant={variant}
      className={clsx(styles.Btn, {
        [styles["Btn_loginForm"]]: className === "AuthForm",
      })}
      type='submit'
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default Btn
