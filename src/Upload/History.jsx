import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const COLOR_MAP = {
  Pituitary: '#EF4444',
  Glioma: '#36A2EB',
  Meningioma: '#FBBF24',
  'No Tumor': '#8B5CF6',
};

function History() {
  const [history, setHistory] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [search, setSearch] = useState('');

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/auth/history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      const records = data.history || [];
      setHistory(records);

      const labelCount = {};
      records.forEach((item) => {
        const label = item.result;
        labelCount[label] = (labelCount[label] || 0) + 1;
      });

      const labels = Object.keys(labelCount);
      const values = labels.map((label) => labelCount[label]);
      const backgroundColors = labels.map((label) => COLOR_MAP[label] || '#999');

      setChartData({
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error('Gagal fetch riwayat:', err);
    }
  };

  const handleDelete = async (timestamp) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/auth/history', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ timestamp }),
      });

      if (res.ok) {
        await fetchHistory(); // ⬅️ force refresh state dari DB
      } else {
        const error = await res.json();
        console.error('Gagal hapus dari backend:', error.message);
      }
    } catch (err) {
      console.error('Gagal menghapus:', err);
    }
  };

  const handleDownloadExcel = () => {
    const dataToExport = filtered.map((item, index) => ({
      No: index + 1,
      Prediksi: item.result,
      Confidence: item.confidence,
      Tanggal: new Date(item.timestamp).toLocaleString(),
      File: item.filename || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Riwayat');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'riwayat_diagnosis.xlsx');
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = history.filter((item) => item.filename?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-black min-h-screen text-white font-plusjakartasans">
      <Navbar />
      <div className="pt-24 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#E5A00D]">Riwayat Diagnosis</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">Halaman ini menampilkan riwayat diagnosa Anda.</p>
      </div>

      <div className="w-full max-w-6xl px-4 mx-auto mt-10">
        {chartData && chartData.labels.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-black font-bold text-lg mb-4 text-center">Distribusi Jenis Tumor</h2>
            <div className="max-w-sm mx-auto">
              <Pie
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: { color: 'black', font: { weight: 'bold' } },
                    },
                    datalabels: {
                      color: '#000',
                      font: { weight: 'bold', size: 12 },
                      formatter: (value, ctx) => {
                        const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        return `${value} (${((value / total) * 100).toFixed(1)}%)`;
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <input type="text" placeholder="Cari berdasarkan nama file..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-3 py-2 rounded bg-gray-200 text-black w-full sm:w-[300px]" />
          <button onClick={handleDownloadExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium w-full sm:w-auto">
            Download Excel
          </button>
        </div>

        <div className="bg-white text-black rounded-lg overflow-x-auto px-2 sm:px-0">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-gray-200 sticky top-0 z-10 text-left">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Prediksi</th>
                <th className="px-4 py-2">Confidence</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">File</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.result}</td>
                  <td className="px-4 py-2">{item.confidence}</td>
                  <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{item.filename || '-'}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => handleDelete(new Date(item.timestamp).toISOString().split('.')[0])} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-4 text-gray-500">
                    Tidak ada data yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default History;
