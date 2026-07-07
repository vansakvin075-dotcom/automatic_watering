document.getElementById("onBtn").onclick=function(){

fetch("/pump",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
state:"ON"
})

});

}




document.getElementById("offBtn").onclick=function(){

fetch("/pump",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
state:"OFF"
})

});

}