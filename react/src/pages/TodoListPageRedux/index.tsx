import { Button, Container, Table } from "react-bootstrap";
import Tbody from "./components/Tbody";
import ModalFormTodo from "./components/ModalFormTodo";
import ModalConfirmDelete from "./components/ModalConfirmDelete";
import { useAppDispatch } from "../../store/store";
import { openFormModal, setIsLoading, setItems } from "./slice";
import { TodosApiCrudService } from "../../data/api/services/TodosApiService";
import { useEffect } from "react";

const TodoListPageRedux = () => {
  const dispatch = useAppDispatch();

  const apiService = new TodosApiCrudService();
  const fetchItems = async () => {
    apiService
      .getAll()
      .then((response) => dispatch(setItems(response)))
      .finally(() => dispatch(setIsLoading(false)));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  console.log("renderizou todo list content");
  return (
    <>
      <Container fluid>
        <h1>Todo list with Redux</h1>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Done</th>
              <th className="text-end">
                <Button
                  variant="primary"
                  onClick={() => dispatch(openFormModal())}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <Tbody />
        </Table>
      </Container>

      <ModalFormTodo />

      <ModalConfirmDelete />
    </>
  );
};

export default TodoListPageRedux;
