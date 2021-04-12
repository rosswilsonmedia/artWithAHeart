$(document).ready(function() {
    console.log("hello");
    closeNav();
    if (window.location.hash != '') {
        document.getElementById(window.location.hash).style.display = "block";
        console.log(window.location.hash + ' displayed');
    } else {
        home = $('main>section').attr('id');
        document.getElementById(home).style.display = "block";
        console.log('homepage displayed');
    }
    pageSelected=null;
    pageNotSelected=null;
    console.log('variables reset to null');
    
    $(window).on('hashchange', function() {
        console.log("hash change");
        closeNav();
        currentTab = window.location.hash;
            defaultHashTest(currentTab);
            console.log(currentTab + " selected");
        pageSelected = document.getElementById(currentTab);
        console.log("variables assigned");
        $('main>section').each(function() {
            currentSection = $(this).attr('id');
            if (currentTab !== currentSection) {
                pageNotSelected = document.getElementById(currentSection);
                pageNotSelected.style.display = "none";
                console.log("pages hidden");
            }            
        })
        pageSelected.style.display = "block";
        console.log(currentTab + " displayed");
        window.scrollTo(0,0);
        console.log("scrolled to top");
        pageSelected=null;
        pageNotSelected=null;
        console.log('variables reset to null');
    })
})

function defaultHashTest(hash) {
    hashLength = hash.length;
    if (hashLength === 0) {
        currentTab = $('main>section').attr('id');
        console.log("default hash set");
    }
}

function openNav() {
    document.getElementById("sideNav").style.width = "100%";
    document.getElementById("topBun").style.transform = "rotate(45deg)";
    document.getElementById("patty").style.opacity = "0";
    document.getElementById("bottomBun").style.transform = "rotate(-45deg)";
    document.getElementById("sideNav").firstElementChild.style.opacity = "100%";
    document.body.style.overflow = "hidden";
    console.log("sideNav opened");
}

function closeNav() {
    var activeSpanArray = document.getElementsByClassName("activeSpan");
    activeSpanArrayLength = activeSpanArray.length;
    for (var i = 0; i < activeSpanArrayLength; i) {
        closeDropdown(activeSpanArray[i]);
        clearTimeout(fadeUL);
        selectedDropdown.style.position = "absolute";
        selectedDropdown.style.top = "-1em";
        selectedDropdown.style.visibility = "hidden";
        activeSpanArrayLength = activeSpanArray.length;
    }
    document.getElementById("sideNav").style.width = "0%";
    document.getElementById("topBun").style.transform = "rotate(0deg)";
    document.getElementById("patty").style.opacity = "100%";
    document.getElementById("bottomBun").style.transform = "rotate(0deg)";
    document.getElementById("sideNav").firstElementChild.style.opacity = "0%";
    document.body.style.overflow = "visible";
    console.log("sideNav closed");
}
function toggleNav() {
    navStatus = document.getElementById("sideNav");
    if (navStatus.style.width != "0%") {
        closeNav();
    } else {
        openNav();
    }
}

function openDropdown(arrowSpan) {
    $(arrowSpan).addClass("activeSpan");
    navSectionTitle = arrowSpan.parentElement.firstElementChild;
        $(navSectionTitle).addClass("activeNavSection");
    arrow = arrowSpan.firstElementChild;
        arrow.style.transform = "rotate(-180deg)";
    parentListItem = arrowSpan.parentElement.parentElement;
        selectedDropdown = parentListItem.lastElementChild;
            selectedDropdown.style.visibility = "visible";
            selectedDropdown.style.opacity = "100%";
            selectedDropdown.style.position = "relative";
            selectedDropdown.style.top = "0";
            selectedDropdown.style.zIndex = "1";
    console.log("nav dropdown opened");
}

function closeDropdown(arrowSpan) {
    $(arrowSpan).removeClass("activeSpan");
    navSectionTitle = arrowSpan.parentElement.firstElementChild;
        $(navSectionTitle).removeClass("activeNavSection");
    arrow = arrowSpan.firstElementChild;
        arrow.style.transform = "rotate(0deg)";
    parentListItem = arrowSpan.parentElement.parentElement;
        selectedDropdown = parentListItem.lastElementChild;
            selectedDropdown.style.zIndex = "-1";
            selectedDropdown.style.opacity = "0%";
            selectedDropdown.style.position = "relative";
            selectedDropdown.style.top = "-1em";
            fadeUL = setTimeout(function hideUL() {
                selectedDropdown.style.position = "absolute";
                selectedDropdown.style.top = "-1em";
                selectedDropdown.style.visibility = "hidden";
            }, 300)
    console.log("nav dropdown closed");
}

function toggleDropdown(clickedSpan) {
    spanStatus = clickedSpan.getAttribute("class");
    if (spanStatus === "activeSpan") {
        closeDropdown(clickedSpan);
    } else {
        openDropdown(clickedSpan);
    }
}