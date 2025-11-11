const Input = ({ type, placeholder, isRequired, name, defaultValue }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={isRequired}
      defaultValue={defaultValue}
      className="focus:ring-primary w-fit rounded-full border-2 border-stone-300 bg-white px-4 py-2 text-stone-700 placeholder:text-sm focus:border-transparent focus:ring-2 focus:outline-none sm:mx-0 sm:w-xl"
    />
  );
};

export default Input;
