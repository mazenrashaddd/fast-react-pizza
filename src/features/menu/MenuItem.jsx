import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart } from "../cart/cartSlice";
import DeleteItem from "../../ui/DeleteItem";
import UpdateItemQuantity from "../../ui/updateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const cart = useSelector(getCart);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const isInCart = cart.find((item) => item.pizzaId === id);

  const handleAddToCart = () => {
    dispatch(addItem(id, name, unitPrice));
  };

  return (
    <li key={id} className="mx-auto flex max-w-3xl space-x-3 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col justify-between">
        <div>
          <p>{name}</p>
          <p className="text-sm text-stone-500 capitalize italic">
            {ingredients.join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-stone-600">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase">Sold out</p>
          )}
          <div className="flex items-center gap-3">
            {!soldOut &&
              (isInCart ? (
                <div className="flex gap-3">
                  <UpdateItemQuantity pizzaId={id}/>
                  <DeleteItem pizzaId={id} />
                </div>
              ) : (
                <Button variant="secondary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
