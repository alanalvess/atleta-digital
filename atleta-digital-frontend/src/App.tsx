import './App.css'
import {AuthProvider} from "./contexts/AuthProvider.tsx";
import NavbarElement from "./components/navbarElement/NavbarElement.tsx";

import FooterElement from "./components/footerElement/FooterElement.tsx";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from "react-toastify";

import {AppRoutes} from "./routes/AppRoutes.tsx";

export default function App() {

  return (
      <>
        <AuthProvider>
          <BrowserRouter>

            <ToastContainer/>

            <div className='min-w-full m-0 p-0  dark:bg-gray-500 min-h-screen'>

              <NavbarElement/>
              <div className='dark:bg-gray-500 min-h-[90vh]'>
                <AppRoutes />
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