function MatrixContainer({ label, children }: any) {
  return(
      <div className="px-4 py-2 m-1">
        <h3 className="text-lg p-1">{label}</h3>
        {children}
      </div>
  );
}

export default MatrixContainer;