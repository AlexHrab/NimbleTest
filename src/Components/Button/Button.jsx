import css from "./Button.module.css";
import clsx from "clsx";

export function Button({ type, credentionals, onClick, clasName }) {
  const clas = clsx(css[clasName]);
  return (
    <button type={type} onClick={onClick} className={clas}>
      {credentionals}
    </button>
  );
}
