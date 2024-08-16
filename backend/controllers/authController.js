const User = require ('../models/User') 

const test = (req, res) => (
    res.json('test is working')
)

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username) {
            return res.json({
                error:'name is required'
            })
        };
        if(!password || password.length < 6){
            return res.json({
                error:'Password is required and should be at least 6 characters long'
            })
        };
        const exist = await User.fineOne({email});
        if(exist) {
            return res.json({
                error: 'Email is already taken'
            })
        };
        const user = await User.create({
            username, email, password 
        })
        
        return res.json(user)
    }catch (error) {
        console.log              
    }
}

module.exports = {
    test,
    registerUser
}