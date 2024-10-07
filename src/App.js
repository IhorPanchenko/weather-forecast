import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Weather from "./components/Weather";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
}

export default App;
