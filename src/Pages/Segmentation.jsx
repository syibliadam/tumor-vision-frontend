import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../components/Navbar';

const Segmentation = () => {
  const [inputImage, setInputImage] = useState(null);
  const [previewInput, setPreviewInput] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewInput(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!inputImage) return alert('Mohon pilih gambar terlebih dahulu.');
    setLoading(true);

    const formData = new FormData();
    formData.append('image', inputImage);

    try {
      const res = await fetch('http://localhost:5000/segment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: formData,
      });

      const blob = await res.blob();
      const outputUrl = URL.createObjectURL(blob);
      setOutputImage(outputUrl);
    } catch (err) {
      console.error('Segmentasi gagal:', err);
      alert('Gagal memproses gambar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarComponent />

      <div className="px-4 md:px-10 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Proses <span className="text-[#E5A00D]">Segmentasi Tumor</span> Otak
          </h1>
          <p className="text-gray-400 mt-2">Upload gambar MRI otak dan dapatkan visualisasi hasil segmentasi menggunakan model deep learning.</p>
        </div>

        <div className="flex flex-col items-center space-y-6 mb-6">
          <input type="file" accept="image/*" onChange={handleImageChange} className="file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#E5A00D] file:text-white hover:file:bg-yellow-500" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start justify-center">
          {/* Gambar Input */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Gambar Input</h2>
            {previewInput ? (
              <img src={previewInput} alt="Input MRI" className="rounded-lg border border-gray-700 shadow-lg mx-auto w-[256px] h-auto" />
            ) : (
              <div className="w-[256px] h-[256px] bg-gray-800 flex items-center justify-center rounded-lg text-gray-500 mx-auto">Belum ada gambar</div>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col items-center space-y-4">
            <button onClick={handleSubmit} className="bg-[#E5A00D] text-white px-6 py-2 rounded-full font-semibold" disabled={loading}>
              {loading ? 'Memproses...' : 'Proses Segmentasi'}
            </button>

            <button onClick={() => navigate('/segmentation-history')} className="bg-[#E5A00D] px-6 py-2 rounded-full text-white font-semibold hover:bg-yellow-500">
              Cek History Segmentasi
            </button>
          </div>

          {/* Hasil Segmentasi */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Hasil Segmentasi</h2>
            {outputImage ? (
              <img src={outputImage} alt="Segmented Output" className="rounded-lg border border-green-500 shadow-lg mx-auto w-[256px] h-auto" />
            ) : (
              <div className="w-[256px] h-[256px] bg-gray-800 flex items-center justify-center rounded-lg text-gray-500 mx-auto">Belum ada hasil</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Segmentation;
