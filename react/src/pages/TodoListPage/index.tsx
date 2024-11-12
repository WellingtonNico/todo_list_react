import { Button, Container, Table } from "react-bootstrap";
import Tbody from "./components/Tbody";
import { CrudContextProvider } from "../../contexts/crud_context";
import { TodosApiCrudService } from "../../data/api/services/TodosApiService";
import { contextoTodoList } from "./context";
import ModalFormTodo from "./components/ModalFormTodo";
import ModalConfirmDelete from "./components/ModalConfirmDelete";
import { useContext } from "react";

const TodoListContent = () => {
  const { openModalForm } = useContext(contextoTodoList);

  console.log("renderizou todo list content");

  return (
    <>
      <Container fluid>
        <h1>Todo list with Context Manager</h1>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Done</th>
              <th className="text-end">
                <Button variant="primary" onClick={() => openModalForm()}>
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

const TodoListPage = () => {
  return (
    <CrudContextProvider<Todo>
      context={contextoTodoList}
      apiService={new TodosApiCrudService()}
    >
      <TodoListContent />
    </CrudContextProvider>
  );
};

export default TodoListPage;
