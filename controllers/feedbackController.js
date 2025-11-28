const feedbacks = require('../models/feedbackModel')

//add to feedback
exports.addFeedbackController= async(req,res)=>{
    console.log("Inisde addFeedbackController");
    const {name,email,message} = req.body

    try{
        const newFeedback = new feedbacks({
            name,email,message
        })
        await newFeedback.save()
        res.status(200).json("Thank you for your feedback!!! We appreciate your effort to improve us...")
    }catch(err){
        res.status(500).json(err)
    }
    
}