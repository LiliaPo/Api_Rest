<<<<<<< HEAD
declare const axios:any;

document.addEventListener('DOMContentLoaded', async () => {
    const result = await axios.get("http://localhost:3000/api/v1/users");
    let htmlUsers = "<ul>";
    result.data.forEach((user:any) => {
       htmlUsers += '<li>${user.name} ${user.first_surname}</li> '
    });
    htmlUsers += "</ul>";
    document.getElementById("users")!.innerHTML =htmlUsers;
});
    
=======
declare const axios: any;

document.addEventListener("DOMContentLoaded", async () => {
    const result = await axios.get("http://localhost:3000/api/v1/users");
    let htmlUsers = "<ul>";
    result.data.forEach((user:any)=>{htmlUsers += `<li>${user.name} ${user.first_surname}</li>`});
    htmlUsers += "</ul>";
    document.getElementById("users")!.innerHTML = htmlUsers;
});
>>>>>>> upstream/develop
