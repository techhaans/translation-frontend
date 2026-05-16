import { useState, useEffect } from "react";
import "./UpdateCustomer.css";

const API_BASE = "http://192.168.1.29:8080";

export default function UpdateCustomer() {
  const cusId = localStorage.getItem("userId");

  const [customer, setCustomer] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // =====================
  // FETCH CUSTOMER
  // =====================
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/customer/${cusId}`);
        if (!res.ok) throw new Error("Fetch failed");

        const result = await res.json();
        setCustomer({
          fullName: result.data.fullName || "",
          phoneNumber: result.data.phoneNumber || "",
          country: result.data.country || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch profile");
      } finally {
        setFetching(false);
      }
    };

    if (cusId) fetchCustomer();
  }, [cusId]);

  // =====================
  // INPUT HANDLER
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // =====================
  // UPDATE API
  // =====================
  const handleUpdate = async () => {
    if (!customer.fullName || !customer.phoneNumber || !customer.country) {
      return alert("Please fill all fields");
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/customer/${cusId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: customer.fullName,
          phoneNumber: customer.phoneNumber,
          country: customer.country,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="loading">Loading profile...</p>;
  }

  return (
    <div className="update-card">
      <h2>Update Customer</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          name="fullName"
          value={customer.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          name="phoneNumber"
          value={customer.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input
          name="country"
          value={customer.country}
          onChange={handleChange}
          placeholder="Enter country"
        />
      </div>

      <button className="btn primary" onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
}
