import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function EmptyCart() {
  return (
    <div className="mx-auto py-3 max-w-xl">
      <Button to="/menu">&larr; Back to menu</Button>

      <p className="font-semibold mt-7">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
