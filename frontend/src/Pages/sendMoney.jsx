import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SendMoney(props) {
    const [amount, setAmount] = useState("");
    

    async function transferMoney() {
        try {
            await axios.post("https://api.payment-website.somnathcodes.site/api/v1/account/transfer", {
                to: props.name._id,
                amount
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            alert("Transfer Successful!. Please reload to see the updated balance.");
            
            // Redirect after successful transfer
            window.location.reload();
            // You can also redirect to the dashboard separately if needed
            // window.location.href = "/dashboard";
        } catch (error) {
            console.error('Error transferring money:', error);
            // Handle error if needed
        }
    }
    

    return (
        <div className='flex justify-center items-center absolute inset-0 bg-gray-100'>
            <div className='flex flex-col justify-center bg-white drop-shadow-xl md:w-6/12 sm:w-10/12 w-11/12 h-3/4 px-6 py-6 shadow-white-300 rounded'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-3xl pt-4 pb-10'>Send Money</h1>
                    <p className="text-gray-500">After initiating the the transfer, please reload to see the updated balance</p>
                </div>
                <div className="flex flex-row">
                    <p className="bg-green-500 text-2xl text-white pl-3 pt-1 mx-4 rounded-full mt-7 w-10 h-10">{props.name.firstName[0]}</p>
                    <p className="font-bold text-2xl pt-8">{props.name.firstName + " " + props.name.lastName}</p>
                </div>
                <form action="">
                    <div className='flex flex-col'>
                        <h4 className='pl-4 pb-2 pt-5 font-bold'>Amount (in Rs)</h4>
                        <input type="text" name="username" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enter amount' className='border-2 border-gray-300 rounded-lg h-10 border-1 mx-4 bg-transparent pl-4 mb-4' />
                        <button className="bg-green-500 text-white h-10 mx-4 rounded-lg mb-7" onClick={transferMoney}>Initiate Transfer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
