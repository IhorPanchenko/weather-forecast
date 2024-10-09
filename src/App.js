import { Provider } from "react-redux";
import { store } from "./store";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <WeatherDisplay />
      </div>
    </Provider>
  );
}

export default App;
