import { useDispatch, useSelector } from "react-redux";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  getSinglePizzaQuantity,
} from "../features/cart/cartSlice";

const UpdateItemQuantity = ({ pizzaId }) => {
  const dispatch = useDispatch();
  const quantity = useSelector(getSinglePizzaQuantity(pizzaId));
  return (
    <div className="flex items-center gap-x-3">
      <button
        className="bg-primary h-8 w-8 cursor-pointer rounded-full font-semibold"
        onClick={() => dispatch(decrementItemQuantity(pizzaId))}
      >
        -
      </button>
      <p className="text-sm font-medium">{quantity}</p>
      <button
        className="bg-primary h-8 w-8 cursor-pointer rounded-full font-semibold"
        onClick={() => dispatch(incrementItemQuantity(pizzaId))}
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
