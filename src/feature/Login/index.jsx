import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

import HeaderTotal from "@components/HeaderTotal"
import WrapperBefore from "@components/WrapperBefore"
import LoginForm from "@feature/Login/LoginForm"

import styles from "./style.module.scss"

const Login = () => {
  const {
    instance: { statusInstance, formDisabled },
    errorMessage,
  } = useSelector((state) => ({
    instance: state.instance,
    errorMessage: state.errorServerMessage.stateInstanceError,
  }))
  const dispatch = useDispatch()

  if (statusInstance === "authorized") return <Navigate to={`/`} />
  return (
    <div className={styles.AuthContainer}>
      <WrapperBefore />
      <HeaderTotal />
      <div className={styles["AuthContainer-ContentWrapper"]}>
        <main className={`${styles["AuthContainer-Content"]} ${styles.Content}`}>
          <h1 className={styles["Content-HeaderTotal"]}>Войти в Green-app</h1>
          <LoginForm
            dispatch={dispatch}
            stateInstance={statusInstance}
            formDisabled={formDisabled}
            errorMessage={errorMessage}
          />
        </main>
      </div>
    </div>
  )
}

export default Login
