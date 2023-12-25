import React, { useState } from 'react';
import ProvDrop from './component/provinsi';
import KabKotaDrop from './component/kabKota';
import KecamatanDrop from './component/kecamatan';
import KelurahanDrop from './component/kelurahan';
import './App.css'

interface Provinsi {
  id: number;
  name: string;
}

interface KabKota {
  id: number;
  province_id: number;
  name: string;
}

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

const App: React.FC = () => {
  const [selectedProv, setSelectedProv] = useState<Provinsi | null>(null);
  const [selectedKabKota, setSelectedKabKota] = useState<KabKota | null>(null);
  const [selectedKecamatan, setSelectedKecamatan] = useState<Kecamatan | null>(null);
  const [, setSelectedKelurahan] = useState<Kelurahan | null>(null);
  
  const handleProvChange = (prov: Provinsi) => {
    setSelectedProv(prov);
    setSelectedKabKota(null); // Reset kab/kota saat ganti provinsi
    setSelectedKecamatan(null);
    setSelectedKelurahan(null);
  };

  const handleKabKotaChange = (kabKota: KabKota) => {
    setSelectedKabKota(kabKota);
    setSelectedKecamatan(null);
    setSelectedKelurahan(null);
  };

  const handleKecamatanChange = (kecamatan: Kecamatan) => {
    setSelectedKecamatan(kecamatan);
    setSelectedKelurahan(null);
  };
  
  const handleKelurahanChange = (kelurahan: Kelurahan) => {
    setSelectedKelurahan(kelurahan);
  };  

  return (
    <div >
      <h1>Data Wilayah Indonesia</h1> 
    <ProvDrop onSelectProv={handleProvChange} />      
    {selectedProv && (
      <KabKotaDrop selectedProv={selectedProv} onSelectKabKota={handleKabKotaChange} />
    )}      
    {selectedKabKota && (
      <KecamatanDrop selectedKabKot={selectedKabKota} onSelectKecamatan={handleKecamatanChange} />
    )}
    {selectedKecamatan && (
      <KelurahanDrop selectedKecamatan={selectedKecamatan} onSelectKelurahan={handleKelurahanChange} />
    )}
    </div>
  )
}

export default App
