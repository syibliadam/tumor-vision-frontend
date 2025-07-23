import React, { useEffect, useState } from 'react';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [classificationHistory, setClassificationHistory] = useState([]);
  const [segmentationHistory, setSegmentationHistory] = useState([]);
  const navigate = useNavigate();

  const handleDeleteSegmentation = async (timestamp) => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:5000/auth/segmentations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ timestamp }),
      });
      fetchSegmentations();
    } catch (err) {
      alert('Gagal menghapus item.');
    }
  };

  const fetchSegmentations = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/auth/segmentations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.segmentations) {
        const formatted = data.segmentations.map((item) => ({
          timestamp: item.timestamp,
          inputUrl: `data:image/png;base64,${item.input}`,
          segmentedUrl: `data:image/png;base64,${item.output}`,
          filename: item.filename || 'Tanpa nama',
        }));
        setSegmentationHistory(formatted);
      }
    } catch (err) {
      console.error('Gagal ambil segmentasi:', err);
    }
  };

  useEffect(() => {
    const fetchedClassification = [
      {
        result: 'Glioma',
        confidence: '100.00%',
        filename: 'glioma_test.jpg',
        timestamp: '2025-05-11T16:45:53',
      },
      {
        result: 'Pituitary',
        confidence: '100.00%',
        filename: 'pit_test.jpg',
        timestamp: '2025-05-11T16:46:11',
      },
    ];
    setClassificationHistory(fetchedClassification);
    fetchSegmentations();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <NavbarComponent />
      <div className="pt-24 px-6 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#E5A00D]">Riwayat Diagnosa</h1>
        <p className="text-center text-gray-400 mt-2 mb-10">Berikut adalah hasil klasifikasi dan segmentasi Anda.</p>

        {/* === KLASIFIKASI === */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Riwayat Klasifikasi</h2>
          <ClassificationTable data={classificationHistory} onDelete={() => {}} />
        </section>

        {/* === SEGMENTASI === */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Riwayat Segmentasi</h2>
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-yellow-400">
                <th>Waktu</th>
                <th>Nama File</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {segmentationHistory.map((item, index) => (
                <tr key={index} className="bg-white text-black rounded shadow">
                  <td className="p-4">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="p-4">{item.filename}</td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => navigate(`/segmentation-detail/${index}`, { state: { data: item } })} className="bg-[#E5A00D] text-white px-3 py-1 rounded hover:bg-yellow-500">
                      Lihat Hasil
                    </button>
                    <button onClick={() => handleDeleteSegmentation(item.timestamp)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
