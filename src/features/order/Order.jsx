// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder, updateOrder } from "../../services/apiRestaurant";
import CartItem from "../cart/CartItem";
import OrderItem from "./OrderItem";
import Button from "../../ui/Button";
import { useEffect } from "react";

// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

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

// const fakeItem = {
//   pizzaId: 11,
//   name: "Spinach and Mushroom",
//   quantity: 1,
//   unitPrice: 15,
//   totalPrice: 15,
// };

function Order() {
  const orderData = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    fetcher.load("/menu");
  }, []);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = orderData;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mx-8 my-5 max-w-3xl space-y-5 sm:mx-auto">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h2 className="text-2xl font-semibold text-stone-600">{`Order #${id} Status`}</h2>

        <div className="flex flex-row items-center gap-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-sm font-semibold text-stone-100 uppercase">
              Priority
            </span>
          )}{" "}
          <span className="rounded-full bg-green-500 px-2 py-1 text-sm font-semibold text-stone-100 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between bg-stone-200 px-3 py-5 sm:flex-row sm:items-center">
        <p className="font-medium text-stone-700">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <div className="divide-y divide-stone-200">
        {cart.map((item) => {
          return (
            <OrderItem
              key={item.pizzaId}
              item={item}
              isLoadingIngredients={fetcher?.state === "loading"}
              ingredients={
                fetcher?.data?.find((pizza) => pizza?.id === item.pizzaId)
                  .ingredients || []
              }
            />
          );
        })}

        {/* {Array.from({ length: 2 }, (_, i) => (
          <OrderItem
            key={i}
            item={fakeItem}
            ingredients={fakeItem.ingredients}
          />
        ))} */}
      </div>

      <div className="flex flex-col justify-between gap-y-2 bg-stone-200 px-3 py-5">
        <p className="text-sm font-medium text-stone-500">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-medium text-stone-700">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && (
        <div className="flex justify-end">
          <fetcher.Form method="PATCH">
            <Button variant="primary">Make Priority</Button>
          </fetcher.Form>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId);
  return order;
};

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ params }) => {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
};

export default Order;
