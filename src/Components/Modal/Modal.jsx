import css from "./Modal.module.css";
import clsx from "clsx";
import { AiOutlineCloseCircle } from "react-icons/ai";

export function Modal({ children, clasName, setActive }) {
  const clas = clsx(css[clasName]);

  return (
    <div className={css.backdrop}>
      <div className={clas}>
        <AiOutlineCloseCircle
          className={css.modalIcon}
          onClick={() => setActive(false)}
        />
        {children}
      </div>
    </div>
  );
}
