  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBHARWcEOE5GIyf2e_P4oB5itNmUTRLoKs",
    authDomain: "login-page-a1cec.firebaseapp.com",
    projectId: "login-page-a1cec",
    storageBucket: "login-page-a1cec.appspot.com",
    messagingSenderId: "756367242850",
    appId: "1:756367242850:web:f6b91aeb960beb035b033b"
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();



function register(params) {
    const reg_email = document.querySelector(".email").value
    const reg_password = document.querySelector(".password").value

    // console.log(email,password);
    const error_msg=document.querySelector(".error")
    error_msg.innerText=""


    if (reg_email==="") {
        error_msg.innerText="Please Enter Your Email"
        return
    } 
  //   else if(reg_email!=="/^[^\s@]+@[^\s@]+\.[^\s@]+$/") {
  //     error_msg.innerText="Please Enter valid Email"
  //     return  
  // }
    else if(reg_password==="") {
        error_msg.innerText="Password cannot be Empty"
        return  
    }
    else if(reg_password.length<8) {
        error_msg.innerText="Password cannot be lessthan 8 characters"
        return
        
    }


createUserWithEmailAndPassword(auth, reg_email, reg_password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Sucessfull Registration")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Registration Failed")

    const error_msg=document.querySelector(".error")
        error_msg.innerText="Email is already registered !!"
    // ..
  });
}

module.register=register

// for login

function login(params) {
  const login_email = document.querySelector(".lemail").value
  const login_password = document.querySelector(".lpassword").value
  console.log(login_email,login_password);


signInWithEmailAndPassword(auth, login_email, login_password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    localStorage.setItem("email:",login_email)
    localStorage.setItem("accessToken:",user.accessToken)
    alert("Login Success")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Login Failed")
  });

}

module.login=login