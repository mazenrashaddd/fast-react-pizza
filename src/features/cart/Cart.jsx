import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useSelector((store) => store.cart.cart);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((store) => store.user.fullName);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-8 my-3 flex max-w-2xl flex-col gap-4 sm:mx-auto">
      <Button to="/menu">&larr; Back to menu</Button>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-stone-700">
          Your cart, {userName}
        </h2>

        <div className="divide-y-2 divide-stone-200">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </div>

        <div className="space-x-4">
          <Button variant="primary" onClick={() => naviagte("/order/new")}>
            Order pizzas
          </Button>
          <Button variant="negative" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
