import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('❌ Password tidak cocok!');
      setMessageType('error');
      return;
    }

    if (!token) {
      setMessage('❌ Token tidak ditemukan. Silakan minta ulang reset password.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Password berhasil diubah! Anda akan diarahkan ke halaman login.');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(data.message || '❌ Gagal mengubah password.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('[ResetPassword Error]', error);
      setMessage('❌ Terjadi kesalahan saat menghubungi server.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white font-jakarta px-4">
      <div className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-center text-3xl font-bold leading-snug">Ubah Password</h1>
        <p className="text-center text-gray-400 text-sm">Masukkan password baru Anda</p>

        {message && <div className={`p-4 rounded-md text-sm font-medium ${messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{message}</div>}

        <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              Password Baru
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white text-black focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-8 py-2 font-semibold text-black bg-yellow-500 rounded-md hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200 ease-in-out">
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
