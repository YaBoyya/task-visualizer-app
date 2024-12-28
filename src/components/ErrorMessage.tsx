import { useEffect, useState } from "react";
import { ErrorMessageProps } from "../props";

function ErrorMessage({msg, setMessage}: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true)
    const timeout = setTimeout(() => {
      setMessage("");
      setIsVisible(false);
    }, 5000);
    
    return () => {
      clearTimeout(timeout);
    }
  }, [msg])

  return (
    <div className={`box-border w-full flex place-content-center transition-all ease-in-out delay-150 ${isVisible ? "h-fit" : "h-0 hidden"}`}>
      <span className="text-error-text bg-error-bg w-[40%] p-2 m-2 border-2 border-error-border rounded-lg">{isVisible && msg}</span>
    </div>
  )
}

export default ErrorMessage;