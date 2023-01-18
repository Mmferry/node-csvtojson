import express from "express";
import csv from "csvtojson";
import { promises as fs } from "fs";

const app = express();
const port = 3000;

const inputFile = "./users.csv";
const outputFile = "users.json";

interface User {
  first_name: string;
  last_name: string;
  phone: string;
}

app.get("/convert", (req, res) => {
  res.send("Converting...");
  csv()
    .fromFile(inputFile)
    .then((data) => {
      const newData = data.map((item: User) => {
        let firstName = item.first_name;
        let lastName = item.last_name;
        let phone = item.phone ? item.phone : "missing data";
        return { firstName, lastName, phone };
      });

      fs.writeFile(outputFile, JSON.stringify(newData));
    });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
