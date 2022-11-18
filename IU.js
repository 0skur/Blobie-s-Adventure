const gameZone = document.getElementById("gameZone")
const barreAccèsRapide = document.createElement("section");
let width = 675;
let height = 75;
barreAccèsRapide.setAttribute("style", "position: absolute; bottom: 20px; height:"+height+"px; background-color: rgba(200,200,200,0.75); display: flex; border: 1px solid rgb(100,100,100);")
gameZone.append(barreAccèsRapide)

for (i=0;i<9;i++){
    const cases = document.createElement("section");
    cases.setAttribute("style", "border-right: 1px solid white; border-left: 1px solid rgb(100,100,100); height: 75px; width: 73px; display: grid; grid-template-rows: repeat(1,100%);grid-template-columns: repeat(1,70% 30%);");
    cases.setAttribute("id","case"+i);
    barreAccèsRapide.append(cases)
}

casesTable = ["case0","case1","case2","case3","case4","case5","case6","case7","case8"]
caseActive = 0
document.getElementById("case0").setAttribute("class","bActive");
function selectCase(){
    window.addEventListener("wheel", (e) =>{
        let bActive = document.getElementsByClassName("bActive")[0].id;
        let bActiveId = bActive.substring(4,5)
        if (e.deltaY < 0) {
            if(+bActiveId+1 >= 0 && +bActiveId+1 <= 8){
                for(i=0;i<9;i++){
                    document.getElementById("case"+i).setAttribute("class","");
                }
                document.getElementById("case"+(+bActiveId+1)).setAttribute("class","bActive");
                caseActive++
            } 
            else{
                for(i=0;i<9;i++){
                    document.getElementById("case"+i).setAttribute("class","");
                }
                document.getElementById("case0").setAttribute("class","bActive");
            }
        }
        else if (e.deltaY > 0) {
            if(+bActiveId-1 >= 0 && +bActiveId-1 <= 8){
                for(i=0;i<9;i++){
                    document.getElementById("case"+i).setAttribute("class","");
                }
                document.getElementById("case"+(+bActiveId-1)).setAttribute("class","bActive");
                caseActive--
            }
            else{
                for(i=0;i<9;i++){
                    document.getElementById("case"+i).setAttribute("class","");
                }
                document.getElementById("case8").setAttribute("class","bActive");
            }
        }
    }),
    window.addEventListener("keyup", (e) =>{
        switch(e.key){
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                
                for(i=0;i<9;i++){
                    document.getElementById("case"+i).setAttribute("class","");
                }
                document.getElementById("case"+e.key).setAttribute("class","bActive");
            break
        }
    })
}
selectCase()

//BOUTON CRAFT----------------------------------------------------------------------------------------------------------------------------

const zoneBouton = document.createElement("section")
zoneBouton.setAttribute("style","position: absolute; width: 75px;height :75px ;right: 10px; top: 10px;border: 2px solid rgb(30,30,30);border-radius: 20px;")
gameZone.append(zoneBouton)
const boutonCraft = new Image();
boutonCraft.src = "data/craft_logo.png";
zoneBouton.append(boutonCraft)

const craftMenu = document.createElement("section")
craftMenu.setAttribute("style","position: absolute; width: 500px;height: 500px;background-color: rgba(200,200,200,0.75);bottom:0px;right:0px;visibility: hidden;overflow")
let visible = 0
gameZone.append(craftMenu)

function openCraftMenu(){
    console.log("craft")
    if(visible === 0){
        craftMenu.setAttribute("style","position: absolute; width: 500px;height: 500px;background-color: rgba(200,200,200,0.75);bottom:0px;right:0px;visibility: visible;")
        visible = 1
    }
    else{
        craftMenu.setAttribute("style","position: absolute; width: 500px;height: 500px;background-color: rgba(200,200,200,0.75);bottom:0px;right:0px;visibility: hidden;")
        visible = 0
    }
    
}
boutonCraft.addEventListener("click", ()=>{
    openCraftMenu()
})

window.addEventListener("keyup", (e) =>{
    switch(e.key){
        case "c": case "C":
        openCraftMenu()
        break
    }
})

//FAIM ET VIE-----------------------------------------------------------------------------------------------------------------------------
let barreFaimWidth = 50
let barreVieWidth = 100

const barreFaim = document.createElement("section")
barreFaim.setAttribute("style","position: absolute; width: 200px;height :30px ;border: 2px solid black;left: 10px; top: 10px;")
gameZone.append(barreFaim)

const barreFaimRemplissage = document.createElement("section")
barreFaimRemplissage.setAttribute("style","width:"+barreFaimWidth+"%;height: 30px;background-color: rgb(176,82,0);text-align: center;line-height: 30px;color: white;overflow:visible")
barreFaim.append(barreFaimRemplissage)

const nbFaimZone = document.createElement("section")
nbFaimZone.setAttribute("style","display: flex;justify-content: center; align-items: center;top: 0; height: 100%; width: 100%;position: absolute;")
barreFaim.append(nbFaimZone)

const nbFaim = document.createElement("p")
nbFaim.textContent = barreFaimWidth + "%"
nbFaimZone.append(nbFaim)

const barreVie = document.createElement("section")
barreVie.setAttribute("style","position: absolute; width: 200px;height :30px ;border: 2px solid black;left: 10px; top: 50px;")
gameZone.append(barreVie)

const barreVieRemplissage = document.createElement("section")
barreVieRemplissage.setAttribute("style","  width:"+barreVieWidth+"%;height: 30px;background-color: rgb(230,0,0);text-align: center;line-height: 30px;color: white;")
barreVie.append(barreVieRemplissage)

const nbVieZone = document.createElement("section")
nbVieZone.setAttribute("style","display: flex;justify-content: center; align-items: center;top: 0; height: 100%; width: 100%;position: absolute;")
barreVie.append(nbVieZone)

const nbVie = document.createElement("p")
nbVie.textContent = barreVieWidth + "%"
nbVieZone.append(nbVie)


function useFood(){
        console.log("miam")
        if ((casesStatus[caseActive] === 116) && (casesStatusNum[caseActive] > 0)){
            barreFaimWidth = barreFaimWidth + 10
            if(barreFaimWidth > 100){
                barreFaimWidth = barreFaimWidth - 10
            }
            else{
                casesStatusNum[caseActive]--
                document.getElementById(casesTable[caseActive]).lastElementChild.innerHTML = casesStatusNum[caseActive]
                barreFaimRemplissage.setAttribute("style","  width:"+barreFaimWidth+"%;height: 30px;background-color: rgb(176,82,0);text-align: center;line-height: 30px;color: white;")
                nbFaim.textContent = barreFaimWidth + "%"
            }
        }
    }
gameZone.addEventListener("click", (e) =>{
    useFood()
})

function faim(){
    if (barreFaimWidth > 0){
        barreFaimRemplissage.setAttribute("style","  width:"+barreFaimWidth+"%;height: 30px;background-color: rgb(176,82,0);text-align: center;line-height: 30px;color: white;")
        barreFaimWidth--
        nbFaim.textContent = barreFaimWidth + "%"
    }
    if ((barreVieWidth > 0) && (barreFaimWidth === 0)){
        barreVieRemplissage.setAttribute("style","  width:"+barreVieWidth+"%;height: 30px;background-color: rgb(230,0,0);text-align: center;line-height: 30px;color: white;")
        barreVieWidth--
        nbVie.textContent = barreVieWidth + "%"
    }
    else{
        vie()
    }
}
setInterval(faim,15000)

function vie(){
    if (barreVieWidth === 0){
        //alert("Vous êtes mort")
    }
}
//ACCES AU MENU-----------------------------------------------------------------------------------------------------------------------------
const boutonMenu = document.createElement("section");
boutonMenu.setAttribute("style","position: absolute;width: 75px;height: 75px;left: 10px;bottom: 10px;border: 2px solid rgb(30,30,30);border-radius: 20px;")
gameZone.append(boutonMenu)