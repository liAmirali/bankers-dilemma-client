import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainPage from "./pages/MainPage";
import Play from "./pages/Play";
import MainTemplate from "./pages/MainTemplate";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainTemplate />}>
            <Route index element={<MainPage />} />
            <Route path="/play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
