import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import {AuthProvider} from "./contexts/AuthProvider.tsx";
import {ToastContainer} from "react-toastify";
import Login from "./pages/login/Login.tsx";
import Error500 from "./pages/errors/Error500.tsx";
import Error404 from "./pages/errors/Errors404.tsx";
import FooterElement from "./components/footerElement/FooterElement.tsx";
import NavbarElement from "./components/navbarElement/NavbarElement.tsx";
import Duvidas from "./pages/duvidas/Duvidas.tsx";
import Sobre from "./pages/sobre/Sobre.tsx";
import Home from "./pages/home/Home.tsx";
import HomePublica from "./pages/home/homePublica/HomePublica.tsx";

function App() {

  return (
      <>
        <AuthProvider>
          <BrowserRouter>

            <ToastContainer/>

            <div className='min-w-full m-0 p-0  dark:bg-gray-500 min-h-screen'>

              <NavbarElement/>
              <div className='dark:bg-gray-500 min-h-[90vh]'>

                <Routes>

                  <Route path='/' element={<HomePublica/>}/>
                  <Route path='/home' element={<Home/>}/>

                  <Route path='/sobre' element={<Sobre/>}/>
                  <Route path='/duvidas' element={<Duvidas/>}/>

                  <Route path='/login' element={<Login/>}/>

                  {/*<Route path="/meu-perfil" element={<Perfil/>}/>*/}
                  {/*<Route path="/usuarios" element={<ListarUsuarios/>}/>*/}

                  <Route path='/erro' element={<Error500/>}/>
                  <Route path='*' element={<Error404/>}/>

                </Routes>
              </div>

              <div className='relative w-full '>
                <FooterElement/>
              </div>

            </div>
          </BrowserRouter>
        </AuthProvider>
      </>
  )
}

export default App
