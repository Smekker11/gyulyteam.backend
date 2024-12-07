import { Today } from './tables/quotes.today.js';
import { entryArray } from './samples/ex.quote.js';
import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 8080;
app.use(cors({origin: '*'}))

import { addPosts, addQuote, addUser, getPosts, listAssigned, listTasks, loginUser } from './db.main.js';
import { getRandId } from './db.main.js';

app.use(express.json())
//user posts

app.post("/post", addPosts)
app.get("/post", getPosts)

//app
app.post("/user/task/list", listAssigned)

app.post("/user/task", addQuote)

app.post("/user/tasks", listTasks)

app.post("/user/add", addUser)

app.post("/user/login", loginUser)

app.get('/api/status', (req,res)=>{
    res.status(200).json({online: true});
})

app.listen(PORT, async () => {console.log("GyulyTeam backend ready. REST API Initialized.")
    try{
        await Today.sync({ force: true });
        await Today.create({"username": "p.Alex38","quote":"I really enjoy my shooting skills. It's always fun to compete and push myself!","assigned":[5,6,7]});
        await Today.create({"username": "IonRupeTot", "quote":"I spent my time and improving my dribbling skills at Basketball.","assigned":[5,6,7]});
        await Today.create({"username": "il_David","quote":"Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!","assigned":[5,6,7]});
    console.log("Default: init quotes") 
        for(let entry of entryArray){
            await Today.create({
                username: entry.username,
                quote: entry.quote,
                assigned: [await getRandId(Today),await getRandId(Today), await getRandId(Today)],
                finished: false
            })
        }
        console.log("Default: today quotes")
    } catch (err){
        console.log(err)
    }
})