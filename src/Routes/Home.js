import React, { useEffect, useState } from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function Home() {

    const navigate = useNavigate();

    const [html, setHTML] = useState({ __html: "" });

    const [open, setOpen] = useState(false);

    const [userName, setUserName] = useState('')

    const [error, setError] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getUser = () => {
        axios
            .get(`https://sore-blue-kitten-sari.cyclic.app/${userName}`)
            .then((res) => {
                if (Object.keys(res.data).length === 0) {
                    localStorage.setItem('user', JSON.stringify({ userName, track: 0, openCount: 1 }));
                }
                else {
                    localStorage.setItem('user', JSON.stringify(res.data[0]));
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleClick = () => {
        if (!userName) {
            setError(true);
            return;
        }
        getUser();
        axios
            .get(`https://sore-blue-kitten-sari.cyclic.app/display/${userName}`)
            .then((res) => {
                setHTML({ __html: res.data })
                handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getScrollPercentage = () => {
        return Math.round(((window.innerHeight + document.documentElement.scrollTop + 1) / document.documentElement.scrollHeight) * 100);
    }

    const updateScrollPercentage = (scroll) => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.post(`https://sore-blue-kitten-sari.cyclic.app/track/${user.userName}`, {
            trackPercentage: scroll
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handelScroll = () => {
        const scroll = getScrollPercentage()
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.track < 100 && ((scroll < 90 && scroll > user.track + 10) || (scroll > 90 && scroll > user.track))) {
            updateScrollPercentage(scroll);
            localStorage.setItem('user', JSON.stringify({ ...user, track: scroll }));
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handelScroll);
        return () => window.removeEventListener("scroll", handelScroll);
    }, []);

    return (
        <div className='flex p-10 bg-gray-100 flex-col space-y-5'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <div className='flex flex-col space-y-2'>
                        <p className='text-sm font-normal'>please type a user Name</p>
                        <div className='flex flex-col w-full space-y-1'>
                            <input name="userName" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className='border border-gray-400 rounded-md px-2 h-8' required="required" />
                            {error && <p className='text-red-500 text-xs font-normal'>User Name is required</p>}
                        </div>
                        <Button onClick={handleClick}>Get File</Button>
                    </div>
                </Box>
            </Modal>
            <div className='flex items-center justify-between'>
                <p onClick={handleOpen} className='text-sm font-normal text-gray-700 cursor-pointer hover:border-b border-blue-600 hover:text-blue-600 w-fit'>My Research Paper.html</p>
                <Button onClick={() => navigate('/admin')}>Admin Pannel</Button>
            </div>
            {html && <div dangerouslySetInnerHTML={html} />}
        </div>
    )
}

export default Home