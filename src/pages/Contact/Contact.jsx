import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChatHistory } from '../../redux/chatSlice';
import style from './Contact.module.css';
import VoiceRecorder from '../../components/VoiceRecorder';

export default function Contact() {
    const dispatch = useDispatch();
    const chatHistory = useSelector((state) => state.chat.messages);

    useEffect(() => {
        dispatch(loadChatHistory()); 
    }, [dispatch]);

    return (
        <section className={style.contact_section}>
            <h1>Bizimlə əlaqə</h1>
            <div className={style.chat}>
                <div className={style.history}>
                    {chatHistory.length === 0 && <p>Mesaj yoxdur.</p>}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={style.message}>
                            {msg.type === 'text' && <p>{msg.text}</p>}

                            {msg.type === 'voice' && (
                                <audio controls src={msg.blobUrl} />
                            )}

                        </div>
                    ))}
                </div>

                <div className={style.input_container}>
                    <input type="text" placeholder="Mesaj yazın..." />
                    <VoiceRecorder />
                </div>
            </div>
        </section>
    );
}
