import React,{ useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Notepad = () =>  {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <h2>Document Editor</h2>
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        style={{ height: '300px', marginBottom: '40px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <h4>Document Preview:</h4>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};
export default Notepad