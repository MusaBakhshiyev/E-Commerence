import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import style from './Camera.module.css';
import { FaCameraRetro } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function PhotoCapture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCameraOn) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    setIsCameraOn(true);
                })
                .catch((err) => {
                    alert('Camera access denied: ' + err.message);
                    setIsCameraOn(false);
                });
        }
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraOn]);

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.save();
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

        canvas.toBlob((blob) => {
            dispatch(addMessage({
                type: 'photo',
                blobUrl: URL.createObjectURL(blob),
                timestamp: Date.now(),
            }));
        }, 'image/jpeg');

        setIsCameraOn(false);
    };

    const stopCamera = () => {
        setIsCameraOn(false);
    };

    return (
        <div className={style.camera_container}>
            {!isCameraOn ? (
                <button onClick={() => setIsCameraOn(true)} className={style.camera}><FaCameraRetro /></button>
            ) : (
                <div className={style.take_photo}>
                    <video
                        ref={videoRef}
                        autoPlay
                        className={style.video_frame}
                        style={{ transform: 'scaleX(-1)' }}
                    />
                    <button onClick={stopCamera} className={style.exit_camera}><FaTimes /></button>
                    <button onClick={takePhoto} className={style.take_button}><FaCameraRetro /></button>
                </div>

            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}
