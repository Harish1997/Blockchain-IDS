var id=0;
var cont;
var cars={};
var attacked_car_id;
var steering_angle_txt=document.getElementById("steering_angle");
    var braking_distance_txt=document.getElementById("braking_distance");
    var speed_limit_txt=document.getElementById("speed_limit");
    var attackdiv= document.getElementById("attackdiv");
    var container=document.getElementById("holdercont");
    var clabel=document.getElementById("chain-label");

    steering_angle_txt.addEventListener('keyup',(event)=>{
        if(attacked_car_id!=null){
            //alert("Car "+attacked_car_id+" is being attacked!");
            clabel.innerHTML="Car "+attacked_car_id+" is being attacked! Steering Angle data is being changed! Stopping car "+attacked_car_id+" immediately";
            steeringattackCarinChain(attacked_car_id,steering_angle_txt.value);
        }
    });

    braking_distance_txt.addEventListener('keyup',(event)=>{
        if(attacked_car_id!=null){
            //alert("Car "+attacked_car_id+" is being attacked!");
            clabel.innerHTML="Car "+attacked_car_id+" is being attacked! Braking Distance data is being changed! Stopping car "+attacked_car_id+" immediately";
            brakingattackCarinChain(attacked_car_id,braking_distance_txt.value);
        }
    });

    speed_limit_txt.addEventListener('keyup',(event)=>{
        if(attacked_car_id!=null){
            //alert("Car "+attacked_car_id+" is being attacked!");
            clabel.innerHTML="Car "+attacked_car_id+" is being attacked! Speed limit data is being changed! Stopping car "+attacked_car_id+" immediately";
            speedattackCarinChain(attacked_car_id,speed_limit_txt.value);
        }
    });


function addcar(){
    cont=document.getElementById('holdercont');
    
    console.log("New car added, actively looking for connections");
    if(cont){
        cont.addEventListener('click',function(event){
            var element=event.target;
            if(element){
                let car_data=cars[element.id]['data'];
                console.log("clicked holder "+element.id);
                console.log(cars[element.id]['data']);
                steering_angle_txt.value=String(car_data.Steering_Angle);
                braking_distance_txt.value=String(car_data.Braking_distance);
                speed_limit_txt.value=String(car_data.Speed_Limit);
                console.log(car_data.Steering_Angle);
                attacked_car_id=element.id;
            }
        });
    }else{
        console.log("container does not exits")
    }
    if(container){
        if(id>0){
            attackdiv.classList.remove('hide');
            container.classList.add('borderme');
            clabel.classList.remove('hide');
            count=id+1;
            clabel.innerHTML="Chain formed with "+count+" cars";
        }
        else{
            clabel.classList.remove('hide');
            clabel.innerHTML="Add another car to successfully form a chain";
        }
        container.innerHTML=container.innerHTML+"<div class='cardiv' id="+id+"><img class='caricon' src='assets/cardrive.gif' id="+id+"><img class='connecticon' src='assets/connect.gif'></div>";
        id=id+1;
        addCarToChain(id);
    }

}


async function addCarToChain(id){
    let url="http://localhost:8081/car/join";
    let newCarRequest=await fetch(url,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {
                "id":id
            }
        )
    }).then(res=>{
       // 
       // console.log(jsonobj["chain"]);
    res.json().then(data=>{
        let jsonobj = JSON.parse(data.chain)["chain"];
        jsonobj.forEach(element => {
            cars[element['index']]=element;
        });
        console.log(cars);
       });
    });
}


    async function steeringattackCarinChain(id,data){
        let url="http://localhost:8081/attack/steering/car/"+id;
        let attackCarRequest=await fetch(url,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    "id":id,
                    "data":data
                }
            )
        }).then(res=>{
        
        });
    }


    async function brakingattackCarinChain(id,data){
        let url="http://localhost:8081/attack/braking/car/"+id;
        let attackCarRequest=await fetch(url,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    "id":id,
                    "data":data
                }
            )
        }).then(res=>{
        
        });
    }


    async function speedattackCarinChain(id,data){
        let url="http://localhost:8081/attack/speed/car/"+id;
        let attackCarRequest=await fetch(url,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    "id":id,
                    "data":data
                }
            )
        }).then(res=>{
        
        });
    }


