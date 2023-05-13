const {Router}=require('express')
const firebase=require('firebase/app')
const auth=require('firebase/auth')
const {getAuth}=require('firebase/auth')
const {getFirestore,getDocs,collection}=require('firebase/firestore')

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

const app=firebase.initializeApp(firebaseConfig)
const db=getFirestore(app)

router.get('/getData',async(req,res)=>{
    auth2=getAuth()
    var getData=[]
    
    auth.onAuthStateChanged(auth2, (user) => {
        if (user) {
    
            const uid = user.uid;
            var name,email,salary,frequencySalary
            getDocs(collection(db, "Users",user.uid,'Private_Data')).then(querySnapshot => {
                const query=querySnapshot.forEach((doc) => {
                    
                    name=doc.data().Names+' '+doc.data().Last_Names
                    email=doc.data().Email
                    salary=doc.data().Salary
                    frequencySalary=doc.data().FrequencySalary
                });

                

                getData.push(name)
                getData.push(email)
                getData.push(salary)
                getData.push(frequencySalary)

                return res.status(200).json(getData)

            })
            .catch((e)=>{
                return res.status(400).json({message:e})
            })
            
        } 
        else {
            return res.status(400).json({message:"No hay ningún usuario logueado"})
        }
    });
})

router.post('/logout',async(req,res)=>{


    auth2=getAuth()

    auth.signOut(auth2)
    .then(() => {
        return res.status(200).json({message:"Cerraste sesión"})
    }).catch((error) => {
        return res.status(400).json({message:error})
    });
    
})

module.exports=router