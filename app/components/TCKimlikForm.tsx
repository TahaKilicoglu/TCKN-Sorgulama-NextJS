"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Modal from './Modal'; // Modal bileşenini içe aktar

const TCKimlikForm: React.FC = () => {
  const [tcKimlikNo, setTCKimlikNo] = useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [dogumYili, setDogumYili] = useState('');
  const [sonuc, setSonuc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu
  const [isSuccess, setIsSuccess] = useState(false); // Başarı durumu

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ws="http://tckimlik.nvi.gov.tr/WS">
        <soap:Header/>
        <soap:Body>
          <ws:TCKimlikNoDogrula>
            <ws:TCKimlikNo>${tcKimlikNo}</ws:TCKimlikNo>
            <ws:Ad>${ad}</ws:Ad>
            <ws:Soyad>${soyad}</ws:Soyad>
            <ws:DogumYili>${dogumYili}</ws:DogumYili>
          </ws:TCKimlikNoDogrula>
        </soap:Body>
      </soap:Envelope>`;

    try {
      const response = await axios.post('/api/kps', soapRequest, {
        headers: {
          'Content-Type': 'application/soap+xml; charset=utf-8',
          'SOAPAction': 'http://tckimlik.nvi.gov.tr/WS/TCKimlikNoDogrula',
        },
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const result = xmlDoc.getElementsByTagName('TCKimlikNoDogrulaResult')[0].textContent;

      setIsSuccess(result === 'true'); // Başarı durumunu ayarla
      setSonuc(result === 'true' ? 'Kimlik numarası doğrulandı!' : 'Kimlik numarası doğrulanamadı.');
      setIsModalOpen(true); // Modali aç

    } catch (error) {
      console.error('Hata:', error);
      setIsSuccess(false); // Başarı durumu false
      setSonuc('Bir hata oluştu.');
      setIsModalOpen(true); // Modali aç
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <div className="form-container">
        <Image 
          src="/img/logo.png" 
          alt="Logo" 
          width={180} 
          height={200} 
          priority 
        />
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="T.C. Kimlik No"
            value={tcKimlikNo}
            onChange={(e) => setTCKimlikNo(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Ad"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Soyad"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Doğum Yılı"
            value={dogumYili}
            onChange={(e) => setDogumYili(e.target.value)}
            required
          />
          <button type="submit" className="mt-3 btn btn-light rounded-pill custom">Doğrula</button>
        </form>
      </div>

      {/* Modalı burada kullanıyoruz */}
      <Modal 
        isOpen={isModalOpen} 
        message={sonuc} 
        isSuccess={isSuccess} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default TCKimlikForm;
