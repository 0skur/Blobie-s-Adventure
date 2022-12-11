function actualisationInventaire(){
    let inventaireIU = []
    for(i=0;i <= casesId.length-1;i++){
        if(document.getElementById(casesId[i]).lastChild !== null){
            let test = document.getElementById(casesId[i]).lastChild
            inventaireIU.push(test.textContent)
        }
        else{
            inventaireIU.push("0")
        }
    }
    for(i=0;i <= inventaireIU.length-1;i++){
        if(inventaireIU[i] != casesStatusNum[i]){
            if(document.getElementById(casesId[i]).lastChild !== null){
                let inventaireCase = document.getElementById(casesId[i]).lastChild
                inventaireCase.textContent = casesStatusNum[i]
            }
        }
    }
    for(i=0;i <= casesStatusNum.length-1;i++){
        if(casesStatusNum[i] == 0){
            if(document.getElementById(casesId[i]).firstChild != null){
                document.getElementById(casesId[i]).removeChild(document.getElementById(casesId[i]).firstChild)
                document.getElementById(casesId[i]).removeChild(document.getElementById(casesId[i]).lastChild)
                casesStatus[i] = 0
                casesStatusNum[i] = 0
            }
        }
    }

}