"use strict";

function menuMobile(nav) {
    this.navData = null;

    this.closedClass = "closed";
    this.openClass = "open";
    this.navIsOpen = false;

    this.bodyDOM = document.querySelectorAll("[data-nav-mobile-status]")[0];
    this.navToggleDOM = document.querySelectorAll("[data-nav-mobile-toggle]")[0];
    this.navDOM = document.querySelectorAll("[data-nav-mobile]")[0];
    this.navMobileMainDOM = document.querySelectorAll("[data-nav-mobile-main]")[0];

    // Request navigation from API
    this.requestNav = function(successFunc) {
        var _this = this;

        this.httpRequest = new XMLHttpRequest();
        if (!this.httpRequest) {
            alert("Cannot create an XMLHTTP instance");
            return false;
        }

        this.httpRequest.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    let navData = JSON.parse(this.responseText);
                    successFunc(navData, _this.navDOM);
                } else {
                    console.log("There was a problem fetching the navigation");
                }
            }
        }

        this.httpRequest.open("GET", "http://localhost:3000/api/navigation", true);
        this.httpRequest.send();
    }

    // Build navigation markup
    this.buildNav = function(data, navElement) {
        let _this = this;
        let navItems = data["items"];

        let navMarkup = `<ul>`;
        navItems.forEach(function(element) {
            // console.log(element["label"]);
            if(element["items"].length === 0) {
                navMarkup += `<li><a href="${element["url"]}">${element["label"]}</a></li>`;
            } else {
                let childListMarkup = `<ul>`;
                element["items"].forEach(function(el) {
                    childListMarkup += `<li><a href="${el["url"]}">${el["label"]}</a></li>`
                });
                childListMarkup += `</ul>`;
                // console.log(childListMarkup);
                navMarkup += `<li class="nav-item-parent"><a href="${element["url"]}" data-nav-item-parent>${element["label"]}</a>` + childListMarkup + `</li>`;
            }
        });
        navMarkup += `</ul>`;
        navElement.innerHTML = navMarkup;
    }

    // Navigation events (accordion)
    this.addNavEvents = function() {
        this.navDOM.addEventListener("click", function(e) {

            // Todo: close other open items when clicking a new parent
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

    // Initialize menu
    this.init = function() {
        this.requestNav(this.buildNav);
        this.addPanelEvents();
        this.addNavEvents();
    }
}

// On page load, find mobile nav and initialize
document.addEventListener("DOMContentLoaded", function() {
    let navMobile = document.querySelectorAll("[data-nav-mobile-panel]")[0];
    if (navMobile != null) {
        let mm = new menuMobile(navMobile);
        mm.init();
    }
}); 