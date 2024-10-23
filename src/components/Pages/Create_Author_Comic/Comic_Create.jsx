import React,{useState} from 'react'
import Notepad from './Notepad';
import Painter from './Paint/PaintMain';
import MangaMain from './Manga/MangaMain';
const Comic_Create = () => {

  const [comicSelect,setComicSelect]=useState(1)
  return (
    <div>
        <h2>CREATE STORY :</h2>  
        <div style={{display:'flex',flexDirection:'row',cursor:'pointer',justifyContent:'center'}}>
          <div style={{width:'100px',height:'50px',backgroundColor:'grey',color:'black',alignContent:'center',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}} onClick={()=>setComicSelect(1)}>NotePad</div>
          <div style={{width:'100px',height:'50px',backgroundColor:'grey',color:'black',alignContent:'center',borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}} onClick={()=>setComicSelect(2)}>Painter</div>
          <div>{"  "}</div>
          <div style={{width:'100px',height:'50px',backgroundColor:'grey',color:'black',alignContent:'center'}} onClick={()=>setComicSelect(3)}>MANGA</div>
        </div>
        {comicSelect === 1 ? (
  <div><Notepad/></div>
) : (comicSelect === 2 ? (
  <div><Painter/></div>
) : (
  <div><MangaMain/></div>
))}

    </div>
  )
}

export default Comic_Create