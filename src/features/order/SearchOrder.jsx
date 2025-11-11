import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    navigate(`/order/${searchQuery}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ring:ring-yellow-100 w-[200px] rounded-full bg-yellow-100 px-3 py-1 ring-offset-1 transition-all duration-300 sm:focus:w-3xs focus:outline-none placeholder:text-stone-400/85 placeholder:text-sm"
        placeholder="Search order #"
      />
    </form>
  );
};
export default SearchOrder;
