import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 403) {
        setMessage('Akun belum diverifikasi. Silakan cek email Anda untuk verifikasi.');
        setMessageType('error');
      } else if (response.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login berhasil!');
        setMessageType('success');
        setTimeout(() => navigate('/home'), 2000);
      } else {
        setMessage(data.message || 'Login gagal.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan saat menghubungi server.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-jakarta px-4">
      <div className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-center text-3xl font-bold leading-snug">
          Selamat Datang di Website <br />
          <span className="text-yellow-500">Tumor Vision!</span>
        </h1>

        <p className="text-center text-gray-400 text-sm">Daftarkan Akun sekarang juga untuk menikmati fitur kami!</p>

        {message && (
          <div className={`p-4 rounded-md text-sm ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} relative`}>
            {message}
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setMessage('')}>
              ×
            </span>
          </div>
        )}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Username
            </label>
            <input id="name" type="text" placeholder="Masukan Username" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-8 py-2 font-semibold text-black bg-yellow-500 rounded-md hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200 ease-in-out">
              Login
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-4">
          <Link to="/home" className="text-yellow-500 font-semibold hover:underline">
            Kembali ke Home
          </Link>
        </div>

        <div className="text-center text-sm mt-2">
          <Link to="/forgot-password" className="text-yellow-500 font-semibold hover:underline">
            Lupa Password?
          </Link>
        </div>

        <p className="text-center text-sm mt-2">
          Belum Punya Akun?{' '}
          <Link to="/register" className="text-yellow-500 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
