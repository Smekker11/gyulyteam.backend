import { Today } from './tables/quotes.today.js';
import { entryArray } from './samples/ex.quote.js';
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import {OpenAI} from "openai";

dotenv.config();

// Set up your OpenAI API key

const openai = new OpenAI({
  apiKey: process.env.AI_TOKEN // This is also the default, can be omitted
});

const chatCompletion = async(req,res) =>{
    console.log(req.body.prompt)
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content":req.body.prompt}],
  });
  res.status(200).send(response)
}


const app = express();
const PORT = 8080;
app.use(cors({origin: '*'}))

import { addPoints, addPosts, addQuote, addUser, getPosts, getTasks, listAssigned, listTasks, loginUser } from './db.main.js';
import { getRandId } from './db.main.js';

app.use(express.json())
//user posts

app.post("/post", addPosts)
app.get("/post", getPosts)

//ai
app.post("/ai", chatCompletion)

//app

app.post("/user/task/list", listAssigned)

app.post("/user/task", addQuote)

app.post("/users/points", addPoints)

app.post("/user/tasks", listTasks)

app.post("/users/tasked", getTasks)

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