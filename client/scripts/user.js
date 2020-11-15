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

if(document.getElementsByTagName('body')[0].id === 'myposts'){
    console.log("here");
    let pfpInput = document.getElementById('pfpFile');
    let pfpFiles = [];
    let pfpURLS = [];
    document.getElementById('profileSubmitButton').addEventListener('click', async function(event){
    
        let form = document.getElementById('updateUserInfoForm');
        let name =  form.elements.name.value;
        let email = form.elements.email.value;
        let pfpLink = pfpURLS.length !== 0 ? pfpURLS[0]: null;
        let person = {

        }   
        name ? person.name = name : person.name = null;
        email ? person.email = email : person.email = null;
        pfpLink ? person.pfpLink = pfpLink : person.pfpLink = null;
        let user = JSON.parse(window.localStorage.getItem('User'));
    
        let id = user ? user.ID : -1;
        console.log(id);
        let res = await fetch(`/user/${id}/update`, 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(person) 
            });
        let data = await res.json();
        console.log(JSON.stringify(data.ID) !== '-1');
        if(JSON.stringify(data.ID) !== '-1'){
            window.localStorage.setItem('User', JSON.stringify(data));
        }
        
        alert("user updated: " + JSON.stringify(data));
        window.location.href = 'myPosts.html';
    });


    pfpInput.addEventListener('change', function(){
        fileList = [];
        for(let file of pfpInput.files){
            pfpFiles.push(file);
            const reader = new FileReader();
    
            reader.addEventListener("load", function () {
            // convert image file to base64 string
            pfpURLS.push(reader.result.toString());
            }, false);
        
            
            reader.readAsDataURL(file);
            
        }
    })

}
