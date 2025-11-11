import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector((store) => store.cart.cart);

  const totalCartPrice = useSelector(getTotalCartPrice);

  const finalGrandPrice = withPriority
    ? totalCartPrice + totalCartPrice * 0.2
    : totalCartPrice;

  const handleGetLocation = (e) => {
    e.preventDefault();
    dispatch(fetchAddress());
  };

  const { fullName, address, status, error } = useSelector(
    (store) => store.user,
  );

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-3 my-5 max-w-3xl sm:mx-auto">
      <h2 className="text-xl font-semibold text-stone-700">
        Ready to order? Let's go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="my-8 space-y-5">
        <div className="flex flex-row items-center justify-between">
          <label className="text-stone-700">First Name</label>
          <Input
            isRequired={true}
            name="customer"
            placeholder="Enter first name"
            type="text"
            defaultValue={fullName}
          />
        </div>

        <div className="flex flex-row items-center justify-between">
          <label className="text-stone-700">Phone Number</label>
          <div className="flex flex-col">
            <Input
              isRequired={true}
              name="phone"
              placeholder="Enter your phone number"
              type="tel"
            />
            <div className="mx-2 mt-2">
              {formErrors?.phone && (
                <p className="rounded-md bg-red-300 px-2 py-1 text-xs text-red-500">
                  {formErrors?.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <label className="text-stone-700">Address</label>
          <div className="relative">
            <Input
              isRequired={true}
              name="address"
              placeholder="Address"
              type="text"
              defaultValue={address}
            />
            <div className="mx-2 mt-2">
              {error && (
                <p className="rounded-md bg-red-300 px-2 py-1 text-xs text-red-500">
                  {error}
                </p>
              )}
            </div>
            {!address && (
              <div className="absolute end-1 top-1/8">
                <Button
                  variant="secondary"
                  onClick={handleGetLocation}
                  disabled={status === "loading"}
                >
                  Get Location
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="accent-primary h-5 w-5"
          />
          <label className="font-semibold text-stone-700" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        <div>
          <Button
            variant="primary"
            disabled={navigation.state === "submitting" || status === "loading"}
          >
            {navigation.state === "submitting"
              ? "Placing Order..."
              : `Order now From €${finalGrandPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };


  const errors = {};

  if (!isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  store.dispatch(clearCart());

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
};
export default CreateOrder;
