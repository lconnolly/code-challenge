"use strict";

function navBuilder(buildMobile, buildDesktop) {
    // Request navigation data from API
    this.requestNav = function(successFunc) {
        this.httpRequest = new XMLHttpRequest();
        if (!this.httpRequest) {
            alert("Cannot create an XMLHTTP instance");
            return false;
        }

        this.httpRequest.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    let navData = JSON.parse(this.responseText);
                    successFunc(navData);
                } else {
                    console.log("There was a problem fetching the navigation");
                }
            }
        }

        this.httpRequest.open("GET", "http://localhost:3000/api/navigation", true);
        this.httpRequest.send();
    }

    // Build navigation markup
    this.buildMarkup = function(data) {
        let navItems = data["items"];
        let navMarkup = `<ul>`;
        navItems.forEach(function(element) {
            if(element["items"].length === 0) {
                navMarkup += `<li><a href="${element["url"]}">${element["label"]}</a></li>`;
            } else {
                let childListMarkup = `<ul>`;
                element["items"].forEach(function(el) {
                    childListMarkup += `<li><a href="${el["url"]}">${el["label"]}</a></li>`
                });
                childListMarkup += `</ul>`;
                navMarkup += `<li class="nav-item-parent"><a href="${element["url"]}" data-nav-item-parent>${element["label"]}</a>` + childListMarkup + `</li>`;
            }
        });
        navMarkup += `</ul>`;

        let mobileNav = new menuMobile(navMarkup);
        mobileNav.init();

        let desktopNav = new menuDesktop(navMarkup);
        desktopNav.init();
    }

    this.init = function() {
        this.requestNav(this.buildMarkup);
    }
}

function menuMobile(markup) {
    this.navIsOpen = false;
    this.closedClass = "closed";
    this.openClass = "open";

    // DOM elements
    this.bodyDOM = document.querySelectorAll("[data-nav-mobile-status]")[0];
    this.navToggleDOM = document.querySelectorAll("[data-nav-mobile-toggle]")[0];
    this.navDOM = document.querySelectorAll("[data-nav-mobile]")[0];
    this.navMobileMainDOM = document.querySelectorAll("[data-nav-mobile-main]")[0];

    // console.log(this.navDOM);

    // Navigation events (accordion)
    this.addNavEvents = function() {
        this.navDOM.addEventListener("click", function(e) {

            // #TODO: close other open items when clicking a new parent
            if (e.target.hasAttribute("data-nav-item-parent")) {
                e.preventDefault();
                if (e.target.parentNode.classList.contains("is-active")) {
                    e.target.parentNode.classList.remove("is-active");
                } else {
                    e.target.parentNode.classList.add("is-active");
                }
                e.target.blur();
            }
        });
    }

    // Panel Events
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

    this.addPanelEvents = function() {
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

    // Initialize mobile menu
    this.init = function() {
        this.navDOM.innerHTML = markup;
        this.addPanelEvents();
        this.addNavEvents();
    }
}

function menuDesktop(markup) {
    let _this = this;

    this.navIsOpen = false;
    this.closedClass = "closed";
    this.openClass = "open";

    // DOM elements
    this.bodyDOM = document.querySelectorAll("[data-nav-desktop-status]")[0];
    this.navDOM = document.querySelectorAll("[data-nav-desktop]")[0];

    // Panel Events
    this.openMenu = function() {
        this.bodyDOM.setAttribute("data-nav-desktop-status", this.openClass);
        this.navIsOpen = true;
    }

    this.closeMenu = function() {
        this.bodyDOM.setAttribute("data-nav-desktop-status", this.closedClass);
        this.navIsOpen = false;
    }

    this.toggleMenu = function() {
        this.navIsOpen ? this.closeMenu() : this.openMenu();
    }

    // Navigation events (dropdowns)
    this.addNavEvents = function() {
        this.navDOM.addEventListener("click", function(e) {
            // #TODO: close other open items when clicking a new parent
            if (e.target.hasAttribute("data-nav-item-parent")) {
                e.preventDefault();
                
                if (e.target.parentNode.classList.contains("is-active")) {
                    let activeItems = document.querySelectorAll(".is-active");
                    Array.prototype.forEach.call(activeItems, function(item) {
                        item.classList.remove("is-active");
                    });
                    _this.closeMenu();
                } else {
                    let activeItems = document.querySelectorAll(".is-active");
                    Array.prototype.forEach.call(activeItems, function(item) {
                        item.classList.remove("is-active");
                    });
                    e.target.parentNode.classList.add("is-active");
                    _this.openMenu();
                }
                e.target.blur();
            }
        });
    }

    // Initialize desktop menu
    this.init = function() {
        this.navDOM.innerHTML = markup;
        this.addNavEvents();
    }
}

// On page load, find mobile nav and initialize
document.addEventListener("DOMContentLoaded", function() {
    let mm = new menuMobile();
    let md = new menuDesktop();
    let nav = new navBuilder(mm.init, md.init);
    nav.init();
}); 