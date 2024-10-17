import React, { useState } from 'react';
import './Sidebar.css'; // Assuming you'll add the styles here
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const [action, setAction] = useState(false);
  const Navigate = useNavigate()
  return (
    <div>
      {/* Button to toggle the sidebar */}
      <div onClick={() => setAction(!action)} className="toggle-btn">
        {action ? 'Close' : 'Open'} Menu
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${action ? 'active' : ''}`}>
        <ul>
          <li onClick={()=>Navigate('/')} style={{color:"white"}}>Home</li>
          <li onClick={()=>Navigate('/author')} style={{color:"white"}}>Author</li>
          <li onClick={()=>Navigate('/profile')} style={{color:"white"}}>profile</li>
          <li onClick={()=>Navigate('/Create_comic')} style={{color:"white"}}>ComicAnthem</li>
          <li onClick={()=>Navigate('/SignUp')} style={{color:"white"}}>SignUp</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
