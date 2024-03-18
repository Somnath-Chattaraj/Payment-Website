// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
// const accountRouter = require("./routes/account");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use("/api/v1", rootRouter);

app.use((err, req, res, next) => {
    if (err instanceof z.ZodError) {
        alert("Validation Error")
        return res.status(411).json({message: "Validation Error", details: err.errors})
    }

    console.log(err);
    alert("Internal Server Error")
    res.status(411).send("Internal Server Error!");
})





app.listen(3000)

// module.exports = app




