// TODO fix typing here
function BackgrounContainer({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-950">
      {children}
    </div>
  );
}

export default BackgrounContainer