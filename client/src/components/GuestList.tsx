import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const records = await pb.collection('guests').getFullList({ sort: '-created' });
        setGuests(records as Guest[]);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };
    fetchGuests();
  }, []);

  const filteredGuests = guests.filter(
    (guest) =>
      guest.first_name.toLowerCase().includes(search.toLowerCase()) ||
      guest.last_name.toLowerCase().includes(search.toLowerCase()) ||
      guest.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search guests..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/guests/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Guest
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest) => (
            <tr key={guest.id}>
              <td className="border p-2">{guest.first_name}</td>
              <td className="border p-2">{guest.last_name}</td>
              <td className="border p-2">{guest.email}</td>
              <td className="border p-2">
                <Link to={`/guests/${guest.id}`} className="text-blue-500">
                  View/Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;