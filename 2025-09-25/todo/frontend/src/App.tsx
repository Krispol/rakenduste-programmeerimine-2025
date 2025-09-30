import React from "react";
import Todos from "./components/Todos";
import Admin from "./components/Admin";

const App: React.FC = () => {
  return (
    <div>
      <Todos />
      <hr />
      <Admin />
    </div>
  );
};

export default App;
