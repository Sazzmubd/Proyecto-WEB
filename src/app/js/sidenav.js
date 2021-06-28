// * MENU DESLIZANTE * //

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "220px";
    document.getElementById("main").style.display = "none";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.display = "block";
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black
background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "220px";
    document.getElementById("main").style.display = "none";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color
of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.display = "block";
}

/* funcion para que el header baje con scroll*/
const header = document.querySelector('.header');

window.addEventListener('scroll',function(){
    header.classList.toggle('active', window.scrollY>0)
});
