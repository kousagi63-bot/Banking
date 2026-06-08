/* ==========================================
   STACKLY BANK DASHBOARD JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       AUTH CHECK
    ========================== */

    if (
        typeof checkLogin === "function" &&
        !checkLogin()
    ) {
        window.location.href = "login.html";
        return;
    }

    /* ==========================
       DARK MODE
    ========================== */

    const darkToggle =
        document.getElementById("darkToggle");

    if (localStorage.getItem("dashboardTheme") === "dark") {

        document.body.classList.add("dark");

        if (darkToggle) {
            darkToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }
    }

    darkToggle?.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "dashboardTheme",
            isDark ? "dark" : "light"
        );

        darkToggle.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

    });

    /* ==========================
       CARD ANIMATIONS
    ========================== */

    const cards = document.querySelectorAll(
        ".stat-card,.activity-card,.account-card"
    );

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-6px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px)";

        });

    });

    /* ==========================
       SIDEBAR ACTIVE
    ========================== */

    const menuItems =
        document.querySelectorAll(
            ".sidebar ul li"
        );

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            menuItems.forEach(i =>
                i.classList.remove("active")
            );

            item.classList.add("active");

        });

    });

    /* ==========================
       ACCOUNT BALANCE ANIMATION
    ========================== */

    const balanceEl =
        document.getElementById("accountBalance");

    if (balanceEl) {

        const balanceText =
            balanceEl.innerText
                .replace(/₹|,/g, "");

        const finalBalance =
            parseInt(balanceText) || 0;

        let current = 0;

        const increment =
            finalBalance / 60;

        const counter = setInterval(() => {

            current += increment;

            if (current >= finalBalance) {

                current = finalBalance;

                clearInterval(counter);

            }

            balanceEl.innerText =
                "₹" +
                Math.floor(current)
                    .toLocaleString();

        }, 15);

    }

    /* ==========================
       TABLE SEARCH (OPTIONAL)
    ========================== */

    const searchInput =
        document.getElementById("userSearch");

    const tableRows =
        document.querySelectorAll(
            "#usersTable tr"
        );

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value =
                searchInput.value.toLowerCase();

            tableRows.forEach(row => {

                row.style.display =
                    row.innerText
                    .toLowerCase()
                    .includes(value)
                        ? ""
                        : "none";

            });

        });

    }

    /* ==========================
       AUTO GREETING
    ========================== */

    const greeting =
        document.getElementById("greeting");

    if (greeting) {

        const hour =
            new Date().getHours();

        let text = "Welcome";

        if (hour < 12) {

            text = "Good Morning ☀️";

        } else if (hour < 18) {

            text = "Good Afternoon 🌤️";

        } else {

            text = "Good Evening 🌙";

        }

        greeting.textContent = text;

    }

    /* ==========================
       RECENT ACTIVITY ANIMATION
    ========================== */

    const activityCards =
        document.querySelectorAll(
            ".activity-card"
        );

    activityCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform =
            "translateY(20px)";

        setTimeout(() => {

            card.style.transition =
                "all .5s ease";

            card.style.opacity = "1";
            card.style.transform =
                "translateY(0)";

        }, index * 150);

    });

    /* ==========================
       NOTIFICATION SYSTEM
    ========================== */

    window.showNotification = function (
        message,
        type = "success"
    ) {

        const notification =
            document.createElement("div");

        notification.className =
            `notification ${type}`;

        notification.innerHTML = `
            <span>${message}</span>
        `;

        document.body.appendChild(
            notification
        );

        setTimeout(() => {

            notification.classList.add(
                "show"
            );

        }, 100);

        setTimeout(() => {

            notification.remove();

        }, 3500);

    };

    /* ==========================
       BUTTON ACTIONS
    ========================== */

    document
        .querySelectorAll(
            ".quick-actions button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showNotification(
                        "Transaction completed successfully."
                    );

                }
            );

        });

});

/* ==========================================
   LIVE DATE & TIME
========================================== */

function updateDateTime() {

    const dateTime =
        document.getElementById(
            "dateTime"
        );

    if (!dateTime) return;

    const now = new Date();

    dateTime.innerHTML =
        now.toLocaleString();

}

setInterval(
    updateDateTime,
    1000
);

updateDateTime();

/* ==========================================
   LOGOUT CONFIRMATION
========================================== */

function confirmLogout() {

    const result =
        confirm(
            "Are you sure you want to logout?"
        );

    if (result) {

        logout();

    }

}

window.confirmLogout =
    confirmLogout;

/* ==========================================
   SIMPLE LOADER
========================================== */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 500);

    }

});

/* ==========================================
   CHART DEFAULT OPTIONS
========================================== */

if (typeof Chart !== "undefined") {

    Chart.defaults.font.family =
        "Poppins";

    Chart.defaults.responsive =
        true;

    Chart.defaults.plugins.legend.position =
        "top";

}

/* ==========================================
   END OF FILE
========================================== */