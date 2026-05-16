// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, projectId, lang: selectedLang }) {
//   const [lang, setLang] = useState(selectedLang || ""); // NO default
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchLabels = async () => {
//     if (!cusId || !projectId || !lang) {
//       setRows([]);
//       setError("Please select customer, project, and language.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const url = `${API_BASE}/api/labels/fetch/${cusId}/${projectId}?lang=${lang}`;
//       console.log("🌐 Calling API:", url);

//       const res = await fetch(url);
//       if (!res.ok) throw new Error("API request failed");

//       const json = await res.json();
//       const content = json?.data?.content;

//       if (!content || Object.keys(content).length === 0) {
//         setRows([]);
//         setError("No labels found for this language.");
//         return;
//       }

//       // Convert JSON to table rows
//       const tableRows = Object.entries(content).map(([label, value]) => ({
//         label,
//         value,
//       }));

//       setRows(tableRows);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch labels for this language.");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch whenever IDs or language change
//   useEffect(() => {
//     fetchLabels();
//   }, [cusId, projectId, lang]);

//   if (!cusId || !projectId) {
//     return <div>Please select or create a project first.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2>📁 Project Labels</h2>
//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">-- Select Language --</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div style={styles.info}>
//         <span>
//           <b>Customer ID:</b> {cusId}
//         </span>
//         <span>
//           <b>Project ID:</b> {projectId}
//         </span>
//         <span>
//           <b>Language:</b> {lang || "-"}
//         </span>
//       </div>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>Project ID</th>
//             <th>Label</th>
//             <th>Translated Response</th>
//             <th>Language</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="5" style={styles.center}>
//                 Loading...
//               </td>
//             </tr>
//           ) : rows.length === 0 ? (
//             <tr>
//               <td colSpan="5" style={styles.center}>
//                 {error || "No data found"}
//               </td>
//             </tr>
//           ) : (
//             rows.map((row, idx) => (
//               <tr key={idx}>
//                 <td>{cusId}</td>
//                 <td>{projectId}</td>
//                 <td>{row.label}</td>
//                 <td>{row.value}</td>
//                 <td>{lang}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     background: "#fff",
//     padding: 24,
//     borderRadius: 12,
//     boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   select: { padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
//   info: {
//     display: "flex",
//     gap: 20,
//     marginBottom: 16,
//     color: "#334155",
//     fontSize: 14,
//   },
//   table: { width: "100%", borderCollapse: "collapse" },
//   center: { textAlign: "center", padding: 12 },
// };
// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, projectId, lang: selectedLang }) {
//   const [lang, setLang] = useState(selectedLang || "");
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchLabels = async () => {
//     if (!cusId || !projectId || !lang) {
//       setRows([]);
//       setError("Please select customer, project, and language.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const url = `${API_BASE}/api/labels/fetch/${cusId}/${projectId}?lang=${lang}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("API request failed");

//       const json = await res.json();
//       const content = json?.data?.content;

//       if (!content || Object.keys(content).length === 0) {
//         setRows([]);
//         setError("No labels found for this language.");
//         return;
//       }

//       // Split label/value by "|||" for better display
//       const tableRows = Object.entries(content).map(([label, value]) => ({
//         label: label.split("|||").map((s) => s.trim()),
//         value: value.split("|||").map((s) => s.trim()),
//       }));

//       setRows(tableRows);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch labels for this language.");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLabels();
//   }, [cusId, projectId, lang]);

//   if (!cusId || !projectId) {
//     return <div>Please select or create a project first.</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2>📁 Project Labels</h2>
//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">-- Select Language --</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div style={styles.info}>
//         <span>
//           <b>Customer ID:</b> {cusId}
//         </span>
//         <span>
//           <b>Project ID:</b> {projectId}
//         </span>
//         <span>
//           <b>Language:</b> {lang || "-"}
//         </span>
//       </div>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th>Label</th>
//             <th>Translated Response</th>
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan="2" style={styles.center}>
//                 Loading...
//               </td>
//             </tr>
//           ) : rows.length === 0 ? (
//             <tr>
//               <td colSpan="2" style={styles.center}>
//                 {error || "No data found"}
//               </td>
//             </tr>
//           ) : (
//             rows.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   {row.label.map((item, i) => (
//                     <div key={i}>{item}</div>
//                   ))}
//                 </td>
//                 <td>
//                   {row.value.map((item, i) => (
//                     <div key={i}>{item}</div>
//                   ))}
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     background: "#fff",
//     padding: 24,
//     borderRadius: 12,
//     boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   select: { padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
//   info: {
//     display: "flex",
//     gap: 20,
//     marginBottom: 16,
//     color: "#334155",
//     fontSize: 14,
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     tableLayout: "fixed",
//   },
//   center: { textAlign: "center", padding: 12 },
// };
// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, projectId, lang: selectedLang }) {
//   const [lang, setLang] = useState(selectedLang || "");
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const scope = "FE"; // frontend labels

//   useEffect(() => {
//     if (cusId && projectId && lang) fetchLabels();
//   }, [cusId, projectId, lang]);

//   const fetchLabels = async () => {
//     setLoading(true);
//     setError("");
//     setRows([]);

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/labels/fetch/${cusId}/${projectId}?lang=${lang}&scope=${scope}`,
//       );
//       if (!res.ok) throw new Error("API failed");

//       const json = await res.json();
//       const content = json?.data?.content;

//       if (!content || Object.keys(content).length === 0) {
//         setError("No labels found for this language");
//         return;
//       }

//       const formatted = Object.entries(content).map(([k, v]) => ({
//         label: k.split("|||").map((s) => s.trim()),
//         value: v.split("|||").map((s) => s.trim()),
//       }));

//       setRows(formatted);
//     } catch (e) {
//       setError("Failed to fetch labels");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cusId || !projectId) {
//     return <div style={styles.empty}>Please select or create a project</div>;
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>📁 Project Labels</h2>
//           <p style={styles.subtitle}>Manage translated labels per language</p>
//         </div>

//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">Select Language</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Info bar */}
//       <div style={styles.infoBar}>
//         <span>
//           Customer: <b>{cusId}</b>
//         </span>
//         <span>
//           Project: <b>{projectId}</b>
//         </span>
//         <span>
//           Language: <b>{lang || "-"}</b>
//         </span>
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={{ width: "45%" }}>Label</th>
//               <th style={{ width: "55%" }}>Translated Response</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   Loading...
//                 </td>
//               </tr>
//             )}

//             {!loading && rows.length === 0 && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   {error || "No data available"}
//                 </td>
//               </tr>
//             )}

//             {rows.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   {row.label.map((l, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {l}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   {row.value.map((v, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {v}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     background: "#ffffff",
//     padding: 24,
//     borderRadius: 14,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: { margin: 0, fontSize: 22 },
//   subtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },

//   select: {
//     padding: "8px 14px",
//     borderRadius: 8,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//     cursor: "pointer",
//   },

//   infoBar: {
//     display: "flex",
//     gap: 24,
//     padding: "10px 14px",
//     background: "#f8fafc",
//     borderRadius: 10,
//     fontSize: 14,
//     marginBottom: 18,
//   },

//   tableWrap: {
//     overflowX: "auto",
//     borderRadius: 10,
//     border: "1px solid #e2e8f0",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: 14,
//   },

//   cellItem: {
//     padding: "6px 0",
//     wordBreak: "break-word",
//   },

//   center: {
//     textAlign: "center",
//     padding: 20,
//     color: "#64748b",
//   },

//   empty: {
//     padding: 40,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#64748b",
//   },
// // };
// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, projectId, lang: initialLang }) {
//   const [lang, setLang] = useState(initialLang || "");
//   const [labels, setLabels] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const scope = "FE";

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     if (cusId && projectId && lang) {
//       fetchLabels();
//     } else {
//       setLabels({});
//     }
//   }, [cusId, projectId, lang]);

//   const fetchLabels = async () => {
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/labels/fetch/${cusId}/${projectId}?lang=${lang}&scope=${scope}`,
//       );

//       if (!res.ok) throw new Error("Fetch failed");

//       const json = await res.json();
//       const content = json?.data?.content || {};

//       setLabels(content);
//     } catch {
//       setError("Failed to fetch labels");
//       setLabels({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleChange = (key, value) => {
//     setLabels((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   /* ================= SAVE ================= */
//   const saveChanges = async () => {
//     setSaving(true);
//     setError("");
//     setSuccess("");

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/labels/update/${cusId}/${projectId}?lang=${lang}&scope=${scope}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(labels),
//         },
//       );

//       if (!res.ok) throw new Error("Update failed");

//       setSuccess("Labels updated successfully");
//     } catch {
//       setError("Failed to update labels");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (!cusId || !projectId) {
//     return <div style={styles.empty}>Please select or create a project</div>;
//   }

//   /* ================= UI ================= */
//   return (
//     <div style={styles.page}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>📁 Project Labels</h2>
//           <p style={styles.subtitle}>
//             Manage frontend translations per language
//           </p>
//         </div>

//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">Select language</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Info bar */}
//       <div style={styles.infoBar}>
//         <span>
//           Customer: <b>{cusId}</b>
//         </span>
//         <span>
//           Project: <b>{projectId}</b>
//         </span>
//         <span>
//           Scope: <b>{scope}</b>
//         </span>
//         <span>
//           Language: <b>{lang || "-"}</b>
//         </span>
//       </div>

//       {/* Messages */}
//       {error && <div style={styles.error}>{error}</div>}
//       {success && <div style={styles.success}>{success}</div>}

//       {/* Content */}
//       {!lang && (
//         <div style={styles.placeholder}>
//           Select a language to view and manage labels
//         </div>
//       )}

//       {lang && loading && <div style={styles.center}>Loading labels…</div>}

//       {lang && !loading && Object.keys(labels).length === 0 && (
//         <div style={styles.placeholder}>No labels found for this language</div>
//       )}

//       {/* Labels List */}
//       <div style={styles.list}>
//         {Object.entries(labels).map(([key, value]) => (
//           <div key={key} style={styles.row}>
//             <div style={styles.keyBox}>{key}</div>
//             <input
//               value={value}
//               onChange={(e) => handleChange(key, e.target.value)}
//               placeholder={`Translate "${key}"`}
//               style={styles.input}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Save bar */}
//       {lang && Object.keys(labels).length > 0 && (
//         <div style={styles.saveBar}>
//           <button
//             onClick={saveChanges}
//             disabled={saving}
//             style={styles.saveBtn}
//           >
//             {saving ? "Saving…" : "Save Changes"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ================= STYLES (Modern UI) ================= */

// const styles = {
//   page: {
//     background: "#ffffff",
//     padding: 28,
//     borderRadius: 16,
//     boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
//   },

//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 18,
//   },

//   title: {
//     margin: 0,
//     fontSize: 24,
//     fontWeight: 700,
//   },

//   subtitle: {
//     margin: "4px 0 0",
//     color: "#64748b",
//     fontSize: 14,
//   },

//   select: {
//     padding: "10px 16px",
//     borderRadius: 10,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//     cursor: "pointer",
//   },

//   infoBar: {
//     display: "flex",
//     gap: 24,
//     padding: "12px 16px",
//     background: "#f8fafc",
//     borderRadius: 12,
//     fontSize: 14,
//     marginBottom: 20,
//     border: "1px solid #e2e8f0",
//   },

//   list: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 14,
//   },

//   row: {
//     display: "grid",
//     gridTemplateColumns: "1fr 2fr",
//     gap: 16,
//     alignItems: "center",
//     background: "#f8fafc",
//     padding: 16,
//     borderRadius: 12,
//     border: "1px solid #e2e8f0",
//   },

//   keyBox: {
//     fontWeight: 600,
//     color: "#0f172a",
//     fontSize: 14,
//     wordBreak: "break-word",
//   },

//   input: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 10,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//   },

//   saveBar: {
//     marginTop: 24,
//     display: "flex",
//     justifyContent: "flex-end",
//   },

//   saveBtn: {
//     background: "#2563eb",
//     color: "#fff",
//     border: "none",
//     padding: "12px 22px",
//     borderRadius: 12,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: "pointer",
//   },

//   placeholder: {
//     padding: 40,
//     textAlign: "center",
//     color: "#64748b",
//     background: "#f8fafc",
//     borderRadius: 14,
//     border: "1px dashed #cbd5e1",
//   },

//   error: {
//     color: "#dc2626",
//     marginBottom: 12,
//     fontSize: 14,
//   },

//   success: {
//     color: "#16a34a",
//     marginBottom: 12,
//     fontSize: 14,
//   },

//   center: {
//     textAlign: "center",
//     padding: 30,
//     color: "#64748b",
//   },

//   empty: {
//     padding: 40,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#64748b",
//   },
// };
// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, projectId, lang: selectedLang }) {
//   const [lang, setLang] = useState(selectedLang || "");
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const scope = "BE"; // frontend labels

//   useEffect(() => {
//     if (cusId && projectId && lang) {
//       fetchLabels();
//     } else {
//       setRows([]);
//       setError("");
//     }
//   }, [cusId, projectId, lang]);

//   const fetchLabels = async () => {
//     setLoading(true);
//     setError("");
//     setRows([]);

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/labels/fetch/${cusId}/${projectId}?lang=${lang}&scope=${scope}`,
//       );
//       if (!res.ok) throw new Error("API failed");

//       const json = await res.json();
//       const content = json?.data?.content;

//       if (!content || Object.keys(content).length === 0) {
//         setError("No labels found for this language");
//         setRows([]);
//         return;
//       }

//       const formatted = Object.entries(content).map(([k, v]) => ({
//         label: k.split("|||").map((s) => s.trim()),
//         value: v.split("|||").map((s) => s.trim()),
//       }));

//       setRows(formatted);
//     } catch (e) {
//       setError("Failed to fetch labels");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cusId || !projectId) {
//     return <div style={styles.empty}>Please select or create a project</div>;
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>📁 Project Labels</h2>
//           <p style={styles.subtitle}>Manage translated labels per language</p>
//         </div>

//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={styles.select}
//         >
//           <option value="">Select Language</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Info bar */}
//       <div style={styles.infoBar}>
//         <span>
//           Customer: <b>{cusId}</b>
//         </span>
//         <span>
//           Project: <b>{projectId}</b>
//         </span>
//         <span>
//           Language: <b>{lang || "-"}</b>
//         </span>
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Label</th>
//               <th style={styles.th}>Translated Response</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   Loading...
//                 </td>
//               </tr>
//             )}

//             {!loading && rows.length === 0 && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   {error || "No data available"}
//                 </td>
//               </tr>
//             )}

//             {rows.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   {row.label.map((l, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {l}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   {row.value.map((v, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {v}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     background: "#ffffff",
//     padding: 24,
//     borderRadius: 14,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     maxWidth: "100%",
//     overflowX: "auto",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: { margin: 0, fontSize: 22 },
//   subtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },

//   select: {
//     padding: "8px 14px",
//     borderRadius: 8,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//     cursor: "pointer",
//   },

//   infoBar: {
//     display: "flex",
//     gap: 24,
//     padding: "10px 14px",
//     background: "#f8fafc",
//     borderRadius: 10,
//     fontSize: 14,
//     marginBottom: 18,
//   },

//   tableWrap: {
//     overflowX: "auto",
//     borderRadius: 10,
//     border: "1px solid #e2e8f0",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: 14,
//     tableLayout: "auto",
//   },

//   th: {
//     padding: "10px 12px",
//     borderBottom: "2px solid #cbd5e1",
//     textAlign: "left",
//     color: "#334155",
//     fontWeight: "600",
//   },

//   cellItem: {
//     padding: "8px 12px",
//     wordBreak: "break-word",
//     borderBottom: "1px solid #e2e8f0",
//     borderRadius: 4,
//     backgroundColor: "#f9fbfd",
//     color: "#1e40af",
//   },

//   center: {
//     textAlign: "center",
//     padding: 20,
//     color: "#64748b",
//   },

//   empty: {
//     padding: 40,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#64748b",
//   },
// };
// import { useEffect, useState } from "react";

// const API_BASE = "http://192.168.1.29:8080";

// const LANGUAGES = [
//   { code: "en", label: "English" },
//   { code: "fr", label: "French" },
//   { code: "de", label: "German" },
//   { code: "te", label: "Telugu" },
// ];

// export default function LabelsPage({ cusId, initialProjectId, initialLang }) {
//   const [lang, setLang] = useState(initialLang || "");
//   const [projects, setProjects] = useState([]);
//   const [selectedProjectId, setSelectedProjectId] = useState(
//     initialProjectId || "",
//   );
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingProjects, setLoadingProjects] = useState(false);
//   const [error, setError] = useState("");
//   const scope = "BE"; // frontend labels

//   // Fetch projects when cusId changes
//   useEffect(() => {
//     if (!cusId) {
//       setProjects([]);
//       setSelectedProjectId("");
//       return;
//     }
//     fetchProjects();
//   }, [cusId]);

//   const fetchProjects = async () => {
//     setLoadingProjects(true);
//     try {
//       const res = await fetch(`${API_BASE}/api/projects/${cusId}`);
//       if (!res.ok) throw new Error("Failed to fetch projects");

//       const json = await res.json();
//       // Assuming json.data is array of projects [{ id, name, ... }]
//       setProjects(json.data || []);

//       // Select first project automatically if none selected or current invalid
//       if (
//         !selectedProjectId ||
//         !(json.data || []).some((p) => p.id === selectedProjectId)
//       ) {
//         setSelectedProjectId((json.data && json.data[0]?.id) || "");
//       }
//     } catch (e) {
//       setProjects([]);
//       setSelectedProjectId("");
//     } finally {
//       setLoadingProjects(false);
//     }
//   };

//   // Fetch labels when customer, project or lang changes
//   useEffect(() => {
//     if (cusId && selectedProjectId && lang) {
//       fetchLabels();
//     } else {
//       setRows([]);
//       setError("");
//     }
//   }, [cusId, selectedProjectId, lang]);

//   const fetchLabels = async () => {
//     setLoading(true);
//     setError("");
//     setRows([]);

//     try {
//       const res = await fetch(
//         `${API_BASE}/api/labels/fetch/${cusId}/${selectedProjectId}?lang=${lang}&scope=${scope}`,
//       );
//       if (!res.ok) throw new Error("API failed");

//       const json = await res.json();
//       const content = json?.data?.content;

//       if (!content || Object.keys(content).length === 0) {
//         setError("No labels found for this language");
//         setRows([]);
//         return;
//       }

//       const formatted = Object.entries(content).map(([k, v]) => ({
//         label: k.split("|||").map((s) => s.trim()),
//         value: v.split("|||").map((s) => s.trim()),
//       }));

//       setRows(formatted);
//     } catch (e) {
//       setError("Failed to fetch labels");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cusId) {
//     return <div style={styles.empty}>Please select or create a customer</div>;
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h2 style={styles.title}>📁 Project Labels</h2>
//           <p style={styles.subtitle}>Manage translated labels per language</p>
//         </div>

//         {/* Project selection */}
//         <select
//           value={selectedProjectId}
//           onChange={(e) => setSelectedProjectId(e.target.value)}
//           style={styles.select}
//           disabled={loadingProjects || projects.length === 0}
//         >
//           {loadingProjects && <option>Loading projects...</option>}
//           {!loadingProjects && projects.length === 0 && (
//             <option>No projects found</option>
//           )}
//           {!loadingProjects &&
//             projects.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.name}
//               </option>
//             ))}
//         </select>

//         {/* Language selection */}
//         <select
//           value={lang}
//           onChange={(e) => setLang(e.target.value)}
//           style={{ ...styles.select, marginLeft: 12 }}
//         >
//           <option value="">Select Language</option>
//           {LANGUAGES.map((l) => (
//             <option key={l.code} value={l.code}>
//               {l.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Info bar */}
//       <div style={styles.infoBar}>
//         <span>
//           Customer: <b>{cusId}</b>
//         </span>
//         <span>
//           Project: <b>{selectedProjectId || "-"}</b>
//         </span>
//         <span>
//           Language: <b>{lang || "-"}</b>
//         </span>
//       </div>

//       {/* Table */}
//       <div style={styles.tableWrap}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>Label</th>
//               <th style={styles.th}>Translated Response</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   Loading...
//                 </td>
//               </tr>
//             )}

//             {!loading && rows.length === 0 && (
//               <tr>
//                 <td colSpan="2" style={styles.center}>
//                   {error || "No data available"}
//                 </td>
//               </tr>
//             )}

//             {rows.map((row, idx) => (
//               <tr key={idx}>
//                 <td>
//                   {row.label.map((l, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {l}
//                     </div>
//                   ))}
//                 </td>
//                 <td>
//                   {row.value.map((v, i) => (
//                     <div key={i} style={styles.cellItem}>
//                       {v}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   container: {
//     background: "#ffffff",
//     padding: 24,
//     borderRadius: 14,
//     boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//     maxWidth: "100%",
//     overflowX: "auto",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 16,
//   },
//   title: { margin: 0, fontSize: 22 },
//   subtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },

//   select: {
//     padding: "8px 14px",
//     borderRadius: 8,
//     border: "1px solid #cbd5e1",
//     fontSize: 14,
//     cursor: "pointer",
//   },

//   infoBar: {
//     display: "flex",
//     gap: 24,
//     padding: "10px 14px",
//     background: "#f8fafc",
//     borderRadius: 10,
//     fontSize: 14,
//     marginBottom: 18,
//   },

//   tableWrap: {
//     overflowX: "auto",
//     borderRadius: 10,
//     border: "1px solid #e2e8f0",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: 14,
//     tableLayout: "auto",
//   },

//   th: {
//     padding: "10px 12px",
//     borderBottom: "2px solid #cbd5e1",
//     textAlign: "left",
//     color: "#334155",
//     fontWeight: "600",
//   },

//   cellItem: {
//     padding: "8px 12px",
//     wordBreak: "break-word",
//     borderBottom: "1px solid #e2e8f0",
//     borderRadius: 4,
//     backgroundColor: "#f9fbfd",
//     color: "#1e40af",
//   },

//   center: {
//     textAlign: "center",
//     padding: 20,
//     color: "#64748b",
//   },

//   empty: {
//     padding: 40,
//     textAlign: "center",
//     fontSize: 16,
//     color: "#64748b",
//   },
// };
import { useEffect, useState } from "react";

const API_BASE = "http://192.168.1.29:8080";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "te", label: "Telugu" },
];

export default function LabelsPage({ cusId, initialProjectId, initialLang }) {
  const [lang, setLang] = useState(initialLang || "");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjectId || "",
  );
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [error, setError] = useState("");
  const scope = "BE";

  // ================= Fetch projects =================
  useEffect(() => {
    if (!cusId) return setProjects([]);

    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const res = await fetch(`${API_BASE}/api/customer/${cusId}/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");

        const json = await res.json();
        const data = (json.data || []).map((p) => ({
          id: p.projectId,
          name: p.projectName,
        }));
        setProjects(data);

        // Select first project if none selected or current invalid
        if (
          !selectedProjectId ||
          !data.some((p) => p.id === selectedProjectId)
        ) {
          setSelectedProjectId(data[0]?.id || "");
        }
      } catch (err) {
        console.error("Fetch projects failed:", err);
        setProjects([]);
        setSelectedProjectId("");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [cusId]);

  // ================= Fetch labels =================
  useEffect(() => {
    if (!cusId || !selectedProjectId || !lang) return setRows([]);

    const fetchLabels = async () => {
      setLoading(true);
      setError("");
      setRows([]);

      try {
        const res = await fetch(
          `${API_BASE}/api/labels/fetch/${cusId}/${selectedProjectId}?lang=${lang}&scope=${scope}`,
        );
        if (!res.ok) throw new Error("Failed to fetch labels");

        const json = await res.json();
        const content = json?.data?.content;

        if (!content || Object.keys(content).length === 0) {
          setError("No labels found for this language");
          setRows([]);
          return;
        }

        const formatted = Object.entries(content).map(([k, v]) => ({
          label: k.split("|||").map((s) => s.trim()),
          value: v.split("|||").map((s) => s.trim()),
        }));

        setRows(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch labels");
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLabels();
  }, [cusId, selectedProjectId, lang]);

  if (!cusId) {
    return <div style={styles.empty}>Please select or create a customer</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>📁 Project Labels</h2>
          <p style={styles.subtitle}>Manage translated labels per language</p>
        </div>

        {/* Project dropdown */}
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          style={styles.select}
          disabled={loadingProjects || projects.length === 0}
        >
          {loadingProjects && <option>Loading projects...</option>}
          {!loadingProjects && projects.length === 0 && (
            <option>No projects</option>
          )}
          {!loadingProjects &&
            projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>

        {/* Language dropdown */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ ...styles.select, marginLeft: 12 }}
        >
          <option value="">Select Language</option>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info bar */}
      <div style={styles.infoBar}>
        <span>
          Customer: <b>{cusId}</b>
        </span>
        <span>
          Project:{" "}
          <b>{projects.find((p) => p.id === selectedProjectId)?.name || "-"}</b>
        </span>
        <span>
          Language: <b>{lang || "-"}</b>
        </span>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Label</th>
              <th style={styles.th}>Translated Response</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="2" style={styles.center}>
                  Loading...
                </td>
              </tr>
            )}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan="2" style={styles.center}>
                  {error || "No data available"}
                </td>
              </tr>
            )}

            {rows.map((row, idx) => (
              <tr key={idx}>
                <td>
                  {row.label.map((l, i) => (
                    <div key={i} style={styles.cellItem}>
                      {l}
                    </div>
                  ))}
                </td>
                <td>
                  {row.value.map((v, i) => (
                    <div key={i} style={styles.cellItem}>
                      {v}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    background: "#ffffff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    maxWidth: "100%",
    overflowX: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: { margin: 0, fontSize: 22 },
  subtitle: { margin: "4px 0 0", color: "#64748b", fontSize: 14 },

  select: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    cursor: "pointer",
  },

  infoBar: {
    display: "flex",
    gap: 24,
    padding: "10px 14px",
    background: "#f8fafc",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 18,
  },

  tableWrap: {
    overflowX: "auto",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
    tableLayout: "auto",
  },

  th: {
    padding: "10px 12px",
    borderBottom: "2px solid #cbd5e1",
    textAlign: "left",
    color: "#334155",
    fontWeight: "600",
  },

  cellItem: {
    padding: "8px 12px",
    wordBreak: "break-word",
    borderBottom: "1px solid #e2e8f0",
    borderRadius: 4,
    backgroundColor: "#f9fbfd",
    color: "#1e40af",
  },

  center: {
    textAlign: "center",
    padding: 20,
    color: "#64748b",
  },

  empty: {
    padding: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#64748b",
  },
};
