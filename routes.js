var express = require('express');
var bodyParser=require('body-parser');

var chainItems=require('./main.js'); 
var getDateNow=require('./datefunc.js');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

var car_data={Speed_Limit:55,Braking_distance:10,Steering_Angle:5};



var car_ids=[];
var active_connections=0;
var blocks=new chainItems.BlockChain();



app.post('/car/join',(req,res)=>{
    var car_id = req.body.id;
    console.log("The car id is "+req.body);
    res.setHeader('Content-Type','application/json');
    if(active_connections===0){
        res.send(JSON.stringify({result:"No active connections - New car with id "+car_id+" has entered the system"}));
        car_ids.push(car_id);
        console.log(car_ids);
        active_connections=active_connections+1;
        blocks.addBlock(new chainItems.Block(car_id,getDateNow(),{Speed_Limit:55,Braking_distance:10,Steering_Angle:5}));
        logger();
    }
    else if(active_connections===1){
        car_ids.push(car_id)
        res.send(JSON.stringify({result:"Car connect process - Entering Handshake for "+car_id+" with existing car having id "+car_ids[0]}));
        console.log(car_ids);
        active_connections=active_connections+1;
        blocks.addBlock(new chainItems.Block(car_id,getDateNow(),{Speed_Limit:55,Braking_distance:10,Steering_Angle:5}));
        logger();
    }
    else{
        res.send("Car connect process - Entering Handshake for "+car_id+" with existing chain of cars having ids "+car_ids.toString());
        car_ids.push(car_id);
        console.log(car_ids);
        blocks.addBlock(new chainItems.Block(car_id,getDateNow(),{Speed_Limit:55,Braking_distance:10,Steering_Angle:5}));
        logger();

    }
});
app.use(express.static('UI'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/UI/index.html');
});

function logger(){
console.log(JSON.stringify(blocks,null,4));

console.log("Is the blockchain valid? " + blocks.isChainValid());

console.log(Date.now());
}


app.listen(8081);