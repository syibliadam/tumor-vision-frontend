import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('[ForgotPassword]', data);

      if (response.ok) {
        setMessage('✅ Link reset telah dikirim ke email Anda!');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 3000); // kasih waktu 3 detik
      } else {
        setMessage(data.message || '❌ Gagal mengirim link reset.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('[ForgotPassword Error]', error);
      setMessage('❌ Terjadi kesalahan saat menghubungi server.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-jakarta px-4">
      <div className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-center text-3xl font-bold leading-snug">
          Lupa Password? <br />
          <span className="text-yellow-500">Masukkan Email Anda</span>
        </h1>

        <p className="text-center text-gray-400 text-sm">Masukkan email yang terdaftar untuk menerima link reset password.</p>

        {message && <div className={`p-4 rounded-md text-sm font-medium ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{message}</div>}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input id="email" type="email" placeholder="Masukkan alamat email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-8 py-2 font-semibold text-black bg-yellow-500 rounded-md hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200 ease-in-out">
              Kirim Link Reset
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
            Kembali ke Login
          </Link>
        </div>
        <div className="text-center text-sm mt-2">
          <Link to="/" className="text-yellow-500 font-semibold hover:underline">
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
