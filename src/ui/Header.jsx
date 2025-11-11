import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import { useSelector } from "react-redux";

const Header = () => {
  const fullName = useSelector((store) => store.user.fullName);
  return (
    <header className="bg-primary flex flex-wrap items-center justify-between px-8 py-3">
      <Link
        to={"/"}
        className="text-secondary font-mono text-lg tracking-wider uppercase"
      >
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {fullName && (
        <p className="hidden text-sm font-semibold text-stone-600 uppercase sm:block">
          {fullName}
        </p>
      )}
    </header>
  );
};

export default Header;
