import { ChildrenProps } from "../props";

function Button({children}: ChildrenProps) {
  return(
    <button className="bg-tertiary px-4 py-2 m-1 rounded-xl hover:bg-accent">
      {children}
    </button>
  );
}

export default Button;