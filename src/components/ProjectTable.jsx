// import { useState, useEffect } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// export default function ProjectTable({ projectsList = [], setProjectsList }) {
//   const [editingProjectId, setEditingProjectId] = useState(null);
//   const [editedName, setEditedName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const cusId = localStorage.getItem("customerId");

//   // FETCH PROJECTS
//   useEffect(() => {
//     if (!cusId) return;

//     const fetchProjects = async () => {
//       try {
//         const res = await fetch(`${API_BASE}/api/customer/${cusId}projects`);
//         const result = await res.json();

//         const normalized = (result.data || []).map((p) => ({
//           id: p.projectId,
//           name: p.projectName,
//           customerId: cusId, // add customerId to each project
//         }));

//         setProjectsList(normalized);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch projects");
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchProjects();
//   }, [cusId, setProjectsList]);

//   const startEdit = (project) => {
//     setEditingProjectId(project.id);
//     setEditedName(project.name);
//   };

//   const cancelEdit = () => {
//     setEditingProjectId(null);
//     setEditedName("");
//   };

//   const saveEdit = async () => {
//     if (!editedName.trim()) return alert("Enter project name");
//     setLoading(true);
//     try {
//       await fetch(
//         `${API_BASE}/api/customer/${cusId}/projects/${editingProjectId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ projectName: editedName }),
//         }
//       );

//       setProjectsList((prev) =>
//         prev.map((p) =>
//           p.id === editingProjectId ? { ...p, name: editedName } : p
//         )
//       );
//       cancelEdit();
//     } catch (err) {
//       console.error(err);
//       alert("Error updating project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 40 }}>Loading projects...</p>
//     );
//   }

//   return (
//     <div
//       style={{
//         background: "#fff",
//         padding: 24,
//         borderRadius: 12,
//         boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//       }}
//     >
//       <h3 style={{ marginBottom: 16 }}>Project Management</h3>

//       {projectsList.length === 0 ? (
//         <p style={{ textAlign: "center", color: "#777" }}>No projects found</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#f1f5f9" }}>
//               <th style={thStyle}>Project ID</th>
//               <th style={thStyle}>Customer ID</th> {/* New column */}
//               <th style={thStyle}>Project Name</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projectsList.map((p) => (
//               <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={tdStyle}>{p.id}</td>
//                 <td style={tdStyle}>{p.customerId || cusId}</td>{" "}
//                 {/* Show customer ID */}
//                 <td style={tdStyle}>
//                   {editingProjectId === p.id ? (
//                     <input
//                       value={editedName}
//                       onChange={(e) => setEditedName(e.target.value)}
//                       style={{
//                         padding: 6,
//                         borderRadius: 4,
//                         border: "1px solid #ccc",
//                         width: "100%",
//                       }}
//                     />
//                   ) : (
//                     p.name
//                   )}
//                 </td>
//                 <td style={tdStyle}>
//                   {editingProjectId === p.id ? (
//                     <>
//                       <button
//                         onClick={saveEdit}
//                         disabled={loading}
//                         style={btnBlue}
//                       >
//                         {loading ? "Saving..." : "Save"}
//                       </button>
//                       <button onClick={cancelEdit} style={btnRed}>
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button onClick={() => startEdit(p)} style={btnOrange}>
//                       Update
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// // Styles
// const thStyle = {
//   padding: "10px",
//   textAlign: "left",
//   fontWeight: 600,
//   color: "#334155",
// };
// const tdStyle = { padding: "10px", fontSize: 14 };
// const btnBlue = {
//   background: "#2196F3",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   marginRight: 6,
//   cursor: "pointer",
// };
// const btnRed = {
//   background: "#f44336",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   cursor: "pointer",
// };
// const btnOrange = {
//   background: "#FF9800",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   cursor: "pointer",
// };
// import { useState, useEffect } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// export default function ProjectTable({ projectsList = [], setProjectsList }) {
//   const [editingProjectId, setEditingProjectId] = useState(null);
//   const [editedName, setEditedName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // ✅ FIX 1: correct key
//   const cusId = localStorage.getItem("userId");

//   // =====================
//   // FETCH PROJECTS
//   // =====================
//   useEffect(() => {
//     if (!cusId) {
//       setFetching(false);
//       return;
//     }

//     const fetchProjects = async () => {
//       try {
//         // ✅ FIX 2: correct URL
//         const res = await fetch(`${API_BASE}/api/customer/${cusId}/projects`);
//         const result = await res.json();

//         if (result.status !== "SUCCESS") {
//           throw new Error(result.message || "Fetch failed");
//         }

//         const normalized = (result.data || []).map((p) => ({
//           id: p.projectId,
//           name: p.projectName,
//           customerId: cusId,
//         }));

//         setProjectsList(normalized);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         alert("Failed to fetch projects");
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchProjects();
//   }, [cusId, setProjectsList]);

//   // =====================
//   // EDIT HANDLERS
//   // =====================
//   const startEdit = (project) => {
//     setEditingProjectId(project.id);
//     setEditedName(project.name);
//   };

//   const cancelEdit = () => {
//     setEditingProjectId(null);
//     setEditedName("");
//   };

//   // =====================
//   // UPDATE PROJECT
//   // =====================
//   const saveEdit = async () => {
//     if (!editedName.trim()) return alert("Enter project name");

//     setLoading(true);
//     try {
//       await fetch(
//         `${API_BASE}/api/customer/${cusId}/projects/${editingProjectId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ projectName: editedName }),
//         },
//       );

//       setProjectsList((prev) =>
//         prev.map((p) =>
//           p.id === editingProjectId ? { ...p, name: editedName } : p,
//         ),
//       );

//       cancelEdit();
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Error updating project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <p style={{ textAlign: "center", marginTop: 40 }}>Loading projects...</p>
//     );
//   }

//   return (
//     <div style={card}>
//       <h3 style={{ marginBottom: 16 }}>Project Management</h3>

//       {projectsList.length === 0 ? (
//         <p style={{ textAlign: "center", color: "#777" }}>No projects found</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#f1f5f9" }}>
//               <th style={thStyle}>Project ID</th>
//               <th style={thStyle}>Customer ID</th>
//               <th style={thStyle}>Project Name</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {projectsList.map((p) => (
//               <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={tdStyle}>{p.id}</td>
//                 <td style={tdStyle}>{p.customerId}</td>
//                 <td style={tdStyle}>
//                   {editingProjectId === p.id ? (
//                     <input
//                       value={editedName}
//                       onChange={(e) => setEditedName(e.target.value)}
//                       style={input}
//                     />
//                   ) : (
//                     p.name
//                   )}
//                 </td>
//                 <td style={tdStyle}>
//                   {editingProjectId === p.id ? (
//                     <>
//                       <button
//                         onClick={saveEdit}
//                         disabled={loading}
//                         style={btnBlue}
//                       >
//                         {loading ? "Saving..." : "Save"}
//                       </button>
//                       <button onClick={cancelEdit} style={btnRed}>
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <button onClick={() => startEdit(p)} style={btnOrange}>
//                       Update
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// /* ===== STYLES ===== */
// const card = {
//   background: "#fff",
//   padding: 24,
//   borderRadius: 12,
//   boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
// };

// const thStyle = {
//   padding: "10px",
//   textAlign: "left",
//   fontWeight: 600,
// };

// const tdStyle = { padding: "10px", fontSize: 14 };

// const input = {
//   padding: 6,
//   borderRadius: 4,
//   border: "1px solid #ccc",
//   width: "100%",
// };

// const btnBlue = {
//   background: "#2196F3",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   marginRight: 6,
//   cursor: "pointer",
// };

// const btnRed = {
//   background: "#f44336",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   cursor: "pointer",
// };

// const btnOrange = {
//   background: "#FF9800",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: 6,
//   cursor: "pointer",
// };
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const API_BASE = "http://192.168.1.29:8080";

// export default function ProjectTable({ projectsList = [], setProjectsList }) {
//   const [editingProjectId, setEditingProjectId] = useState(null);
//   const [editedName, setEditedName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const navigate = useNavigate();
//   const customerId = localStorage.getItem("userId");

//   // ================= FETCH PROJECTS =================
//   useEffect(() => {
//     if (!customerId) {
//       setFetching(false);
//       return;
//     }

//     const fetchProjects = async () => {
//       try {
//         const res = await fetch(
//           `${API_BASE}/api/customer/${customerId}/projects`,
//         );
//         const result = await res.json();

//         const normalized = (result.data || []).map((p) => ({
//           id: p.projectId,
//           name: p.projectName,
//           customerId,
//         }));

//         setProjectsList(normalized);
//       } catch (err) {
//         alert("Failed to fetch projects");
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchProjects();
//   }, [customerId, setProjectsList]);

//   // ================= SELECT PROJECT =================
//   const openProject = (p) => {
//     localStorage.setItem("customerId", p.customerId);
//     localStorage.setItem("projectId", p.id);
//     localStorage.setItem("projectName", p.name);
//     navigate("/dashboard");
//   };

//   // ================= EDIT =================
//   const startEdit = (p) => {
//     setEditingProjectId(p.id);
//     setEditedName(p.name);
//   };

//   const cancelEdit = () => {
//     setEditingProjectId(null);
//     setEditedName("");
//   };

//   const saveEdit = async () => {
//     if (!editedName.trim()) return alert("Enter project name");

//     setLoading(true);
//     try {
//       await fetch(
//         `${API_BASE}/api/customer/${customerId}/projects/${editingProjectId}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ projectName: editedName }),
//         },
//       );

//       setProjectsList((prev) =>
//         prev.map((p) =>
//           p.id === editingProjectId ? { ...p, name: editedName } : p,
//         ),
//       );

//       cancelEdit();
//     } catch {
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) return <p>Loading projects...</p>;

//   return (
//     <div style={card}>
//       <h3>Project Management</h3>

//       <table style={{ width: "100%" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {projectsList.map((p) => (
//             <tr key={p.id}>
//               <td>{p.id}</td>

//               <td>
//                 {editingProjectId === p.id ? (
//                   <input
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                   />
//                 ) : (
//                   p.name
//                 )}
//               </td>

//               <td>
//                 {editingProjectId === p.id ? (
//                   <>
//                     <button onClick={saveEdit} disabled={loading}>
//                       Save
//                     </button>
//                     <button onClick={cancelEdit}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => startEdit(p)}>Edit</button>
//                     <button onClick={() => openProject(p)}>Open</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const card = {
//   background: "#fff",
//   padding: 20,
//   borderRadius: 10,
// };

///corret abovw
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://192.168.1.29:8080";

export default function ProjectTable({ projectsList = [], setProjectsList }) {
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(
    localStorage.getItem("projectId") || null,
  );

  const navigate = useNavigate();
  const customerId = localStorage.getItem("userId");

  // ================= FETCH PROJECTS =================
  useEffect(() => {
    if (!customerId) {
      setFetching(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/customer/${customerId}/projects`,
        );
        const result = await res.json();

        const normalized = (result.data || []).map((p) => ({
          id: p.projectId,
          name: p.projectName,
          customerId: customerId,
        }));

        setProjectsList(normalized);
      } catch (err) {
        alert("Failed to fetch projects");
      } finally {
        setFetching(false);
      }
    };

    fetchProjects();
  }, [customerId, setProjectsList]);

  // ================= SELECT PROJECT =================
  const openProject = (p) => {
    localStorage.setItem("customerId", p.customerId);
    localStorage.setItem("projectId", p.id);
    localStorage.setItem("projectName", p.name);
    setSelectedProjectId(p.id); // highlight selected row
    navigate("/dashboard");
  };

  // ================= EDIT =================
  const startEdit = (p) => {
    setEditingProjectId(p.id);
    setEditedName(p.name);
  };

  const cancelEdit = () => {
    setEditingProjectId(null);
    setEditedName("");
  };

  const saveEdit = async () => {
    if (!editedName.trim()) return alert("Enter project name");

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/customer/${customerId}/projects/${editingProjectId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectName: editedName }),
        },
      );

      if (!res.ok) throw new Error("Update failed");

      setProjectsList((prev) =>
        prev.map((p) =>
          p.id === editingProjectId ? { ...p, name: editedName } : p,
        ),
      );

      cancelEdit();
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading projects...</p>;

  return (
    <div style={styles.card}>
      <h3>Project Management</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>ID</th>
            <th style={styles.headerCell}>Customer ID</th>
            <th style={styles.headerCell}>Name</th>
            <th style={styles.headerCell}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projectsList.map((p) => {
            const isSelected = selectedProjectId === p.id;

            return (
              <tr key={p.id} style={styles.row}>
                <td
                  style={{
                    ...styles.cell,
                    ...(isSelected ? styles.selectedCell : {}),
                    marginRight: 10,
                  }}
                >
                  {p.id}
                </td>

                <td
                  style={{
                    ...styles.cell,
                    ...(isSelected ? styles.selectedCell : {}),
                    marginRight: 10,
                  }}
                >
                  {p.customerId}
                </td>

                <td
                  style={{
                    ...styles.cell,
                    ...(isSelected ? styles.selectedCell : {}),
                    marginRight: 10,
                  }}
                >
                  {editingProjectId === p.id ? (
                    <input
                      style={styles.input}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      disabled={loading}
                    />
                  ) : (
                    p.name
                  )}
                </td>

                <td
                  style={{
                    ...styles.cell,
                    ...(isSelected ? styles.selectedCell : {}),
                  }}
                >
                  {editingProjectId === p.id ? (
                    <div style={styles.buttonGroup}>
                      <button
                        style={{ ...styles.button, ...styles.saveButton }}
                        onClick={saveEdit}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.cancelButton }}
                        onClick={cancelEdit}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={styles.buttonGroup}>
                      <button
                        style={{ ...styles.button, ...styles.editButton }}
                        onClick={() => startEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ ...styles.button, ...styles.openButton }}
                        onClick={() => openProject(p)}
                      >
                        Open
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
    maxWidth: 900,
  },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px", // vertical spacing between rows
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  row: {
    // Transparent so individual cells background are visible
  },

  headerCell: {
    padding: "12px 20px",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "left",
    color: "#333",
    borderBottom: "2px solid #ddd",
  },

  cell: {
    background: "#f5f7fa",
    padding: "12px 20px",
    verticalAlign: "middle",
    fontSize: 15,
    color: "#333",
    borderRadius: 10,
  },

  selectedCell: {
    backgroundColor: "#c7dafc",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    fontSize: 15,
  },

  buttonGroup: {
    display: "flex",
    gap: 10,
  },

  button: {
    padding: "6px 14px",
    fontSize: 14,
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    color: "white",
  },

  editButton: {
    backgroundColor: "#3b82f6",
  },

  openButton: {
    backgroundColor: "#10b981",
  },

  saveButton: {
    backgroundColor: "#2563eb",
  },

  cancelButton: {
    backgroundColor: "#6b7280",
  },
};
