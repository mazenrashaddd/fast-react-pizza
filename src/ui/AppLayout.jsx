import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="font-primary grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="bg-stone-100 overflow-y-auto">
        <Outlet />
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
