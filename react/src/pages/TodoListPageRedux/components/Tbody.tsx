import Tr from "./Tr";
import { useAppSelector } from "../../../store/store";

const Tbody = () => {
  const items = useAppSelector((state) => state.todos.items);
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
