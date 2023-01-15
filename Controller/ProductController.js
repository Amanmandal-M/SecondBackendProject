const { productModel } = require("../Models/productModel");


// Getting Products

const getProducts = async (req, res)=>{
    try {
        const data = await productModel.find();
        res.send(data)
    } catch (error) {
        console.log(`Error in / : ${error}`);
        res.send({
            "Error in /" : `${error}`
        })
    }    
}

// Creating Products

const postProducts = async (req,res)=>{
    const bodyData = req.body
    try {
        const data = await productModel(bodyData);
        await data.save();
        res.send({
            "Message": "Data saved successfully"
        });
    } catch (error) {
        console.log(`Error in /create : ${error}`);
        res.send({
            "Message" : `${error}`
        })
    }
}

// Updating Products

const updateProducts = async (req,res)=>{
    const parameter = req.params.id
    const bodyData = req.body
    const data = await productModel.findOne({_id:`${parameter}`})
    const userIdProduct = data.UserID;
    const userIdRequest = req.body.UserID
    console.log(userIdProduct);
    console.log(userIdRequest);
    try {
        if(userIdProduct !== userIdRequest){
            res.send({
                "Message": 'You are not authorized'
            })
        }else{
            const data = await productModel.findByIdAndUpdate({_id:`${parameter}`},bodyData)

            res.send({
                "Message": `Data Updated successfully`
            })
        }
    } catch (error) {
        console.log(`Error in /update : ${error}`);
        res.send({
            "Message" : `${error}`
        })
    }
}

// Deleting Products

const deleteProducts = async (req,res)=>{
    const parameter = req.params.id
    const data = await productModel.findOne({_id:`${parameter}`})
    const userIdProduct = data.UserID;
    const userIdRequest = req.body.UserID

    try {
        if(userIdProduct !== userIdRequest){
            res.send({
                "Message": 'You are not authorized'
            })
        }else{
            const data = await productModel.findByIdAndDelete({_id:`${parameter}`})
            
            res.send({
                "Message": `Data Deleted successfully`,
                "Data" : data
            })
        }
    } catch (error) {
        console.log(`Error in /update : ${error}`);
        res.send({
            "Message" : `${error}`
        })
    }
}


module.exports = {getProducts,postProducts,updateProducts,deleteProducts}