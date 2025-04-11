import React, { useState } from 'react';
import Style from './product.label.css';
import Login from './Login';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import this


const LabelList = () => {
  const user = { role: 'proofreader' };
  const [labels] = useState([
    { id: 1, originalText: 'Welcome', approved: true, translations: { en: 'welcome', sv: 'hej', fr: 'bienvenue' } },
    { id: 2, originalText: 'Logout', approved: false, translations: { en: 'logout', sv: 'logga ut', fr: 'déconnexion' } },
  ]);

  const [selectedLabel, setSelectedLabel] = useState(null);
  const [editedTranslations, setEditedTranslations] = useState({});
  const navigate = useNavigate();
  const logout = () => {
    alert('Logged out!');
    navigate('/');
  };
  

  const viewDetails = (label) => {
    setSelectedLabel(label);
    setEditedTranslations(label.translations);
  };

  const closeModal = () => {
    setSelectedLabel(null);
  };

  const save = () => {
    console.log('Updated Translations:', editedTranslations);
    closeModal();
  };

  const handleInputChange = (lang, value) => {
    setEditedTranslations(prev => ({ ...prev, [lang]: value }));
  };

  return (
    <div className={Style.label_container}>
      <div className="label-header">
        <h2>Labels</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      <table className="label-table">
        <thead>
          <tr>
            <th>Label ID</th>
            <th>Label</th>
            <th>Languages</th>
            <th>Is Approved</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody id="labelBody">
          {labels.map(label => (
            <tr key={label.id}>
              <td>{label.id}</td>
              <td>{label.originalText}</td>
              <td>{Object.keys(label.translations).join(', ')}</td>
              <td>{label.approved ? 'Yes' : 'No'}</td>
              <td>
                <span className="view-link" onClick={() => viewDetails(label)}>View details</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLabel && (
        <div id="labelModal" className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal-box">
            <h3 id="labelTitle">Label: {selectedLabel.originalText}</h3>
            <div id="translationsList">
              {Object.entries(selectedLabel.translations).map(([lang, val]) => (
                <div className="translation-row" key={lang}>
                  <label>{lang}:</label>
                  {user.role === 'proofreader' ? (
                    <input
                      type="text"
                      value={editedTranslations[lang]}
                      onChange={(e) => handleInputChange(lang, e.target.value)}
                      className="translation-input"
                    />
                  ) : (
                    <span>{val}</span>
                  )}
                </div>
              ))}
            </div>
            <div id="modalActions" className="modal-actions">
              {user.role === 'proofreader' ? (
                <>
                  <button onClick={save} className="btn green">Save</button>
                  <button onClick={closeModal} className="btn gray">Cancel</button>
                </>
              ) : (
                <button onClick={closeModal} className="btn gray">Close</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabelList;
