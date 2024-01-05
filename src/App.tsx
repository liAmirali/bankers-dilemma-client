import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import Play from "./pages/Play";
import MainTemplate from "./pages/MainTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route index element={<MainPage />} />
          <Route path="/play" element={<Play />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
