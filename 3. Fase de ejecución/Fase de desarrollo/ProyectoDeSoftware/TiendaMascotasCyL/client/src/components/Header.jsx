import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()

    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()

    const redirectToLoginPage = ()=>{
        navigate("/login")
    }
  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col  justify-center gap-1 bg-primary-400'>
        {
            !(isSearchPage && isMobile)&&(
                <div className='container mx-auto flex items-center px-2 justify-between'> 
                    {/**logo */}
                    <div className='h-full'>
                        <Link to={'/'} className='h-full felx justify-center items-center' >
                            <img
                            src={logo}
                            width={280}
                            height={60}
                            alt='logo'
                            className='hidden  lg:block'
                            />
                            <img
                            src={logo}
                            width={120}
                            height={60}
                            alt='logo'
                            className='lg:hidden'
                            />
                        </Link>
                    </div>
                    {/**Search */}
                    <div className='hidden lg:block'>
                        <Search/>
                    </div>
                    {/**login and my card */}
                    <div className=''>
                        {/** icono de usuario solo para version de celular**/}
                        <button className='text-neutral-100 lg:hidden'>
                            <FaUserCircle size={26}/>
                        </button>
                        <div className='hidden lg:flex items-center gap-10'>
                            <button onClick={redirectToLoginPage} className='text-lg px-2 text-white'>Iniciar Sesión</button>
                            <button className='flex items-center gap-2 hover:bg-primary-500 px-3 py-1 rounded-2xl border border-white text-white'>
                                {/**  agregar a carrito icono**/}
                                <div className='animate-bounce'>
                                    <BsCart4 size={26}/>
                                </div>
                                <div className='font-semibold'>
                                    <p>Mi Carrito</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
        </header>
  )
}

export default Header
