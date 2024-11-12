import { useAppSelector } from "../../../store/store";

/**
 * @returns A component with screen width
 */
const WindowWidthDisplay = () => {
  const windowWidth = useAppSelector((state) => state.app.windowWidth);
  return <legend>Window Width: {windowWidth}</legend>;
};

export default WindowWidthDisplay;
