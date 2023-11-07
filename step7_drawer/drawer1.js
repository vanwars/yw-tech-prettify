class Drawer {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.elem = document.getElementById(this.id);
        this.drawerEl = this.getDrawerElement();

        this.initSettings();
        this.attachEventHandlers();
    }

    initSettings() {
        this.settings = {
            speedOpen: 50,
            speedClose: 350,
            activeClass: "is-active",
            visibleClass: "is-visible",
            selectorTarget: "[data-drawer-target]",
            selectorTrigger: "[data-drawer-trigger]",
            selectorClose: "[data-drawer-close]",
        };
    }
    getDrawerElement() {
        const section = document.createElement("section");
        section.className = "drawer drawer--left";
        section.innerHTML = `
            <div class="drawer__overlay" data-drawer-close tabindex="-1"></div>
            <div class="drawer__wrapper">
                <div class="drawer__header">
                    <h2>
                        About the Studio
                    </h2>
                    <button class="drawer__close" data-drawer-close aria-label="Close Drawer"></button>
                </div>
                <div class="drawer__content"></div>
            </div>`;
        section
            .querySelector(".drawer__content")
            .insertAdjacentElement("beforeend", this.elem);
        section.querySelector(".drawer__header h2").innerHTML = this.title;
        document
            .querySelector("body")
            .insertAdjacentElement("beforeend", section);
        return section;
    }

    clickHandler(event) {
        // Find elements
        var toggle = event.target,
            open = toggle.closest(this.settings.selectorTrigger),
            close = toggle.closest(this.settings.selectorClose);

        // Open drawer when the open button is clicked
        if (open) {
            this.openDrawer(open);
        }

        // Close drawer when the close button (or overlay area) is clicked
        if (close) {
            this.closeDrawer(close);
        }

        // Prevent default link behavior
        if (open || close) {
            event.preventDefault();
        }
    }
    openDrawer() {
        this.drawerEl.classList.add(this.settings.activeClass);

        // Make body overflow hidden so it's not scrollable
        document.documentElement.style.overflow = "hidden";

        // Toggle accessibility
        // this.toggleAccessibility(trigger);

        // Make it visible
        setTimeout(
            function () {
                this.drawerEl.classList.add(this.settings.visibleClass);
                this.trapFocus(this.drawerEl);
            }.bind(this),
            this.settings.speedOpen
        );
    }

    closeDrawer() {
        this.drawerEl.classList.remove(this.settings.visibleClass);
        document.documentElement.style.overflow = "";

        // Toggle accessibility
        // toggleAccessibility(childrenTrigger);

        // Make it not active
        setTimeout(
            function () {
                this.drawerEl.classList.remove(this.settings.activeClass);
            }.bind(this),
            this.settings.speedClose
        );
    }

    // Trap Focus
    // https://hiddedevries.nl/en/blog/2017-01-29-using-javascript-to-trap-focus-in-an-element
    //
    trapFocus(element) {
        var focusableEls = element.querySelectorAll(
            'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        var KEYCODE_TAB = 9;

        element.addEventListener("keydown", function (e) {
            var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) {
                /* shift + tab */ if (
                    document.activeElement === firstFocusableEl
                ) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } /* tab */ else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    }

    toggleAccessibility(event) {
        if (event.getAttribute("aria-expanded") === "true") {
            event.setAttribute("aria-expanded", false);
        } else {
            event.setAttribute("aria-expanded", true);
        }
    }

    keydownHandler(event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            // Find all possible drawers
            if (this.drawerEl.classList.contains(this.settings.activeClass)) {
                this.closeDrawer();
            }
        }
    }

    attachEventHandlers() {
        document.addEventListener("click", this.clickHandler.bind(this), false);
        document.addEventListener(
            "keydown",
            this.keydownHandler.bind(this),
            false
        );
    }
}
const d = new Drawer("d1", "My first thingy");
