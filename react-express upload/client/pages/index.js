import React ,{Fragment, useState} from 'react'
import { MDBBtn } from "mdbreact";
import axios from 'axios'


const App = ()=>{

    

    const [file , setFile] = useState('')
    const [filename , setFilename] = useState("Choose File")

    

    const fileSelectHandler = (event)=>{
        setFile(event.target.files[0])
        setFilename(event.target.files[0].name)

    }

    const fileUploadHandler = async e=>{

        const fd = new FormData()
        fd.append('image' , file , filename)

        try{
        const resp = await axios.post('http://localhost:4000/upload' , fd ,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        console.log(resp)

        }
        catch(err){
            console.log(err)
        }
        

    }

    const img = <img src =""  />


    return(

        <Fragment>


            <input  type="file"  onChange = {()=>fileSelectHandler(event)}  />
    
            <MDBBtn color="secondary" onClick={fileUploadHandler}> Upload</MDBBtn>
           

        </Fragment>
        
    )
}

export default App