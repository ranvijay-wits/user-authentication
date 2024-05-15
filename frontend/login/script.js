
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
   
   
   try{
    e.preventDefault();
   const email = e.target.email.value;
   const password = e.target.password.value;

   const userObj = {
    email: email,
    password: password
   };
   console.log(userObj)
   const response = await axios.post("http://localhost:3000/user-login", userObj);
   console.log(response.data.token);
   } 
   catch(error){
       console.log(error)
   }
});

