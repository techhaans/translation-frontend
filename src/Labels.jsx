import React, { useState, useEffect } from 'react';
import './product.label.css';
import { useNavigate } from 'react-router-dom';

const Labels = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [labels, setLabels] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [approved, setIsApproved] = useState(false);
  const [editedTranslation, setEditedTranslation] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.customerUId) {
      fetchLabels(user.customerUId);
    } else {
      console.warn("customerUId is missing from user object in localStorage.");
    }
  }, [user.customerUId]);

  useEffect(() => {
    if (selectedLabel) {
      fetchLanguagesAndTranslations(user.customerUId);
    }
  }, [selectedLabel]);
  
  const fetchLanguagesAndTranslations = async (customerUid) => {
    try {
      const response = await fetch(`http://localhost:8082/customer/languages/${customerUid}`);
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Languages fetched:", data);
        setLanguages(data);
        await fetchTranslationsFromAPI(customerUid, data); // pass langs directly
      } else {
        console.error('❌ Failed to fetch languages. Status:', response.status);
      }
    } catch (error) {
      console.error('❌ Error fetching languages:', error);
    }
  };
  
  
  

  const fetchLabels = async (cuid) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8082/labels/${cuid}`);
      if (response.ok) {
        const data = await response.json();
        setLabels(data);
      } else {
        console.error('Failed to fetch labels. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching labels:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLanguages = async (customerUid) => {
    try {
      const response = await fetch(`http://localhost:8082/customer/languages/${customerUid}`);
      if (response.ok) {
        const data = await response.json();
        setLanguages(data);
      } else {
        console.error('Failed to fetch languages');
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchTranslationsFromAPI = async (customerUid, langs) => {
    try {
      const translationsPerLanguage = {};
  
      for (const lang of langs) {
        const langCode = lang.languageCode;
        const response = await fetch(`http://localhost:8082/translations/${customerUid}/${langCode}`);
        if (response.ok) {
          const data = await response.json();
          console.log(`🌐 Translations for ${langCode}:`, data);
  
          const filtered = {};
          labels.forEach(label => {
            if (data[label.labelKey]) {
              filtered[label.labelKey] = data[label.labelKey];
            }
          });
  
          translationsPerLanguage[langCode] = filtered;
        } else {
          console.error(`❌ Failed to fetch translations for ${langCode}. Status:`, response.status);
        }
      }
  
      console.log("📦 All translations grouped:", translationsPerLanguage);
      setEditedTranslation(translationsPerLanguage);
    } catch (err) {
      console.error("❌ Translation fetch error:", err);
    }
  };
  
  

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/home');
  };

  const viewDetails = async (label) => {
    setSelectedLabel(label);
    setIsApproved(label.approved || false);
  };

  const handleInputChange = (langCode, value) => {
    const labelKey = selectedLabel.labelKey;
    setEditedTranslation((prev) => ({
      ...prev,
      [langCode]: {
        ...prev[langCode],
        [labelKey]: value,
      },
    }));
  };

  const handleSave = async () => {
    for (const lang of languages) {
      const newLname = editedTranslation[lang.languageKey];
      if (!lang.languageKey || !newLname) continue;

      try {
        const response = await fetch(`http://localhost:8082/language/update/${lang.languageCode}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lname: newLname }),
        });

        if (!response.ok) {
          console.error('Failed to update language:', lang.languageKey);
        }
      } catch (error) {
        console.error('Error updating language:', lang.languageKey, error);
      }
    }
    alert('Languages updated');
  };

  const handleCancel = () => {
    setSelectedLabel(null);
  };

  return (
    <div className="label-container">
      <header className="header">
        <div>
          <img src="public/logo.jpg" alt="logo" />
        </div>
        <div className="header-right">
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </header>

      {loading ? (
        <div className="loading-message">🔄 Loading labels...</div>
      ) : (
        <table className="label-table">
          <thead>
            <tr>
              <th>Label Name</th>
              <th>Is Approved</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label) => (
              <tr key={label.labelId}>
                <td>{label.labelKey}</td>
                <td>{label.approved ? '✅' : '❌'}</td>
                <td>
                  <span className="view-link" onClick={() => viewDetails(label)}>
                    View details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedLabel && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Label</h3>

            <div className="translation-row">
              <label>
                Label Name:
                <input type="text" value={selectedLabel.labelName} disabled />
              </label>
            </div>

            <div className="translation-row">
              <label><strong>Translated Labels:</strong></label>
            </div>

            {languages.map((lang) => (
  <div className="translation-row" key={lang.languageCode}>
    <label>
      {lang.languageName} ({lang.languageCode.toUpperCase()}): {/* Display language name and code */}
      <input
        type="text"
        value={editedTranslation[lang.languageCode]?.[selectedLabel.labelKey] || ''}
        onChange={(e) => handleInputChange(lang.languageCode, e.target.value)}
      />
    </label>
  </div>
))}


            <div className="translation-row">
              <span>Is Approved:</span>
              <label>
                <input
                  type="radio"
                  name="approval"
                  value="true"
                  checked={approved === true}
                  onChange={() => setIsApproved(true)}
                  disabled={user.role !== 'PROOFREADER'}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="approval"
                  value="false"
                  checked={approved === false}
                  onChange={() => setIsApproved(false)}
                  disabled={user.role !== 'PROOFREADER'}
                />
                No
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn green" onClick={handleSave}>Save</button>
              <button className="btn gray" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Label Manager App | Designed by You ✨</p>
      </footer>
    </div>
  );
};

export default Labels;
