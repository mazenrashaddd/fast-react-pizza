import { Link } from "react-router-dom";

const Button = ({ children, onClick, variant, to, disabled }) => {
  const baseClass =
    "cursor-pointer rounded-full font-semibold  uppercase transition-all duration-300";

  const styles = {
    primary:
      "bg-primary text-stone-800 hover:bg-yellow-300/80 px-5 py-4 text-sm active:ring-2 active:ring-yellow-400 active:ring-offset-2",
    secondary:
      "bg-primary text-stone-800 hover:bg-yellow-300/80 px-4 py-2 text-xs",
    negative:
      "bg-stone-100 text-stone-400 px-5 py-4 text-xs border-2 border-stone-300 hover:bg-stone-300 hover:text-stone-800",
  };

  if (to) {
    return (
      <Link className="text-sm text-blue-600" to={to}>
        {children}
      </Link>
    );
  } else if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${styles[variant]}`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  } else {
    return (
      <button className={`${baseClass} ${styles[variant]}`} disabled={disabled}>
        {children}
      </button>
    );
  }
};
export default Button;
