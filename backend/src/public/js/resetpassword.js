//Show password
const password = document.getElementById("password");
const checkBoxPassword = document.getElementById("flexCheckDefault");
checkBoxPassword.addEventListener("change", () => {
    password.type == "password" ? password.type = "text" : password.type = "password"
});

//Form validation 
const resetPasswordForm = document.getElementById("resetPassword")
resetPasswordForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    //Password value
    const newPassword = password.value;
    try {
        const response = await fetch('/restorePassword', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({newPassword})
        })
        if(response.ok){
            window.location.href = "/successView"
        } else {
            console.error("Password reset failed");
        }
    } catch (error) {
        console.error('An error ocurred;', error)
    }
})