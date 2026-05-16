import { useState, useEffect } from "react";
import "./ProjectTable.css";

const API_BASE = "http://192.168.1.29:8080";

export default function ProjectTable({ projectsList, setProjectsList }) {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const cusId = localStorage.getItem("customerId");

  // =====================
  // FETCH PROJECTS
  // =====================
  useEffect(() => {
    if (!cusId) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/customer/${cusId}/projects`);
        const result = await res.json();

        const normalized = (result.data || []).map((p) => ({
          id: p.projectId,
          name: p.projectName,
        }));

        setProjectsList(normalized);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch projects");
      } finally {
        setFetching(false);
      }
    };

    fetchProjects();
  }, [cusId, setProjectsList]);

  // =====================
  // EDIT HANDLERS
  // =====================
  const startEdit = (project) => {
    setEditingId(project.id);
    setEditedName(project.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedName("");
  };

  // =====================
  // UPDATE API
  // =====================
  const saveEdit = async () => {
    if (!editedName.trim()) return alert("Enter project name");

    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/customer/${cusId}/projects/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName: editedName }),
      });

      setProjectsList((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, name: editedName } : p)),
      );

      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Error updating project");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="loading">Loading projects...</p>;
  }

  return (
    <div className="project-card">
      <h2>Project Management</h2>
      <p className="customer-id">
        Customer ID: <b>{cusId}</b>
      </p>

      <div className="table-wrapper">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer ID</th>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projectsList.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-row">
                  No projects found
                </td>
              </tr>
            )}

            {projectsList.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{cusId}</td>
                <td>{p.id}</td>

                <td>
                  {editingId === p.id ? (
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    p.name
                  )}
                </td>

                <td>
                  {editingId === p.id ? (
                    <>
                      <button
                        className="btn save"
                        onClick={saveEdit}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button className="btn cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="btn edit" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
