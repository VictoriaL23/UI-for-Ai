function dragAndDrop (){
  // Add event listeners for drag and drop functionality
  const dropArea = document.getElementById('dropArea');
  
  dropArea.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allowing drop by preventing the default behavior
  });
  
  dropArea.addEventListener('drop', (event) => {
    event.preventDefault(); // Preventing default behavior
  
    // Get the dropped files from the event
    const files = event.dataTransfer.files;
  
    // Handle the dropped image files
    handleDroppedImages(files);
  });
  
  // Function to handle the dropped image files
  function handleDroppedImages(files) {
   
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      // Check if the dropped file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
  
        // Read the image file and perform actions with it
        reader.onload = (event) => {
          const imageUrl = event.target.result;
  
          // Create an image element and set its source to the dropped image
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
  
          // Append the image to the dropArea or any desired location
          dropArea.appendChild(imageElement);
  
          // Call addAndAnnotateImage with the imageUrl
         checkImageWithNyckel(file);
        };
  
        // Read the image file as data URL
        reader.readAsDataURL(file);
      }
    }
  }
  }
  
  dragAndDrop();
  lightGallery(document.getElementById('gallery'), {
    plugins: [lgThumbnail, lgZoom, lgFullscreen, lgShare, lgRotate, lgAutoplay],
    download: true,
    controls: true,
    thumbWidth: 100,
    thumbHeight: 100
});

function handleDragStart(event) {
    const imageUrl = event.target.src;
    event.dataTransfer.setData('text/plain', imageUrl);
}
// Add event listeners for dragstart on the gallery images
const galleryImages = document.querySelectorAll('#gallery img');
galleryImages.forEach((image) => {
  image.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', image.src);
  });
});

// Add event listener for drop on the dropArea
const dropArea = document.getElementById('dropArea');
dropArea.addEventListener('drop', (event) => {
  event.preventDefault();

  const imageUrl = event.dataTransfer.getData('text/plain');
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  dropArea.appendChild(imageElement);


  checkImageWithNyckel(imageUrl);
});




  function checkImageWithNyckel(file) {
      const token = localStorage.getItem('token');
      // console.log(token);

      var formdata = new FormData();
      formdata.append("file", file);
    
      fetch('https://www.nyckel.com/v1/functions/z33l5ddx294e3a9g/invoke', {
  method: 'POST',
  headers: {
      'Authorization': 'Bearer ' + token,   },
  body: formdata,
})
  .then(response => response.json())
  .then(data => {
    // Access the label name and confidence from the response
    const label = data.labelName;
    const confidence = data.confidence;

    // Display the label name and confidence on the web page
    const resultElement = document.createElement('p');
    resultElement.textContent = `Label: ${label}, Confidence: ${confidence}`;
    dropArea.appendChild(resultElement);
  });
}
