document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SMOOTH NAVIGATION
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================
       CURSOR LIGHT
    ========================== */

    const canHover =
        window.matchMedia("(pointer: fine)").matches;


    if (canHover) {

        document.body.classList.add(
            "interactive-cursor"
        );


        let mouseX = 50;
        let mouseY = 50;


        window.addEventListener(
            "pointermove",
            event => {

                mouseX =
                    (event.clientX /
                        window.innerWidth) * 100;

                mouseY =
                    (event.clientY /
                        window.innerHeight) * 100;

                document.documentElement.style
                    .setProperty(
                        "--mouse-x",
                        `${mouseX}%`
                    );

                document.documentElement.style
                    .setProperty(
                        "--mouse-y",
                        `${mouseY}%`
                    );

            },
            { passive: true }
        );

    }


    /* =========================
       PROFILE CARD 3D TILT
    ========================== */

    const identityCard =
        document.querySelector(".identity-card");


    if (identityCard && canHover) {

        identityCard.addEventListener(
            "pointermove",
            event => {

                const rect =
                    identityCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const percentX =
                    x / rect.width;

                const percentY =
                    y / rect.height;


                const rotateX =
                    (percentY - 0.5) * -10;

                const rotateY =
                    (percentX - 0.5) * 10;


                identityCard.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    rotateZ(0deg)
                    translateY(-5px)
                    `;
            }
        );


        identityCard.addEventListener(
            "pointerleave",
            () => {

                identityCard.style.transform =
                    `
                    perspective(900px)
                    rotateX(0deg)
                    rotateY(0deg)
                    rotateZ(2deg)
                    translateY(0)
                    `;

            }
        );

    }


    /* =========================
       MAGNETIC BUTTONS
    ========================== */

    const magneticElements =
        document.querySelectorAll(
            ".button, .nav-contact"
        );


    if (canHover) {

        magneticElements.forEach(element => {

            element.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        (rect.left + rect.width / 2);

                    const y =
                        event.clientY -
                        (rect.top + rect.height / 2);


                    const strength = 0.18;


                    element.style.transform =
                        `
                        translate(
                            ${x * strength}px,
                            ${y * strength}px
                        )
                        `;

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform =
                        "translate(0, 0)";

                }
            );

        });

    }


    /* =========================
       SKILL CARD POINTER EFFECT
    ========================== */

    const skillCards =
        document.querySelectorAll(".skill-card");


    if (canHover) {

        skillCards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;


                    const percentX =
                        (x / rect.width) * 100;

                    const percentY =
                        (y / rect.height) * 100;


                    card.style.setProperty(
                        "--card-x",
                        `${percentX}%`
                    );

                    card.style.setProperty(
                        "--card-y",
                        `${percentY}%`
                    );

                }
            );

        });

    }


    /* =========================
       PROJECT ROW INTERACTION
    ========================== */

    const projectItems =
        document.querySelectorAll(".project-item");


    projectItems.forEach(item => {

        item.addEventListener(
            "pointerenter",
            () => {

                item.classList.add("is-hovered");

            }
        );


        item.addEventListener(
            "pointerleave",
            () => {

                item.classList.remove("is-hovered");

            }
        );

    });


    /* =========================
       TIMELINE INTERACTION
    ========================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    timelineItems.forEach(item => {

        item.addEventListener(
            "pointerenter",
            () => {

                timelineItems.forEach(other => {

                    if (other !== item) {
                        other.style.opacity = "0.55";
                    }

                });

            }
        );


        item.addEventListener(
            "pointerleave",
            () => {

                timelineItems.forEach(other => {

                    other.style.opacity = "1";

                });

            }
        );

    });


    /* =========================
       SCROLL PROGRESS
    ========================== */

    const progressBar =
        document.createElement("div");

    progressBar.className =
        "scroll-progress";

    document.body.appendChild(
        progressBar
    );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            documentHeight > 0
                ? scrollTop / documentHeight
                : 0;


        progressBar.style.transform =
            `scaleX(${progress})`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =========================
       CURRENT YEAR
    ========================== */

    const yearElement =
        document.querySelector("#year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================
       HERO LOAD STATE
    ========================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "page-loaded"
        );

    });


    /* =========================
       PREVENT HEAVY EFFECTS
       ON TOUCH DEVICES
    ========================== */

    if (!canHover && identityCard) {

        identityCard.style.transform =
            "rotateZ(1deg)";

    }

});