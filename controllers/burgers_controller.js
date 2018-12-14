const express = require('express');
const burger = require('../models/burger.js');

const router = express.Router();

// create route for get all
router.get('/', (req,res)=>{
    burger.selectAll((data)=>{
        let hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render('index', hbsObj);
    });
});

// create route for post one
router.post('/api/burger', (req, res)=>{
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, false], (data)=>{
        console.log("controller works",data);
        res.json({id: data.id});
    });
});

// create route for update one
router.put('/api/burger/:id', (req, res)=>{
    let condition = "id= "+ req.params.id;
    
    burger.updateOne({devoured: true},
        condition, (data)=>{
            if(data.changedRows === 0){
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
    
});

// export module 
module.exports = router;