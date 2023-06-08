import { Button } from "react-bootstrap"
import Modal from "react-bootstrap/Modal"
import { useDispatch, useSelector } from "react-redux"

import { handleNoAccountError } from "@redux/reducers/chat"

const ModalWarning = () => {
  const { isNoAccountError } = useSelector((state) => state.chat.noAccountError)
  const handleClose = () => {
    dispatch(handleNoAccountError())
  }
  const dispatch = useDispatch()
  return (
    <>
      <Modal show={isNoAccountError} backdrop='static' keyboard={false}>
        <Modal.Header>
          <Modal.Title className='text-danger text-center'>
            На номере телефона получателя не зарегистрирован аккаунт WhatsApp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          Удалить номер из списка контактов?
          <div className='mx-auto'>
            <Button variant='primary' className='m-2' onClick={handleClose}>
              Да
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalWarning
