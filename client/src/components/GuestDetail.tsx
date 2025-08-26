import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

interface Guest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
}

const GuestDetail: React.FC = () => {
  const { id } = useParams({ from: "/guests/$id" });
  const [guest, setGuest] = useState<Guest | null>(null);
  const [formData, setFormData] = useState<Guest | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuest = async () => {
      try {
        const record = await pb.collection("guests").getOne(id);
        setGuest(guest);
        setFormData(guest);
      } catch (err: any) {
        setError(err.message || "Error fetching guest");
      }
    };
    fetchGuest();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await pb.collection("guests").update(id, formData);
      navigate({ to: "/guests" });
    } catch (err: any) {
      setError(err.message || "Error updating guest");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this guest?")) {
      try {
        await pb.collection("guests").delete(id);
        navigate({ to: "/guests" });
      } catch (err: any) {
        setError(err.message || "Error deleting guest");
      }
    }
  };

  if (!guest || !formData)
    return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="mt-4 max-w-lg">
      <h2 className="text-xl font-semibold">Guest Details</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="border p-2 w-full rounded"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={formData.address || ""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={formData.date_of_birth || ""}
            onChange={(e) =>
              setFormData({ ...formData, date_of_birth: e.target.value })
            }
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Update Guest
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Guest
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestDetail;
