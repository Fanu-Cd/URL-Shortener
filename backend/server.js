const mongoose = require('mongoose'); // Mongoose for communicating with mongoDB
const urlModel=require('./models/url') // Mongoose Model to store Payment Details(go to the file path to see)
const userModel=require('./models/user') // Mongoose Model to store Payment Details(go to the file path to see)
const express=require('express')
const bodyParser=require('body-parser')
const port=3001
const app=express()
const cors=require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

const mongodburl="" //MongoDB URL
mongoose.connect(mongodburl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.post('/checkURL',(req,response)=>{
  const {uuid}=req.body
  urlModel.find({short:uuid})
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/shortenURL',(req,response)=>{
  const {long,short,url,user_id}=req.body
        const model={
            long:long,
            short:short,
            url:url,
            user_id:user_id
        }
        const data=new urlModel(model)
        data.save()
        .then((resp)=>{
              response.json({success:resp})
        }).catch((err)=>{
              response.json({error:err})
      });
})

app.get('/getURLs/:uid',(req,response)=>{
  const uid=req.params.uid
  urlModel.find({user_id:uid})
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/deleteURL',(req,response)=>{
  const {id}=req.body
  urlModel.findByIdAndDelete(id)
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/checkUser',(req,response)=>{
  const {email}=req.body
  userModel.find({email:email})
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/checkEmail',(req,response)=>{
  const {email}=req.body
  userModel.find({email:email})
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/checkPassword',(req,response)=>{
  const {email,password}=req.body
  userModel.find({email:email,pass:password})
  .then((res)=>{
    response.json({result:res})
  })
})

app.post('/saveUser',(req,response)=>{
  const {fname,lname,email,pass}=req.body
        const model={
            fname:fname,
            lname:lname,
            email:email,
            pass:pass
        }
        const data=new userModel(model)
        data.save()
        .then((resp)=>{
              response.json({success:resp})
        }).catch((err)=>{
              response.json({error:err})
      });
})

app.get('/getUserData/:uid',(req,response)=>{
  const {uid}=req.params
  userModel.find({_id:uid})
  .then((res)=>{
    response.json({result:res})
  })
})

app.listen(port,()=>{
    console.log(`Server Listening on Port ${port}`)
})

