const recipes = require('../models/recipeModel')

//get all recipes
exports.getAllRecipesController = async (req,res)=>{
    console.log("Inside getAllRecipesController");
    try{
        const allRecipes = await recipes.find()
        res.status(200).json(allRecipes)
    }catch(error){
        res.status(500).json(error)
    }
}

//get a single recipe
exports.viewRecipesController = async (req,res)=>{
    console.log("Inside viewRecipesController");
    const {id} = req.params
    try{
        const viewDetails = await recipes.findById({_id:id})
        res.status(200).json(viewDetails)
    }catch(error){
        res.status(500).json(error)
    }
}

//related recipe
exports.getRelatedRecipesController = async (req,res)=>{
    console.log("Inside getRelatedRecipesController");
    const cuisine = req.query.cuisine
    try{
        const allRecepieDetails = await recipes.find({cuisine})
        res.status(200).json(allRecepieDetails)
    }catch(error){
        res.status(500).json(error)
    }
}

//add recipe
exports.addRecipeController = async (req,res)=>{
    console.log("Inside addRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing} = req.body
    try{
        const existingRecepieDetails = await recipes.findOne({name})
        if(existingRecepieDetails){
        res.status(409).json("Recipe already available in our collection add another!!!")
        }else{
            const newRecipe = new recipes({
                name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }catch(error){
        res.status(500).json(error)
    }
}

//remove single recipe
exports.removeRecipeController = async (req,res)=>{
    console.log("Inside removeRecipeController");
    const {id} = req.params
    try{
        const removeItemDetails = await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(removeItemDetails)
    }catch(error){
        res.status(500).json(error)
    }
}

//edit recipe
exports.updateRecipeController = async (req,res)=>{
    console.log("Inside updateRecipeController");
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,image,mealType,cuisine,caloriesPerServing} = req.body
    const {id} = req.params
    try{
        const updateRecepieDetails = await recipes.findByIdAndUpdate({_id:id},{
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
        },{new:true})
        await updateRecepieDetails.save()
        res.status(200).json(updateRecepieDetails)
    }catch(error){
        res.status(500).json(error)
    }
}