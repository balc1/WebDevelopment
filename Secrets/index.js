import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const result = response.data;
        console.log(result);
        res.render("index.ejs", { secret: result.secret, user: result.username });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: error.message,
    });
    }
})

app.listen(port, () => {
    console.log("Server running port : " + port);
});