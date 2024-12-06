import { Today } from './tables/quotes.today.js';
import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 8080;
app.use(cors({origin: '*'}))

import { addQuote, addUser, bots, listTasks, loginUser } from './db.main.js';

app.use(express.json())


app.post("/user/submit", addQuote)

app.post("/user/tasks", listTasks)

app.post("/user/add", addUser)

app.post("/user/login", loginUser)

app.get('/api/status', (req,res)=>{
    res.status(200).json({online: true});
})

app.listen(PORT, async () => {console.log("GyulyTeam backend ready. REST API Initialized.")
    try{
        await Today.sync({ force: true });
        await Today.create({username: "p.Alex38",quote:"Try Basketball! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",assigned:[5,6,7]})
        await Today.create({username: "Mihai Tatza",quote:"Try Football! Try Football!Try Football!Try Football!Try Football!Try Football!Try Football!",assigned:[5,6,7]})
        await Today.create({username: "il_David",quote:"Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!",assigned:[5,6,7]})
        console.log("Default: today quotes")
    } catch (err){
        console.log(err)
    }
})