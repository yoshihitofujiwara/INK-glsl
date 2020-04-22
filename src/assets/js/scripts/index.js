import * as days from "./days";

global.days = days;


window.addEventListener("hashchange", ()=>{
  location.reload();
}, false);


let fileName = location.href.split("#").find(item => -1 < item.indexOf("Day"));

if(fileName){ // day
  new days[fileName]();
  document.querySelector("h1").innerHTML = fileName + " : " + days[fileName].title();

  let current = +fileName.replace("Day", "");
  let prev = current - 1;
  let $prev = document.getElementById("prev");

  if(prev){
    $prev.addEventListener("click", ()=>{
      prev = prev.toString();
      location.hash = "#Day" + (Math.pow(10,  (3 - prev.length))).toString().slice(1) + prev;
    });
  } else {
    $prev.parentNode.removeChild($prev);
  }

  let last =  "Day" + (Math.pow(10,  (3 - (current+1).toString().length))).toString().slice(1) + (current + 1);
  let $next = document.getElementById("next");


  if(days[last]){
    $next.addEventListener("click", ()=>{
      let next = (current + 1).toString();
      let nextPage = "#Day" + (Math.pow(10,  (3 - next.length))).toString().slice(1) + next;
      location.hash = nextPage;
    });
  } else {
    $next.parentNode.removeChild($next);
  }

} else { // index
  let links = "";
  for(let key in days){
    links += `<li><a href="./day.html#${key}">`;
    links += `${key}: ${days[key].title()}`;
    links += `</a></li>`;
  }

  document.getElementById("menu").innerHTML = links;
}
