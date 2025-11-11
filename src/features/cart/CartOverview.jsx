import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalNumberOfPizzas } from "./cartSlice";

function CartOverview() {
  const totalPrices = useSelector(getTotalCartPrice);
  const numOfPizzas = useSelector(getTotalNumberOfPizzas);

  if (!numOfPizzas) return null;

  return (
    <div className="flex justify-between bg-stone-800 px-5 py-5 text-stone-200 uppercase">
      <p className="flex items-center space-x-3 font-medium tracking-wide">
        <span>
          {numOfPizzas} pizza{numOfPizzas > 1 ? "s" : ""}
        </span>
        <span>{formatCurrency(totalPrices)}</span>
      </p>
      <Link to={"/cart"}>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
