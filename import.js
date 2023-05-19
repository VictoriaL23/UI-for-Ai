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
function addAndAnnotateImage(imageUrl) {
  const token = localStorage.getItem('token');
  const functionId = localStorage.getItem('functionId');
  let sampleId;

  // Make a GET request to retrieve the sample ID
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
  console.log(data);
  sampleId = data.id;
  console.log(sampleId);
  localStorage.setItem('sampleId', sampleId);
  console.log(sampleId);
});
}

function annotateImage(){
    // Make a PUT request to annotate the image
    const token = localStorage.getItem('token');
    const functionId = localStorage.getItem('functionId');
    const sampleId = localStorage.getItem('sampleId');
    const labelId = localStorage.getItem('labelId');

    fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples/' + sampleId + '/annotation', {
    method: 'PUT',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {
            labelId: labelId,
      }
    )
})
.then(response => response.json())
.then(data => console.log(data));

}


































// // Finding the function name from the URL
// document.addEventListener('DOMContentLoaded', function() {

//   const functionId = localStorage.getItem('functionId');
//   const functionName = localStorage.getItem('functionName');

//   document.getElementById('functionName').textContent = functionName;
//   document.getElementById('functionId').textContent = functionId;
//   console.log(functionId);
//   console.log(functionName);
// });

// function createLabel() {
  
//   const functionId = localStorage.getItem('functionId');
//   const functionName = localStorage.getItem('functionName');
//   const token = localStorage.getItem('token');

//   console.log(functionId);
//   document.getElementById('functionName').textContent = functionName;

//   var labelName = document.querySelector('.labelName').value;
//   var labelDescription = document.querySelector('.labelDescription').value;

//   fetch('https://www.nyckel.com/v1/functions/' + functionId + '/labels', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: labelName,
//       description: labelDescription
//     })
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Extract the label ID from the response
//       const labelId = data.id;

//       // Save the label ID to local storage
//       localStorage.setItem('labelId', labelId);
//       console.log(data);

//       document.querySelector('.labelName').value = '';
//       document.querySelector('.labelDescription').value = '';
//     });
// }

// function listLabels() {
//   const functionId = localStorage.getItem('functionId');
//   const labelListContainer = document.getElementById('labelList');
//   const token = localStorage.getItem('token');

//   fetch('https://www.nyckel.com/v1/functions/' + functionId + '/labels', {
//     method: 'GET',
//     headers: {
//       'Authorization': 'Bearer ' + token
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       labelListContainer.innerHTML = ''; // Clear the container before appending labels

//       // Iterate over the labels and create HTML elements for each label
//       data.forEach(label => {
//         const labelElement = document.createElement('div');
//         labelElement.innerHTML = `
//           <h4>${label.name}</h4>
//           <p>${label.description}</p>
//         `;
//         labelListContainer.appendChild(labelElement);
//       });
//     });
// }

// function dragAndDrop() {
//   // Add event listeners for drag and drop functionality
//   const dropArea = document.getElementById('dropArea');

//   dropArea.addEventListener('dragover', (event) => {
//     event.preventDefault(); // Allowing drop by preventing the default behavior
//   });

//   dropArea.addEventListener('drop', (event) => {
//     event.preventDefault(); // Preventing default behavior

//     // Get the dropped files from the event
//     const files = event.dataTransfer.files;

//     // Handle the dropped image files
//     handleDroppedImages(files);
//   });

//   // Function to handle the dropped image files
//   function handleDroppedImages(files) {
//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       // Check if the dropped file is an image
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();

//         // Read the image file and perform actions with it
//         reader.onload = (event) => {
//           const imageUrl = event.target.result;

//           // Create an image element and set its source to the dropped image
//           const imageElement = document.createElement('img');
//           imageElement.src = imageUrl;

//           // Append the image to the dropArea or any desired location
//           dropArea.appendChild(imageElement);

//           // Call addAndAnnotateImage with the imageUrl
//           addAndAnnotateImage(imageUrl);
//         };

//         // Read the image file as data URL
//         reader.readAsDataURL(file);
//       }
//     }
//   }
// }

// dragAndDrop();

// // Function to add and annotate the image using fetch
// function addAndAnnotateImage(imageUrl) {
//   const token = localStorage.getItem('token');
//   const functionId = localStorage.getItem('functionId');
//   let sampleId;

//   // Make a POST request to create a new sample
//   fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       data: imageUrl
//     })
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       sampleId = data.id;
//       console.log(sampleId);
//       localStorage.setItem('sampleId', sampleId);
//       console.log(sampleId);
//     });
// }

// function annotateImage() {
//   // Make a PUT request to annotate the image
//   const token = localStorage.getItem('token');
//   const functionId = localStorage.getItem('functionId');
//   const sampleId = localStorage.getItem('sampleId');
//   const labelName = document.querySelector('.label_name').value;
//   const labelId = localStorage.getItem('labelId');

//   fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples/' + sampleId + '/annotation', {
//     method: 'PUT',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       labelId: labelId
//     })
//   })
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

































// // Finding the function name from the URL
// document.addEventListener('DOMContentLoaded', function() {

//   const functionId = localStorage.getItem('functionId');
//   const functionName = localStorage.getItem('functionName');
  
//   document.getElementById('functionName').textContent = functionName;
//   document.getElementById('functionId').textContent = functionId;
//   console.log(functionId);
//   console.log(functionName);
// });

// function createLabel(){
  
//   const functionId = localStorage.getItem('functionId');
//   const functionName = localStorage.getItem('functionName');
//   const token = localStorage.getItem('token');

//   console.log(functionId);
//   document.getElementById('functionName').textContent = functionName;


// var labelName = document.querySelector(".labelName").value;
// var labelDescription = document.querySelector(".labelDescription").value;


//   fetch('https://www.nyckel.com/v1/functions/'+ functionId +'/labels', {

//     method: 'POST',
//     headers: {
//         'Authorization': 'Bearer ' + token,
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(
//         {"name":labelName,
//         "description":labelDescription}
//     )
// })
// .then(response => response.json())
// .then(data => {
//   // Extract the label ID from the response
//   const labelId = data.id;

//   // Save the label ID to local storage
//   localStorage.setItem('labelId', labelId);
//   console.log(data);

// document.querySelector(".labelName").value = '';
// document.querySelector(".labelDescription").value = '';

// })};


// function listLabels(){
// const functionId = localStorage.getItem('functionId');
// const labelListContainer = document.getElementById('labelList');
// const token = localStorage.getItem('token');

// fetch('https://www.nyckel.com/v1/functions/'+functionId+'/labels', {
//     method: 'GET',
//     headers: {
//         'Authorization': 'Bearer ' + token,
//     }
// })
// .then(response => response.json())
// .then(data => {
//   labelListContainer.innerHTML = ''; // Clear the container before appending labels

//   // Iterate over the labels and create HTML elements for each label
//   data.forEach(label => {
//     const labelElement = document.createElement('div');
//     labelElement.innerHTML = `
//       <h4>${label.name}</h4>
//       <p>${label.description}</p>
//     `;
//     labelListContainer.appendChild(labelElement);
//   });
// });
// }


// function dragAndDrop (){
// // Add event listeners for drag and drop functionality
// const dropArea = document.getElementById('dropArea');

// dropArea.addEventListener('dragover', (event) => {
//   event.preventDefault(); // Allowing drop by preventing the default behavior
// });

// dropArea.addEventListener('drop', (event) => {
//   event.preventDefault(); // Preventing default behavior

//   // Get the dropped files from the event
//   const files = event.dataTransfer.files;

//   // Handle the dropped image files
//   handleDroppedImages(files);
// });

// // Function to handle the dropped image files
// function handleDroppedImages(files) {
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];

//     // Check if the dropped file is an image
//     if (file.type.startsWith('image/')) {
//       const reader = new FileReader();

//       // Read the image file and perform actions with it
//       reader.onload = (event) => {
//         const imageUrl = event.target.result;

//         // Create an image element and set its source to the dropped image
//         const imageElement = document.createElement('img');
//         imageElement.src = imageUrl;

//         // Append the image to the dropArea or any desired location
//         dropArea.appendChild(imageElement);

//         // Call addAndAnnotateImage with the imageUrl
//         addAndAnnotateImage(imageUrl);
//       };

//       // Read the image file as data URL
//       reader.readAsDataURL(file);
//     }
//   }
// }
// }

// dragAndDrop();


// // Function to add and annotate the image using fetch
// function addAndAnnotateImage(imageUrl) {
//   const token = localStorage.getItem('token');
//   const functionId = localStorage.getItem('functionId');
//   let sampleId;

//   // Make a GET request to retrieve the sample ID
//   fetch('https://www.nyckel.com/v1/functions/' + functionId + '/samples', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       "data": imageUrl
//     })
//   })
//   .then(response => response.json())
// .then(data => {
//   console.log(data);
// sampleId = data.id;
//   console.log(sampleId);
//   localStorage.setItem('sampleId', sampleId);
//   console.log(sampleId);
// })}
// function annotateImage(){
//     // Make a PUT request to annotate the image
//     const token = localStorage.getItem('token');
//     const functionId = localStorage.getItem('functionId');
//     const sampleId = localStorage.getItem('sampleId');
//     const labelName = document.querySelector(".label_name").value;
//     const labelId = localStorage.getItem('labelId');

//     fetch('https://www.nyckel.com/v1/functions/gxk2thz48v0kfwyb/samples/sample_989ctltjsdqhr9jt/annotation', {
//     method: 'PUT',
//     headers: {
//         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2ODQ1MjY3NzUsImV4cCI6MTY4NDUzMDM3NSwiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6IjhrazFyd2J6M2puOHdkMmlwN2QwdTcxYTg2dnRhc2R0IiwianRpIjoiRkMwNEU2NTU3RDAxMDQzQjIxNjlCNjc5NzE0NkJBNjIiLCJpYXQiOjE2ODQ1MjY3NzUsInNjb3BlIjpbImFwaSJdfQ.E_ELLkSjVmg6tf-TCOCfojpgyoljGLtWT-yUZMtGe7puiGUy8VN7UomrCZglNBy_8JefwRgupqPaAcLzpc_i9X-ND4ZQgzdymUrEjdwfQimeEjwVMOga1kKielLNQjy98qBEvAO7nlz-DcuIJfRSc3D1Nt600ceBete_jS1YTwgLnRPh1BjOcrk7KIJc-zcoASYL4uLR8AReQNjpcKTrMjFT7dU1IeCVCiBG_chdUuHU0TEB511TKZWntMLNs0HU3Mq4qfztTeMilqlcQOZn6uESwhZU5rzd4fR5vBKUH0GyxxTTbNSvrrZsXEIVooXoQoxwKuSMDOUFQG8qSH0Kcw',
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(
//         {"labelId": labelId,
//       }
//     )
// })
// .then(response => response.json())
// .then(data => console.log(data));

// }


//  // eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJuYmYiOjE2ODQ1MTU4MzMsImV4cCI6MTY4NDUxOTQzMywiaXNzIjoiaHR0cHM6Ly93d3cubnlja2VsLmNvbSIsImNsaWVudF9pZCI6IjhrazFyd2J6M2puOHdkMmlwN2QwdTcxYTg2dnRhc2R0IiwianRpIjoiNDkxOEU0QTlEREQ4OERCQkJDNzE4Q0Y3RDVDNzJENTAiLCJpYXQiOjE2ODQ1MTU4MzMsInNjb3BlIjpbImFwaSJdfQ.NtkLwPFvscnPIek5haY1usSSeJ8j72sLIPRZ4BwDqSJeZQpkSRllIYSbg4hwGKq8TVF7u0XlKenXZ6wu5fi_ohI4LeMGiTQ0jN1fdlv7ZB8UYZjLwOp8Kk4FUdPnRTLwyWA1P-juOhR37-1QSUb9Nj8X6x_Mhm3eHLbsPr3ZXNbkqXU5L3FH3FoZyNT_gXrdxiiA7x_YUs8fj8UX9Wr88oXVIyDKMzn-LhvH39a9TVO5n881lnig_T487WfsK67OExYf0gBCBzjs3H3M4ucZxOhPjm-T6ki4eJeDK99Nxh_mOh4XqU8ZsZaoxOpVMcmsdG7kA44Cj-oYNa_FRDniXA