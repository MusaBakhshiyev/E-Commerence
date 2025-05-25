import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChatHistory, addMessage, deleteMessage, clearMessages } from '../../redux/chatSlice';
import style from './Contact.module.css';
import VoiceRecorder from '../../components/VoiceRecorder';
import { IoSendSharp } from "react-icons/io5";
import Camera from '../../components/Camera';
import { FaTimes } from "react-icons/fa";
import { IoMdChatboxes } from "react-icons/io";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaPhoneSquareAlt } from "react-icons/fa";

export default function Contact() {
    const dispatch = useDispatch();
    const chatHistory = useSelector((state) => state.chat.messages);
    const [inputText, setInputText] = useState("");
    const historyRef = useRef(null);
    const holdTimeout = useRef(null);

    useEffect(() => {
        dispatch(loadChatHistory());
    }, [dispatch]);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendText();
        }
    };

    const sendText = () => {
        if(inputText.trim() != "")
        dispatch(addMessage({
            type: 'text',
            text: inputText,
            timestamp: Date.now(),
        }));
        setInputText("");
    };

    const handleRightClick = (e, timestamp) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Mesajı silmək istəyirsiniz?");
        if (confirmDelete) {
            dispatch(deleteMessage(timestamp));
        }
    };

    const startHoldToDelete = (timestamp) => {
        holdTimeout.current = setTimeout(() => {
            const confirmDelete = window.confirm("Mesajı silmək istəyirsiniz?");
            if (confirmDelete) {
                dispatch(deleteMessage(timestamp));
            }
        }, 1000); 
    };

    const cancelHoldToDelete = () => {
        clearTimeout(holdTimeout.current);
    };

    return (
        <section className={style.contact_section}>
            <h1><IoMdChatboxes /> Bizimlə əlaqə</h1>
            <div className={style.contacts}>


                <div className={style.contact_message}>
                    <button onClick={() => dispatch(clearMessages())} className={style.clear_history}><FaTimes /> <span>Bütün mesajları sil</span></button>
                    <div className={style.chat}>
                        <div ref={historyRef} className={style.history}>
                            {chatHistory.length === 0 && <p>Mesaj yoxdur.</p>}
                            {chatHistory.length != 0 && chatHistory.map((msg, index) => (
                                <div
                                    key={index}
                                    className={style.message}
                                    onContextMenu={(e) => handleRightClick(e, msg.timestamp)}
                                    onMouseDown={() => startHoldToDelete(msg.timestamp)}
                                    onMouseUp={cancelHoldToDelete}
                                    onMouseLeave={cancelHoldToDelete}
                                    onTouchStart={() => startHoldToDelete(msg.timestamp)}
                                    onTouchEnd={cancelHoldToDelete}
                                >
                                    {msg.type === 'text' && <p>{msg.text}</p>}
                                    {msg.type === 'voice' && <audio  controls src={msg.blobUrl} />}
                                    {msg.type === 'photo' && <img src={msg.blobUrl} alt="photo" className={style.photo} />}
                                </div>
                            ))}
                        </div>

                        <div className={style.input_container}>
                            <textarea onKeyDown={handleKeyDown} value={inputText} rows={1} onChange={(e) => setInputText(e.target.value)} placeholder="Mesaj yazın..." />
                            {inputText ?
                                <span className={style.send} onClick={sendText}> <IoSendSharp /></span>
                                : (
                                    <div className={style.camera_voice}>
                                        <Camera />
                                        <VoiceRecorder className={style.voice} />
                                    </div>

                                )
                            }

                        </div>
                    </div>
                </div>
                <div className={style.contact_others}>
                    <h3><FaPhoneSquareAlt /> <span>*0000</span></h3>
                    <h3><FaSquareWhatsapp /> <span>+994123456789</span></h3>
                    <h3><IoMail /> <span>gadgetall@gmail.com</span></h3>
                </div>
            </div>
        </section>
    );
}
