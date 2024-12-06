import { Today } from './tables/quotes.today.js';
import { Users } from './tables/users.model.js';

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

export const addQuote = async (req,res) =>{
    console.log(req.body.username)
    const user = await Today.findOne({
        where:{username: req.body.username}
    })
    if(!user){
        try{
            await Today.create({username: req.body.username, quote: req.body.quote})
            res.status(200).json({status: "Successfully added quote:", quote: req.body.quote})
        } catch (err){
            res.status(500).json({status: "Catastrophic Failure",
                error: err
            })
        }
    } else {
        res.status(403).json({status: false, error: "Bad Request use /user/getTasks"})
    }
}
export const listTasks = async (req,res) =>{
    const list = await Today.findAll();
    res.status(200).json(list);
}
export const finishTask = async (req,res) => {

}

export const bots = async () => {try{
    Today.sync({ force: true });
    await Today.create({username: "p.Alex38",quote:"Try Basketball! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",assigned:[5,6,7]})
    await Today.create({username: "Mihai Tatza",quote:"Try Football! Try Football!Try Football!Try Football!Try Football!Try Football!Try Football!",assigned:[5,6,7]})
    await Today.create({username: "il_David",quote:"Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!",assigned:[5,6,7]})
    console.log("Default: today quotes")
} catch (err){
    console.log(err)
}}