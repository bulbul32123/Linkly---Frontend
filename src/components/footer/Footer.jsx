import React from 'react'
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
export default function Footer() {
    return (
        <>
            <footer className="body-font">
                <div className="px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <div className="">
                        <img src="/Linkly.png" className='h-full w-full inline-block ' alt="" />
                    </div>
                    <div className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 Linkly —
                        <p className="text-gray-500 ml-1">bulbulhero63@gmail.com</p>
                    </div>
                    <span className="inline-flex gap-3 sm:ml-auto justify-center sm:justify-start">
                        <a href="https://www.facebook.com/profile.php?id=61550563621219" target="_blank">
                            <FaFacebook size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/webdevwithbulbul/" target="_blank">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="https://github.com/bulbul32123" target="_blank">
                            <FaGithub size={20} />
                        </a>
                    </span>
                </div>
            </footer>
        </>
    )
}
