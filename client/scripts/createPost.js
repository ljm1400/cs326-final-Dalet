'use strict'

let form = document.getElementById("createPostForm");
let fileInput = document.getElementById('files');
let fileList = [];

fileInput.addEventListener('change', function(event){
    fileList = [];
    for(let file of fileInput.files){
        fileList.push(file);
    }
})

document.getElementById("submitButton").addEventListener("click", async function(event){
    let title = form.elements.title.value;
    let files = fileList;
    let type = form.elements.typeOfPost.value;
    let description = form.elements.description.value;
    let tags = form.elements.tags.value;
    if(files.length === 0){
        alert("You must upload an image for your post!");
        event.preventDefault();
    }
    else{
        let res = await fetch('/post/create', 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                files,
                type, 
                description,
                tags
            }) 
        });
        let data = await res.json();
        alert("post created: " + JSON.stringify(data));
    }
});