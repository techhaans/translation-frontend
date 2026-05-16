import { useState } from "react";

const API_BASE = "http://192.168.1.29:8080";

export default function CreateProject({ projectsList, setProjectsList }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success / error
  const [messageType, setMessageType] = useState(""); // success | error

  const cusId = localStorage.getItem("userId");

  // =========================
  // CREATE PROJECT
  // =========================
  const handleCreateProject = async () => {
    setMessage(null);

    if (!cusId) {
      setMessageType("error");
      return setMessage("Customer ID not found");
    }

    if (!newProjectName.trim()) {
      setMessageType("error");
      return setMessage("Please enter a project name");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/customer/${cusId}projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: [newProjectName],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 200
        throw new Error(data.message || "Project creation failed");
      }

      const createdProjects = (data.data.projectId || []).map((id) => ({
        id,
        name: newProjectName,
      }));

      setProjectsList((prev) => [...prev, ...createdProjects]);
      setNewProjectName("");

      setMessageType("success");
      setMessage("✅ Project created successfully");
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* MESSAGE BOX OUTSIDE CARD */}
      {message && (
        <div
          style={{
            ...messageBox,
            maxWidth: 600,
            margin: "20px auto",
            backgroundColor: messageType === "success" ? "#e6fffa" : "#fee2e2",
            color: messageType === "success" ? "#065f46" : "#991b1b",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      <div style={card}>
        <h3 style={title}>Create New Project</h3>

        <p style={subText}>
          Customer ID: <b>{cusId || "N/A"}</b>
        </p>

        <div style={row}>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            style={input}
            disabled={loading}
          />

          <button
            onClick={handleCreateProject}
            disabled={loading}
            style={{
              ...button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================
   STYLES
===================== */

const card = {
  maxWidth: 600,
  margin: "30px auto",
  padding: 20,
  background: "#ffffff",
  borderRadius: 14,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  fontFamily: "Segoe UI, sans-serif",
};

const title = {
  marginBottom: 6,
  fontSize: 20,
  fontWeight: 600,
};

const subText = {
  fontSize: 13,
  color: "#64748b",
  marginBottom: 14,
};

const row = {
  display: "flex",
  gap: 12,
};

const input = {
  flex: 1,
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
};

const button = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 18px",
  fontWeight: 500,
};

const messageBox = {
  padding: "12px 18px",
  borderRadius: 8,
  fontSize: 14,
};
