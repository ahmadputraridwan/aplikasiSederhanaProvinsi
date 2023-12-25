import React, { useEffect, useState } from 'react';
import axios from 'axios'

interface Prov {
    id: number;
    name: string;
}
interface KabKota {
    id: number;
    province_id: number;
    name: string;
}

interface KabKotaDropProps {
    selectedProv: Prov;
    onSelectKabKota: (kabKota: KabKota) => void;
}

const KabKotaDrop: React.FC<KabKotaDropProps> = ({ selectedProv, onSelectKabKota }) => {
    const [kabKotaIdn, setKabKotaIdn] = useState<KabKota[]>([]);

    useEffect(() => {
        // Fetch data kab/kota dari API Statis
        axios.get<KabKota[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProv.id}.json`)
        .then((response) => setKabKotaIdn(response.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, [selectedProv]);

    return (
        <div className='bac'>
            <h2> Pilih Kab/Kota </h2>
        <select onChange={(e) => onSelectKabKota(kabKotaIdn.find((kabKota) => kabKota.name === e.target.value) || kabKotaIdn[0])}>
            <option value="">Pilih Kab/Kota</option>
            {kabKotaIdn.map((kabKota) => (
                <option key={kabKota.id} value={kabKota.name}>{kabKota.name}</option>
            ))}
        </select>
        </div>
    );
};

export default KabKotaDrop;