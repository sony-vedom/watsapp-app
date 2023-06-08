import { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { useSelector } from "react-redux"

const ModalError = ({ statusInstance }) => {
  const [show, setShow] = useState(false)

  const errorMessages = useSelector((state) => state.errorServerMessage.stateInstanceError)

  useEffect(() => {
    statusInstance !== "authorized" ? setShow(true) : setShow(false)
  }, [statusInstance])

  return (
    <>
      <Modal show={show} backdrop='static' keyboard={false}>
        <Modal.Header>
          <Modal.Title className='text-danger'>Состояние аккаунта изменилось</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessages[statusInstance]}</Modal.Body>
        <Modal.Footer className='fw-light fst-italic text-center pb-2'>
          Уведомление пропадет самостоятельно, как только состояние аккаунта перейдет в значение "авторизован"
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalError
