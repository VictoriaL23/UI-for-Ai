// Finding the function name from the URL
document.addEventListener('DOMContentLoaded', function() {

  const functionId = localStorage.getItem('functionId');
  const functionName = localStorage.getItem('functionName');
  
  document.getElementById('functionName').textContent = functionName;
  document.getElementById('functionId').textContent = functionId;
  console.log(functionId);
  console.log(functionName);
});

function createLabel(){
  
  const functionId = localStorage.getItem('functionId');
  const functionName = localStorage.getItem('functionName');
  const token = localStorage.getItem('token');

  console.log(functionId);
  document.getElementById('functionName').textContent = functionName;


var labelName = document.querySelector(".labelName").value;
var labelDescription = document.querySelector(".labelDescription").value;


  fetch('https://www.nyckel.com/v1/functions/'+ functionId +'/labels', {

    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {"name":labelName,
        "description":labelDescription
    })
})
.then(response => response.json())
.then(data => {
  // Extract the label ID from the response
  const labelId = data.id;

  // Save the label ID to local storage
  localStorage.setItem('labelId', labelId);
  console.log(data);

document.querySelector(".labelName").value = '';
document.querySelector(".labelDescription").value = '';

})};


function listLabels(){
const functionId = localStorage.getItem('functionId');
const labelListContainer = document.getElementById('labelList');
const token = localStorage.getItem('token');

fetch('https://www.nyckel.com/v1/functions/'+functionId+'/labels', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token,
    }
})
.then(response => response.json())
.then(data => {
  labelListContainer.innerHTML = ''; // Clear the container before appending labels

  // Iterate over the labels and create HTML elements for each label
  data.forEach(label => {
    const labelElement = document.createElement('div');
    labelElement.innerHTML = `
      <h4>${label.name}</h4>
      <p>${label.description}</p>
    `;
    labelListContainer.appendChild(labelElement);
  });
});
}


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
        addAndAnnotateImage(imageUrl);
      };

      // Read the image file as data URL
      reader.readAsDataURL(file);
    }
  }
}
}

dragAndDrop();


// Function to add and annotate the image using fetch
let droppedSampleIds = []; // Array to store dropped sample IDs

function addAndAnnotateImage(imageUrl) {
  const token = localStorage.getItem('token');
  const functionId = localStorage.getItem('functionId');
  const labelId = localStorage.getItem('labelId');

  // Make a POST request to add the image
  fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "data": imageUrl
    })
  })
    .then(response => response.json())
    .then(data => {
      const sampleId = data.id;
      droppedSampleIds.push(sampleId);

      // Make a PUT request to annotate the image
      annotateImage(sampleId, labelId);
    });
}

function annotateImage(sampleId, labelId) {

  const functionId = localStorage.getItem('functionId');
  const token = localStorage.getItem('token');

  // Make a PUT request to annotate the image
  fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples/' + sampleId + '/annotation', {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      labelId: labelId,
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dropArea.innerHTML = 'Drag and Drop Image Here';
    });
}

function annotateAllImages() {
  const labelId = localStorage.getItem('labelId');

  droppedSampleIds.forEach(sampleId => {
    annotateImage(sampleId, labelId);
  });

  droppedSampleIds = []; // Reset the array
}

function nextPage (){

  window.open("invoke.html", "_blank");

}


