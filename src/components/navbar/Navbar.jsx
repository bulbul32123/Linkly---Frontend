import React, { useEffect, useState } from 'react'
import { MdExitToApp } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [show, setShow] = useState('translate-y-0')
    const [lastScrolly, setlasScrolly] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrolly) {
                setShow('-translate-y-[100px]')
            } else {
                setShow('shadow-sm')
            }
        } else {
            setShow('translate-y-0')
        }
        setlasScrolly(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar)
        return () => {
            window.removeEventListener('scroll', controlNavbar)
        }
    }, [lastScrolly])
    return (
        <div className={`flex h-20 fixed top-0 left-0 pt-8 pb-5 z-10 w-full pl-3 pr-3 justify-between transition-transform duration-300  items-center backdrop-filter backdrop-blur-lg  bg-white/10 border-b border-gray-700 shadow-lg ${show}`}>
            <Link to='/' className="">
                <img src="/Linkly.png" className='h-10 sm:h-full sm:w-full inline-block ' alt="" />
            </Link>
            <Link to='/analyics' className='text-lg border-b '>Analyics</Link>
            <div className="flex gap-3 items-center">
                <button className='py-3 px-4 flex gap-2 items-center rounded-full textsm sm:text-base font-medium bg-[#181e29] text-white border border-gray-500'>Login <span><MdExitToApp size={18} /></span></button>
                <button className='py-4 px-6 max-sm:hidden rounded-full  bg-[#144ee4] text-white'>Register Now</button>
            </div>
        </div>
    )
}
