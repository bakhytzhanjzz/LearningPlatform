import React, { useState } from 'react';

const VerificationForm = ({ email, type, onVerify, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onVerify(code);
    } catch (err) {
      setError(err.response?.data?.msg || 'Verification failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-[90%]">
        <h2 className="text-2xl mb-4 font-bold">
          {type === 'registration' ? 'Подтверждение Email' : 'Вход в систему'}
        </h2>
        <p className="mb-4 text-gray-600">
          Код подтверждения отправлен на {email}
        </p>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Код подтверждения:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border p-2 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Подтвердить
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full border border-gray-300 p-2 rounded mt-2 hover:bg-gray-50 transition-colors"
          >
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;