import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';

const SegmentationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/auth/segmentations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistory(data.segmentations || []);
    } catch (err) {
      console.error('Gagal ambil riwayat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (timestamp) => {
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
      fetchHistory();
    } catch (err) {
      alert('Gagal menghapus item.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <NavbarComponent />
      <h1 className="text-3xl font-bold mb-6">Riwayat Segmentasi</h1>
      {loading ? (
        <p>Memuat data...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-400">Belum ada riwayat segmentasi.</p>
      ) : (
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-yellow-400">
              <th>Waktu</th>
              <th>Nama File</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="bg-white text-black rounded shadow">
                <td className="p-4">{new Date(item.timestamp).toLocaleString()}</td>
                <td className="p-4">{item.filename || 'Tanpa nama'}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => navigate(`/segmentation-detail/${index}`, { state: { data: item } })} className="bg-[#E5A00D] text-white px-3 py-1 rounded hover:bg-yellow-500">
                    Lihat Hasil
                  </button>

                  <button onClick={() => handleDelete(item.timestamp)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SegmentationHistory;
