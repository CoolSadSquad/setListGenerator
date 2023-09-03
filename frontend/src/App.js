import {BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import {AccountPage, ErrorPage, IndexPage, LoginPage, MainPage, RegisterPage} from "./components/index"
import {useState} from "react";
import {useCookies} from "react-cookie";


const ProtectedRoute = ({redirectPath = '/login'}) => {
    const [cookies, setCookie] = useCookies(['access_token'])
    if (!cookies.access_token){
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet/>
}
const App = () => {
    // const [artistsList, setArtistsList] = useState([])
    // const [username, setUsername] = useState(null)
    // const handleChangeArtistsList = (value) => {
    //     setArtistsList(value)
    // }
    // const handleChangeUsername = (value) => {
    //     setUsername(value)
    // }
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<IndexPage/>}/>
            <Route path="/login" exact element={<LoginPage/>} />
            <Route path="/register" exact element={<RegisterPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route element={<ProtectedRoute/>}>
                <Route path="/main" exact element={<MainPage/>}/>
                <Route path="/account" exact element={<AccountPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
