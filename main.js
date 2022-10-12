const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const image = new Image();
image.src = "data/map_2.png";

const playerImage = new Image();
playerImage.src = "data/personnage.png"

class Sprite{
    constructor({position, image}){
        this.position = position
        this.image = image
        this.image.onload = () =>{
            this.width = this.image.width
            this.height = this.image.height
        }
    }
    draw(){
            c.drawImage(this.image,this.position.x,this.position.y);
            c.drawImage(this.image,this.position.x,this.position.y);
    }
}

let spawnPointMap = []
for (let i =0; i<spawnPoint.length;i += 39){
    spawnPointMap.push(spawnPoint.slice(i,39 +i));
}
spawnPointCoo = []
spawnPointMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 1)
        spawnPointCoo.push(new Sprite({position: {
            x:j*128,
            y:i*128
        },
        image: playerImage
        }))
    })
})

const boundaries = [];
const offset = {
    x: -spawnPointCoo[0].position.x + canvas.width/2,
    y: -spawnPointCoo[0].position.y + canvas.height/2
}








let player = new Sprite({
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    },
    image: playerImage
})

const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image,
})
console.log(background)
const collisionsMap = [];
for (let i =0; i<collisions.length;i += 39){
    collisionsMap.push(collisions.slice(i,39 +i));
}
class Bondary{
    static width = 128;
    static height = 128;
    constructor({position}){
        this.position = position;
        this.width = 128;
        this.height = 128;
    }
    draw(){
        c.fillStyle = 'rgba(255,0,0,0.5)';
        c.fillRect(this.position.x, this.position.y, this.width,this.height);
    }
}


collisionsMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 37)
        boundaries.push(new Bondary({position: {
            x:j*Bondary.width + offset.x,
            y:i*Bondary.height + offset.y
        }}))
    })
})

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    shift: {
        pressed: false
    }
}
const foregroundMap = [];
for (let i =0; i<foreground.length;i += 39){
    foregroundMap.push(foreground.slice(i,39 +i));
}

const arbre_haut_gauche = new Image();
arbre_haut_gauche.src = "data/foreground/arbre-haut-gauche.png"
const arbre_haut_droite = new Image();
arbre_haut_droite.src = "data/foreground/arbre-haut-droite.png"

class Foreground{
    static width = 128;
    static height = 128;
    constructor({position, image, width, height}){
        this.position = position;
        this.image = image;
        this.width = width;
        this.height = height;
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }
}
const foregrounds = [];

foregroundMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 92){
            foregrounds.push(new Foreground({position: {
                x:j*Foreground.width + offset.x, 
                y:i*Foreground.height + offset.y
            },
            image : arbre_haut_gauche,
            height: 128,
            width: 128
        }))
        }
        if (Symbol === 93){
            foregrounds.push(new Foreground({position: {
                x:j*Foreground.width + offset.x, 
                y:i*Foreground.height + offset.y
            },
            image : arbre_haut_droite,
            height: 128,
            width: 128
        }))
        }
    })
})
//_____________________________________________________INTERACTIF_OBJECT_____________________________________________________

let ramassableMap = [];
function ramassableMapCalc(){
    ramassableMap = []
    for (let i =0; i<ramassable.length;i += 39){
        ramassableMap.push(ramassable.slice(i,39 +i));
    }
}
ramassableMapCalc()
const branche = new Image();
branche.src = "data/interactifObject/branche.png"
const caillou = new Image();
caillou.src = "data/interactifObject/caillou.png"
const buisson = new Image();
buisson.src = "data/interactifObject/buisson.png"
const buisson_baies = new Image();
buisson_baies.src = "data/interactifObject/buisson_baies.png"



class interactif{
    static width = 128;
    static height = 128;
    constructor({position, image, width, height, index, symbol}){
        this.image = image;
        this.position = position;
        this.width = width;
        this.height = height;
        this.index = index
        this.symbol = symbol
        }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

let varMoveX = 0
let varMoveY = 0
let gatherable = []

function gatherableCalc(){
    gatherable = []
    ramassableMap.forEach((row, i) => {
        row.forEach((Symbol, j) => {
            if (Symbol === 116){
                gatherable.push(new interactif({position: {
                    x:j*Foreground.width + offset.x + varMoveX, 
                    y:i*Foreground.height + offset.y + varMoveY
                },
                image: buisson_baies,
                height: 128,
                width: 128,
                index: (+i*39)+j,
                symbol: Symbol
            }))
            }
            if (Symbol === 117){
                gatherable.push(new interactif({position: {
                    x:j*Foreground.width + offset.x + varMoveX, 
                    y:i*Foreground.height + offset.y + varMoveY
                },
                image: caillou,
                height: 128,
                width: 128,
                index: (+i*39)+j,
                symbol: Symbol
            }))
            }
            if (Symbol === 118){
                gatherable.push(new interactif({position: {
                    x:j*Foreground.width + offset.x + varMoveX, 
                    y:i*Foreground.height + offset.y + varMoveY
                },
                image: branche,
                height: 128,
                width: 128,
                index: (+i*39)+j,
                symbol: Symbol
            }))
            }
            if (Symbol === 119){
                gatherable.push(new interactif({position: {
                    x:j*Foreground.width + offset.x + varMoveX, 
                    y:i*Foreground.height + offset.y + varMoveY
                },
                image: buisson,
                height: 128,
                width: 128,
                index: (+i*39)+j,
                symbol: Symbol
            }))
            }
        })
    })
}
gatherableCalc()

const gatherer = player;

function gather({gatherer, gatherable}){
    return(
        gatherer.position.x + gatherer.width + 64 >= gatherable.position.x   &&
        gatherer.position.x <= gatherable.position.x +gatherable.width +64 &&
        gatherer.position.y + gatherer.height +64>= gatherable.position.y  &&
        gatherer.position.y <= gatherable.position.y + gatherable.height +64
    )
}

let casesStatus = [0,0,0,0,0,0,0,0,0]
let casesStatusNum = [0,0,0,0,0,0,0,0,0]
let casesId = ["case0","case1","case2","case3","case4","case5","case6","case7","case8"]
function gatherEvent(){
    window.addEventListener("mouseup",(e)=>{
        if(typeof e === "object"){
            gatherable.forEach(interactif =>{
                if(gather({
                    gatherer: player,
                    gatherable: interactif
                })){
                    switch(e.button){
                        case 2:
                            
                            let firstCorCase = casesStatus.findIndex((element) => element === interactif.symbol)
                            let firstEmptyCase = casesStatus.findIndex((element) => element === 0)
                            
                            if(interactif.symbol !== 119){
                                if(firstCorCase === -1){
                                    cases = document.getElementById(casesId[firstEmptyCase])
                                    let item = new Image();
                                    let itemList = ["data/Item/baies.png","data/Item/caillou.png","data/Item/baton.png"]
                                    item.src = itemList[interactif.symbol-116];
                                    
                                    
                                    cases.append(item);
                                    let number = document.createElement("p")
                                    casesStatusNum.splice([firstEmptyCase],1,1)
                                    let iCount = casesStatusNum[firstEmptyCase+1] +1
                                    number.innerHTML = iCount
                                    cases.append(number)
                                    casesStatus.splice([firstEmptyCase], 1, interactif.symbol)
                                }
                                else{
                                    let number = document.querySelector('#'+casesId[firstCorCase])
                                    let numberP = number.lastElementChild
                                    
                                    casesStatusNum.splice([firstCorCase],1,(casesStatusNum[firstCorCase]+1))
                                    numberP.innerHTML = casesStatusNum[firstCorCase]
                                }
                            
                            let index = interactif.index
                            let replace = 0
                            
                            if(interactif.symbol-116 === 0){
                                ramassable.splice(index,1,119)
                                
                            }
                            else{
                                ramassable.splice(index, 1, replace)
                            }
                            
                            
                            ramassableMapCalc()
                            gatherableCalc()
                            movablesCalc()
                            }
                            
                        break;
                    }
                }
            })
        }
    })
}
gatherEvent()

//_____________________________________________________INTERACTIF_OBJECT_END____________________________________________________
let movables = []
function movablesCalc(){
    movables = [background, ...boundaries, ...gatherable, ...foregrounds]
}
movablesCalc()

function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x +rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate(){

    background.draw()
    boundaries.forEach(Bondary =>{
        Bondary.draw()
    })
    gatherable.forEach(interactif => {
        interactif.draw()
        
    })
    window.requestAnimationFrame(animate);
    player.draw()
    foregrounds.forEach(Foreground =>{
        Foreground.draw()
    })

    let moving = true
    let speed = 5
    if (keys.z.pressed && keys.d.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - (speed-1.5),
                        y: boundary.position.y + (speed-1.5)
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y += speed-1.5
                movables.position.x -= speed-1.5
                
            })
            varMoveY += speed-1.5
            varMoveX -= speed-1.5
        }
            
            
    }

    else if (keys.z.pressed && keys.q.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + (speed-1.5),
                        y: boundary.position.y + (speed-1.5)
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y += speed-1.5
                movables.position.x += speed-1.5

            })
            varMoveY += speed-1.5
            varMoveX += speed-1.5
        }
           
           
    }

    else if (keys.z.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + speed
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y += speed
                
            })
            varMoveY += speed
        }
            
           
    }

    else if (keys.s.pressed && keys.q.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + (speed-1.5),
                        y: boundary.position.y - (speed-1.5)
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y -= speed-1.5
                movables.position.x += speed-1.5
                
            })
            varMoveY -= speed-1.5
            varMoveX += speed-1.5
        }
           
           
    }

    else if (keys.s.pressed && keys.d.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - (speed-1.5),
                        y: boundary.position.y - (speed-1.5)
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y -= speed-1.5
                movables.position.x -= speed-1.5
            
            })
            varMoveY -= speed-1.5
            varMoveX -= speed-1.5
        }
           
           
    }

    else if (keys.q.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + speed,
                        y: boundary.position.y
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){
            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.x += speed
                
            })
            varMoveX += speed
        }
           
           
    }

    else if (keys.s.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - speed
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i]
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.y -= speed
            })
            varMoveY -= speed
        }  
    }

    else if (keys.d.pressed){
        for (let i=0;i<boundaries.length;i++){
            const boundary = boundaries[i];
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - speed,
                        y: boundary.position.y
                    }}
                })
            ){
                moving = false;
                break
            }
        }
        for(let i=0;i<gatherable.length;i++){
            const movable = gatherable[i];
            if(
                gather({
                    gatherer: player,
                    gatherable: {...movable, position: {
                        x: movable.position.x,
                        y: movable.position.y
                    }}
                })
            ){

            }
        }
        if (moving){
            movables.forEach(movables => {
                movables.position.x -= speed
              
            })
            varMoveX -= speed
        }
    }
}
animate()
let lastKey = '';
window.addEventListener("keydown", (e) =>{
    switch(e.key){
        case "z":
            keys.z.pressed = true;
        break
        case "q":
            keys.q.pressed = true;
        break
        case "s":
            keys.s.pressed = true;
        break
        case "d":
            keys.d.pressed = true;
        break
        case "Shift":
            keys.shift.pressed = true;
        break
    }
})
window.addEventListener("keyup", (e) =>{
    switch(e.key){
        case "z":
            keys.z.pressed = false;
        break
        case "q":
            keys.q.pressed = false;
        break
        case "s":
            keys.s.pressed = false;
        break
        case "d":
            keys.d.pressed = false;
        break
        case "Shift":
            keys.shift.pressed = false;
        break
    }
})