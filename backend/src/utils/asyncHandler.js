// 1st method using promise
const asyncHandler = ()=>{
   return (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err));
    }
}

export {asyncHandler}


// 2nd method ie try/catch
/*
// higher order function
const asyncHandler= (fn) => async (req,res,next)=>{
    try{
        await fn(req,res,next);
    }catch{
        res.status(err.code || 500 ).json({
            success: false,
            message:err.message
        })
    }
}
*/ 