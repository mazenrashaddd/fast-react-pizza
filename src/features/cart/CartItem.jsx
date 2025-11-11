import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "../../ui/DeleteItem";
import UpdateItemQuantity from "../../ui/updateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex list-none justify-between py-3 text-stone-600">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-x-4">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity pizzaId={pizzaId} />

        <div>
          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
