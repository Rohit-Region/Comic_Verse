import React, { useState } from 'react';
import "./Create_comic.css";
import axios from 'axios';

const Create_comic = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfName, setPdfName] = useState(null);
    const [image, setImage] = useState(null);
    const [previews, setPreviews] = useState([]);
    const [imageView, setImageView] = useState(false);
    const [pdfView, setPdfView] = useState(false);
    const [userData, setUserData] = useState({
        comic_id: "",
        comic_name: "",
        genre: "",
        episodes: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(name, value);
    };

    // Handle image selection
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImage(files);
        console.log("files: ", files);
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
        setPdfName(file.name); // Get file name to show to the user
    };

    const onSubmit = () => {
        const formData = new FormData();

        // Append user data to FormData
        formData.append("comic_id", userData.comic_id);
        formData.append("comic_name", userData.comic_name);
        formData.append("genre", userData.genre);
        formData.append("description", userData.description);
        formData.append("episodes", userData.episodes);

        // Append image files (multiple images)
        image.forEach((file, index) => {
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
                alert("uploaded");
                setUserData({
                    comic_id: "",
                    comic_name: "",
                    genre: "",
                    episodes: "",
                    description: "",
                });
                setPdfFile(null);
                setImage(null);
                setPreviews([]);
                setPdfName(null);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    };

    const PdfViewer = ({ pdfFile }) => {
      console.log(pdfFile,pdfName)
      return (
        
        <iframe
          src={pdfFile}
          width="100%"
          height="100%"
          style={{backgroundColor:'white'}}
          title="PDF Viewer"
        ></iframe>
      );
    };


    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <div style={modalStyles.overlay}>
                <div style={modalStyles.modal}>
                    <button style={modalStyles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        );
    };

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: '#fff',
            padding: '14px',
            width: '65%',
            height: '80%',
            overflow: 'hidden',
            position: 'relative',
        },
        closeButton: {
            position: 'absolute',
            top: '1px',
            right: '1px',
            border: 'none',
            borderRadius: '25px',
            background: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#cfcfcf',
        },
    };

    return (
        <div>
            <h1>ADD YOUR COMIC'S</h1>

            <div>
                <div className='inside'><p>COMIC ID:</p><input type='number' name='comic_id' placeholder='ID' value={userData.comic_id} onChange={handleChange} /></div>
                <div className='inside'><p>COMIC NAME:</p><input type='text' name='comic_name' placeholder='Name' value={userData.comic_name} onChange={handleChange} /></div>
                <div className='inside'><p>GENRE:</p><input type='text' name='genre' placeholder='Genre' value={userData.genre} onChange={handleChange}></input></div>
                <div className='inside'><p>EPISODES:</p><input type='number' name='episodes' placeholder='Episodes' value={userData.episodes} onChange={handleChange}></input></div>
                <div className='inside'><p>DESCRIPTION:</p><input type='text' name='description' placeholder='Description' value={userData.description} onChange={handleChange}></input></div>

                <div className='inside'><p>UPLOAD COMICS IMAGE:</p><input type="file" accept="image/*" multiple onChange={handleImagesChange} />
                    {image && (<div style={{ width: '110px', borderRadius: '10px', height: '25px', backgroundColor: 'orange',cursor:'pointer' }} onClick={() => setImageView(true)}>
                        PREVIEW
                    </div>)}
                </div>

                <div className='inside'><p>UPLOAD COMICS PDF:</p><input type="file" accept="application/pdf" onChange={handlePDFChange} />
                    {pdfFile && (<div style={{ width: '110px', borderRadius: '10px', height: '25px', backgroundColor: 'orange',cursor:'pointer' }} onClick={() => setPdfView(true)}>
                        PREVIEW
                    </div>)}
                </div>

                <button onClick={onSubmit}>ADD COMIC</button>
            </div>

            {/* Image Preview Modal */}
            <Modal isOpen={imageView} onClose={() => setImageView(false)}>
                <div>
                    <h4>Image Previews:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {previews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Selected ${index}`} style={{ width: '150px', height: 'auto', margin: '10px' }} />
                        ))}
                    </div>
                </div>
            </Modal>

            {/* PDF Preview */}
            <Modal isOpen={pdfView} onClose={() => setPdfView(false)}>
               <PdfViewer pdfUrl={pdfFile} />
            </Modal>
        </div>
    );
};

export default Create_comic;
