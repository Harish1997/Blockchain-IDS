var id=0;
var cont;
function addcar(){
    cont=document.getElementById('holdercont');

    let attackdiv= document.getElementById("attackdiv");
    let container=document.getElementById("holdercont");
    let clabel=document.getElementById("chain-label");
    console.log("New car added, actively looking for connections");
    if(cont){
        cont.addEventListener('click',function(event){
            var element=event.target;
            if(element){
                console.log("clicked holder "+element.id);
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
    });
    let result=await newCarRequest.json();
    if (result.err) {
         console.log('error');
    }
    else { 
        console.log('fetched response');
    }
}

