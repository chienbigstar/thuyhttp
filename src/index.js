import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
