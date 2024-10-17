// app/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  message: string;
  isSuccess: boolean; // Başarı durumunu belirten yeni prop
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, isSuccess, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal ${isSuccess ? 'success' : 'error'}`}>
        <h2 className="modal-title">{isSuccess ? 'Başarılı' : 'Hata'}</h2>
        <p>{message}</p>
        <button onClick={onClose} className="custom">Kapat</button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          width: 300px;
          color: white; /* Varsayılan metin rengi beyaz */
        }

        .success {
          background: #28a745; /* Yeşil arka plan */
        }

        .error {
          background: #dc3545; /* Kırmızı arka plan */
        }

        .modal-title {
          font-weight: bold; /* Başarılı ve Hata ifadelerini kalın yap */
        }

        .custom {
          width: 150px;
          background-color: #f8f9fa; /* Beyaz arka plan */
          color: black; /* Siyah metin rengi */
          border: none;
          padding: 10px;
          cursor: pointer;
          border-radius: 20px; /* Border radius ayarı */
          font-weight: bold; /* Bold metin */
          margin-top: 20px; /* Kapat butonunun üstünde mesafe */
        }

        button:hover {
          background-color: #e2e6ea; /* Hover durumu */
        }
      `}</style>
    </div>
  );
};

export default Modal;
