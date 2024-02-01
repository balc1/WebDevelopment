import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const result = response.data.drinks[0];
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  
  try {
    if (req.body.type === "random") {
      const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const result = response.data.drinks[0];
      console.log(result);
      res.render("index.ejs", { data: result });
    } else {
      let Cocktail = (req.body.type);
      const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${Cocktail}`
    );
    const result = response.data.drinks[0];
    console.log(result);
    res.render("index.ejs", { data: result });
    }
    
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
