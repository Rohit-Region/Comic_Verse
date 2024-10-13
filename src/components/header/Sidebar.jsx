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
          <li onClick={()=>Navigate('/home')} style={{color:"white"}}>Home</li>
          <li onClick={()=>Navigate('/about')} style={{color:"white"}}>About</li>
          <li><a href="#services">Services</a></li>
          <li onClick={()=>Navigate('/Create_comic')} style={{color:"white"}}>ComicAnthem</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
