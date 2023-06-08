import clsx from "clsx"

import styles from "./styles.module.scss"

const WrapperBefore = ({ main, invisible }) => {
  return (
    <div
      className={clsx(styles.WrapperBefore, {
        [styles.WrapperBefore_main]: main,
        [styles.WrapperBefore_invisible]: invisible,
      })}
    ></div>
  )
}

export default WrapperBefore
