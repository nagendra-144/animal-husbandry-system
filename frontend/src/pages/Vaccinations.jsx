import { useEffect, useState } from "react";
import API from "../api";

function Vaccinations() {

  const [vaccinations, setVaccinations] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [form, setForm] = useState({
    animal_id: "",
    vaccine_name: "",
    vaccination_date: "",
    next_due_date: ""
  });

  // Fetch vaccinations
  const fetchVaccinations = async () => {
    try {
      const res = await API.get("/vaccinations");

      console.log("Vaccinations:", res.data);

      setVaccinations(res.data);

    } catch (err) {
      console.error("Fetch vaccinations error:", err);
    }
  };

  // Fetch animals
  const fetchAnimals = async () => {
    try {

      const res = await API.get("/animals");

      setAnimals(res.data);

    } catch (err) {
      console.error("Fetch animals error:", err);
    }
  };

  useEffect(() => {
    fetchVaccinations();
    fetchAnimals();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add vaccination
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        animal_id: form.animal_id,
        vaccine_name: form.vaccine_name,
        vaccination_date: form.vaccination_date,
        next_due_date: form.next_due_date
      };

      console.log("Sending:", payload);

      await API.post("/vaccinations", payload);

      // Refresh table
      fetchVaccinations();

      // Clear form
      setForm({
        animal_id: "",
        vaccine_name: "",
        vaccination_date: "",
        next_due_date: ""
      });

    } catch (err) {
      console.error("Add vaccination error:", err);
    }
  };

  // Delete vaccination
  const handleDelete = async (id) => {
    try {

      await API.delete(`/vaccinations/${id}`);

      fetchVaccinations();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>Vaccination Management</h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >

        <select
          name="animal_id"
          value={form.animal_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Animal</option>

          {animals.map((a) => (
            <option key={a.id} value={a.id}>
              {a.tag_number}
            </option>
          ))}

        </select>

        <input
          type="text"
          name="vaccine_name"
          placeholder="Vaccine Name"
          value={form.vaccine_name}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="vaccination_date"
          value={form.vaccination_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="next_due_date"
          value={form.next_due_date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Vaccination
        </button>

      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>S.No</th>
            <th>Animal Tag</th>
            <th>Vaccine</th>
            <th>Date</th>
            <th>Next Due</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {vaccinations.length === 0 ? (

            <tr>
              <td colSpan="6">
                No Vaccination Records
              </td>
            </tr>

          ) : (

            vaccinations.map((v, index) => (

              <tr key={v.id}>

                <td>{index + 1}</td>

                <td>{v.tag_number}</td>

                <td>{v.vaccine_name}</td>

                <td>
                  {v.vaccination_date?.split("T")[0]}
                </td>

                <td>
                  {v.next_due_date?.split("T")[0]}
                </td>

                <td>
                  <button onClick={() => handleDelete(v.id)}>
                    Delete
                  </button>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Vaccinations;