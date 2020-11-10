'use strict'

window.addEventListener('load', () =>{
    let user = JSON.parse(window.localStorage.getItem('User'));

    if(user){
        document.getElementById('loginButton').style.visibility = 'hidden';
        document.getElementById('signupButton').style.visibility = 'hidden';
        document.getElementById('myPosts').style.visibility = 'visible';
        if(document.getElementById('logoutButton')){
            document.getElementById('logoutButton').style.visibility = 'visible';
        }
        if(document.getElementById('userInfoButton')){
            document.getElementById('userInfoButton').style.visibility = 'visible';
        };
        if(document.getElementById('postCreateButton')){
            document.getElementById('postCreateButton').style.visibility = 'visible';
        }
    }
    else{
        document.getElementById('loginButton').style.visibility = 'visible';
        document.getElementById('signupButton').style.visibility = 'visible';
        document.getElementById('myPosts').style.visibility = 'hidden';
        if(document.getElementById('logoutButton')){
            document.getElementById('logoutButton').style.visibility = 'hidden';
        }
        if(document.getElementById('userInfoButton')){
            document.getElementById('userInfoButton').style.visibility = 'hidden';
        };
        if(document.getElementById('postCreateButton')){
            document.getElementById('postCreateButton').style.visibility = 'hidden';
        }
    }
})
if(document.getElementById('logoutButton')){
    document.getElementById('logoutButton').addEventListener('click', ()=>{
        window.localStorage.removeItem('User');
        window.location.href = 'login.html';
    });
};