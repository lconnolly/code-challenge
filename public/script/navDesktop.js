"use strict";

function menuDesktop(nav) {
    this.navElement = nav;
    
    this.addEvents = function() {
        let _this = this;
    }

    this.init = function() {
        this.addEvents();
    }
}

// On page load, find desktop nav and initialize
document.addEventListener("DOMContentLoaded", function() {
    let navDesktop = document.querySelectorAll("[data-nav-desktop]")[0];

    if (navDesktop != null) {
        let md = new menuDesktop(navDesktop);
        md.init();
    }
}); 