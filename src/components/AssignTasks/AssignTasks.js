import React, { useState, useCallback, useContext, useMemo } from "react";
import Select from "react-select";
import styles from "./AssignTasks.module.css";
import { AuthContext } from "../../AuthContext";

const ELIGIBLE_URL = "http://localhost:8082/api/proofreader-tasks/eligible";
const ASSIGN_URL   = "http://localhost:8082/api/proofreader-tasks/assign";

let nextId = 1;

export default function AssignTasks() {
    const { languages, langsLoading, langsError } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const CUID  = localStorage.getItem("uuid");

    // build react-select options from context.languages
    const languageOptions = useMemo(
        () =>
            languages.map((lang) => ({
                value: lang.languageCode,
                label: lang.languageName,
            })),
        [languages]
    );

    const [tasks, setTasks] = useState([
        { id: nextId++, from: null, to: null, proofReader: null, availableProofReaders: [] }
    ]);
    const [saving, setSaving] = useState(false);

    const fetchEligible = useCallback(
        async (taskId, fromLang, toLang) => {
            try {
                const resp = await fetch(ELIGIBLE_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        cuid: CUID,
                        fromLanguage: fromLang,
                        toLanguage: toLang,
                    }),
                });
                if (!resp.ok) throw new Error(resp.statusText);

                const json = await resp.json();
                const rawList = Array.isArray(json.data) ? json.data : [];

                const options = rawList.map((pr) => ({
                    value: pr.puid,
                    label: pr.fullName.trim(),
                }));

                setTasks((prev) =>
                    prev.map((t) =>
                        t.id === taskId
                            ? { ...t, availableProofReaders: options, proofReader: null }
                            : t
                    )
                );
            } catch (err) {
                console.error("Failed to fetch proofreaders:", err);
            }
        },
        [token, CUID]
    );

    const updateTask = (id, key, option) => {
        setTasks((prev) =>
            prev.map((t) => {
                if (t.id !== id) return t;
                const updated = { ...t, [key]: option };
                if (key === "from" || key === "to") {
                    updated.proofReader = null;
                    updated.availableProofReaders = [];
                    if (updated.from && updated.to) {
                        fetchEligible(id, updated.from.value, updated.to.value);
                    }
                }
                return updated;
            })
        );
    };

    const addTask = () =>
        setTasks((prev) => [
            ...prev,
            { id: nextId++, from: null, to: null, proofReader: null, availableProofReaders: [] },
        ]);

    const removeTask = (id) =>
        setTasks((prev) => prev.filter((t) => t.id !== id));

    const saveTasks = async () => {
        setSaving(true);
        const valid = tasks.filter((t) => t.from && t.to && t.proofReader);
        try {
            await Promise.all(
                valid.map((t) =>
                    fetch(ASSIGN_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            cuid: CUID,
                            puid: t.proofReader.value,
                            sourceLanguage: t.from.value,
                            destinationLanguage: t.to.value,
                        }),
                    }).then((r) => {
                        if (!r.ok) throw new Error(r.statusText);
                        return r.json();
                    })
                )
            );
            console.log("✅ All tasks assigned successfully");
            setTasks([
                { id: nextId++, from: null, to: null, proofReader: null, availableProofReaders: [] },
            ]);
        } catch (err) {
            console.error("❌ Assignment failed:", err);
        } finally {
            setSaving(false);
        }
    };

    if (langsLoading) {
        return <div className={styles.assignContainer}>Loading languages…</div>;
    }

    if (langsError) {
        return (
            <div className={styles.assignContainer}>
                <p className="error">Error loading languages. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className={styles.assignContainer}>
            <h2 className={styles.title}>Assign Proofreading Tasks</h2>

            {tasks.map((task) => (
                <div key={task.id} className={styles.taskRow}>
                    {/* From */}
                    <div className={styles.select}>
                        <Select
                            placeholder="From…"
                            options={languageOptions}
                            value={task.from}
                            onChange={(opt) => updateTask(task.id, "from", opt)}
                            isClearable
                        />
                    </div>

                    {/* To */}
                    <div className={styles.select}>
                        <Select
                            placeholder="To…"
                            options={languageOptions}
                            value={task.to}
                            onChange={(opt) => updateTask(task.id, "to", opt)}
                            isClearable
                        />
                    </div>

                    {/* Proof Reader */}
                    <div className={styles.select}>
                        <Select
                            placeholder="Proof Reader…"
                            options={task.availableProofReaders}
                            value={task.proofReader}
                            onChange={(opt) => updateTask(task.id, "proofReader", opt)}
                            isDisabled={!task.availableProofReaders.length}
                            isClearable
                        />
                    </div>

                    <button
                        onClick={() => removeTask(task.id)}
                        className={styles.removeBtn}
                        disabled={tasks.length === 1}
                    >
                        –
                    </button>
                </div>
            ))}

            <div className={styles.actions}>
                <button onClick={addTask} className={styles.addBtn}>
                    + Add
                </button>
                <button
                    onClick={saveTasks}
                    className={styles.saveBtn}
                    disabled={saving}
                >
                    {saving ? "Saving…" : "💾 Save"}
                </button>
            </div>
        </div>
    );
}
