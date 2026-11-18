const router = require("express").Router();
const Products = require('../models/Product')





router.post('/',async (req, res) => {
    try {
        const {name,price,discription} = req.body
        const createdProduct = await Products.create({
            name: name,
            price : price,
            discription: discription,
        }
            

        )
        res.status(201).json(createdProduct)

    } catch (error) {
        if (error.name=== 'ValidationError'){
            return res.status(400).json({message:error.message})

        }

        console.log(error)
        res.status(500).json({message:'Internal Server Error'})

    }

})


router.get('/', async (req, res) => {
    try {
        const allProducts = await Products.find()
        res.status(200).json(allProducts)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }

})



router.get('/:productId', async (req, res) => {
    try {
        const findProduct = await Products.findById(req.params.productId)
        res.status(200).json(findProduct)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }

})


router.put('/:productId', async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.productId, req.body,{returnDocument:'after',runValidators:true})
        res.status(200).json(updatedProduct)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }

})


router.delete('/:productId', async (req, res) => {
    try {
        const deleteProduct = await Products.findByIdAndDelete(req.params.productId)
        if(!deleteProduct){
            return res.sendStatus(404).json({message:'Product Not Found'})
        }
        res.sendStatus(204)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }

})













module.exports = router