import { useEffect, useState } from "react";
import API from "../api";

function Animals() {

  const [animals, setAnimals] = useState([]);
  const [farmers, setFarmers] = useState([]);

  const [form, setForm] = useState({
    farmer_id: "",
    tag_number: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    health_status: ""
  });

  // Fetch animals
  const fetchAnimals = async () => {
    try {
      const res = await API.get("/animals");
      setAnimals(res.data);
    } catch (err) {
      console.error("Animals fetch error:", err);
    }
  };

  // Fetch farmers for dropdown
  const fetchFarmers = async () => {
    try {
      const res = await API.get("/farmers");
      setFarmers(res.data);
    } catch (err) {
      console.error("Farmers fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAnimals();
    fetchFarmers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add animal
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/animals/register", form);

      setForm({
        farmer_id: "",
        tag_number: "",
        type: "",
        breed: "",
        age: "",
        gender: "",
        health_status: ""
      });

      fetchAnimals();

    } catch (err) {
      console.error("Add animal error:", err);
    }
  };

  // Delete animal
  const handleDelete = async (id) => {
    try {
      await API.delete(`/animals/${id}`);
      fetchAnimals();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Animals Management</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

        {/* Farmer dropdown */}
        <select name="farmer_id" value={form.farmer_id} onChange={handleChange} required>
          <option value="">Select Farmer</option>
          {farmers.map(f => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        <input name="tag_number" placeholder="Tag Number" value={form.tag_number} onChange={handleChange} required />
        <input name="type" placeholder="Type (Cow, Goat)" value={form.type} onChange={handleChange} />
        <input name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
        <input name="health_status" placeholder="Health Status" value={form.health_status} onChange={handleChange} />

        <button type="submit">Add Animal</button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Farmer</th>
            <th>Tag</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {animals.map((a, index) => (
            <tr key={a.id}>
              <td>{index + 1}</td>
              <td>{a.farmer_name}</td>
              <td>{a.tag_number}</td>
              <td>{a.type}</td>
              <td>{a.breed}</td>
              <td>{a.age}</td>
              <td>{a.gender}</td>
              <td>{a.health_status}</td>
              <td>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Animals;