import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function AdminQRCodePage() {

  const [qrUrl, setQrUrl] = useState('');
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH QR + DEBUG
  // =========================
  const fetchQR = async () => {
    try {
      setLoading(true);

      const url = 'http://127.0.0.1:8000/api/company-qr';

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob' // SVG
      });

      // 🔥 DEBUG 1: full response
      console.log("FULL RESPONSE:", res);

      // 🔥 DEBUG 2: headers
      console.log("HEADERS:", res.headers);

      // 🔥 DEBUG 3: blob data
      console.log("DATA TYPE:", res.data);
      console.log("BLOB SIZE:", res.data.size);

      const imageUrl = URL.createObjectURL(res.data);

      console.log("IMAGE URL:", imageUrl);

      setQrUrl(imageUrl);

    } catch (err) {
      // 🔥 DEBUG ERROR
      console.log("QR ERROR:", err);
      console.log("RESPONSE ERROR:", err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <h1 className="page-title">Company QR Code</h1>

      <div className="qr-actions">
        <button className="btn btn-primary" onClick={fetchQR}>
          Refresh QR
        </button>

        <button className="btn btn-secondary" onClick={() => window.print()}>
          Print QR
        </button>
      </div>
      </div>

      <div className="qr-page-content glass-panel">

        <div className="qr-scan-area"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300
          }}
        >

          {loading ? (
            <p>Loading...</p>
          ) : qrUrl ? (
            <img src={qrUrl} alt="QR" width={250} />
          ) : (
            <p>No QR</p>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminQRCodePage;