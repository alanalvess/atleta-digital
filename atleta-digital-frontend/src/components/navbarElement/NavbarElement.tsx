import {useState} from 'react'
import {Link} from 'react-router-dom'

import Logo from '../../assets/images/logo-transparente.png'

import {Button, DarkThemeToggle, Navbar, NavbarBrand} from 'flowbite-react'
import DropdownPerfil from "./dropdownPerfil/DropdownPerfil.tsx";
import {FaTimes} from "react-icons/fa";
import SidebarMenu from "./sidebarMenu/SidebarMenu.tsx";
import {GiHamburgerMenu} from "react-icons/gi";
import DrawerMenu from "./drawerMenu/DrawerMenu.tsx";
import {useAuth} from "../../contexts/UseAuth.ts";

function NavbarElement() {

  const {usuario, isAuthenticated} = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Navbar
        fluid
        className='bg-slate-900 dark:bg-gray-950 border-b border-slate-800 fixed top-0 py-3 z-50 w-full justify-between h-[12vh] shadow-md px-4'
      >
        <NavbarBrand>
          <Link to='/home' className='text-2xl font-bold uppercase'>
            <div className='flex items-center justify-center gap-3'>
              <img src={Logo} alt='Atleta Digital' className='max-w-50 ml-2 my-3 h-20 object-contain'/>
            </div>
          </Link>
        </NavbarBrand>

        <div className="flex md:order-2 items-center space-x-4">
          {isAuthenticated ? (
            <DropdownPerfil />
          ) : (
            <Link to='/login' className='flex items-center justify-center'>
              <Button
                style={{ backgroundColor: '#00A9B1' }}
                className='text-white hover:opacity-90 font-medium px-5 py-2.5 rounded-lg transition-all focus:outline-none focus:ring-0 cursor-pointer shadow-sm'
              >
                <span className='text-lg'>Entrar</span>
              </Button>
            </Link>
          )}

          <DarkThemeToggle className="cursor-pointer text-slate-300 hover:bg-slate-800 dark:hover:bg-gray-800 focus:outline-none focus:ring-0" />

          {isAuthenticated && (
            <Button
              color="alternative"
              className='md:hidden border-0 border-none text-slate-300 bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-0 cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes size={30} />
              ) : (
                <GiHamburgerMenu size={30} />
              )}
            </Button>
          )}
        </div>
      </Navbar>

      <div className='md:hidden'>
        {isAuthenticated && (
          <DrawerMenu
            open={isOpen}
            onClose={handleClose}
          />
        )}
      </div>

      <div className='hidden md:flex fixed z-40 text-white shadow-lg mt-32 rounded-r-2xl'>
        {isAuthenticated && (
          <SidebarMenu />
        )}
      </div>
    </>
  )
}

export default NavbarElement;