import { useDispatch } from "react-redux";
import Button from "./Button";
import { removeItem } from "../features/cart/cartSlice";

const DeleteItem = ({ pizzaId }) => {
  const dispatch = useDispatch();
  return (
    <Button variant="secondary" onClick={() => dispatch(removeItem(pizzaId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
