'use strict'

let form = document.getElementById("createPostForm");
let fileInput = document.getElementById('files');
let fileList = [];
let fileURLS = [];

fileInput.addEventListener('change', function(){
    fileList = [];
    for(let file of fileInput.files){
        fileList.push(file);
        const reader = new FileReader();
  
        reader.addEventListener("load", function () {
        // convert image file to base64 string
        fileURLS.push(reader.result.toString());
        console.log(reader.result);
        }, false);
    
        
        reader.readAsDataURL(file);
        
    }
})


document.getElementById("submitButton").addEventListener("click", async function(event){
    let title = form.elements.title.value;
    let files = fileList;
    let newFiles = [];
    let i = 0;
    for(let file of files){
      let tempFile = {
          'lastModified'    : file.lastModified,
          'lastModifiedDate': file.lastModifiedDate,
          'name'       : file.name,
          'size'       : file.size,
          'type'       : file.type,
          'url' : fileURLS[i]
      } 
      newFiles.push(tempFile);
      ++i;
    }
    console.log(newFiles);
    let type = form.elements.typeOfPost.value;
    let description = form.elements.description.value;
    let tags = form.elements.tags.value;
    if(files.length === 0){
        alert("You must upload an image for your post!");
        event.preventDefault();
    }
    else{
        let res = await fetch('/posts/create', 
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                files: newFiles,
                type, 
                description,
                tags
            }) 
        });
        let data = await res.json();
        alert("post created: " + JSON.stringify(data));
    }
});