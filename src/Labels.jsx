import React, { useState, useEffect } from 'react';
import './product.label.css';
import { useNavigate } from 'react-router-dom';

const Labels = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || {});
  const [labels, setLabels] = useState([]);
  const [language, setLanguage] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [approved, setIsApproved] = useState(false);
  const [editedTranslation, setEditedTranslation] = useState({});
  const [labelId, setLabelId] = useState(null);
  
  useEffect(() => {
      if (user.id) {
        fetchLabels(user.id);
      }
    }, [user.id]);
  
 useEffect(() => {
      if(labelId){
      fetchLanguages(labelId);
      }
    }, [labelId]);

  
  const fetchLabels = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/labels/${id}`); // based on user Id I am getting Lables
      if (response.ok) {
        const data = await response.json();
        setLabels(data);
      } else {
        console.error('Failed to fetch labels');
      }
    } catch (error) {
      console.error('Error fetching labels:', error);
    }
  };
  
  const fetchLanguages = async (labelId) => {
    try {
      const response = await fetch(`http://localhost:8082/language/${labelId}`); // based on labelId I getting Langaues
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched languages:', data); // <-- Add this
        setLanguage(data);
      } else {
        console.error('Failed to fetch languages');
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };
  
 const logout = () => {
    localStorage.removeItem('user');
    navigate('/home');
  };

  const viewDetails = (label) => {
    setSelectedLabel(label);
    setIsApproved(label.approved || false);
    setEditedTranslation(label.translation || {});
    setLabelId(label.labelId);   
  };

  const handleInputChange = (languageKey, value) => {
    setEditedTranslation((prev) => ({
      ...prev,
      [languageKey]: value,
    }));
  };

  // const updateLanguage = async (languageKey, newLname) => {
  //   if (!languageKey || !newLname) {
  //     console.error("Missing languageKey or new name");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch(`http://localhost:8082/language/update/${languageKey}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ lname: newLname }),
  //     });
  
  //     if (response.ok) {
  //       console.log('Language updated');
  //     } else {
  //       console.error('Failed to update language');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  const handleSave = async () => {
    for (const lang of language) {
      const newLname = editedTranslation[lang.languageKey];
  
      if (!lang.languageKey || !newLname) {
        console.warn("Skipping update due to missing data:", lang.languageKey, newLname);
        continue;
      }
  
      try {
        const response = await fetch(`http://localhost:8082/language/update/${lang.languageKey}`, {
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
            <img src="public/logo.jpg" alt='logo'/>
        </div>
        <div className="header-right">
          <button className="logout-button" onClick={logout}>Logout</button>
        </div>
      </header>

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
            <tr key={label.id}>
              <td>{label.labelName}</td>
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
  {language.map((lang) => (
    <label key={lang.languageKey}>
      {lang.languageKey}:
      <input
        type="text"
        defaultValue={[lang.lname] || ''}
        onChange={(e) => handleInputChange(lang.languageKey, e.target.value)}
      />
    </label>
  ))}
</div>

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
      { 
                <button className="btn green" onClick={handleSave}>Save</button>
              }
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
