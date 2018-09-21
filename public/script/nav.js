"use strict";

// console.log("bodyDOM is " + this.navToggleDOM[0]);
// console.log("bodyDOM is " + this.bodyDOM);

function menuMobile(nav) {
    this.navElement = nav;

    this.closedClass = "closed";
    this.openClass = "open";
    this.navIsOpen = false;

    this.bodyDOM = document.querySelectorAll("[data-nav-mobile-status]")[0];
    this.navToggleDOM = document.querySelectorAll("[data-nav-mobile-toggle]")[0];
    this.navMobileMainDOM = document.querySelectorAll("[data-nav-mobile-main]")[0];
    
    this.addEvents = function() {
        let _this = this;

        // Primary mobile nav panel toggle (header)
        this.navToggleDOM.addEventListener("click", function(e) {
            e.preventDefault();
            _this.toggleMenu();
        });

        // Close menu panel on main click outside nav panel
        this.navMobileMainDOM.addEventListener("click", function(e) {
            if(_this.navIsOpen) {
                e.preventDefault();
                _this.closeMenu();
            }
        });
    }

    this.openMenu = function() {
        this.bodyDOM.setAttribute("data-nav-mobile-status", this.openClass);
        this.navIsOpen = true;
    }

    this.closeMenu = function() {
        this.bodyDOM.setAttribute("data-nav-mobile-status", this.closedClass);
        this.navIsOpen = false;
    }

    this.toggleMenu = function() {
        this.navIsOpen ? this.closeMenu() : this.openMenu();
    }

    this.init = function() {
        this.addEvents();
    }
}


document.addEventListener("DOMContentLoaded", function() {
    let navMobile = document.querySelectorAll("[data-nav-mobile]")[0];
    let navDesktop = document.querySelectorAll("[data-nav-desktop]")[0];

    if (navMobile != null) {
        let sm = new menuMobile(navMobile);
        sm.init();
    }
}); 