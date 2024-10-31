import { ButtonProps } from "../props";

function Button({onClick, children}: ButtonProps) {
  return(
    <button className="bg-tertiary px-4 py-2 m-1 rounded-xl hover:bg-accent" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;