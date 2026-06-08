/* ==========================================
   STACKLY BANK - AUTH SYSTEM
========================================== */

/* ==========================
   DEFAULT ADMIN ACCOUNT
========================== */

const ADMIN_USER = {
    name: "Administrator",
    email: "admin@stacklybank.com",
    phone: "9999999999",
    password: "admin123",
    role: "admin"
};

/* ==========================
   INITIALIZE ADMIN
========================== */

function initializeAdmin() {

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const adminExists =
        users.some(user =>
            user.email === ADMIN_USER.email
        );

    if (!adminExists) {

        users.push(ADMIN_USER);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

}

initializeAdmin();

/* ==========================
   PASSWORD TOGGLE
========================== */

document
.querySelectorAll(".toggle-password")
.forEach(toggle => {

    toggle.addEventListener("click", () => {

        const input =
            toggle.parentElement.querySelector("input");

        const icon =
            toggle.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }

    });

});

/* ==========================
   SIGNUP
========================== */

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", e => {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim().toLowerCase();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {

            alert("Please fill all fields.");

            return;

        }

        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            return;

        }

        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;

        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const existingUser =
            users.find(
                user => user.email === email
            );

        if (existingUser) {

            alert(
                "Account already exists."
            );

            return;

        }

        const newUser = {

            id: Date.now(),

            name,

            email,

            phone,

            password,

            role: "user",

            accountNumber:
                "SB" +
                Math.floor(
                    1000000000 +
                    Math.random() * 9000000000
                ),

            balance: 5000,

            joined:
                new Date().toLocaleDateString(),

            transactions: [
                {
                    type: "Welcome Bonus",
                    amount: 5000,
                    date:
                        new Date().toLocaleDateString()
                }
            ]

        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert(
            "Account created successfully."
        );

        window.location.href =
            "login.html";

    });

}

/* ==========================
   LOGIN
========================== */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", e => {

        e.preventDefault();

        const email =
            document.getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password =
            document.getElementById("password")
            .value;

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user =
            users.find(
                u =>
                    u.email === email &&
                    u.password === password
            );

        if (!user) {

            alert(
                "Invalid email or password."
            );

            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        if (user.role === "admin") {

            window.location.href =
                "admin-dashboard.html";

        } else {

            window.location.href =
                "user-dashboard.html";

        }

    });

}

/* ==========================
   SESSION CHECK
========================== */

function checkLogin() {

    const isLoggedIn =
        localStorage.getItem("isLoggedIn");

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    return (
        isLoggedIn === "true" &&
        currentUser
    );

}

/* ==========================
   GET CURRENT USER
========================== */

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

/* ==========================
   LOGOUT
========================== */

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    localStorage.removeItem(
        "isLoggedIn"
    );

    window.location.href =
        "login.html";

}

/* ==========================
   UPDATE USER DATA
========================== */

function updateUser(updatedUser) {

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    users =
        users.map(user =>

            user.email === updatedUser.email
                ? updatedUser
                : user

        );

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "currentUser",
        JSON.stringify(updatedUser)
    );

}

/* ==========================
   GENERATE TRANSACTION
========================== */

function addTransaction(
    title,
    amount
) {

    const user =
        getCurrentUser();

    if (!user) return;

    if (!user.transactions) {

        user.transactions = [];

    }

    user.transactions.unshift({

        type: title,

        amount: amount,

        date:
            new Date().toLocaleDateString()

    });

    user.balance += amount;

    updateUser(user);

}

/* ==========================
   ROLE CHECKS
========================== */

function requireAdmin() {

    const user =
        getCurrentUser();

    if (
        !user ||
        user.role !== "admin"
    ) {

        window.location.href =
            "login.html";

    }

}

function requireUser() {

    const user =
        getCurrentUser();

    if (
        !user ||
        user.role !== "user"
    ) {

        window.location.href =
            "login.html";

    }

}

/* ==========================
   AUTO REDIRECT
========================== */

(function () {

    const page =
        window.location.pathname
        .split("/")
        .pop();

    const loggedIn =
        checkLogin();

    if (
        loggedIn &&
        (
            page === "login.html" ||
            page === "signup.html"
        )
    ) {

        const user =
            getCurrentUser();

        if (user.role === "admin") {

            window.location.href =
                "admin-dashboard.html";

        } else {

            window.location.href =
                "user-dashboard.html";

        }

    }

})();

/* ==========================
   GLOBAL ACCESS
========================== */

window.logout = logout;
window.checkLogin = checkLogin;
window.getCurrentUser = getCurrentUser;
window.requireAdmin = requireAdmin;
window.requireUser = requireUser;
window.addTransaction = addTransaction;
window.updateUser = updateUser;