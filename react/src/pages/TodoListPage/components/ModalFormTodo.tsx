import { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Input, { InputProps } from "../../../components/inputs/Input";
import Switch from "../../../components/inputs/Switch";
import { contextoTodoList } from "../context";

const ModalFormTodo = () => {
  const {
    setModalFormShow,
    modalItem,
    formErrors,
    formData,
    setFormData,
    modalFormShow,
    handleSubmit,
  } = useContext(contextoTodoList);

  if (!modalFormShow) {
    return;
  }

  function configureInputField(
    fieldName: keyof Todo
  ): Pick<InputProps, "onChange" | "value" | "invalidMessages"> {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [fieldName]: event.target.value });
      },
      invalidMessages: formErrors[fieldName],
      value: formData[fieldName]?.toString() || "",
    };
  }

  return (
    <Modal show={true} onHide={() => setModalFormShow(false)}>
      <Form method="post" onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          {modalItem?.id ? "Edit Todo" : "New Todo"}
        </Modal.Header>
        <Modal.Body>
          <Input {...configureInputField("titulo")} label="Title" />
          <Input {...configureInputField("descricao")} label="Description" />
          <Switch
            onChange={(e) =>
              setFormData((p) => ({ ...p, concluido: e.target.checked }))
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
