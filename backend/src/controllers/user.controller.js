import { asyncHandler } from "../utils/asyncHandler.js";

// asyncHandler is the higher order function
const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"user registered"
    })
})


export {registerUser};