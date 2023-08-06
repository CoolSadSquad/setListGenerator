import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ErrorPage, IndexPage, LoginPage, MainPage, RegisterPage} from "./components/index"
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<IndexPage/>}/>
            <Route path="/login" exact element={<LoginPage/>}/>
            <Route path="/register" exact element={<RegisterPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/main" exact element={<MainPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
