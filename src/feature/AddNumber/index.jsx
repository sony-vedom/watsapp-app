import { useState } from "react"
import { Button, Modal } from "react-bootstrap"

import AddNumberForm from "@feature/AddNumber/AddNumberForm"

import styles from "./style.module.scss"

const AddNumber = ({ isShowModal, setShowModal }) => {
  const [isDisabled, setDisabled] = useState()
  return (
    <Modal show={isShowModal} className={styles.Modal} onHide={() => setShowModal(false)} backdrop='static'>
      <Modal.Header className={styles["Modal-Header"]}>
        <Modal.Title>
          Введите номер <br /> в <strong>международном</strong> формате
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddNumberForm isShowModal={isShowModal} setShowModal={setShowModal} setDisabled={setDisabled} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShowModal(false)}>
          Отмена
        </Button>
        <Button form='add-number' type='submit' disabled={isDisabled} variant='primary'>
          Добавить номер
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddNumber
