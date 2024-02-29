// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SendMoney from './sendMoney';
// // import { useUser } from '../hook/useUser';
// // import { Navigate } from 'react-router-dom';

// export default function Dashboard() {
//     const [data, setData] = useState([]);
//     const [hidden, setHidden] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [filter, setFilter] = useState("");
//     const [user, setUser] = useState({});
//     // const user = useUser();
//     // if(user.loading) {
//     //     return ("loading...")
//     // }
//     // if(!user.user) {
//     //     return <Navigate to="/signin" />
//     // }
//     async function getUserDetails() {
//         try {
//             const response = await axios.get("http://localhost:3000/api/v1/user/me", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 }
//             });
//             // return response.data;
//             setUser(response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     }

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
//                 setData(response.data.user);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
//         fetchData();
//         getUserDetails();
//     }, [filter]);

//     console.log(`ggj ${user}`)
//     function sendMoney(id) {
//         setHidden(true);
//         const user_data = data.find(user => user._id === id);
//         console.log(user_data.firstName);
//         setSelectedUser(user_data);
//     }


//     return (
//         <>
//             <div className='flex justify-between items-center'>
//                 <h1 hidden={hidden} className='font-bold text-3xl py-5 pl-5'>Payments App</h1>
//                 <div className="flex items-center justify-end flex-grow">
//                     <h4 className='pl-5 py-5 text-xl' hidden={hidden}>Hello,  </h4>
//                     <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'></button>
//                 </div>
//             </div>
//             <div hidden={hidden} className="border-t border-gray-300"></div>
//             <p hidden={hidden} className='font-bold text-2xl py-5 pl-5'>Your Balance:   </p>
//             <p hidden={hidden} className='font-bold text-2xl pb-5 pl-5'>Users </p>
//             <input hidden={hidden} onChange={(e) => setFilter(e.target.value)} type="text" placeholder='Search User' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4 w-full mr-4' />

//             {data.map(item => (
//                 <div key={item._id} hidden={hidden} className='flex justify-between items-center'>
//                     <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'>{item.firstName[0].toUpperCase()}</button>
//                     <p hidden={hidden} className='font-bold text-xl py-5 pl-1'>{item.firstName + " " + item.lastName}</p>
//                     <div className="flex items-center justify-end flex-grow">
//                         <button hidden={hidden} className='rounded-lg bg-black text-white w-30 h-10 px-4 mr-4' onClick={() => sendMoney(item._id)}>Send Money</button>
//                     </div>
//                 </div>
//             ))}

//             {selectedUser && <SendMoney name={selectedUser} token={localStorage.getItem('token')} />}
//         </>
//     );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendMoney from './sendMoney';
import { useUser } from '../hook/useUser';
// import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState("");
    const user = useUser();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter);
                setData(response.data.user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        // getUserDetails(); // Call getUserDetails here to fetch user details when the component mounts
        // console.log(` hello ${user}`);
    }, [filter]);

    function sendMoney(id) {
        setHidden(true);
        const user_data = data.find(user => user._id === id);
        setSelectedUser(user_data);
    }


    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 hidden={hidden} className='font-bold text-3xl py-5 pl-5'>Payments App</h1>
                <div className="flex items-center justify-end flex-grow">
                    <h4 className='pl-5 py-5 text-xl' hidden={hidden}>Hello,  </h4>
                    <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'></button>
                </div>
            </div>
            <div hidden={hidden} className="border-t border-gray-300"></div>
            <p hidden={hidden} className='font-bold text-2xl py-5 pl-5'>Your Balance: {user.userDetails.balance}</p>
            <p hidden={hidden} className='font-bold text-2xl pb-5 pl-5'>Users </p>
            <input hidden={hidden} onChange={(e) => setFilter(e.target.value)} type="text" placeholder='Search User' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4 w-full mr-4' />

            {data.map(item => (
                <div key={item._id} hidden={hidden} className='flex justify-between items-center'>
                    <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'>{item.firstName[0].toUpperCase()}</button>
                    <p hidden={hidden} className='font-bold text-xl py-5 pl-1'>{item.firstName + " " + item.lastName}</p>
                    <div className="flex items-center justify-end flex-grow">
                        <button hidden={hidden} className='rounded-lg bg-black text-white w-30 h-10 px-4 mr-4' onClick={() => sendMoney(item._id)}>Send Money</button>
                    </div>
                </div>
            ))}

            {selectedUser && <SendMoney name={selectedUser} token={localStorage.getItem('token')} />}
        </>
    );
}
