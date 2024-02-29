import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = () => {
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState();
    var user = {};

    async function getDetails() {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(res.data.user.firstName);

            user = {
                balance: res.data.account.balance,
                firstName: res.data.user.firstName
            }

            console.log(`user ${user}`);

            setUserDetails(res.data);
            // console.log(`useUser ${userDetails}`);
            
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
        // console.log(userDetails);
    }, []);

    // Return loading and userDetails as an object
    return {
        loading,
        userDetails
    };
};
