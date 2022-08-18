const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const collisionsMap = [];
for (let i =0; i<collisions.length;i += 50){
    collisionsMap.push(collisions.slice(i,50 +i));
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
const boundaries = [];
const offset = {
    x: -2000,
    y: -1000
}

collisionsMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if (Symbol === 16)
        boundaries.push(new Bondary({position: {
            x:j*Bondary.width + offset.x,
            y:i*Bondary.height + offset.y
        }}))
    })
})

const image = new Image();
image.src = "data/map.png";

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

const player = new Sprite({
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
    }
}


//_____________________________________________________INTERACTIF_OBJECT_____________________________________________________

let ramassableMap = [];
function ramassableMapCalc(){
    ramassableMap = []
    for (let i =0; i<ramassable.length;i += 50){
        ramassableMap.push(ramassable.slice(i,50 +i));
    }
}
ramassableMapCalc()
const planteSrc = new Image();
planteSrc.src = "data/interactifObject/plante.png"

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
            if (Symbol !== 0)
            gatherable.push(new interactif({position: {
                x:j*interactif.width + offset.x + varMoveX,
                y:i*interactif.height + offset.y + varMoveY
            },
            image: planteSrc,
            height: 128,
            width: 128,
            index: (+i*50)+j,
            symbol: Symbol
        }))
        })
    })
}
gatherableCalc()
const gatherer = player;

function gather({gatherer, gatherable}){
    return(
        gatherer.position.x + gatherer.width >= gatherable.position.x   &&
        gatherer.position.x <= gatherable.position.x +gatherable.width  &&
        gatherer.position.y + gatherer.height >= gatherable.position.y  &&
        gatherer.position.y <= gatherable.position.y + gatherable.height
    )
}

let casesStatus = [0,0,0,0,0,0,0,0,0]
let casesStatusNum = [0,0,0,0,0,0,0,0,0]
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
                            console.log(casesStatus)
                            if(casesStatus[0] == 0){
                                let item = new Image();
                                let itemList = ["data/Item/fibre.png"]
                                item.src = itemList[interactif.symbol-1];
                                let cases = document.getElementById("case0")
                                cases.append(item);
                                let number = document.createElement("p")
                                number.setAttribute("name","count")
                                casesStatusNum.splice([0],1,1)
                                let iCount = casesStatusNum[0]
                                number.innerHTML = iCount
                                cases.append(number)
                                casesStatus.splice([0], 1, interactif.symbol)
                            }
                            else{
                                let number = document.getElementsByName("count")[0]
                                casesStatusNum.splice([0],1,(casesStatusNum[0]+1))
                                number.innerHTML = casesStatusNum[0]
                            }
                            console.log(casesStatus)
                            let index = interactif.index
                            let replace = 0
                            ramassable.splice(index, 1, replace)
                            ramassableMapCalc()
                            gatherableCalc()
                            movablesCalc()
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
    movables = [background, ...boundaries, ...gatherable]
}
movablesCalc()
const speed = 5;

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
    gatherable.forEach(interactif => {
        interactif.draw()
        if(gather({
            gatherer: player,
            gatherable: interactif
        })){
            console.log("ramasser")
        }
    })


    window.requestAnimationFrame(animate);
    player.draw()
    let moving = true

    if (keys.z.pressed && keys.d.pressed){
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y += speed-1.5
                movables.position.x -= speed-1.5
            })
            varMoveY += speed-1.5
            varMoveX -= speed-1.5
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y += speed-1.5
                movables.position.x += speed-1.5
            })
            varMoveY += speed-1.5
            varMoveX += speed-1.5
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y += speed
            })
            varMoveY += speed
    }

    else if (keys.s.pressed && keys.q.pressed){
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y -= speed-1.5
                movables.position.x += speed-1.5
            })
            varMoveY -= speed-1.5
            varMoveX += speed-1.5
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y -= speed-1.5
                movables.position.x -= speed-1.5
            })
            varMoveY -= speed-1.5
            varMoveX -= speed-1.5
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
        if (moving)
            movables.forEach(movables => {
                movables.position.x += speed
            })
            varMoveX += speed
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
        if (moving)
            movables.forEach(movables => {
                movables.position.y -= speed
            })
            varMoveY -= speed
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
        if (moving)
            movables.forEach(movables => {
                movables.position.x -= speed
            })
            varMoveX -= speed
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
    }
})