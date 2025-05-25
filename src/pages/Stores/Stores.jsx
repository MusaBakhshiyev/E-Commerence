import React, { useState } from 'react';
import style from './Stores.module.css';

const locations = [
    { id: 1, name: 'Baku Store', lat: 40.4093, lng: 49.8671 },
    { id: 2, name: 'Ganja Store', lat: 40.6828, lng: 46.3606 },
    { id: 3, name: 'Sumqayit Store', lat: 40.5914, lng: 49.639 },
];

export default function Stores() {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    return (
        <section className={style.stores_container}>
            <div className={style.store_list}>
                <h2>Filiallar</h2>
                <ul>
                    {locations.map(loc => (
                        <li
                            key={loc.id}
                            onClick={() => setSelectedLocation(loc)}
                            className={selectedLocation.id === loc.id ? style.active : ''}
                        >
                            {loc.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={style.map_view}>
                <iframe
                    title="Store Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}&z=15&output=embed`}
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
}
