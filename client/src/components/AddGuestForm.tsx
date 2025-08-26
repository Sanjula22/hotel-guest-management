import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const AddGuestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await pb.collection('guests').create(formData);
      navigate({ to: '/guests' });
    } catch (err: any) {
      setError(err.message || 'Error adding guest');
    }
  };

  return (
    <div className="mt-4 max-w-lg">
      <h2 className="text-xl font-semibold">Add New Guest</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.date_of_birth}
            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Save Guest
        </button>
      </form>
    </div>
  );
};

export default AddGuestForm;