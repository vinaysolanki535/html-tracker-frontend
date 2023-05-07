import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from '../Component/DataTable';
import Chart from '../Component/Chart';

function AdminPannel() {

    const [data, setData] = useState([]);

    const getData = () => {
        axios
            .get('https://sore-blue-kitten-sari.cyclic.app/admin/list')
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        getData()
    }, [])
    return (
        <div className='flex flex-col w-full h-full justify-center text-center space-y-5 py-5'>
            <h1 className='text-4xl '>Admin Pannel</h1>
            {data.length !== 0 && <div className='flex justify-center items-center'>
                <DataTable data={data}/>
                <Chart data={data} className="ml-4"/>
            </div>}
        </div>
    )
}

export default AdminPannel