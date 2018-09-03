let search='';
let search_result=document.getElementById('search_result')
let globalresult='';
let cardcontainer=document.getElementById('card_container')
let Allcard='';
let Allcardobjectinformation=[];
let cardcounter=0;
let suggestion=document.getElementById('suggestion')

let cardcolorgenrator=['#4b3832', '#854442' , '#2e003e' , '#3d2352' , '#3d1e6d',  '3c2f2f', '#be9b7b']


function colorgenrator(){
  return cardcolorgenrator[Math.floor(Math.random()*cardcolorgenrator.length)]
}


window.onload=function (){
   search=document.getElementById('search');
};

function findmatchingresult(){
   
   let finalresult=[];
   let resultdata='';
   let ourRequest=new XMLHttpRequest();
   let url="https://jsonplaceholder.typicode.com/posts"
   ourRequest.open('GET',url);
   ourRequest.onload=function(){
   resultdata=JSON.parse(ourRequest.responseText)
   
   //console.log(search.value)
   for(i in resultdata){
       if(resultdata[i].title.indexOf(search.value)>-1){
       	finalresult.push(resultdata[i])
        //console.log(resultdata[i]);
       }
    }
    if(document.getElementById('suggestion')!==null){
      search_result.removeChild(document.getElementById('suggestion'))
    }
    renderHtml(finalresult)
}   
    ourRequest.send()

    //console.log(resultdata)
    
    
//console.log(resultdata[0])

}
function msgdisplay(msg){
  document.getElementById('msg').innerHTML=msg;
  document.getElementById('msg').style.display=''
  setTimeout(function (){console.log("execute after 3 secibd")
  document.getElementById('msg').style.display='none'},8000)

}

function genratecard(user){
	//console.log("hello brother ")
  for(i in Allcardobjectinformation){
    if(Allcardobjectinformation[i].id===globalresult[user].id){
      console.log("card is all ready there with user id "+globalresult[user].id)
      let msg="card is all ready there with user id "+globalresult[user].id
      msgdisplay(msg)
      Allcard[user].focus();
      return;
    }
    
  }
  let backgroundcolor=colorgenrator();
  cardcounter++;
  //console.log(backgroundcolor);
  /*let template='<div class="scene"><div class="card">'+
     '<div class="card__face card__face--front"onmouseout="mouseout('+cardcounter+')" onmouseover="cardanimation('+cardcounter+')" style="background-color:'+backgroundcolor+'">'
        +'<p class="useridstyle">'+'<label>user id :</label>'+ globalresult[user].userId+'</p>'
        +'<p class="useridstyle">'+'<label> id :</label>'+ globalresult[user].id+'</p>'
        + '<p class="usertitlestyle"><b>title<b> :<br>'+ globalresult[user].title+'</p>'
        +'</div><div class="card__face card__face--back">back</div>'+
              '</div> </div>'*/



    let template=`<div class="scene">
    <div class="card">
     <div class="card__face card__face--front"  onclick="cardanimation(${cardcounter})" style="background-color:${backgroundcolor}">
        <p class="useridstyle"><label>user id :</label>${globalresult[user].userId}</p>
        <p class="useridstyle"><label> id :</label>${globalresult[user].id}</p>
        <p class="usertitlestyle"><b>title</b> :<br>'${globalresult[user].title}</p>
     </div>
     <div class="card__face card__face--back" onclick="mouseout(${cardcounter})">back</div>
              </div> 
      </div>`
      console.log(template);   

   

   cardcontainer.insertAdjacentHTML('beforeend',template);
	 console.log(globalresult[user])
   Allcard=document.getElementsByClassName('card');
   Allcardobjectinformation.push(globalresult[user]);
   console.log("here is total card "+Allcard.length)
   
}

function renderHtml(data){
	globalresult=data;
 let template='<div id="suggestion">'
 for(i in data){
 	template+='<p class="individual_search_result">'+data[i].title+'<span class="addcard" onclick="genratecard('+i+')">'+' &#10004;'+'</span></p>'
 }
 
 
 if(data.length===0){template+='<p class="danger">'+"there is no search related to     <i><b> "+search.value+'<b></i></p>'}
 	template+='</div>'
 search_result.insertAdjacentHTML('beforeend',template)

}











function cardanimation(counter){
  console.log('got fired')
  Allcard[counter-1].classList.toggle('is_flipped');
  Allcard[counter-1].getElementsByTagName('div')[1].style.background=colorgenrator();
  Allcard[counter-1].getElementsByTagName('div')[1].innerHTML=Allcardobjectinformation[counter-1].body
}







function mouseout(counter){
  Allcard[counter-1].classList.toggle('is_flipped');
}


