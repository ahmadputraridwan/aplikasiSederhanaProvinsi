import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Kecamatan {
    id: number;
    regency_id: number;
    name: string;
}
interface Kelurahan {
    id: number;
    district_id: number;
    name: string;
}

interface KelurahanDropProps {
    selectedKecamatan: Kecamatan;
    onSelectKelurahan: (kelurahan: Kelurahan) => void;
}

const KelurahanDrop: React.FC<KelurahanDropProps> = ({ selectedKecamatan, onSelectKelurahan }) => {
    const [kelurahans, setKelurahans] = useState<Kelurahan[]>([]);

    useEffect(() => {
        axios.get<Kelurahan[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedKecamatan.id}.json`)
        .then((response) => setKelurahans(response.data))
        .catch((error) => error('Error fetching data:', error));
    },[selectedKecamatan]);

    return (
        <div>
            <h2> Pilih Kelurahan </h2>
        <select onChange={(e) => onSelectKelurahan(kelurahans.find((kelurahan) => kelurahan.name === e.target.value) || kelurahans[0])}>
            <option value="">Pilih Kelurahan</option>
            {kelurahans.map((kelurahan) => (
                <option key={kelurahan.id} value={kelurahan.name}>{kelurahan.name}</option>
            ))}
        </select>
        </div>
        );
    };

export default KelurahanDrop

