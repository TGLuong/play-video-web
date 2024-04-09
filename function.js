function uploadFile(file_index) {
    console.log("upload ", file_index)
    let fileInput = document.getElementById('uploadinput');
    let loader = document.getElementById('loader');
    let file = fileInput.files[0]

    if (!file) {
      alert("Please select a file.");
      return;
    }

    
    console.log(file)
    let formData = new FormData();
    formData.append('folder_path', file_index)
    formData.append('file', file);

    loader.style.display = "block";
    fetch('http://pi.local:5000/api/file', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload file.');
        }
        return response.json();
    })
    .then(data => {
        loader.style.display = "none";
        alert('File uploaded successfully');
    })
    .catch(error => {
        loader.style.display = "none";
        alert('Error uploading file');
    });
}