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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SendMoney from './sendMoney';
// import { useUser } from '../hook/useUser';
// // import { Navigate } from 'react-router-dom';

// export default function Dashboard() {
//     const [data, setData] = useState([]);
//     const [hidden, setHidden] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [filter, setFilter] = useState("");
//     const user = useUser();

//     if(user.loading) {
//         return "loading..."
//     }
//     // if(!user.user) {
//     //     return <Navigate to="/signin" />
//     // }

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
//         // getUserDetails(); // Call getUserDetails here to fetch user details when the component mounts
//         // console.log(` hello ${user}`);
//     }, [filter]);

//     function sendMoney(id) {
//         setHidden(true);
//         const user_data = data.find(user => user._id === id);
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
//             <p hidden={hidden} className='font-bold text-2xl py-5 pl-5'>Your Balance: </p>
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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SendMoney from './sendMoney';
// import { useUser } from '../hook/useUser';
// import { Navigate } from 'react-router-dom';

// export default function Dashboard() {
//     const [data, setData] = useState([]);
//     const [hidden, setHidden] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [filter, setFilter] = useState("");
//     const { loading, userDetails } = useUser();

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
//     }, [filter]);

//     function sendMoney(id) {
//         setHidden(true);
//         const user_data = data.find(user => user._id === id);
//         setSelectedUser(user_data);
//     }

//     // If loading, display loading message
//     if (loading) {
//         return "Loading...";
//     }

//     // console.log(userDetails.account.balance);

//     // If user is not authenticated, navigate to sign-in page
//     if (!userDetails) {
//         return <Navigate to="/signin" />;
//     }

//     return (
//         <>
//             <div className='flex justify-between items-center'>
//                 <h1 hidden={hidden} className='font-bold text-3xl py-5 pl-5'>Payments App</h1>
//                 <div className="flex items-center justify-end flex-grow">
//                     <h4 className='pl-5 py-5 text-xl' hidden={hidden}>Hello, </h4>
//                     <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'>{ userDetails.user.firstName[0]}</button>
//                 </div>
//             </div>
//             <div hidden={hidden} className="border-t border-gray-300"></div>
//             <p hidden={hidden} className='font-bold text-2xl py-5 pl-5'>Your Balance: {" ₹" + parseFloat(userDetails.account.balance.toFixed(2))} </p>
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
import { Navigate } from 'react-router-dom';
import Footer from '../footer';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [hidden, setHidden] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState("");
    const { loading, userDetails } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
    }, [filter]);

    function sendMoney(id) {
        setHidden(true);
        const user_data = data.find(user => user._id === id);
        setSelectedUser(user_data);
    }

    if (loading) {
        return "Loading...";
    }

    if (!userDetails) {
        return <Navigate to="/signin" />;
    }

    const handleSignOut = async () => {
        try {
            await axios.post('http://localhost:3000/api/v1/user/signout');
            localStorage.removeItem('token');
            window.location.href = '/signin';
        } catch (error) {
            console.error('Error signing out:', error);
            // Handle error if needed
        }
    };

    return (
        <>
            <div className='flex flex-col md:flex-row justify-between items-center'>
  <h1 hidden={hidden} className='font-bold text-3xl py-5 pl-5'>Payments App</h1>
  <div className="flex items-center justify-end flex-grow relative">
    <h4 className='pl-5 py-5 text-xl' hidden={hidden}>Hello, {userDetails.user.firstName} </h4>
    <button className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4' onClick={() => setDropdownOpen(!dropdownOpen)}>
      {userDetails.user.firstName[0]}
    </button>
    {dropdownOpen && (
      <div className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg z-10">
        <div className="py-1">
          <button onClick={handleSignOut} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900">
            Sign Out
          </button>
        </div>
      </div>
    )}
  </div>
</div>
<div hidden={hidden} className="border-t border-gray-300"></div>
<p hidden={hidden} className='font-bold text-2xl py-5 pl-5'>Your Balance: {" ₹" + parseFloat(userDetails.account.balance.toFixed(2))} </p>
<p hidden={hidden} className='font-bold text-2xl pb-5 pl-5'>Users </p>
<input hidden={hidden} onChange={(e) => setFilter(e.target.value)} type="text" placeholder='Search User' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4 w-full mr-4' />

{data
  .filter(item => item.username !== userDetails.user.username)
  .map(item => (
    <div key={item._id} hidden={hidden} className='flex justify-between items-center'>
      <button hidden={hidden} className='rounded-full bg-gray-200 h-10 w-10 my-5 ml-5 mr-4'>{item.firstName[0].toUpperCase()}</button>
      <p hidden={hidden} className='font-bold text-xl py-5 pl-1'>{item.firstName + " " + item.lastName}</p>
      <div className="flex items-center justify-end flex-grow">
        <button hidden={hidden} className='rounded-lg bg-black text-white w-30 h-14 px-4 pb-1 mr-4 ml-2' onClick={() => sendMoney(item._id)}>Send Money</button>
      </div>
    </div>
  ))
}

{selectedUser && <SendMoney name={selectedUser} token={localStorage.getItem('token')} />}

<Footer />
 
        </>
    );
}
