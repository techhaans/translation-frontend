import React, { useState } from "react";
import styles from "./AssignTasks.module.css";

const languages = ["English", "Spanish", "French", "German", "Chinese"];
const proofReaders = {
    "English-Spanish": ["Alice", "Bob"],
    "English-French": ["Charlie"],
    "French-German": ["David", "Eva"],
    "German-Chinese": ["Frank"],
    "Spanish-English": ["Grace", "Hank"]
};

let nextId = 1;

const AssignTasks = () => {
    const [tasks, setTasks] = useState([
        { id: nextId++, from: "", to: "", proofReader: "" }
    ]);
    const [savedTasks, setSavedTasks] = useState([]);
    const [saving, setSaving] = useState(false);

    const updateTask = (id, key, value) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        [key]: value,
                        proofReader: key !== "proofReader" ? "" : task.proofReader
                    }
                    : task
            )
        );
    };

    const addTask = () => {
        setTasks((prev) => [
            ...prev,
            { id: nextId++, from: "", to: "", proofReader: "" }
        ]);
    };

    const removeTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const deleteSavedTask = (id) => {
        setSavedTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const saveTasks = () => {
        setSaving(true);

        const validTasks = tasks.filter(
            (t) => t.from && t.to && t.proofReader
        );

        const enriched = validTasks.map((task) => ({
            ...task,
            status: "Assigned",
            createdAt: new Date().toLocaleString()
        }));

        // Simulate backend call
        setTimeout(() => {
            setSavedTasks((prev) => [...prev, ...enriched]);
            setTasks([{ id: nextId++, from: "", to: "", proofReader: "" }]);
            setSaving(false);
        }, 700);
    };

    return (
        <div className={styles.assignContainer}>
            <h2 className={styles.title}>Assign Proofreading Tasks</h2>

            {tasks.map((task) => {
                const langKey = `${task.from}-${task.to}`;
                const availableProofReaders = proofReaders[langKey] || [];

                return (
                    <div key={task.id} className={styles.taskRow}>
                        <select
                            value={task.from}
                            onChange={(e) => updateTask(task.id, "from", e.target.value)}
                            className={styles.select}
                        >
                            <option value="">From</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>

                        <select
                            value={task.to}
                            onChange={(e) => updateTask(task.id, "to", e.target.value)}
                            className={styles.select}
                        >
                            <option value="">To</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>

                        <select
                            value={task.proofReader}
                            onChange={(e) => updateTask(task.id, "proofReader", e.target.value)}
                            className={styles.select}
                            disabled={!availableProofReaders.length}
                        >
                            <option value="">Proof Reader</option>
                            {availableProofReaders.map((pr) => (
                                <option key={pr} value={pr}>
                                    {pr}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => removeTask(task.id)}
                            className={styles.removeBtn}
                            disabled={tasks.length === 1}
                        >
                            -
                        </button>
                    </div>
                );
            })}

            <div className={styles.actions}>
                <button onClick={addTask} className={styles.addBtn}>+ Add</button>
                <button onClick={saveTasks} className={styles.saveBtn} disabled={saving}>
                    {saving ? "Saving..." : "💾 Save"}
                </button>
            </div>

            {savedTasks.length > 0 && (
                <div className={styles.tableSection}>
                    <h3 className={styles.tableTitle}>Assigned Tasks</h3>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Proof Reader</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {savedTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.from}</td>
                                <td>{task.to}</td>
                                <td>{task.proofReader}</td>
                                <td>{task.status}</td>
                                <td>{task.createdAt}</td>
                                <td>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => deleteSavedTask(task.id)}
                                    >
                                        ❌
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AssignTasks;
