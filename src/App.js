import Entrada from "./components/Entrada";
import { BrowserRouter,Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Entrada />} />
    </Routes>

    </BrowserRouter>

  );
}

export default App;
