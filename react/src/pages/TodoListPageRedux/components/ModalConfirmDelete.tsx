import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { removeItem, setDeleteModalShow } from "../slice";
import { TodosApiCrudService } from "../../../data/api/services/TodosApiService";

const ModalConfirmDelete = () => {
  const dispatch = useAppDispatch();
  const { modalDeleteShow, modalItem } = useAppSelector((state) => state.todos);

  if (!modalDeleteShow || !modalItem) {
    return;
  }
  const apiService = new TodosApiCrudService();
  function handleDelete() {
    apiService.delete(modalItem!.id!).then(() => {
      dispatch(removeItem(modalItem!.id!));
      dispatch(setDeleteModalShow(false));
    });
  }

  return (
    <Modal show={true} onHide={() => dispatch(setDeleteModalShow(false))}>
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
