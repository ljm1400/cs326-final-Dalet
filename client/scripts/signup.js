'use strict'

let form = document.getElementById("signupForm");


document.getElementById("signupSubmitButton").addEventListener("click", async function(event){
    let email = form.elements.email.value;
    let password = form.elements.password.value;
    let confirmPassword = form.elements.confirmPassword.value;
    console.log(email);
    console.log(password);
    if(password === confirmPassword){
        let res = await fetch(`/user/create?email=${email}&password=${password}`);
        if (!res.ok) {
            console.log(res.error);
            return;
        }
        else{
            let data = await res.json();
            console.log(data.email);
            if(data){
                alert("user created with email: " + data.email + "\npassword: " + data.password);
                window.location.href = 'login.html';
            }
            else{
                console.log(data);
                window.location.href = 'signup.html';
            }
            
        }
    }
    else{
        alert("Your Password does not match!");
    }
    
    event.preventDefault();
});


form.addEventListener("submit", function(event) {
    console.log("Saving value", form.elements.value.value);
    event.preventDefault();
  });