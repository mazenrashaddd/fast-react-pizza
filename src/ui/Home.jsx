import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="flex flex-col gap-y-10 bg-stone-100 pt-20 text-center text-3xl">
      <h1 className="mx-auto max-w-2xl font-semibold text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
