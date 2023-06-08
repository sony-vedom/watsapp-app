import styles from "./style.module.scss"

const FormError = ({ message }) => {
  return <div className={styles.Error}>{message}</div>
}

export default FormError
