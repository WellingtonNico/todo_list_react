import { Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import { contextoTodoList } from "../context";

const ModalConfirmDelete = () => {
  const { setModalDeleteShow, modalItem, handleDelete, modalDeleteShow } =
    useContext(contextoTodoList);

  if (!modalDeleteShow && !modalItem) {
    return;
  }

  return (
    <Modal onHide={() => setModalDeleteShow(false)}>
      <Modal.Header closeButton>Delete Todo</Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the todo "{modalItem!.titulo}"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmDelete;
