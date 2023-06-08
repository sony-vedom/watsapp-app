import { ReactComponent as BackgroundPicture } from "@assets/image/devices.svg"

import styles from "./style.module.scss"

const Background = () => {
  return (
    <div className={styles.BackgroundContainer}>
      <div className={styles.Background}>
        <div>
          <BackgroundPicture />
          <h1 className={styles["Background-Head"]}>Green-App Web</h1>
          <p className={styles["Background-description"]}>
            Отправляйте и получайте сообщения через стабильный шлюз WhatsApp Green API
          </p>
          <p className={styles["Background-description"]}> Добавьте номер телефона слева </p>
          <p className={styles["Background-description"]}> и начните писать сообщение! </p>
        </div>
      </div>
    </div>
  )
}

export default Background
