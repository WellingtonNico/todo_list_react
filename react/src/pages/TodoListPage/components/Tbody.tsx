import { useContext } from "react";
import Tr from "./Tr";
import { contextoTodoList } from "../context";

const Tbody = () => {
  const { items } = useContext(contextoTodoList);
  console.log("renderizou tbody");
  return (
    <tbody>
      {items.map((todo) => (
        <Tr key={todo.id} todo={todo} />
      ))}
    </tbody>
  );
};

export default Tbody;
