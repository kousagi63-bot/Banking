/* ==========================================
   STACKLY BANK - MAIN JS
========================================== */
console.log("MAIN JS LOADED");
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       DARK MODE
    ========================== */

    const darkToggle = document.getElementById("darkToggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        if (darkToggle) {
            darkToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (darkToggle) {

        darkToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            darkToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

        });

    }

    /* ==========================
       MOBILE MENU
    ========================== */

    // Mobile Menu Toggle

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Change icon
    const icon = menuBtn.querySelector("i");

    if(navLinks.classList.contains("active")){
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
});

    /* ==========================
       COUNTER ANIMATION
    ========================== */

    const counters =
        document.querySelectorAll(".counter");

    const startCounters = () => {

        counters.forEach(counter => {

            const target =
                +counter.dataset.target;

            let count = 0;

            const increment =
                target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += increment;

                    counter.innerText =
                        Math.floor(count)
                            .toLocaleString();

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.innerText =
                        target.toLocaleString();

                }

            };

            updateCounter();

        });

    };

    let counterStarted = false;

    const statsSection =
        document.querySelector(".stats");

    if (statsSection) {

        window.addEventListener("scroll", () => {

            const sectionTop =
                statsSection.offsetTop - 500;

            if (
                window.scrollY > sectionTop &&
                !counterStarted
            ) {

                startCounters();

                counterStarted = true;

            }

        });

    }

    /* ==========================
       FAQ ACCORDION
    ========================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(other => {

                if (other !== item) {

                    other.classList.remove("active");

                    other.querySelector(
                        ".faq-answer"
                    ).style.maxHeight = null;

                }

            });

            item.classList.toggle("active");

            const answer =
                item.querySelector(".faq-answer");

            if (item.classList.contains("active")) {

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            } else {

                answer.style.maxHeight = null;

            }

        });

    });

    /* ==========================
       SCROLL TO TOP
    ========================== */

    const scrollBtn =
        document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            scrollBtn?.classList.add("show");

        } else {

            scrollBtn?.classList.remove("show");

        }

    });

    scrollBtn?.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

    /* ==========================
       NAVBAR SCROLL EFFECT
    ========================== */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar?.classList.add("scrolled");

        } else {

            navbar?.classList.remove("scrolled");

        }

    });

    /* ==========================
       BUTTON RIPPLE EFFECT
    ========================== */

    const buttons =
        document.querySelectorAll(
            ".primary-btn,.secondary-btn,.btn-signup,.btn-login"
        );

    buttons.forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                this.getBoundingClientRect();

            ripple.style.left =
                e.clientX - rect.left + "px";

            ripple.style.top =
                e.clientY - rect.top + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (href === currentPage) {

                link.classList.add("active-link");

            }

        });

    /* ==========================
       LOADING ANIMATION
    ========================== */

    const loader =
        document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.classList.add("hide");

            setTimeout(() => {

                loader.remove();

            }, 500);

        });

    }

    /* ==========================
       HERO TEXT ANIMATION
    ========================== */

    const heroTitle =
        document.querySelector(".hero-content h1");

    if (heroTitle) {

        heroTitle.classList.add("fade-up");

    }

    /* ==========================
       FLOATING CARDS EFFECT
    ========================== */

    const cards =
        document.querySelectorAll(
            ".solution-card,.loan-card,.stat-card,.testimonial-card"
        );

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                ((y / rect.height) - 0.5) * -8;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

    /* ==========================
       AUTO YEAR
    ========================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});

/* ==========================================
   COMING SOON REDIRECTS
========================================== */

document
.querySelectorAll(".coming-soon")
.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        window.location.href =
            "404.html";

    });

});
document.addEventListener("DOMContentLoaded", () => {

console.log("MAIN JS LOADED");

const menuBtn = document.querySelector(".menu-btn");

if(menuBtn){

menuBtn.addEventListener("click", () => {

alert("Hamburger clicked");

});

}

});