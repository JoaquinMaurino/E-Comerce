const password = document.getElementById("password");

const checkBoxPassword = document.getElementById("flexCheckDefault");

checkBoxPassword.addEventListener("change", () => {
    password.type == "password" ? password.type = "text" : password.type = "password"
});