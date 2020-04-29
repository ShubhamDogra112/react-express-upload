const express = require('express')
        app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')


app.use(cors())
app.use(fileUpload())
app.post("/upload",(req,res,next)=>{

    if(req.files === null){
        let err = new Error('No files uploaded')
        err.status =
        next(err)
    }

    const file = req.files.image
    console.log(file)

    file.mv(`${__dirname}/uploads/${file.name}` , err=>{
        
        next(err)

    })

    res.status(200).json({
        message:'file uploaded succesfully',
        filename:file.name,
        fiepath:`/uploads/${file.name}`
    })

})


app.use((err,req,res)=>{
   return res.status(err.status || 500).json({
        error:{
            message:err.message||'Something went wrong'
        }

    })
})

const port = 4000||process.env.PORT
app.listen(port,()=>{
    console.log(`Server is started at ${port}`)
})