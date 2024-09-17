function MatrixContainer({ label, children }: any) {
  return(
      <div className="p-2 m-1">
        <h3 className="text-lg">{label}</h3>
        {children}
      </div>
  );
}

export default MatrixContainer;