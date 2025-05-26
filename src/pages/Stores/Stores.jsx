import React, { useState } from 'react';
import style from './Stores.module.css';

const locations = [
    { id: 1, name: '28 Mall', lat: 40.379111, lng: 49.846885 },
    { id: 2, name: 'Gənclik Mall', lat: 40.4000039, lng: 49.852504 },
    { id: 3, name: 'Crescent Mall', lat: 40.373398, lng: 49.8580775 },
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
