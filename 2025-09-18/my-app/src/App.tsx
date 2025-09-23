import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/HelloBtn">MUI Button</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
