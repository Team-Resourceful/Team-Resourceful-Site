function switchTheme() {
    if (localStorage.getItem("colormode") === "light") {
        document.getElementsByTagName( 'html' )[0].classList.add("lightmode");
    } else {
        document.getElementsByTagName( 'html' )[0].classList.remove("lightmode");
    }
}

function updateTheme() {
    if (!localStorage.getItem("colormode")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.setItem("colormode", "dark");
        } else {
            localStorage.setItem("colormode", "light");
        }
    }
}

updateTheme();
switchTheme();

window.addEventListener('load', () => {
    const themeToggle = document.createElement("div");
    themeToggle.classList.add("theme-switcher");

    themeToggle.addEventListener('click', () => {
        localStorage.setItem("colormode", localStorage.getItem("colormode") === "light" ? "dark" : "light");
        switchTheme();
    });

    document.body.appendChild(themeToggle);
})