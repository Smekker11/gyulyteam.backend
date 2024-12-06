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
    const user = await Users.findOne({
        where:{
            username: req.body.username,
            password: req.body.password
        }, raw: true
    })
    if(user){
        res.status(200).send(user);
    }else{
        res.status(403).send(false);
    }
}

export const bots = async () => {try{
    Today.sync({ force: true });
    Today.create({user: "p.Alex38",quote:"Try Basketball! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",assigned:[5,6,7]})
    Today.create({user: "Mihai Tatza",quote:"Try Football! Try Football!Try Football!Try Football!Try Football!Try Football!Try Football!",assigned:[5,6,7]})
    Today.create({user: "il_David",quote:"Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!Try Billiards!",assigned:[5,6,7]})
    console.log("Default: today quotes")
} catch (err){
    console.log(err)
}}