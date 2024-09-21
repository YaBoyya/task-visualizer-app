function Button({children}: any) {
  return(
    <button className="bg-indigo-600 px-4 py-2 rounded-xl">
      {children}
    </button>
  );
}

export default Button;