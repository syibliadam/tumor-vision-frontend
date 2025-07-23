import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LogoTumorVision from '../assets/register-icon.png';
import Gybran from '../assets/dev1.png';
import Syibli from '../assets/dev2.png';
import Rizky from '../assets/dev3.png';

function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20">
        <div className="flex-1 text-center md:text-left" data-aos="fade-right">
          <h1 className="text-5xl font-bold leading-tight">
            Diagnosis Tumor Otak Lebih Cerdas
            <br /> dengan Teknologi AI
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl">Gunakan kekuatan AI untuk membantu deteksi dini tumor otak melalui citra MRI. Solusi cepat, akurat, dan mendukung keputusan medis.</p>
          <button onClick={handleStart} className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded font-semibold inline-flex items-center">
            Get Started <ArrowRightCircle className="ml-2" size={20} />
          </button>
        </div>
        <div className="flex-1 mt-10 md:mt-0 flex justify-center" data-aos="fade-left">
          <img src={LogoTumorVision} alt="Logo Tumor Vision" className="rounded-xl max-w-md w-full" />
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-black py-16 px-8 md:px-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Mengapa Memilih Tumor Vision?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border border-yellow-500/20 transition transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
            <h3 className="text-xl font-bold mb-2">Diagnosis Cepat</h3>
            <p className="text-gray-400">Prediksi jenis tumor hanya dalam hitungan detik melalui AI canggih kami.</p>
          </div>
          <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border border-yellow-500/20 transition transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
            <h3 className="text-xl font-bold mb-2">Akurasi Tinggi</h3>
            <p className="text-gray-400">Model deep learning kami telah divalidasi menggunakan ribuan data MRI asli.</p>
          </div>
          <div className="bg-[#1a1a1a] text-white p-6 rounded-xl border border-yellow-500/20 transition transform hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10">
            <h3 className="text-xl font-bold mb-2">Gratis & Mudah</h3>
            <p className="text-gray-400">Tidak perlu instalasi. Cukup unggah gambar MRI dan dapatkan hasilnya.</p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="bg-black py-16 px-8 md:px-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8">Tim Pengembang</h2>
        <div className="flex flex-wrap justify-center gap-10">
          <div className="text-center">
            <img src={Gybran} alt="Gybran" className="w-32 h-32 rounded-full object-cover object-top mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Gybran</h4>
            <p className="text-gray-400">AI Engineer</p>
          </div>
          <div className="text-center">
            <img src={Syibli} alt="Syibli" className="w-32 h-32 rounded-full object-cover object-top mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Syibli</h4>
            <p className="text-gray-400">Frontend Developer</p>
          </div>
          <div className="text-center">
            <img src={Rizky} alt="Rizky" className="w-32 h-32 rounded-full object-cover object-top mx-auto mb-2" />
            <h4 className="font-semibold text-lg">Rizky</h4>
            <p className="text-gray-400">Backend Developer</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 border-t border-gray-700">&copy; 2025 Tumor Vision. All rights reserved.</footer>
    </div>
  );
}

export default LandingPage;
