const express = require('express');
const { connection } = require('../connector')
const router = express.Router();

router.get('/totalRecovered',async(req,res)=>{
    try{
        const data = await connection.aggregate([{$group:{_id:"total", recovered:{$sum: "$recovered"}}}]);
        // console.log(data);        
        res.status(200).json({
            data
        });
    }
    catch(e){
        res.status(500).json({
            status: "failed",
            error: e.error
        })
    }
   
})
// active route
router.get('/totalActive',async(req,res)=>{
    try{
        const data = await connection.aggregate([{$group:{_id:"total", active:{$sum: {$subtract:["$infected","$recovered"]}}}}]);       
        res.status(200).json({
            data
        });
        }
        catch(e){
        res.status(500).json({
            status: "failed",
            error: e.error
        })
    }
   
})
// total death
router.get('/totalDeath',async(req,res)=>{
    try{
        const data = await connection.aggregate([{$group:{_id:"total", death:{$sum: "$death"}}}]);                
        res.status(200).json({
            data
        })
    }        
        catch(e){
        res.status(500).json({
            status: "failed",
            error: e.error
        })
    }
   
})
// hotspot states
router.get('/hotspotStates',async(req,res)=>{
    try{
     const data = await connection.aggregate([{
        $addFields: {rate: {$round: 
            [{$divide:[{ 
        $subtract: [ "$infected", "$recovered" ] },"$infected"]},5]}}},
            {
              $match: {
                rate: { $gt: 0.1 }
              }
            },
            {
              $project: {
                _id: 0,
                state: 1,
                rate: 1
              }
            }
        ])
        res.status(200).json({
            data
        })      
          
    }
    catch(e){
        res.status(500).json({
            status: "failed",
            error: e.error
        })
    }
   
})
// healthy states
router.get('/healthyStates',async(req,res)=>{
    try{
     const data = await connection.aggregate([{$addFields: {mortality: 
        {$round:             
            [{$divide: 
            [ "$death","$infected" ] },5]}}},
            {
              $match: {
                mortality: { $lt : 0.005}
              }
            },
            {
              $project: {
                _id: 0,
                state: 1,
               mortality: 1
              }
            }
        ])
        res.status(200).json({
            data
        })      
          
    }
    catch(e){
        res.status(500).json({
            status: "failed",
            error: e.error
        })
    }
   
})
module.exports = router;
