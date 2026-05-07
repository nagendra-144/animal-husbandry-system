import { useEffect, useState } from "react";
import API from "../api";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    district: ""
  });

  // Fetch farmers
  const fetchFarmers = async () => {
    try {
      const res = await API.get("/farmers");
      setFarmers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add farmer
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/farmers/create", form); // ✅ correct endpoint
      setForm({ name: "", phone: "", village: "", district: "" });
      fetchFarmers();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // Delete farmer
  const handleDelete = async (id) => {
    try {
      await API.delete(`/farmers/${id}`);
      fetchFarmers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Farmers Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="village" placeholder="Village" value={form.village} onChange={handleChange} />
        <input name="district" placeholder="District" value={form.district} onChange={handleChange} />
        <button type="submit">Add Farmer</button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Village</th>
            <th>District</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((f, index) => (
            <tr key={f.id}>
              <td>{index + 1}</td> {/* S.No */}
              <td>{f.name}</td>
              <td>{f.phone}</td>
              <td>{f.village}</td>
              <td>{f.district}</td>
              <td>
                <button onClick={() => handleDelete(f.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Farmers;