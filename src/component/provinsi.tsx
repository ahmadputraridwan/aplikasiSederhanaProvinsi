import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Prov {
    id: number;
    name: string;
}

interface ProvinsiDropProps {
    onSelectProv: (provinsi: Prov) => void;
}

const ProvDrop: React.FC<ProvinsiDropProps> = ({ onSelectProv }) => {
    const [provs, setProvs] = useState<Prov[]>([]);

    useEffect(() => {
        // Fetch data prov dari API Statis
        axios.get<Prov[]>('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then((response) => setProvs(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2> Pilih Provinsi </h2>
        <select onChange={(e) => onSelectProv(provs.find((provinsi) => provinsi.name === e.target.value) || provs[0])}>
            <option value="">Pilih Provinsi</option>
            {provs.map((prov) => (
                <option key={prov.id} value={prov.name}>{prov.name}</option>
            ))}
        </select>
        </div>
    );
};

export default ProvDrop;