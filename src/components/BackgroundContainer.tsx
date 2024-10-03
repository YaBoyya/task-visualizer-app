import { ChildrenProps } from "../props";

function BackgrounContainer({ children }: ChildrenProps) {
  return (
    <div className="min-h-screen bg-white text-[#4A4A4A]">
      {children}
    </div>
  );
}

export default BackgrounContainer;