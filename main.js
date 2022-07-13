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
for (let i =0; i<ramassable.length;i += 50){
    ramassableMap.push(ramassable.slice(i,50 +i));
}
const planteSrc = new Image();
planteSrc.src = "data/interactifObject/plante.png"


class interactif{
    static width = 128;
    static height = 128;
    constructor({position, image, width, height, index}){
        this.image = image;
        this.position = position;
        this.width = width;
        this.height = height;
        this.index = index
        }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

const gatherable = []
    ramassableMap.forEach((row, i) => {
        row.forEach((Symbol, j) => {
            if (Symbol === 11)
            gatherable.push(new interactif({position: {
                x:j*interactif.width + offset.x,
                y:i*interactif.height + offset.y
            },
            image: planteSrc,
            height: 128,
            width: 128,
            index: (+i*50)+j
        }))
        })
    })
console.log(ramassableMap)
console.log(gatherable)
const gatherer = player;

function gather({gatherer, gatherable}){
    return(
        gatherer.position.x + gatherer.width >= gatherable.position.x   &&
        gatherer.position.x <= gatherable.position.x +gatherable.width  &&
        gatherer.position.y + gatherer.height >= gatherable.position.y  &&
        gatherer.position.y <= gatherable.position.y + gatherable.height 
    )
}
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
                            let item = new Image();
                            item.src = "data/Item/fibre.png";
                            let cases = document.getElementById("case0")
                            cases.append(item)
                            let index = interactif.index
                            let replace = 0
                            console.log(index)
                            ramassable.splice(index, 1, replace)
                            console.log(ramassableMap)
                            console.log(gatherable)
                            ramassableMapCalc()
                            console.log(ramassableMap)
                        break;
                    }
                }
            })
        }
    })
}
gatherEvent()

//_____________________________________________________INTERACTIF_OBJECT_END____________________________________________________
const movables = [background, ...boundaries, ...gatherable]
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
    
    if (keys.z.pressed){
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
    }
    if (keys.q.pressed){
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
    }
    if (keys.s.pressed){
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
    }
    if (keys.d.pressed){
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