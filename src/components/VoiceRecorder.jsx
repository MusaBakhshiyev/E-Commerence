import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/chatSlice'; 
import style from './VoiceRecorder.module.css';
import { FaMicrophone, FaStop } from 'react-icons/fa';

export default function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const dispatch = useDispatch(); 

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);

        dispatch(
          addMessage({
            type: 'voice',
            blobUrl: url,
            timestamp: Date.now(),
          })
        );
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      alert('Error accessing microphone: ' + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };



  return (
    <div className={style.voice_recorder}>
      {isRecording ? (
        <button className={style.stop_recording} onClick={stopRecording}>
          <FaStop />
        </button>
      ) : (
        <button className={style.start_button} onClick={startRecording}>
          <FaMicrophone />
        </button>
      )}

    </div>
  );
}
