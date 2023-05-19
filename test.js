function createFunction() {
    fetch('https://www.nyckel.com/connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'client_id=8kk1rwbz3jn8wd2ip7d0u71a86vtasdt&client_secret=7n14ueq7lpkl73r2wpnjgji0i9tk0hob5u08bxobg5e4nf34ftxl4uco51mkk664&grant_type=client_credentials'
    })
    .then(response => response.json())
    .then(data => {
        token = data.access_token;
          console.log(token);
          localStorage.setItem('token', token);
          console.log(data);
var functionName = document.querySelector(".function_name").value;
localStorage.setItem('functionName', functionName);
localStorage.getItem('token');
console.log('token');
var functionId;
console.log(functionName);

fetch('https://www.nyckel.com/v1/functions', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {"name":functionName,
        "input":"Image",
        "output":"Classification"}
    )
    
    
})
.then(response => response.json())
.then(data => {
functionId = data.id;
  console.log(functionName);
  console.log(functionId);
  localStorage.setItem('functionId', functionId);
  console.log(data);

  setTimeout(() => {
    window.open("import.html", "_blank");
  }, 2000);
});
}
)};
