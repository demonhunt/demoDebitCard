export function extractSuborderId(searchText){
    searchText = searchText.toString();
    let result = searchText
    if(searchText.includes("_")){
        result = searchText.split("_")[0]
    } else {
        result = searchText.replace(/\D/g,''); 
        while (result.length>0 && result [0] == '0'){
            result = result.substring(1);
        }
    }
    return result
}