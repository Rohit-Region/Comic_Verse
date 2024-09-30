import React, { useState, useEffect, useRef } from 'react';

const Voice = () => {
  const array = ['welcome people', 'start', 'hello world', 'people'];
  const [transcript, setTranscript] = useState('');
  const [bigCache, setBigCache] = useState([]);
  const [Action,setAction]=useState()
  const [isListening, setIsListening] = useState(false);
  const [hello,sethello]=useState();
  const [activeComponent, setActiveComponent] = useState(null); 
  // Use a ref to keep a single instance of SpeechRecognition
  const recognitionRef = useRef(null);

  const componentMap = {
    start: <div style={{ backgroundColor: 'lightgreen' }}>Start Component</div>,
    'hello world': <div style={{ backgroundColor: 'lightblue' }}>Hello World Component</div>,
    people: <div style={{ backgroundColor: 'orange' }}>People Component</div>,
  };

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }

    // Initialize SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      console.log("ENTERED EVENT :",event);
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          console.log("ENTERED FINAL",result[0].transcript)
          // const actionWords = result[0].transcript ? result[0].transcript.split(/\s+/) : [];
          // const matchedComponent = array.find(keyword => actionWords.some(word => keyword.includes(word)));

          // // Update the active component based on the match
          // setActiveComponent(componentMap[matchedComponent] || null);
          setAction(result[0].transcript)
          setBigCache(prevCache => [...prevCache, result[0].transcript]);
          setTranscript((prev) => prev + result[0].transcript + ' ');
          
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      
      console.log('Interim transcript:', interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    // Save the recognition instance in the ref
    recognitionRef.current = recognition;

    // Cleanup function to stop recognition when component unmounts
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("BIG  CACHE : ",bigCache)
      LetsPLay()
    }
  };

  const LetsPLay = () => {
    if (!Action) {
      console.log("Action is undefined or empty");
      return;
    }
    
    console.log('Lets play Action');
    const actionWords = Action.split(/\s+/);
    console.log("Actions:", actionWords);
    
    const matchingWord = actionWords.find(word => array.some(item => item.includes(word)));
    
    setActiveComponent(componentMap[matchingWord] || null);
    
    if (matchingWord === 'hello') {
      sethello(matchingWord);
      console.log("Hello is already there");
    }
    
    console.log('Action available:', matchingWord);
  };
  

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>Start Listening</button>
      <button onClick={stopListening} disabled={!isListening}>Stop Listening</button>
      <div>
        <h2>Transcript:</h2>
        <p>{transcript}</p>
      </div>
    
    <div>  {hello?
      (<div style={{ backgroundColor: 'pink' }}>CLink</div>
      ):
      null
      }
      </div>
      <div style={{backgroundColor:'yellow'}}>
      {activeComponent}
      </div>
    </div>
  );
};

export default Voice;
