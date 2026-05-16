// import { useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>

//         <MenuItem
//           label="Translate"
//           active={activeTab === "translate"}
//           onClick={() => setActiveTab("translate")}
//         />
//         <MenuItem
//           label="Create Project"
//           active={activeTab === "createProject"}
//           onClick={() => setActiveTab("createProject")}
//         />
//         <MenuItem
//           label="Projects"
//           active={activeTab === "projects"}
//           onClick={() => setActiveTab("projects")}
//         />
//         <MenuItem
//           label="Profile"
//           active={activeTab === "profile"}
//           onClick={() => setActiveTab("profile")}
//         />
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && <TranslationDashboard />}

//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}

//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}

//         {activeTab === "profile" && <UpdateCustomer />}
//       </main>
//     </div>
//   );
// }

// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// // ===== STYLES =====
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// // };
// import { useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={sidebarHeader}>Dashboard</h2>

//         <MenuItem
//           label="Translate"
//           active={activeTab === "translate"}
//           onClick={() => setActiveTab("translate")}
//         />
//         <MenuItem
//           label="Create Project"
//           active={activeTab === "createProject"}
//           onClick={() => setActiveTab("createProject")}
//         />
//         <MenuItem
//           label="Projects"
//           active={activeTab === "projects"}
//           onClick={() => setActiveTab("projects")}
//         />
//         <MenuItem
//           label="Profile"
//           active={activeTab === "profile"}
//           onClick={() => setActiveTab("profile")}
//         />
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && <TranslationDashboard />}
//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "profile" && <UpdateCustomer />}
//       </main>
//     </div>
//   );
// }

// // ======================
// // MENU ITEM
// // ======================
// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         fontWeight: 500,
//         color: active ? "#fff" : "#cbd5e1",
//         background: active ? "#2563eb" : "transparent",
//         transition: "0.2s",
//       }}
//       onMouseEnter={(e) => {
//         if (!active) e.currentTarget.style.background = "#1e40af";
//       }}
//       onMouseLeave={(e) => {
//         if (!active) e.currentTarget.style.background = "transparent";
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// // ======================
// // STYLES
// // ======================
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
//   display: "flex",
//   flexDirection: "column",
// };

// const sidebarHeader = {
//   marginBottom: 30,
//   fontSize: 22,
//   fontWeight: 700,
//   letterSpacing: 0.5,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// // };
// import { useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";
// import LabelsPage from "./LabelsPage"; // ✅ import your LabelsPage

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);
//   const [lang, setLang] = useState("en");

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>

//         <MenuItem
//           label="Translate"
//           active={activeTab === "translate"}
//           onClick={() => setActiveTab("translate")}
//         />
//         <MenuItem
//           label="Create Project"
//           active={activeTab === "createProject"}
//           onClick={() => setActiveTab("createProject")}
//         />
//         <MenuItem
//           label="Projects"
//           active={activeTab === "projects"}
//           onClick={() => setActiveTab("projects")}
//         />
//         <MenuItem
//           label="Profile"
//           active={activeTab === "profile"}
//           onClick={() => setActiveTab("profile")}
//         />
//         <MenuItem
//           label="Labels"
//           active={activeTab === "labels"}
//           onClick={() => setActiveTab("labels")}
//         />
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && <TranslationDashboard />}
//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "profile" && <UpdateCustomer />}
//         {/* ✅ Labels tab with isActive */}
//         <LabelsPage lang={lang} isActive={activeTab === "labels"} />
//       </main>
//     </div>
//   );
// }

// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// // ===== STYLES =====
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// // };
// import { useState, useEffect } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";
// import LabelsPage from "./LabelsPage";

// const API_BASE = "http://192.168.1.29:8080";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);
//   const [lang, setLang] = useState("en");

//   // ✅ Ensure IDs exist
//   useEffect(() => {
//     const ensureIds = async () => {
//       let cusId = localStorage.getItem("userId");
//       let projectId = localStorage.getItem("projectId");

//       if (!cusId || !projectId) {
//         console.log("Generating new IDs via /translate API...");
//         try {
//           const res = await fetch(
//             `${API_BASE}/api/labels/translate?from=en&to=en`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ data: {} }),
//             }
//           );
//           const json = await res.json();
//           console.log("Generated IDs response:", json);

//           localStorage.setItem("userId", json.response.cusId);
//           localStorage.setItem("projectId", json.response.ProjectId);
//         } catch (err) {
//           console.error("Failed to generate IDs:", err);
//         }
//       }
//     };

//     ensureIds();
//   }, []);

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>

//         <MenuItem
//           label="Translate"
//           active={activeTab === "translate"}
//           onClick={() => setActiveTab("translate")}
//         />
//         <MenuItem
//           label="Create Project"
//           active={activeTab === "createProject"}
//           onClick={() => setActiveTab("createProject")}
//         />
//         <MenuItem
//           label="Projects"
//           active={activeTab === "projects"}
//           onClick={() => setActiveTab("projects")}
//         />
//         <MenuItem
//           label="Profile"
//           active={activeTab === "profile"}
//           onClick={() => setActiveTab("profile")}
//         />
//         <MenuItem
//           label="Labels"
//           active={activeTab === "labels"}
//           onClick={() => setActiveTab("labels")}
//         />
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && <TranslationDashboard />}
//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//           />
//         )}
//         {activeTab === "profile" && <UpdateCustomer />}
//         {activeTab === "labels" && (
//           <LabelsPage lang={lang} isActive={activeTab === "labels"} />
//         )}
//       </main>
//     </div>
//   );
// }

// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// // ===== STYLES =====
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// };
// import { useEffect, useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";
// import LabelsPage from "./LabelsPage";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);
//   const [lang, setLang] = useState("en");

//   // Track IDs in state
//   const [cusId, setCusId] = useState(() => {
//     const stored = localStorage.getItem("userId");
//     return stored ? Number(stored) : null;
//   });
//   const [projectId, setProjectId] = useState(() => {
//     const stored = localStorage.getItem("projectId");
//     return stored ? Number(stored) : null;
//   });

//   // Function to save IDs to state & localStorage
//   const saveIds = (fetchedCusId, fetchedProjectId) => {
//     setCusId(fetchedCusId);
//     setProjectId(fetchedProjectId);
//     localStorage.setItem("userId", fetchedCusId);
//     localStorage.setItem("projectId", fetchedProjectId);
//   };

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
//         {["translate", "createProject", "projects", "profile", "labels"].map(
//           (tab) => (
//             <MenuItem
//               key={tab}
//               label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//               active={activeTab === tab}
//               onClick={() => setActiveTab(tab)}
//             />
//           )
//         )}
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && <TranslationDashboard />}
//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}
//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}
//         {activeTab === "profile" && <UpdateCustomer saveIds={saveIds} />}
//         {activeTab === "labels" && (
//           <LabelsPage
//             lang={lang}
//             isActive={activeTab === "labels"}
//             cusId={cusId}
//             projectId={projectId}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// // ===== STYLES =====
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };
// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };
// const content = { flex: 1, padding: 30, background: "#f1f5f9" };
// import { useEffect, useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";
// import LabelsPage from "./LabelsPage";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);
//   const [lang, setLang] = useState("en");

//   // ✅ STRING IDs (DO NOT CONVERT)
//   const [customerId, setCustomerId] = useState(() => {
//     return localStorage.getItem("customerId");
//   });

//   const [projectId, setProjectId] = useState(() => {
//     return localStorage.getItem("projectId");
//   });

//   // ✅ SINGLE SOURCE OF TRUTH
//   const saveIds = (cusId, projId) => {
//     if (!cusId || !projId) return;

//     setCustomerId(cusId);
//     setProjectId(projId);

//     localStorage.setItem("customerId", cusId);
//     localStorage.setItem("projectId", projId);
//   };

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
//         {["translate", "createProject", "projects", "profile", "labels"].map(
//           (tab) => (
//             <MenuItem
//               key={tab}
//               label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//               active={activeTab === tab}
//               onClick={() => setActiveTab(tab)}
//             />
//           )
//         )}
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {activeTab === "translate" && (
//           <TranslationDashboard
//             customerId={customerId}
//             projectId={projectId}
//             lang={lang}
//           />
//         )}

//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}

//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}

//         {activeTab === "profile" && <UpdateCustomer saveIds={saveIds} />}

//         {activeTab === "labels" && (
//           <LabelsPage
//             lang={lang}
//             isActive={activeTab === "labels"}
//             cusId={customerId}
//             projectId={projectId}
//           />
//         )}
//       </main>
//     </div>
//   );
// }

// /* ================= MENU ITEM ================= */

// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// };
// import { useEffect, useState } from "react";
// import TranslationDashboard from "./LabelTranslate";
// import ProjectTable from "./ProjectTable";
// import UpdateCustomer from "./UpdateCustomer";
// import CreateProject from "./CreateProject";
// import LabelsPage from "./LabelsPage";

// export default function NavDashboard() {
//   const [activeTab, setActiveTab] = useState("translate");
//   const [projectsList, setProjectsList] = useState([]);
//   const [lang, setLang] = useState("en");

//   // ✅ STRING IDs (DO NOT CONVERT)
//   const [customerId, setCustomerId] = useState(() => {
//     return localStorage.getItem("customerId");
//   });

//   const [projectId, setProjectId] = useState(() => {
//     return localStorage.getItem("projectId");
//   });

//   // ✅ SINGLE SOURCE OF TRUTH
//   const saveIds = (cusId, projId) => {
//     if (!cusId || !projId) return;

//     setCustomerId(cusId);
//     setProjectId(projId);

//     localStorage.setItem("customerId", cusId);
//     localStorage.setItem("projectId", projId);
//   };

//   return (
//     <div style={layout}>
//       {/* SIDEBAR */}
//       <aside style={sidebar}>
//         <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
//         {["translate", "createProject", "projects", "profile", "labels"].map(
//           (tab) => (
//             <MenuItem
//               key={tab}
//               label={tab.charAt(0).toUpperCase() + tab.slice(1)}
//               active={activeTab === tab}
//               onClick={() => setActiveTab(tab)}
//             />
//           )
//         )}
//       </aside>

//       {/* CONTENT */}
//       <main style={content}>
//         {/* TRANSLATION DASHBOARD */}
//         {activeTab === "translate" && customerId && projectId && (
//           <TranslationDashboard
//             customerId={customerId}
//             projectId={projectId}
//             lang={lang}
//           />
//         )}
//         {activeTab === "translate" && (!customerId || !projectId) && (
//           <div>Please select or create a project first.</div>
//         )}

//         {/* CREATE PROJECT */}
//         {activeTab === "createProject" && (
//           <CreateProject
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}

//         {/* PROJECT TABLE */}
//         {activeTab === "projects" && (
//           <ProjectTable
//             projectsList={projectsList}
//             setProjectsList={setProjectsList}
//             saveIds={saveIds}
//           />
//         )}

//         {/* PROFILE */}
//         {activeTab === "profile" && <UpdateCustomer saveIds={saveIds} />}

//         {/* LABELS PAGE */}
//         {activeTab === "labels" && customerId && projectId && (
//           <LabelsPage
//             lang={lang}
//             isActive={activeTab === "labels"}
//             cusId={customerId}
//             projectId={projectId}
//           />
//         )}
//         {activeTab === "labels" && (!customerId || !projectId) && (
//           <div>Please select or create a project first.</div>
//         )}
//       </main>
//     </div>
//   );
// }

// /* ================= MENU ITEM ================= */
// function MenuItem({ label, active, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         padding: "12px 16px",
//         marginBottom: 10,
//         borderRadius: 8,
//         cursor: "pointer",
//         background: active ? "#2563eb" : "transparent",
//         color: active ? "#fff" : "#cbd5e1",
//         fontWeight: 500,
//       }}
//     >
//       {label}
//     </div>
//   );
// }

// /* ================= STYLES ================= */
// const layout = {
//   display: "flex",
//   minHeight: "100vh",
//   fontFamily: "Segoe UI, sans-serif",
// };

// const sidebar = {
//   width: 240,
//   background: "#0f172a",
//   color: "#fff",
//   padding: 20,
// };

// const content = {
//   flex: 1,
//   padding: 30,
//   background: "#f1f5f9",
// };
import { useEffect, useState } from "react";
import TranslationDashboard from "./LabelTranslate";
import ProjectTable from "./ProjectTable";
import UpdateCustomer from "./UpdateCustomer";
import CreateProject from "./CreateProject";
import LabelsPage from "./LabelsPage";

export default function NavDashboard() {
  const [activeTab, setActiveTab] = useState("translate");
  const [projectsList, setProjectsList] = useState([]);
  const [lang, setLang] = useState("en");

  // ✅ STRING IDs (DO NOT CONVERT)
  const [customerId, setCustomerId] = useState(() => {
    return localStorage.getItem("customerId");
  });

  const [projectId, setProjectId] = useState(() => {
    return localStorage.getItem("projectId");
  });

  // ✅ SINGLE SOURCE OF TRUTH
  const saveIds = (cusId, projId) => {
    if (!cusId || !projId) return;

    setCustomerId(cusId);
    setProjectId(projId);

    localStorage.setItem("customerId", cusId);
    localStorage.setItem("projectId", projId);
  };

  // ✅ AUTO-SELECT FIRST PROJECT IF NONE SELECTED
  useEffect(() => {
    if (projectsList.length) {
      const firstProject = projectsList[0];

      if (!projectId) {
        setProjectId(firstProject.id);
        localStorage.setItem("projectId", firstProject.id);
      }

      if (!customerId) {
        setCustomerId(
          firstProject.customerId || localStorage.getItem("customerId"),
        );
        localStorage.setItem(
          "customerId",
          firstProject.customerId || localStorage.getItem("customerId"),
        );
      }
    }
  }, [projectsList]);

  return (
    <div style={layout}>
      {/* SIDEBAR */}
      <aside style={sidebar}>
        <h2 style={{ marginBottom: 30 }}>Dashboard</h2>
        {["translate", "createProject", "projects", "profile", "labels"].map(
          (tab) => (
            <MenuItem
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ),
        )}
      </aside>

      {/* CONTENT */}
      <main style={content}>
        {/* TRANSLATION DASHBOARD */}
        {activeTab === "translate" && customerId && projectId && (
          <TranslationDashboard
            customerId={customerId}
            projectId={projectId}
            lang={lang}
          />
        )}
        {activeTab === "translate" && (!customerId || !projectId) && (
          <div>Please select or create a project first.</div>
        )}

        {/* CREATE PROJECT */}
        {activeTab === "createProject" && (
          <CreateProject
            projectsList={projectsList}
            setProjectsList={setProjectsList}
            saveIds={saveIds}
          />
        )}

        {/* PROJECT TABLE */}
        {activeTab === "projects" && (
          <ProjectTable
            projectsList={projectsList}
            setProjectsList={setProjectsList}
            saveIds={saveIds}
          />
        )}

        {/* PROFILE */}
        {activeTab === "profile" && <UpdateCustomer saveIds={saveIds} />}

        {/* LABELS PAGE */}
        {activeTab === "labels" && customerId && projectId && (
          <LabelsPage
            lang={lang}
            isActive={activeTab === "labels"}
            cusId={customerId}
            projectId={projectId}
          />
        )}
        {activeTab === "labels" && (!customerId || !projectId) && (
          <div>Please select or create a project first.</div>
        )}
      </main>
    </div>
  );
}

/* ================= MENU ITEM ================= */
function MenuItem({ label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 16px",
        marginBottom: 10,
        borderRadius: 8,
        cursor: "pointer",
        background: active ? "#2563eb" : "transparent",
        color: active ? "#fff" : "#cbd5e1",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  );
}

/* ================= STYLES ================= */
const layout = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Segoe UI, sans-serif",
};

const sidebar = {
  width: 240,
  background: "#0f172a",
  color: "#fff",
  padding: 20,
};

const content = {
  flex: 1,
  padding: 30,
  background: "#f1f5f9",
};
