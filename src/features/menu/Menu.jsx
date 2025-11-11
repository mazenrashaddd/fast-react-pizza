import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();
  return (
    <div className="divide-y-2 divide-stone-300/25">
      {menuData.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
