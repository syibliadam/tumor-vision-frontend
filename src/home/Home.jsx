import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../assets/home-herosection.png';
import HomeRepeat from '../assets/home-repeat-icon.png';
import HomeGlobe from '../assets/home-globe-icon.png';
import gliomaImg from '../assets/glioma.png';
import meningiomaImg from '../assets/meningioma.png';
import notumorImg from '../assets/Notumor.png';
import pituitaryImg from '../assets/pituary.png';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion } from 'framer-motion'; //
import { Typewriter } from 'react-simple-typewriter';
import { FaBullseye } from 'react-icons/fa'; // Hasil Tepat
import { FiActivity } from 'react-icons/fi'; // Proses Lancar
import { HiOutlineLightBulb } from 'react-icons/hi'; // Dukung Keputusan

function Home() {
  const [showDescription, setShowDescription] = React.useState(false);
  const [showResultSection, setShowResultSection] = React.useState(false);

  // Definisikan varian animasi item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 12.5 + i * 0.3,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };
  // Di dalam komponen Home, sebelum return:
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 14.5 + i * 0.4, // delay bertahap
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const tumorData = [
    {
      name: 'Glioma',
      prediction: 'Glioma',
      cancerous: 'Yes',
      symptoms: 'Frequent Headaches, Seizures, Nausea, Vomiting, Blurred Vision, Memory Loss, Difficulty Speaking, Weakness in Limbs, Loss of Balance.',
      image: gliomaImg,
    },
    {
      name: 'Meningioma',
      prediction: 'Meningioma',
      cancerous: 'Mostly No (can be atypical/malignant)',
      symptoms: 'Headaches, vision problems, hearing loss, seizures, changes in behavior or personality, memory loss.',
      image: meningiomaImg,
    },
    {
      name: 'Notumor',
      prediction: 'Notumor',
      cancerous: 'No',
      symptoms: 'None. The model did not detect any abnormal brain tumor signs in this MRI scan. The brain structure appears normal.',
      image: notumorImg,
    },
    {
      name: 'Pituitary',
      prediction: 'Pituitary',
      cancerous: 'Rarely (mostly benign)',
      symptoms: 'Vision problems, hormonal imbalance, unexplained weight changes, fatigue, headaches, mood swings.',
      image: pituitaryImg,
    },
  ];

  const [showCards, setShowCards] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowCards(true); // muncul setelah teks selesai
    }, 6500); // sesuaikan dengan durasi Typewriter (misal 6.5 detik)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black pt-8">
      <Navbar />

      {/* Hero Section */}
      <section className="mt-12 flex flex-col md:flex-row px-4 md:px-12 gap-8 items-center">
        {/* Gambar dengan animasi slide dari atas */}
        <motion.div className="w-full md:w-[35%]" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <img src={HeroSection} alt="Hero" className="w-full object-contain" />
        </motion.div>

        {/* Teks dan tombol dengan animasi fade + delay bertahap */}
        <motion.div className="w-full md:w-[65%] text-white space-y-6 text-center md:text-left" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          {/* Judul muncul dulu */}
          <motion.h1 className="text-3xl md:text-5xl font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}>
            <Typewriter words={['Membantu Diagnosis Tumor Otak dengan Teknologi AI']} cursor cursorStyle="_" typeSpeed={40} deleteSpeed={0} delaySpeed={3000} loop={1} />
          </motion.h1>
          {/* Paragraf muncul SETELAH judul selesai */}
          <motion.p
            className="text-base md:text-lg font-thin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.2 }} // ⬅️ delay dimulai setelah animasi judul selesai
          >
            <Typewriter
              words={[
                'Teknologi ini menggunakan algoritma kecerdasan buatan (AI) untuk membantu dalam pencitraan medis dan diagnosis tumor otak. Dengan AI, proses identifikasi bisa lebih cepat dan mendukung dokter dalam mengambil keputusan yang lebih tepat.',
              ]}
              typeSpeed={20}
              deleteSpeed={0}
              delaySpeed={1000}
              cursor
              cursorStyle="_"
              loop={1}
            />
          </motion.p>

          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 8.5 }} // ⬅️ delay disesuaikan
          >
            <Link to={localStorage.getItem('token') ? '/analysis' : '/login'} className="bg-[#E5A00D] w-fit px-5 py-3 text-xs font-semibold rounded-md cursor-pointer hover:bg-yellow-400 transition">
              Coba Sekarang
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Result Section */}
      <motion.section className="mt-24 flex flex-col md:flex-row justify-center items-center gap-16 px-4 md:px-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 9.5 }}>
        <div className="w-full md:w-1/2 text-white space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Hasil Deteksi Tumor Otak Anda</h1>
          <p className="text-base md:text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">Berikut adalah hasil diagnosis dari sistem, yang memberikan gambaran lebih jelas mengenai kemungkinan jenis tumor yang terdeteksi.</p>
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
      </motion.section>

      {/* Jenis Tumor Section */}
      <motion.section className="mt-24 px-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 12 }}>
        <h2 className="text-white text-center text-3xl md:text-5xl font-semibold">Jenis Tumor</h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto w-fit">
          {tumorData.map((tumor, index) => (
            <motion.div key={tumor.name} className="flex flex-col sm:flex-row gap-6 bg-neutral-800/90 rounded-3xl p-6 shadow-lg max-w-xl" custom={index} variants={itemVariants} initial="hidden" animate="visible">
              <img src={tumor.image} alt={tumor.name} className="w-40 h-40 object-cover rounded-xl" />
              <div className="text-neutral-200 text-sm leading-relaxed space-y-1">
                <h3 className="text-amber-400 text-2xl font-semibold mb-2">{tumor.name}</h3>
                <p>
                  <span className="text-gray-400">Model Prediction: </span>
                  <span className="text-white">{tumor.prediction}</span>
                </p>
                <p>
                  <span className="text-gray-400">Cancerous: </span>
                  <span className="text-white">{tumor.cancerous}</span>
                </p>
                <p>
                  <span className="text-gray-400">Symptoms: </span>
                  <span className="text-white">{tumor.symptoms}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Card Section */}
      <section className="mt-24 px-4">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 13 }}>
          <h1 className="text-white text-center text-xl md:text-2xl w-full md:w-[60%] mx-auto">
            Teknologi ini menggunakan algoritma kecerdasan buatan (AI) untuk membantu dalam pencitraan medis dan diagnosis tumor otak. Dengan AI, proses identifikasi bisa lebih cepat dan mendukung dokter dalam mengambil keputusan yang lebih
            tepat.
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {[
            {
              title: 'Hasil Tepat',
              icon: <FaBullseye className="text-white w-6 h-6" />,
              desc: 'Dengan bantuan AI, proses analisis gambar medis jadi lebih sederhana dan cepat. Hasil bisa langsung diperoleh tanpa harus menunggu lama, sehingga pengguna maupun dokter bisa segera mengambil langkah selanjutnya.',
            },
            {
              title: 'Proses Lancar',
              icon: <FiActivity className="text-white w-6 h-6" />,
              desc: 'Teknologi ini dirancang untuk mempermudah proses analisis. Tanpa perlu menunggu lama, hasil bisa langsung keluar dan mempersingkat waktu diagnosis, sehingga perawatan bisa segera dilakukan bila diperlukan.',
            },
            {
              title: 'Dukung Keputusan',
              icon: <HiOutlineLightBulb className="text-white w-6 h-6" />,
              desc: 'AI bekerja sebagai alat bantu bagi tenaga medis, bukan sebagai pengganti. Sistem ini membantu memberikan gambaran awal agar dokter bisa mengambil keputusan dengan lebih percaya diri dan tepat.',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              className="bg-[#8080803D] p-4 rounded-md transform transition duration-300 hover:rotate-1 hover:scale-105 hover:shadow-lg cursor-pointer w-[90%] sm:w-[320px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 13.5 + i * 0.3, duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                {card.icon}
                <h2 className="text-xl md:text-2xl text-[#E5A00D] font-bold">{card.title}</h2>
              </div>
              <p className="text-sm text-white text-justify">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.div
        className="bg-black flex items-start py-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 15.5 }} // ⬅️ muncul setelah Card Section
      >
        <section className="w-full px-4">
          <div className="bg-[#1e1e1e] rounded-3xl py-14 px-6 max-w-[700px] mx-auto flex flex-col items-center space-y-4 shadow-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 text-center">Diagnosa Sekarang</h2>
            <p className="text-gray-500 text-center text-sm max-w-md leading-relaxed">Unggah Foto penyakit anda ke dalam kotak dan dapatkan informasi penyakit tersebut</p>

            <Link to={localStorage.getItem('token') ? '/analysis' : '/login'} className="bg-[#E5A00D] hover:bg-yellow-400 text-white font-semibold py-2 px-10 rounded-lg shadow-md transition text-sm mt-5 cursor-pointer">
              Unggah Foto
            </Link>

            <p className="text-gray-500 text-xs mt-2">Unggah Foto Penyakit anda disini</p>

            <div className="w-full flex justify-center mt-3">
              <div className="border-t border-white w-[170px]"></div>
            </div>

            <div className="flex flex-col items-center space-y-2 mt-2">
              <p className="text-gray-500 text-[11px] text-center">
                Dapatkan Akurasi yang akurat <br />
                dengan <span className="text-[#E5A00D] font-semibold">TUMOR VISION</span>
              </p>
              <div className="flex gap-1 mt-2">
                <img src={gliomaImg} alt="Glioma" className="w-8 h-8 object-cover rounded-md" />
                <img src={meningiomaImg} alt="Meningioma" className="w-8 h-8 object-cover rounded-md" />
                <img src={notumorImg} alt="No Tumor" className="w-8 h-8 object-cover rounded-md" />
                <img src={pituitaryImg} alt="Pituitary" className="w-8 h-8 object-cover rounded-md" />
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
