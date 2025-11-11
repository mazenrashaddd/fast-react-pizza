import { useState } from "react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullName = useSelector((store) => store.user.fullName);

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    dispatch(setName(username));
    setUsername("");
    navigate("/menu");
  }

  return !fullName ? (
    <form
      onSubmit={handleSubmit}
      className="mx-4 text-base text-stone-600 sm:mx-auto"
    >
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="focus:ring-primary mt-4 w-xs bg-white px-6 py-3 text-sm transition-all duration-100 not-odd:rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none"
      />

      {username !== "" && (
        <div className="my-7">
          <Button variant="primary">Start Ordering</Button>
        </div>
      )}
    </form>
  ) : (
    <div className="my-7">
      <Button onClick={() => navigate("/menu")} variant="primary">
        Continue ordering, {fullName}
      </Button>
    </div>
  );
}

export default CreateUser;
