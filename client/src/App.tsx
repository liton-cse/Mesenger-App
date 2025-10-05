import "./App.css";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
