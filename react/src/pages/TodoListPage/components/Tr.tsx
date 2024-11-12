import { useContext } from "react";
import { Button } from "react-bootstrap";
import { contextoTodoList } from "../context";

type TrProps = {
  todo: Todo;
};

function Tr({ todo }: TrProps) {
  const { openModalDelete, openModalForm } = useContext(contextoTodoList);
  console.log("renderizou tr");

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.titulo}</td>
      <td>{todo.concluido ? "Yes" : "No"}</td>
      <td className="text-end">
        <Button variant="secondary" onClick={() => openModalForm(todo)}>
          Edit
        </Button>
        <Button
          variant="danger"
          className="ms-1"
          onClick={() => openModalDelete(todo)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Tr;
