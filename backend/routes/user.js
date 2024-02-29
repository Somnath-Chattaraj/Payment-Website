const express = require('express');
const bodyParser = require('body-parser')
const userRouter = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

userRouter.use(bodyParser.json())

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

userRouter.post("/signup", async (req, res) => {
    try {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        console.log(signupBody.safeParse(req.body))
        console.log(req.body)
        return res.status(411).json({
            message: " Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    // User.updateOne({ _id: userId }, { $inc: { balance:  Math.floor(Math.random() * 100000) + 1 } });
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    res.json({
        message: "User created successfully",
        token: token
    })
} catch (err) {
    console.log(err)
}
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})



userRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token,
            message: "sucessfully logged in"
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})
// async function findByIdAndUpdate(username, body) {
//     try {
//         // Find the user by username
//         const user = await User.findOne({ username: username });

//         // If user is not found, return early or throw an error
//         if (!user) {
//             // You can either return a message or throw an error
//             // return 'User not found';
//             throw new Error('User not found');
//         }

//         // Update fields based on the body
//         if (body.password != null) {
//             user.password = body.password;
//         }
//         if (body.firstName != null) {
//             user.firstName = body.firstName;
//         }
//         if (body.lastName != null) {
//             user.lastName = body.lastName;
//         }

//         // Save the updated user
//         await user.save();

//         // Optionally return the updated user
//         return user;
//     } catch (error) {
//         // Handle errors appropriately
//         console.error('Error occurred:', error);
//         throw error; // Re-throwing the error for the caller to handle
//     }
// }



const  { authMiddleware } = require("../middleware");


// other auth routes

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
userRouter.get('/data', async function (req, res) {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
      }
})
async function findByIdAndUpdate(id, otherId, amount) {
    // await User.updateOne({ _id: id }, { $inc: { balance: amount } });
    // await User.updateOne({ _id: otherId }, { $inc: { balance: -amount } });
    const user = await User.find({ _id: id })
    if (user && user.balance >= amount) {
        User.updateOne({ _id: id }, { $inc: { balance: -amount } });
        try {
            User.updateOne({ _id: otherId }, { $inc: { balance: amount } });
            res.json ("transaction successful")
        } catch (err) {
            console.log(err);
            res.json ("transaction unsuccessful")
        }
        
    }
}
const transferFunds = async (fromAccountId, toAccountId, amount) =>{
    findByIdAndUpdate(fromAccountId, toAccountId, amount);
    // findByIdAndUpdate(toAccountId, fromAccountId, amount);
}

userRouter.get('/me', authMiddleware, async(req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(403).json({
            msg: "Not Logged In"
        })
    }

    const userDetails = await User.findById(userId);
    const accountDetails = await Account.findOne({
        userId: userId,
    })
    res.json({
        user: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            username: userDetails.username,

        },
        account: {
            balance: accountDetails.balance
        }
    })
})

module.exports = userRouter;