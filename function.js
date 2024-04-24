
async function uploadFile(file_index) {
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

    axios.post("http://solantech.local:5000/api/file", formData, {
        headers: { 'Content-Type': 'multipart/form-data', },
        onUploadProgress: function (progressEvent) {
            loader.setAttribute('value', progressEvent.progress * 100)
        },
    })
    .then(function (response) {
        loader.style.display = "none";
        alert('File uploaded successfully');
    })
    .catch(function (response) {
        loader.style.display = "none";
        alert('Error uploading file');
    });
}

function deleteFile(file_index) {
    fetch('http://solantech.local:5000/api/file/' + file_index, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload file.');
        }
        return response.json();
    })
    .then(data => {
        loader.style.display = "none";
        alert('File Delete successfully');
    })
    .catch(error => {
        loader.style.display = "none";
        alert('Error Delete file');
    });
}