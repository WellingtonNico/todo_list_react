import { Button, Form, Modal } from "react-bootstrap";
import Input, { InputProps } from "../../../components/inputs/Input";
import Switch from "../../../components/inputs/Switch";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  addItem,
  setFormData,
  setFormErrors,
  setFormModalShow,
  updateItem,
} from "../slice";
import { TodosApiCrudService } from "../../../data/api/services/TodosApiService";
import { FormEvent } from "react";

const ModalFormTodo = () => {
  const dispatch = useAppDispatch();
  const apiService = new TodosApiCrudService();
  const { modalItem, formErrors, formData, modalFormShow } = useAppSelector(
    (state) => state.todos
  );

  if (!modalFormShow) {
    return;
  }

  function configureInputField(
    fieldName: keyof Todo
  ): Pick<InputProps, "onChange" | "value" | "invalidMessages"> {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormData({ ...formData, [fieldName]: event.target.value }));
      },
      invalidMessages: formErrors[fieldName],
      value: formData[fieldName]?.toString() || "",
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (modalItem?.id) {
      apiService
        .update(modalItem.id!, formData)
        .then((response) => {
          dispatch(updateItem(response));
          dispatch(setFormModalShow(false));
        })
        .catch((error) => dispatch(setFormErrors(error.response?.data)));
    } else {
      apiService
        .create(formData)
        .then((response) => {
          dispatch(addItem(response));
          dispatch(setFormModalShow(false));
        })
        .catch((error) => dispatch(setFormErrors(error.response?.data)));
    }
  }

  return (
    <Modal show={true} onHide={() => dispatch(setFormModalShow(false))}>
      <Form method="post" onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          {modalItem?.id ? "Edit Todo" : "New Todo"}
        </Modal.Header>
        <Modal.Body>
          <Input {...configureInputField("titulo")} label="Title" />
          <Input {...configureInputField("descricao")} label="Description" />
          <Switch
            onChange={(e) =>
              dispatch(
                setFormData({ ...formData, concluido: e.target.checked })
              )
            }
            checked={formData.concluido}
            invalidMessages={formErrors.concluido}
            label="Done"
            id="id_concluido"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="success">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalFormTodo;
