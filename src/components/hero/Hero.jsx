import React, { useState } from 'react';
import { CiLink } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { MdContentCopy } from 'react-icons/md';
import { LuCopyCheck } from 'react-icons/lu';
import axios from 'axios';

export default function Hero() {
    const [iscoped, setIsCoped] = useState(false);
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidUrl(url)) {
            setErrorMessage('Your Link is invalid.');
            return;
        }

        setErrorMessage('');
        try {
            const response = await axios.post('http://localhost:8000/url', { url });
            setShortenedUrl(`http://localhost:8000/shorten/${response.data.id}`);
        } catch (error) {
            console.error('Error shortening the URL:', error);
            setErrorMessage('Failed to shorten the URL.');
        }
    };

    const handleCopy = (originalUrl) => {
        navigator.clipboard.writeText(originalUrl).then(() => {
            setIsCoped(true);
            setTimeout(() => {
                setIsCoped(false);
            }, 3000)
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <main className='mb-10'>
            <div className="h-full relative flex flex-col flex-1 shrink-0 items-center justify-center rounded-lg bg-transparent py-36 shadow-lg md:py-48">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/Swirl.png" alt="" className='w-full h-full pointer-events-none select-none object-cover object-center' />
                </div>
                <div className="relative flex flex-col items-center p-4">
                    <h1 className="mb-3 text-center text text-5xl font-bold text-white sm:text-4xl md:text-5xl">Shorten Your Loooong Links :)</h1>
                    <p className="mb-4 text-center text-sm text-indigo-200 max-w-[30rem]">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>

                    <div className="flex w-full flex-col gap-2.5 sm:justify-center">
                        <form onSubmit={handleSubmit} className="w-full relative flex items-center">
                            <span className='absolute left-5 '><CiLink size={25} /></span>
                            <input
                                type="text"
                                onChange={(e) => setUrl(e.target.value)}
                                value={url}
                                required
                                className='w-full py-5 bg-[#181e29] text-white rounded-full pl-14 pr-36 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none transition-colors duration-200 ease-in-out'
                                placeholder='Enter the Link here'
                            />
                            <button className='max-md:hidden py-4 px-6 rounded-full absolute text-sm right-2 bg-[#144ee4] text-white'>Shorten Now</button>
                            <button className='md:hidden absolute right-2 py-4 rounded-full bg-[#144ee4] text-white px-6'><FaArrowRight size={25} /></button>
                        </form>
                        {errorMessage && <div className="text-red-500 mt-1 pl-4">{errorMessage}</div>}
                        {shortenedUrl && (
                            <div className="px-6 w-full py-5 font-medium flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-center">
                                <span className='text-sm text-indigo-200'>Shorten Link:</span>
                                <div className='flex items-center gap-3'>
                                    <a href={shortenedUrl}>{shortenedUrl}</a>
                                    <span
                                        className={`${iscoped ? 'bounce' : ''} cursor-pointer`}
                                        onClick={() => handleCopy(shortenedUrl)}
                                    >
                                        {!iscoped ? <MdContentCopy size={20} /> : <LuCopyCheck size={20} />}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
