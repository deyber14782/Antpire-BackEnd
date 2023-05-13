const {Router}=require('express')
const firebase=require('firebase/app')
const auth=require('firebase/auth')
const {getAuth}=require('firebase/auth')

const router=Router()

const firebaseConfig = {
    apiKey: "AIzaSyD9Ugtsq_Ts_FbGLl3sXYFnPFUOwsAs5S0",
    authDomain: "antpire-original.firebaseapp.com",
    databaseURL: "https://antpire-original-default-rtdb.firebaseio.com",
    projectId: "antpire-original",
    storageBucket: "antpire-original.appspot.com",
    messagingSenderId: "342233726581",
    appId: "1:342233726581:web:f498bd394cecb1645c423c",
    measurementId: "G-GDBJRFMR3F"
};

firebase.initializeApp(firebaseConfig)

router.post('/login',(req,res)=>{

    var email=req.body.email
    var password=req.body.password
    const auth2=getAuth()
    auth.signInWithEmailAndPassword(auth2, email, password)
    .then((userCredential) => {
        // El inicio de sesión fue exitoso
        const user = userCredential.user;
        if(getAuth().currentUser.emailVerified){
            return res.status(200).json({message:"Iniciaste sesión"})
        }
        else{
            return res.status(500).json({message:"Debes verificar tu correo"})
        }
        
    })
    .catch((error) => {
        // Ocurrió un error durante el inicio de sesión
        const errorCode = error.code;
        const errorMessage = error.message;
        return res.status(400).json({message:errorMessage})
    });
    
})



module.exports=router