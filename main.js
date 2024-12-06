import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;
app.use(cors({origin: '*'}))

app.listen(PORT,() => console.log("GyulyTeam backend ready. REST API Initialized."))