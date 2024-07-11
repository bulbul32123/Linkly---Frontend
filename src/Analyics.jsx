import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import axios from 'axios'

export default function Analyics() {
    const [data, setdata] = useState([]);

    const getApiData = async () => {
        const { data } = await axios.get(import.meta.env.VITE_ANALYTICS)
        setdata(data);
    }

    useEffect(() => {
        getApiData()
    }, [])
    return (
        <div className='flex justify-center items-center h-full w-full mt-20 flex-col py-20'>
            <h1 className='text-4xl text-center font-bold mb-7'>Analyics</h1>
            <div className="w-full flex justify-start md:justify-start items-start md:items-center h-screen flex-col overflow-y-hidden">
                {data.length > 0 ? <Table data={data} /> : (
                    <div className="">
                        <h3>Sorry, you don't add any links</h3>
                    </div>
                )}
            </div>
        </div>
    )
}
