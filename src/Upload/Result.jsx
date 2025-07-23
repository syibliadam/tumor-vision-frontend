import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gliomaImg from '../assets/glioma.png';
import meningiomaImg from '../assets/meningioma.png';
import pituitaryImg from '../assets/pituary.png';
import notumorImg from '../assets/Notumor.png';
import HomeDiagnosis from '../assets/home-diagnosa.png';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const prediction = location.state?.prediction;

  const [gradcamImage, setGradcamImage] = useState(null);

  useEffect(() => {
    if (prediction?.gradcam) {
      setGradcamImage(`data:image/jpeg;base64,${prediction.gradcam}`);
    }
  }, [prediction]);

  const labelMapping = {
    0: { label: 'Meningioma', image: meningiomaImg },
    1: { label: 'Glioma', image: gliomaImg },
    2: { label: 'Pituitary', image: pituitaryImg },
    3: { label: 'No Tumor', image: notumorImg },
  };

  const predictedData = labelMapping[prediction?.class_index] || { label: 'Tidak diketahui', image: notumorImg };
  const confidence = prediction?.confidence || '0%';

  const allClasses = [
    { label: 'Meningioma', confidence: prediction?.class_index === 0 ? confidence : '0%' },
    { label: 'Glioma', confidence: prediction?.class_index === 1 ? confidence : '0%' },
    { label: 'Pituitary', confidence: prediction?.class_index === 2 ? confidence : '0%' },
  ];

  return (
    <div className="bg-black pt-8 font-plusjakartasans min-h-screen">
      <Navbar />

      <h1 className="text-white text-3xl md:text-5xl w-[90%] md:w-[50%] mx-auto text-center mt-24">Mempermudah Diagnosis Tumor Otak dengan Teknologi AI</h1>

      <section className="bg-[#1D1D1D] mt-16 px-4 md:px-16 py-10 rounded-lg mx-4 md:mx-24">
        <h2 className="text-3xl md:text-4xl text-[#E5A00D] text-center font-bold mb-4">Hasil Diagnosis</h2>
        <h3 className="text-[#939393] text-sm text-center mb-10">Berikut hasil analisis AI berdasarkan gambar yang anda unggah</h3>
        {/* Gambar Asli & Grad-CAM Side by Side */}
        {prediction?.image_url && prediction?.gradcam && (
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 my-8">
            {/* Gambar Asli */}
            <div className="flex flex-col items-center">
              <h4 className="text-white text-sm mb-2">Gambar Asli</h4>
              <img src={prediction.image_url} alt="Gambar Asli" className="w-64 h-64 object-cover rounded-md border border-gray-500" />
            </div>

            {/* Grad-CAM */}
            <div className="flex flex-col items-center">
              <h4 className="text-white text-sm mb-2">Grad-CAM Overlay</h4>
              <img src={`data:image/jpeg;base64,${prediction.gradcam}`} alt="Grad-CAM" className="w-64 h-64 object-cover rounded-md border border-yellow-500" />
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row w-full mx-auto items-center bg-[#2B2B2B] rounded-lg p-4 md:p-8 space-y-6 lg:space-y-0 lg:space-x-8">
          <img src={gradcamImage || predictedData.image} alt="Hasil Diagnosis" className="w-64 h-64 object-cover rounded-md border border-gray-500" />

          <div className="flex-1 text-white w-full">
            <h3 className="text-[#E5A00D] text-2xl font-bold mb-6 text-center">Hasil Diagnosis</h3>

            {allClasses.map((item, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1 text-sm">
                  <span>{item.label}:</span>
                  <span>{item.confidence}</span>
                </div>
                <div className="w-full bg-gray-400 h-[2px] rounded-full">
                  <div className="bg-yellow-400 h-[2px] rounded-full" style={{ width: item.confidence }}></div>
                </div>
              </div>
            ))}

            <div className="text-center mt-2">
              <button onClick={() => navigate('/history/classification')} className="px-5 py-2 bg-yellow-500 text-grey font-semibold rounded-md hover:bg-yellow-400 transition-all shadow-md">
                Cek History
              </button>
            </div>

            <div className="text-sm text-right text-white mt-4">
              File: <span className="font-medium text-[#E5A00D]">{prediction?.filename || '-'}</span>
              Confident: <span className="text-[#E5A00D] font-bold">{confidence}</span> on <span className="text-[#E5A00D] font-bold">{predictedData.label}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Cara Kerja */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-3/5 text-[#969694] text-3xl md:text-6xl font-semibold">
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
        <div className="w-full lg:w-1/2">
          <div className="bg-[#80808033] rounded-lg py-4 px-4">
            <div className="text-white w-fit mb-4 mx-auto text-sm font-semibold bg-[#E5A00D] px-10 py-4 rounded-2xl cursor-pointer hover:opacity-80">Unggah Foto</div>
            <h3 className="w-full text-[#939393] text-sm mx-auto text-center mb-6">Unggah foto penyakit disini</h3>
            <div className="flex flex-col md:flex-row w-full justify-center items-center border-white border-t pt-3 space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-[#939393] text-xs text-center md:text-left">
                Dapatkan Akurasi yang akurat <br /> dengan <span className="text-[#E5A00D] font-bold">TUMOR VISION</span>
              </div>
              <img src={HomeDiagnosis} alt="" className="w-32 h-32 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="flex flex-col lg:flex-row px-4 md:px-24 mt-20 space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-[#1D1D1D] w-full max-w-md h-auto rounded-2xl p-6 flex flex-col justify-center items-center space-y-6 shadow-md">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="56" cy="56" r="50" stroke="#d1d5db" strokeWidth="6" fill="transparent" />
                <circle cx="56" cy="56" r="50" stroke="#E5A00D" strokeWidth="6" fill="transparent" strokeDasharray="314" strokeDashoffset="245" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#E5A00D] text-sm font-semibold">22%</div>
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-white text-2xl font-bold">Mohon bersabar</h2>
              <p className="text-gray-400 text-sm">Foto anda sedang diproses oleh AI kami</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 2 </div>
          <h2 className="text-c[#969694] text-3xl md:text-5xl font-semibold">Bersantai! Biarkan sistem kami bekerja untuk anda</h2>
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
                    <span>{label === predictedData.label ? confidence : '0.00%'}</span>
                  </div>
                  <div className={`h-[2px] mt-1 ${label === predictedData.label ? 'bg-[#E5A00D]' : 'bg-gray-400'}`}></div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white text-center text-sm mt-4">
            Confident: <span className="text-[#E5A00D] font-semibold">{confidence}</span> on <span className="text-[#E5A00D] font-semibold">{predictedData.label}</span>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Result;
