import * as days from "./days";

global.days = days;


let path = location.href.split("/").find(item => -1 < item.indexOf(".html"));

if(path){
  // init
  let fileName = path.replace(".html", "");
  let className = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  new days[className]();

  // parger
  let current = +fileName.replace("day", "");

  document.getElementById("prev").addEventListener("click", ()=>{
    let prev = current - 1;
    let prevPage = "./";
    if(prev){
      let _prev = prev.toString();
      prevPage = "./day" + (Math.pow(10,  (3 - _prev.length))).toString().slice(1) + _prev + ".html";
    }
    location.href = prevPage;
  });

  document.getElementById("next").addEventListener("click", ()=>{
    let next = current + 1;
    let _next = next.toString();
    let nextPage = "./day" + (Math.pow(10,  (3 - _next.length))).toString().slice(1) + _next + ".html";
    location.href = nextPage;
  });
}






