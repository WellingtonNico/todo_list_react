import { createContext } from "react";
import { CrudContextType } from "../../contexts/crud_context";

export const contextoTodoList = createContext<CrudContextType<Todo>>(
  {} as CrudContextType<Todo>
);
