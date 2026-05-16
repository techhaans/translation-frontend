// import React, { useEffect, useState } from "react";

// function AdminDashboard() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/customers?status=INACTIVE");
//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || "Failed to fetch customers");
//       }

//       setCustomers(result.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approveCustomer = async (customerId) => {
//     try {
//       const res = await fetch(`/api/admin/customers/${customerId}/approve`, {
//         method: "PUT",
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         throw new Error(result.message || "Approval failed");
//       }

//       // Remove approved customer from list
//       setCustomers((prev) => prev.filter((c) => c.customerId !== customerId));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   return (
//     <>
//       <style>{`
//         .admin-box {
//           padding: 32px;
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th, td {
//           padding: 12px;
//           border-bottom: 1px solid #e5e7eb;
//           text-align: left;
//         }
//         th {
//           background: #f1f5f9;
//         }
//         button {
//           padding: 8px 14px;
//           background: #16a34a;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }
//         button:hover {
//           background: #15803d;
//         }
//         .error {
//           color: #b91c1c;
//           margin-bottom: 12px;
//         }
//       `}</style>

//       <div className="admin-box">
//         <h2>Pending Customer Approvals</h2>

//         {error && <p className="error">{error}</p>}
//         {loading && <p>Loading...</p>}

//         {!loading && customers.length === 0 && <p>No pending customers 🎉</p>}

//         {customers.length > 0 && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Customer ID</th>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Country</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             {/* <tbody>
//               {customers.map((c) => (
//                 <tr key={c.customerId}>
//                   <td>{c.customerId}</td>
//                   <td>{c.fullName}</td>
//                   <td>{c.phoneNumber}</td>
//                   <td>{c.country}</td>
//                   <td>
//                     <button onClick={() => approveCustomer(c.customerId)}>
//                       Approve
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody> */}
//             <tbody>
//               {customers.map((c) => (
//                 <tr key={c.customerId}>
//                   <td>{c.customerId}</td>
//                   <td>{c.fullName}</td>
//                   <td>{c.phoneNumber}</td>
//                   <td>{c.country}</td>
//                   <td>
//                     <button
//                       onClick={() => approveCustomer(c.customerId)}
//                       disabled={loading}
//                     >
//                       Approve
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState(null);
  const [error, setError] = useState("");

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers?status=INACTIVE");
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch customers");
      }

      setCustomers(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveCustomer = async (customerId) => {
    setApprovingId(customerId);
    try {
      const res = await fetch(`/api/admin/customers/${customerId}/approve`, {
        method: "PUT",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Approval failed");
      }

      // Remove approved customer from list
      setCustomers((prev) => prev.filter((c) => c.customerId !== customerId));
    } catch (err) {
      alert(err.message);
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <style>{`
        body {
          background: #f1f5f9;
          font-family: "Segoe UI", sans-serif;
        }

        .admin-container {
          max-width: 1200px;
          margin: auto;
          padding: 30px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .admin-header h2 {
          margin: 0;
          font-size: 22px;
        }

        .logout-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #dc2626;
        }

        .card {
          background: white;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 14px;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
          font-size: 14px;
        }

        th {
          background: #f8fafc;
          color: #334155;
        }

        tr:hover {
          background: #f9fafb;
        }

        .status {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          background: #fee2e2;
          color: #b91c1c;
        }

        .approve-btn {
          padding: 8px 14px;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .approve-btn:disabled {
          background: #86efac;
          cursor: not-allowed;
        }

        .error {
          color: #b91c1c;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .empty {
          text-align: center;
          color: #64748b;
          padding: 20px;
        }
      `}</style>

      <div className="admin-container">
        <div className="admin-header">
          <h2>Inactive Customer Approvals</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="card">
          {error && <p className="error">{error}</p>}
          {loading && <p>Loading...</p>}

          {!loading && customers.length === 0 && (
            <p className="empty">No inactive customers 🎉</p>
          )}

          {customers.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.customerId}>
                    <td>{c.customerId}</td>
                    <td>{c.fullName}</td>
                    <td>{c.phoneNumber}</td>
                    <td>{c.country}</td>
                    <td>
                      <span className="status">{c.status}</span>
                    </td>
                    <td>
                      <button
                        className="approve-btn"
                        onClick={() => approveCustomer(c.customerId)}
                        disabled={approvingId === c.customerId}
                      >
                        {approvingId === c.customerId
                          ? "Approving..."
                          : "Approve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
