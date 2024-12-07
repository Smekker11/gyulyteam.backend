import { Today } from './tables/quotes.today.js';
import { Users } from './tables/users.model.js';
import { Posts } from './tables/posts.model.js';
import { Sequelize } from 'sequelize';
//posts functions

export const addPosts = async (req,res) =>{
    console.log(req)
    try{
        await Posts.create({
           title: req.body.title,
           content: req.body.content,
           username: req.body.username,
           tags: req.body.tags 
        })
        res.status(200).json({status:"Created new post.", post: req.body})
    } catch (err) {
        res.status(500).json({status: "Catastrophic Failure!", error: err})
    }
}

export const getPosts = async (req,res) =>{
    try{
        const results = await Posts.findAll({
            order: [
              ['createdAt', 'DESC'], // Order by timestamp in descending order (latest first)
            ]
          });
          res.status(200).json({newest_results: results})
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Catastrophic Failure!", stack: err})
    }
}

//app functions
export const addUser = async (req,res) =>{
    try{
        await Users.create(req.body);
        res.status(200).json({status: "User created",
            reference: req.body
         })
    } catch(err) {
        console.log(err)
        res.status(500).json({status: "Catastrophic Failure",
            error: err
        })
    }
} 

export const loginUser = async (req,res) =>{
    try{
    const user = await Users.findOne({
        where:{
            username: req.body.username,
            password: req.body.password
        }, raw: true
    })
    if(user){
        res.status(200).json({status: true, user});
    }else{
        res.status(403).json({status:false});
    }} catch (err) {
        res.status(200).json({status:false, error: err})
    }
}

export const listAssigned = async (req,res) =>{
    const user = await Today.findOne({
        where:{
            username: req.body.username,
        }, raw: true
    });
    if(user){
      const one = await Today.findOne({
        where:{
            id: user.assigned[1]
        }, raw: true
    });
      const two = await Today.findOne({
        where:{
            id: user.assigned[2]
        }, raw: true
    });
      const three = await Today.findOne({
        where:{
            id: user.assigned[3]
        }, raw: true
    });
    res.status(200).json({first: one, second: two, third: three})
    } else {
        res.status(403).send("User does not have tasks assigned! Use /user/addQuote");
    }
}

export const addQuote = async (req,res) =>{
    const user = await Today.findOne({
        where:{username: req.body.username}
    })
    if(!user){
        try{
            await Today.create({username: req.body.username, quote: req.body.quote, assigned: [await getRandId(Today), await getRandId(Today),await getRandId(Today)], finished:false})
            res.status(200).json({status: "Successfully added quote:", quote: req.body.quote})
        } catch (err){
            res.status(500).json({status: "Catastrophic Failure",
                error: err
            })
        }
    } else {
        res.status(403).json({status: false, error: "Bad Request use /user/tasks"})
    }
}
export const listTasks = async (req,res) =>{
    const list = await Today.findAll();
    res.status(200).json(list);
}
export const finishTask = async (req,res) => {
}

export const getRandId = async (table)=> {
    try {
      const result = await table.findOne({
        attributes: [[Sequelize.fn('MAX', Sequelize.col('id')), 'max_id']],
      })
      return Math.floor(Math.random() * parseInt(result.get('max_id')));
    } catch(err){
        console.log("Max ID fetch failed. For table:" + table + err)
    }
}

export async function bots()
{
    try{
    Today.sync({ force: true });
    await Today.create({username: "p.Alex38",quote:"I really enjoyed playing basketball with my friends. We had some intense games and I improved my shooting skills. It's always fun to compete and push myself!",assigned:[5,6,7]});console.log(typeof(await getRandId(Today)))
    await Today.create({username: "I spent a lot of time playing football. I had a great time with my team, practicing new strategies and improving my dribbling skills.",assigned:[5,6,7]}); console.log(typeof(await getRandId(Today)))
    await Today.create({username: "il_David",quote:"Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!",assigned:[5,6,7]}); console.log(typeof(await getRandId(Today)))
    console.log("Default: today quotes")
} catch (err){
    console.log(err)
}}