import  express  from "express";
import rootRouter from "./routes/index.js"
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("hi from backend");
});

app.listen(3000, () => {
  console.log(`server is listening at port 3000 , http://localhost:3000`);
});
