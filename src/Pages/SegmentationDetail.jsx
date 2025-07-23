import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';

const SegmentationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  useEffect(() => {
    if (!data) navigate('/segmentation-history');
  }, [data, navigate]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <NavbarComponent />
      <h1 className="text-3xl font-bold mb-4">Detail Segmentasi</h1>
      <p className="mb-10">Waktu: {new Date(data.timestamp).toLocaleString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Gambar Input</h2>
          <img src={`data:image/png;base64,${data.input}`} alt="Input" className="rounded-lg border border-gray-700 shadow-lg mx-auto w-full max-w-[512px]" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Hasil Segmentasi</h2>
          <img src={`data:image/png;base64,${data.output}`} alt="Output" className="rounded-lg border border-green-500 shadow-lg mx-auto w-full max-w-[512px]" />
        </div>
      </div>

      <div className="mt-10 text-center">
        <button onClick={() => navigate(-1)} className="bg-[#E5A00D] px-6 py-2 rounded-full text-white font-semibold hover:bg-yellow-500">
          Kembali
        </button>
      </div>
    </div>
  );
};

export default SegmentationDetail;
