function uploadFile(file_index) {
    console.log("upload ", file_index)
    let fileInput = document.getElementById('uploadinput');
    let file = fileInput.files[0]

    if (!file) {
      alert("Please select a file.");
      return;
    }

    
    console.log(file)
    let formData = new FormData();
    formData.append('folder_path', file_index)
    formData.append('file', file);

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
        alert('File uploaded successfully, reload windown for see the change of video');
        window.location.reload();
    })
    .catch(error => {
        alert('Error uploading file');
        window.location.reload();
    });
}