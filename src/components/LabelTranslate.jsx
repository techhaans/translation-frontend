import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DEFAULT_DATA from "./defaultData.json";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "te", label: "Telugu" },
];

const API_BASE = "http://192.168.1.29:8080";
const DEFAULT_SCOPE = "BE";

export default function TranslationDashboard() {
  const navigate = useNavigate();
  const { customerId, projectId } = useParams(); // ✅ dynamic params

  const custId = customerId || localStorage.getItem("customerId");
  const projId = projectId || localStorage.getItem("projectId");

  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState({
    name: "",
    hobbies: [],
    nationalities: [],
  });
  const [translatedCache, setTranslatedCache] = useState(null);

  const [allHobbies, setAllHobbies] = useState([]);
  const [allNationalities, setAllNationalities] = useState([]);
  const [newHobby, setNewHobby] = useState("");
  const [newNationality, setNewNationality] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({
    hobbies: false,
    nationality: false,
  });

  const dropdownRefHobbies = useRef(null);
  const dropdownRefNationality = useRef(null);
  const translationCacheRef = useRef({});

  // ================= AUTH CHECK =================
  useEffect(() => {
    if (!custId || !projId) {
      navigate("/", { replace: true });
    } else {
      localStorage.setItem("customerId", custId);
      localStorage.setItem("projectId", projId);
    }
  }, [custId, projId, navigate]);

  // ================= CLICK OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRefHobbies.current &&
        !dropdownRefHobbies.current.contains(e.target)
      ) {
        setDropdownOpen((p) => ({ ...p, hobbies: false }));
      }
      if (
        dropdownRefNationality.current &&
        !dropdownRefNationality.current.contains(e.target)
      ) {
        setDropdownOpen((p) => ({ ...p, nationality: false }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= INIT DATA ON PROJECT CHANGE =================
  useEffect(() => {
    if (!custId || !projId) return;

    // Reset everything when project changes
    const initData = {
      name: DEFAULT_DATA.name,
      hobbies: DEFAULT_DATA.hobbies.slice(0, 3),
      nationalities: DEFAULT_DATA.nationalities.slice(0, 1),
    };

    setDisplayData(initData);
    setAllHobbies(DEFAULT_DATA.hobbies);
    setAllNationalities(DEFAULT_DATA.nationalities);
    setTranslatedCache({ displayData: initData });
    translationCacheRef.current = {}; // clear cache
    setLang("en"); // reset language
    setNewHobby("");
    setNewNationality("");
    setDropdownOpen({ hobbies: false, nationality: false });
  }, [custId, projId]);

  // ================= TRANSLATION =================
  const translateTextBatch = async (dataMap) => {
    if (!custId || !projId) return dataMap;
    try {
      const payload = {
        customerId: custId,
        projectId: projId,
        scope: DEFAULT_SCOPE,
        data: dataMap,
      };
      const res = await fetch(
        `${API_BASE}/api/labels/translate?from=en&to=${lang}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      return json?.content || dataMap;
    } catch (err) {
      console.error("Translation error:", err);
      return dataMap;
    }
  };

  const translateAny = async (obj) => {
    const flatMap = {};
    const paths = [];

    const walk = (val, path = []) => {
      if (typeof val === "string") {
        const key = path.join(".");
        flatMap[key] = val;
        paths.push({ path, key });
      } else if (Array.isArray(val))
        val.forEach((v, i) => walk(v, [...path, i]));
      else if (val && typeof val === "object")
        Object.keys(val).forEach((k) => walk(val[k], [...path, k]));
    };

    walk(obj);

    const translatedMap = await translateTextBatch(flatMap);

    const result = JSON.parse(JSON.stringify(obj));
    paths.forEach(({ path, key }) => {
      let ref = result;
      for (let j = 0; j < path.length - 1; j++) ref = ref[path[j]];
      ref[path[path.length - 1]] = translatedMap[key] ?? flatMap[key];
    });

    return result;
  };

  useEffect(() => {
    if (!custId || !projId) return;
    if (lang === "en") {
      setTranslatedCache({ displayData });
      return;
    }
    if (translationCacheRef.current[lang]) {
      setTranslatedCache(translationCacheRef.current[lang]);
      return;
    }

    let cancelled = false;
    const translateAll = async () => {
      setLoading(true);
      try {
        const translated = await translateAny({ displayData });
        if (!cancelled) {
          translationCacheRef.current[lang] = translated;
          setTranslatedCache(translated);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    translateAll();
    return () => (cancelled = true);
  }, [lang, displayData, custId, projId]);

  // ================= HANDLERS =================
  const handleAddHobby = () => {
    const val = newHobby.trim();
    if (!val) return;
    if (!allHobbies.includes(val)) setAllHobbies((p) => [...p, val]);
    if (!displayData.hobbies.includes(val))
      setDisplayData((p) => ({ ...p, hobbies: [...p.hobbies, val] }));
    setNewHobby("");
  };

  const handleAddNationality = () => {
    const val = newNationality.trim();
    if (!val) return;
    if (!allNationalities.includes(val))
      setAllNationalities((p) => [...p, val]);
    if (!displayData.nationalities.includes(val))
      setDisplayData((p) => ({
        ...p,
        nationalities: [...p.nationalities, val],
      }));
    setNewNationality("");
  };

  const toggleHobby = (hobby) => {
    setDisplayData((p) => ({
      ...p,
      hobbies: p.hobbies.includes(hobby)
        ? p.hobbies.filter((h) => h !== hobby)
        : [...p.hobbies, hobby],
    }));
  };

  const toggleNationality = (nation) => {
    setDisplayData((p) => ({
      ...p,
      nationalities: p.nationalities.includes(nation)
        ? p.nationalities.filter((n) => n !== nation)
        : [...p.nationalities, nation],
    }));
  };

  const uiDisplay = translatedCache?.displayData || displayData;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!custId || !projId) {
    return (
      <div style={{ padding: 40 }}>
        Please select or create a project to continue.
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>Tech Haans</h1>
          <p style={styles.subtitle}>Translation Dashboard</p>
        </div>
        <div style={styles.headerRight}>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={styles.select}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
          <button
            style={{ ...styles.primaryBtn, background: "#dc2626" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={styles.container}>
        <div style={{ marginBottom: 16, fontSize: 14, color: "#555" }}>
          Selected Customer: <strong>{custId}</strong> | Selected Project:{" "}
          <strong>{projId}</strong>
        </div>

        {/* User Details Card */}
        <div style={styles.card}>
          <h2>User Details</h2>
          {loading && <span style={styles.badge}>Translating…</span>}

          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tdLabel}>Name</td>
                <td>
                  <input
                    value={uiDisplay.name}
                    onChange={(e) =>
                      setDisplayData({ ...displayData, name: e.target.value })
                    }
                    style={styles.input}
                  />
                </td>
              </tr>

              <tr>
                <td style={styles.tdLabel}>Hobbies</td>
                <td>
                  <div
                    ref={dropdownRefHobbies}
                    style={{ position: "relative" }}
                  >
                    <div
                      style={styles.dropdownHeader}
                      onClick={() =>
                        setDropdownOpen((p) => ({ ...p, hobbies: !p.hobbies }))
                      }
                    >
                      {uiDisplay.hobbies.join(", ") || "Select hobbies"} ▾
                    </div>
                    {dropdownOpen.hobbies && (
                      <div style={styles.dropdownList}>
                        {allHobbies.map((h) => (
                          <label key={h} style={styles.dropdownItem}>
                            <input
                              type="checkbox"
                              checked={uiDisplay.hobbies.includes(h)}
                              onChange={() => toggleHobby(h)}
                            />{" "}
                            {h}
                          </label>
                        ))}
                        <input
                          value={newHobby}
                          onChange={(e) => setNewHobby(e.target.value)}
                          placeholder="Add hobby"
                          style={styles.input}
                        />
                        <button
                          onClick={handleAddHobby}
                          style={styles.primaryBtn}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>

              <tr>
                <td style={styles.tdLabel}>Nationality</td>
                <td>
                  <div
                    ref={dropdownRefNationality}
                    style={{ position: "relative" }}
                  >
                    <div
                      style={styles.dropdownHeader}
                      onClick={() =>
                        setDropdownOpen((p) => ({
                          ...p,
                          nationality: !p.nationality,
                        }))
                      }
                    >
                      {uiDisplay.nationalities.join(", ") ||
                        "Select nationality"}{" "}
                      ▾
                    </div>
                    {dropdownOpen.nationality && (
                      <div style={styles.dropdownList}>
                        {allNationalities.map((n) => (
                          <label key={n} style={styles.dropdownItem}>
                            <input
                              type="checkbox"
                              checked={uiDisplay.nationalities.includes(n)}
                              onChange={() => toggleNationality(n)}
                            />{" "}
                            {n}
                          </label>
                        ))}
                        <input
                          value={newNationality}
                          onChange={(e) => setNewNationality(e.target.value)}
                          placeholder="Add nationality"
                          style={styles.input}
                        />
                        <button
                          onClick={handleAddNationality}
                          style={styles.primaryBtn}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* <pre style={styles.preview}>{JSON.stringify(uiDisplay, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f0f4f8",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#0b1120",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: { margin: 0 },
  subtitle: { margin: 0, fontSize: 13, opacity: 0.7 },
  headerRight: { display: "flex", gap: 12 },
  select: { padding: 8, borderRadius: 6 },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  container: { padding: 40 },
  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  table: { width: "100%", borderSpacing: "0 12px" },
  tdLabel: { fontWeight: 600, verticalAlign: "top" },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderRadius: 6,
    border: "1px solid #cbd5e1",
  },
  dropdownHeader: {
    padding: 10,
    border: "1px solid #cbd5e1",
    borderRadius: 6,
    cursor: "pointer",
  },
  dropdownList: {
    position: "absolute",
    background: "#fff",
    border: "1px solid #cbd5e1",
    padding: 10,
    width: "100%",
    zIndex: 10,
  },
  dropdownItem: { display: "block" },
  badge: { marginLeft: 10, color: "#2563eb" },
  preview: {
    marginTop: 20,
    background: "#f8fafc",
    padding: 12,
    borderRadius: 8,
    fontSize: 13,
    overflowX: "auto",
  },
};
