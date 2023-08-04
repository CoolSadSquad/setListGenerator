import {BrowserRouter, Routes, Route} from "react-router-dom";
import IndexPage from "./components/IndexPage";
function App() {
  return (
    <BrowserRouter>
      <div style={{backgroundColor: '#020D14'}}>
        <Routes>
            <Route path="/" exact element={<IndexPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
