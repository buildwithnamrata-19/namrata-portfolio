/* ==============================
PAGE NAVIGATION
============================== */

function showPage(pageId){

let pages = document.querySelectorAll(".page");

pages.forEach(page=>{
page.classList.remove("active");
});

document.getElementById(pageId).classList.add("active");

window.scrollTo(0,0);

}



/* ==============================
CONTACT BOX TOGGLE
============================== */

function toggleContact(){

let box = document.getElementById("contactBox");

if(box.style.display === "block"){
box.style.display = "none";
}
else{
box.style.display = "block";
}

}



/* ==============================
IMAGE MODAL VIEWER
============================== */

let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImg");
let caption = document.getElementById("modalCaption");

if(modal){

document.querySelectorAll(".photo-card img").forEach(img=>{

img.onclick = function(){

modal.style.display = "block";

modalImg.src = this.src;

if(this.nextElementSibling){
caption.innerText = this.nextElementSibling.innerText;
}

}

});

}


/* close modal when clicking outside image */

if(modal){

modal.onclick = function(){

modal.style.display = "none";

}

}



/* ==============================
DOCUMENT VIEWER SYSTEM
============================== */

let previousPage = "";

function openDoc(filePath){

// detect current active page
let activePage = document.querySelector(".page.active");

if(activePage){
previousPage = activePage.id;
}

// load pdf
document.getElementById("pdfFrame").src = filePath;

// open viewer
showPage("docViewer");

}



/* ==============================
BACK FROM DOCUMENT VIEWER
============================== */

function goBackFromDoc(){

if(previousPage){
showPage(previousPage);
}
else{
showPage("docs");
}

}