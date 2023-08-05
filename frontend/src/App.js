import {BrowserRouter, Routes, Route} from "react-router-dom";
import {IndexPage, LoginPage, RegisterPage} from "./components/index"
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<IndexPage/>}/>
            <Route path="/login" exact element={<LoginPage/>}/>
            <Route path="/register" exact element={<RegisterPage/>}/>
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
