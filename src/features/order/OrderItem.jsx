import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="list-none py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-600">
          <span className="text-center text-sm font-bold text-stone-600">
            {quantity}&times;
          </span>{" "}
          {name}
        </p>
        <p className="text-sm font-semibold text-stone-700">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      {
        <span className="text-sm text-stone-500 capitalize">
          {!isLoadingIngredients ? ingredients.join(", ") : "Loading..."}
        </span>
      }
    </li>
  );
}

export default OrderItem;
