import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const Notepad = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const exportToDocx = async () => {
    try {
      // Split content by paragraphs based on double line breaks or <p> tags
      const contentArray = content
        .split(/<\/p>|<br\s*\/?>/)
        .map(line => line.replace(/<\/?[^>]+(>|$)/g, '').trim()) // Remove HTML tags
        .filter(line => line.length > 0); // Remove empty lines

      // Create a new Document
      const doc = new Document({
        sections: [
          {
            children: contentArray.map((line) => 
              new Paragraph({
                children: [new TextRun(line)],
                spacing: { after: 200 }, // Adjust line spacing
              })
            ),
          },
        ],
      });

      // Generate and download the .docx file
      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'document.docx');
      console.log("Document downloaded successfully");
    } catch (error) {
      console.error("Error generating .docx file:", error);
    }
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
        <div className="document-preview" dangerouslySetInnerHTML={{ __html: content }} />
        <button onClick={exportToDocx} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'white' }}>
          Export to .docx
        </button>
      </div>
    </div>
  );
};

export default Notepad;
