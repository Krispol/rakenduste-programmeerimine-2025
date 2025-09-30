import './App.css'
import Context from "./components/Context";
import PropDrilling from "./components/PropDrilling";


function App() {
  return (
    <main >
      <h1>Discord Examples</h1>
      <section>
        <h2>Context Example</h2>
        <Context />
      </section>
            <section>
        <h2>PropDrilling Example</h2>
        <PropDrilling />
      </section>
    </main>
  );
}

export default App;