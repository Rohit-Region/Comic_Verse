import React, { useState } from 'react'
import "./Create_comic.css"
import axios from 'axios';
const Create_comic = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfName, setPdfName] = useState(null);
    const [image, setImage] = useState(null);
    const [previews, setPreviews] = useState([]);
    const [userData,setUserData]=useState({
        comic_id:"",
        comic_name:"",
        genre:"",
        description:"",
    })
    const handleChange = (e) =>{
        const {name,value}=e.target;
                setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(name,value)
    }
 
 
  // Handle image selection
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImage(files);
    console.log("files : ",files)
    // Generate previews for all selected images
    const newPreviews = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newPreviews).then((previewsArray) => {
      setPreviews(previewsArray);
    });
  };


  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    setPdfName(file.name);  // Get file name to show to the user
  };

    // const onSubmit = () =>{
    //    console.log(userData,image,pdfFile)
    //     axios.post("http://localhost:3002/api/comics/upload",{
    //         body:{
    //             comic_id:userData.comic_id,
    //             comic_name:userData.comic_name,
    //             genre:userData.genre,
    //             description:userData.description,
    //             // image:image,
    //             // pdf:pdfFile
    //         }
    //     })
    //     .then((res)=>{
    //         console.log("Response : ",res)
    //     })
    //     .catch((err)=>{
    //         console.log("Error : ",err)
    //     })
    //     // setUserData({
    //     //     comic_id:"",
    //     //     comic_name:"",
    //     //     genre:"",
    //     //     description:"",
    //     // })
    //     // setImage("");
    //     // setPdfFile("");
    // }

    const onSubmit = () => {
        const formData = new FormData();
    
        // Append user data to FormData
        formData.append("comic_id", userData.comic_id);
        formData.append("comic_name", userData.comic_name);
        formData.append("genre", userData.genre);
        formData.append("description", userData.description);
    
        // Append image files (multiple images)
        image.forEach((file, index) => {
            console.log('imageis there')
            formData.append(`image`, file); // Backend expects this key as 'image'
        });
    
        // Append PDF file
        if (pdfFile) {
            formData.append("pdf", pdfFile); // Backend expects this key as 'pdf'
        }
    
        axios.post("http://localhost:3002/api/comics/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Important to set this for file uploads
            },
        })
        .then((res) => {
            console.log("Response:", res);
        })
        .catch((err) => {
            console.log("Error:", err);
        });
    };
    

    return (
    <div>
        <h1>Create_comic</h1>

        <div>
        <div>
        <div className='inside'><p>COMIC ID : </p><input  type='number' name='comic_id' placeholder='ID' value={userData.comic_id} onChange={handleChange}/></div>
        <div className='inside'><p>COMIC NAME : </p><input  type='text' name='comic_name' placeholder='Name' value={userData.comic_name} onChange={handleChange}/></div>
        <div className='inside'><p>GENRE : </p><input type='text' name='genre' placeholder='Age' value={userData.genre} onChange={handleChange}></input></div>
        <div className='inside'><p>DESCRIPTION : </p><input type='text'   name='description' placeholder='Address' value={userData.description} onChange={handleChange}></input></div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
        />
        <input type="file" accept="application/pdf" onChange={handlePDFChange} />
        <button type="submit">Upload PDF</button>
        <button onClick={onSubmit}>ADD COMIC </button>

        </div>
      
        {previews.length > 0 && (
        <div>
          <h4>Image Previews:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Selected ${index}`}
                style={{ width: '150px', height: 'auto', margin: '10px' }}
              />
            ))}
          </div>
        </div>
      )}
        {pdfName && (
        <div>
          <h4>Selected PDF:</h4>
          <p>{pdfName}</p>
        </div>
      )}
        </div>
    </div>
  )
}

export default Create_comic