import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gliomaImg from '../assets/glioma.png';
import HomeDiagnosis from '../assets/home-diagnosa.png';

function Loading() {
  const [progress, setProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && !isSubmitted) {
      setIsSubmitted(true);
    }
  }, [progress, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      handlePrediction();
    }
  }, [isSubmitted]);

  const handlePrediction = async () => {
    if (!file) {
      console.error('Tidak ada file untuk diprediksi.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Gagal memprediksi gambar');

      const result = await response.json();
      console.log('Prediksi:', result);
      navigate('/result', { state: { prediction: result } });
    } catch (error) {
      console.error('Error saat prediksi:', error);
      alert('Terjadi kesalahan saat melakukan prediksi.');
    }
  };

  return (
    <div className="bg-black min-h-screen font-plusjakartasans flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-24 px-4">
        <h1 className="text-white text-2xl mb-8 text-center">Mempermudah Diagnosis Tumor Otak dengan Teknologi AI</h1>
        <div className="bg-[#1D1D1D] w-full max-w-md h-[200px] rounded-xl flex flex-col justify-center items-center px-4">
          <div className="relative">
            <div className="w-28 h-28 border-[8px] border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-xl">{progress}%</div>
          </div>
          <h2 className="text-white mt-4 font-semibold">Mohon bersabar</h2>
          <p className="text-gray-400 text-sm text-center">File anda sedang diproses oleh AI</p>
        </div>
      </div>

      {/* Cara Kerja */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-3/5 text-[#969694] text-3xl md:text-6xl leading-tight font-semibold">
          Bagaimana cara kerja AI pada <span className="text-[#E5A00D]">TumorVision</span>
        </div>
        <div className="w-full lg:w-2/5 text-[#969694] text-base md:text-lg">Berikut adalah hasil diagnosis dari sistem, yang memberikan gambaran lebih jelas mengenai kemungkinan jenis tumor yang terdeteksi.</div>
      </section>

      {/* Step 1 */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 1 </div>
          <h2 className="text-[#969694] text-3xl md:text-5xl font-semibold">Unggah foto Penyakit anda kedalam website</h2>
          <p className="text-[#6D706F] text-base md:text-lg">Unggah foto MRI anda kedalam kotak yang telah tersedia dan biarkan AI kami bekerja untuk anda</p>
        </div>
        <div className="w-full lg:w-1/2 my-auto">
          <div className="bg-[#80808033] rounded-lg py-4 px-4">
            <div className="text-white w-fit mb-4 mx-auto text-sm font-semibold bg-[#E5A00D] px-10 py-4 rounded-2xl cursor-pointer hover:opacity-80">Unggah Foto</div>
            <h3 className="text-[#939393] text-sm text-center mb-6">Unggah foto penyakit disini</h3>
            <div className="flex flex-col md:flex-row w-full justify-center items-center border-white border-t pt-3 space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-[#939393] text-xs text-center md:text-left">
                Dapatkan Akurasi yang akurat <br /> dengan <span className="text-[#E5A00D] font-bold">TUMOR VISION</span>
              </div>
              <img src={HomeDiagnosis} alt="" className="w-24 h-24 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-[#1D1D1D] w-full max-w-md rounded-2xl p-6 flex flex-col justify-center items-center space-y-6 shadow-md">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="56" cy="56" r="50" stroke="#d1d5db" strokeWidth="6" fill="transparent" />
                <circle cx="56" cy="56" r="50" stroke="#E5A00D" strokeWidth="6" fill="transparent" strokeDasharray="314" strokeDashoffset="245" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#E5A00D] text-sm font-semibold">22%</div>
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-white text-2xl font-bold">Mohon Tunggu</h2>
              <p className="text-gray-400 text-sm">Foto anda sedang diproses oleh AI kami</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 2 </div>
          <h2 className="text-[#969694] text-3xl md:text-5xl font-semibold">Bersantai! Biarkan sistem kami bekerja untuk anda</h2>
          <p className="text-[#6D706F] text-base md:text-lg">AI kami akan bekerja secara cepat dan efisien untuk mendiagnosa penyakit Anda.</p>
        </div>
      </section>

      {/* Step 3 */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 3 </div>
          <h2 className="text-[#969694] text-3xl md:text-5xl font-semibold">Voila! Hasil dari penyakit anda akan muncul dan siap untuk anda baca</h2>
          <p className="text-[#6D706F] text-base md:text-lg">Anda akan mendapatkan detail dari penyakit anda dengan jelas dan akurat.</p>
        </div>
        <div className="w-full lg:w-1/2 bg-[#1e1e1e] rounded-3xl p-6 flex flex-col items-center space-y-6">
          <h2 className="text-xl font-bold text-[#E5A00D]">Hasil Diagnosa</h2>
          <div className="flex flex-col sm:flex-row items-start w-full gap-6">
            <img src={gliomaImg} alt="MRI Result" className="w-36 h-36 object-cover rounded-md" />
            <div className="flex flex-col w-full space-y-3 text-sm">
              {['Glioma', 'Meningioma', 'Pituitary', 'No tumor'].map((label, idx) => (
                <div className="text-white" key={label}>
                  <div className="flex justify-between">
                    <span>{label}:</span>
                    <span>{label === 'Pituitary' ? '100.00%' : '0.00%'}</span>
                  </div>
                  <div className={`h-[2px] mt-1 ${label === 'Pituitary' ? 'bg-[#E5A00D]' : 'bg-gray-400'}`}></div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white text-center text-sm mt-4">
            Confident: <span className="text-[#E5A00D] font-semibold">100.00%</span> on <span className="text-[#E5A00D] font-semibold">Pituitary</span>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Loading;
