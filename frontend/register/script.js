
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
   
   
   try{
    e.preventDefault();
   const email = e.target.email.value;
   const password = e.target.password.value;

   const userObj = {
    email: email,
    password: password
   };

   const response = await axios.post("http://localhost:3000/user-register", userObj)
   console.log(response.data);

   } 
   catch(error){
       console.log(error)
   }
});

