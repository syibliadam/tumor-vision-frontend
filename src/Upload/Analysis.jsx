import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomeDiagnosis from '../assets/home-diagnosa.png';
import gliomaImg from '../assets/glioma.png';

function Analysis() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (file && !allowedTypes.includes(file.type)) {
      setShowErrorPopup(true);
      e.target.value = null;
      return;
    }

    if (file) {
      console.log('File yang diunggah:', file.name);
      navigate('/loading', { state: { file: file } });
    }
  };

  return (
    <div className="bg-black pt-8 font-plusjakartasans">
      <Navbar />

      <h1 className="text-white text-3xl md:text-5xl w-full md:w-[70%] mx-auto text-center mt-24 px-4">Mempermudah Diagnosis Tumor Otak dengan Teknologi AI</h1>

      {/* Diagnosa Sekarang Section */}
      <section className="bg-[#80808033] mt-24 mx-4 md:mx-24 pt-6 pb-20 rounded-lg text-center">
        <h2 className="text-2xl md:text-4xl text-[#939393] font-bold mb-4">Diagnosa Sekarang</h2>
        <h3 className="w-full md:w-[60%] text-[#939393] text-sm mx-auto mb-10">Unggah Foto penyakit anda ke dalam kotak dan dapatkan informasi penyakit tersebut</h3>

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

        <div onClick={handleButtonClick} className="text-white w-fit mb-4 mx-auto text-sm font-semibold bg-[#E5A00D] px-10 py-4 rounded-2xl cursor-pointer hover:opacity-80">
          Unggah Foto
        </div>

        <h3 className="w-full md:w-[60%] text-[#939393] text-sm mx-auto mb-6">Unggah foto penyakit disini</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-white border-t pt-3 w-full md:w-[60%] mx-auto">
          <div className="text-[#939393] text-sm text-center md:text-left">
            Dapatkan Akurasi yang akurat <br /> dengan <span className="text-[#E5A00D] font-bold">TUMOR VISION</span>
          </div>
          <img src={HomeDiagnosis} alt="Diagnosis" className="w-full max-w-xs" />
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section className="flex flex-col md:flex-row mx-4 md:mx-24 mt-24 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-[60%] text-[#969694] text-3xl md:text-6xl">
          Bagaimana cara kerja AI pada <span className="text-[#E5A00D]">TumorVision</span>
        </div>
        <div className="w-full md:w-[40%] text-[#969694] text-base md:text-lg">Berikut adalah hasil diagnosis dari sistem, yang memberikan gambaran lebih jelas mengenai kemungkinan jenis tumor yang terdeteksi.</div>
      </section>

      {/* Step 1 */}
      <section className="flex flex-col md:flex-row mx-4 md:mx-24 mt-24 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-[50%] space-y-4">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 1 </div>
          <h2 className="text-[#969694] text-2xl md:text-5xl font-semibold">Unggah foto Penyakit anda kedalam website</h2>
          <p className="text-[#6D706F] text-base md:text-lg">Unggah foto MRI anda kedalam kotak yang telah tersedia dan biarkan AI kami bekerja untuk anda</p>
        </div>
        <div className="w-full md:w-[50%] my-auto">
          <div className="bg-[#80808033] rounded-lg py-4">
            <div className="text-white w-fit mb-4 mx-auto text-sm font-semibold bg-[#E5A00D] px-10 py-4 rounded-2xl cursor-pointer hover:opacity-80">Unggah Foto</div>
            <h3 className="text-[#939393] text-sm mx-auto text-center mb-6">Unggah foto penyakit disini</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 border-white border-t pt-3 w-full md:w-[70%] mx-auto">
              <div className="text-[#939393] text-xs text-center md:text-left">
                Dapatkan Akurasi yang akurat <br /> dengan <span className="text-[#E5A00D] font-bold">TUMOR VISION</span>
              </div>
              <img src={HomeDiagnosis} alt="" className="w-full max-w-xs" />
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="flex flex-col md:flex-row mx-4 md:mx-24 mt-24 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-[50%] flex justify-center">
          <div className="bg-[#1D1D1D] w-full max-w-sm rounded-2xl p-6 flex flex-col justify-center items-center space-y-6 shadow-md">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="56" cy="56" r="50" stroke="#d1d5db" strokeWidth="6" fill="transparent" />
                <circle cx="56" cy="56" r="50" stroke="#E5A00D" strokeWidth="6" fill="transparent" strokeDasharray="314" strokeDashoffset="245" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[#E5A00D] text-sm font-semibold">22%</div>
            </div>
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold">Mohon bersabar</h2>
              <p className="text-gray-400 text-sm">Foto anda sedang diproses oleh AI kami</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] space-y-4 my-auto">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 2 </div>
          <h2 className="text-[#969694] text-2xl md:text-5xl font-semibold">Bersantai! Biarkan sistem kami bekerja untuk anda</h2>
          <p className="text-[#6D706F] text-base md:text-lg">AI kami akan bekerja secara cepat dan efisien untuk mendianogsa penyakit Anda.</p>
        </div>
      </section>

      {/* Step 3 */}
      <section className="flex flex-col md:flex-row mx-4 md:mx-24 mt-24 space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-[50%] space-y-4 my-auto">
          <div className="bg-[#FFF3F0] text-[#FF7B54] w-fit p-1 rounded-md">STEP 3 </div>
          <h2 className="text-[#969694] text-2xl md:text-5xl font-semibold">Voila! Hasil dari penyakit anda akan muncul dan siap untuk anda baca</h2>
          <p className="text-[#6D706F] text-base md:text-lg">Anda akan mendapatkan detail dari penyakit anda dengan jelas dan akurat.</p>
        </div>
        <div className="w-full md:w-1/2 max-w-lg bg-[#1e1e1e] rounded-3xl p-8 flex flex-col items-center space-y-6">
          <h2 className="text-xl font-bold text-[#E5A00D]">Hasil Diagnosa</h2>
          <div className="flex flex-col sm:flex-row items-start w-full gap-6">
            <img src={gliomaImg} alt="MRI Result" className="w-36 h-36 object-cover rounded-md" />
            <div className="flex flex-col w-full space-y-3 text-sm">
              <div className="text-white">
                <div className="flex justify-between">
                  <span>Glioma:</span>
                  <span>0.00%</span>
                </div>
                <div className="h-[2px] bg-gray-400 mt-1"></div>
              </div>
              <div className="text-white">
                <div className="flex justify-between">
                  <span>Meningioma:</span>
                  <span>0.00%</span>
                </div>
                <div className="h-[2px] bg-gray-400 mt-1"></div>
              </div>
              <div className="text-white">
                <div className="flex justify-between">
                  <span>Pituitary:</span>
                  <span>100.00%</span>
                </div>
                <div className="h-[2px] bg-[#E5A00D] mt-1"></div>
              </div>
              <div className="text-white">
                <div className="flex justify-between">
                  <span>No tumor:</span>
                  <span>0.00%</span>
                </div>
                <div className="h-[2px] bg-gray-400 mt-1"></div>
              </div>
            </div>
          </div>
          <p className="text-white text-center text-sm mt-4">
            Confident: <span className="text-[#E5A00D] font-semibold">100.00%</span> on <span className="text-[#E5A00D] font-semibold">Pituitary</span>
          </p>
        </div>
      </section>

      <Footer />
      {showErrorPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div
            className="bg-white px-8 py-6 rounded-xl shadow-2xl text-center w-[90vw] max-w-md border-2 border-red-500
      animate-popupAppear"
          >
            <h2 className="text-2xl font-bold mb-3 text-red-600">File Tidak Didukung</h2>
            <p className="text-gray-700 text-base mb-5">Hanya file JPG atau PNG yang diperbolehkan.</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 text-base font-semibold" onClick={() => setShowErrorPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;
