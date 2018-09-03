
document.getElementById('search_result').style.display='none'
function gettingFocusOfSearchBox(){
   
 document.getElementById('search_result').style.display=''

}
function isEmpty(str) {
    return (!str || 0 === str.length);
}
function gettingOutOfFocusOfSearchBox(){
	let searchvalue=document.getElementById('search').value
    //console.log("here is your search value"+isEmpty(searchvalue))
    if(isEmpty(searchvalue)){
    document.getElementById('search_result').style.display='none'
    console.log('executed with in');
      }
	
}