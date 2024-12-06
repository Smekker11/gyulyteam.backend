import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 8080;
app.use(cors({origin: '*'}))

import { addUser, bots, loginUser } from './db.main.js';

app.use(express.json())

bots;



app.post("/user/add", addUser)

app.post("/user/login", loginUser)

app.get('/api/status', (req,res)=>{
    res.status(200).json({online: true});
})

app.listen(PORT,() => console.log("GyulyTeam backend ready. REST API Initialized."))