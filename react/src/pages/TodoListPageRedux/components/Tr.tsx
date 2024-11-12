import { Button } from "react-bootstrap";
import { useAppDispatch } from "../../../store/store";
import { openDeleteModal, openFormModal } from "../slice";

type TrProps = {
  todo: Todo;
};

function Tr({ todo }: TrProps) {
  const dispatch = useAppDispatch();
  console.log("renderizou tr");

  return (
    <tr key={todo.id}>
      <td>{todo.id}</td>
      <td>{todo.titulo}</td>
      <td>{todo.concluido ? "Yes" : "No"}</td>
      <td className="text-end">
        <Button
          variant="secondary"
          onClick={() => dispatch(openFormModal(todo))}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="ms-1"
          onClick={() => dispatch(openDeleteModal(todo))}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Tr;
