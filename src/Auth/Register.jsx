import { Link, useNavigate } from 'react-router-dom';
import LogoTumorVision from '../assets/register-icon.png';
import React, { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const validateGmail = (email) => /^[^@]+@gmail\.com$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password dan Konfirmasi Password tidak sama!');
      setMessageType('error');
      return;
    }

    if (!validateGmail(email)) {
      setMessage('Format email harus @gmail.com dan valid!');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage('Registrasi berhasil! Silakan login.');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.message || 'Registrasi gagal.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Terjadi kesalahan saat menghubungi server.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex min-h-screen bg-black font-jakarta">
      <div className="w-1/2 flex items-center justify-center">
        <img src={LogoTumorVision} alt="Tumor Vision Logo" className="max-w-xs" />
      </div>

      <div className="w-1/2 flex items-center justify-center text-white px-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold">Register</h1>
          <p className="text-gray-400">Daftar sekarang untuk membuat akun</p>

          {message && <div className={`p-4 rounded-md text-sm ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{message}</div>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Masukan Nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />

            <input
              type="text" // ⬅️ Ganti dari 'email' agar validasi HTML5 tidak blokir
              placeholder="Masukan alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
              required
            />

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />

            <input type="password" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none" required />

            <button type="submit" className="w-full px-4 py-2 font-semibold text-black bg-yellow-500 rounded-md hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200 ease-in-out">
              Daftar Sekarang
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            sudah punya akun?{' '}
            <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
