import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { LuCopyCheck } from "react-icons/lu";
import dateFormat from "dateformat";

export default function Table({ data }) {
    const [copied, setCopied] = useState({});

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied((prevState) => ({
                ...prevState,
                [url]: true,
            }));
        }).catch((err) => {
            console.error('Failed to copy:', err);
        });
    };
    function getDomain(url) {
        try {
            // Use a regex to check if the URL format is valid
            const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name and extension
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            if (!urlPattern.test(url)) {
                return 'Image invalid';
            }
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;
            return hostname.replace(/^www\./, '');
        } catch (error) {
            return 'Image invalid';
        }
    }
    return (
        <section className="relative overflow-y-auto">
            <table className="responsive-table">
                <thead className="text-xs uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3">Shorten Link</th>
                        <th scope="col" className="px-6 py-3">Original Link</th>
                        <th scope="col" className="px-6 py-3">Clicks</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item) => {
                        const imgID = getDomain(item?.redirectURL)
                        return (

                            <tr key={item?._id} className="border-b bg-gray-900 border-gray-700 text-white">
                                <th
                                    scope="row"
                                    className="px-6 w-[24rem] py-5 font-medium whitespace-nowrap flex gap-3 items-center"
                                >
                                    <a href={`${import.meta.env.VITE_SHORTURL}${item?.shortId}`}>
                                        {import.meta.env.VITE_SHORTURL + item?.shortId}
                                    </a>
                                    <span
                                        className={`${copied[`${import.meta.env.VITE_SHORTURL}${item?.shortId}`] ? 'bounce' : ''} cursor-pointer`}
                                        onClick={() => handleCopy(`${import.meta.env.VITE_SHORTURL}${item?.shortId}`)}
                                    >
                                        {!copied[`${import.meta.env.VITE_SHORTURL}${item?.shortId}`] ? <MdContentCopy size={20} /> : <LuCopyCheck size={20} />}
                                    </span>
                                </th>
                                <td className="px-6 w-[30rem] lg:overflow-y-hidden">
                                    <div className="flex gap-2 w-full items-center">
                                        <img
                                            src={imgID === 'Image invaild' ? "https://static.thenounproject.com/png/1103191-200.png" : `https://img.logo.dev/${imgID}?token=pk_VsYS4xnxRVmiRWtcxByHog`}
                                            alt={imgID}
                                            className="h-10 rounded-full w-10 object-cover object-center pointer-events-none select-none"
                                        />
                                        <input
                                            type="text"
                                            className="w-full py-4 bg-transparent outline-none border-none"
                                            value={item?.redirectURL}
                                            readOnly
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 w-[8rem]"> {item?.vistHistory.length} </td>
                                <td className="px-6 py-4"> {dateFormat(item?.vistHistory[0]?.timestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT")} </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    );
}
