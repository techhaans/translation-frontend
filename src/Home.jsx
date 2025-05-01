import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from'./product.tab.css';
import Labels from './Labels';

const Home = () => {
  const [activeTab, setActiveTab] = useState('general');
//   const[activetab ,setActivetab]=useState('labels');
const navigate = useNavigate();

  return (
    <div className="tabs-container">
      <div className="tab-header">
       
        <button
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >
          General Information
        </button>
        <button  className={ activeTab==='Labels' ? 'active' : ''}
              onClick={()=>navigate('/home/labels')} >
                Labels
            </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Manage Users
        </button>
      </div>

     <div className="tab-content">
        {activeTab === 'general' && (
          <div>
            <h3>General Information</h3>
            <p>This section will include default language and language list in a future Jira.</p>
          </div>
        )}
      
        {activeTab==='labels' && (
            <div>
                <h3>Labels</h3>
                <p>Labels Data for ex</p>
            </div>
        )}
        {activeTab === 'users' && (
          <div>
            <h3>Manage Users</h3>
            <p>Here you can add/edit users. (You can build form or list here.)</p>
          </div>
        )}
        </div>
      
    </div>
  );
};

export default Home;
