function Button({children}: any) {
  return(
    <button className="bg-tertiary px-4 py-2 m-1 rounded-xl hover:bg-accent">
      {children}
    </button>
  );
}

export default Button;