// src/App.tsx
import { useState, useEffect } from 'react';
import './styles.css';
import { Charity, Campaign, Donor } from './types';

const CharityManager = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    websiteURL: '',
    contactInfo: '',
    identificationDocument: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/charities', {
        method: 'POST',
        body: formDataToSend,
      });
      const newCharity = await response.json();
      setCharities([...charities, newCharity]);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        location: '',
        websiteURL: '',
        contactInfo: '',
        identificationDocument: null,
      });
    } catch (error) {
      console.error('Error adding charity:', error);
    }
  };

  return (
    <div className="card">
      <h2>Charity Management</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Form inputs remain the same */}
        <input
          type="text"
          placeholder="Charity Name"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={e => setFormData({...formData, location: e.target.value})}
        />
        <input
          type="text"
          placeholder="Website URL"
          value={formData.websiteURL}
          onChange={e => setFormData({...formData, websiteURL: e.target.value})}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={formData.contactInfo}
          onChange={e => setFormData({...formData, contactInfo: e.target.value})}
        />
        <div className="file-upload">
          <label>Identification Documents</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={e => setFormData({
              ...formData,
              identificationDocument: e.target.files ? e.target.files[0] : null
            })}
          />
        </div>
        <button type="submit" className="button">Add Charity</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Document Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {charities.map(charity => (
              <tr key={charity.id}>
                <td>{charity.name}</td>
                <td>{charity.location}</td>
                <td>
                  <span className={`status-badge ${charity.documentStatus.toLowerCase()}`}>
                    {charity.documentStatus}
                  </span>
                </td>
                <td>
                  <button className="button secondary">Edit</button>
                  <button className="button danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    preferredCurrency: 'USD',
    startDate: '',
    endDate: '',
    charityId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newCampaign = await response.json();
      setCampaigns([...campaigns, newCampaign]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        goalAmount: '',
        preferredCurrency: 'USD',
        startDate: '',
        endDate: '',
        charityId: '',
      });
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  return (
    <div className="card">
      <h2>Campaign Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="number"
          placeholder="Goal Amount"
          value={formData.goalAmount}
          onChange={e => setFormData({...formData, goalAmount: e.target.value})}
        />
        <select
          value={formData.preferredCurrency}
          onChange={e => setFormData({...formData, preferredCurrency: e.target.value})}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <input
          type="date"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={e => setFormData({...formData, startDate: e.target.value})}
        />
        <input
          type="date"
          placeholder="End Date"
          value={formData.endDate}
          onChange={e => setFormData({...formData, endDate: e.target.value})}
        />
        <button type="submit" className="button">Add Campaign</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Goal Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign.id}>
                <td>{campaign.title}</td>
                <td>{`${campaign.preferredCurrency} ${campaign.goalAmount}`}</td>
                <td>
                  <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </td>
                <td>
                  <button className="button secondary">Edit</button>
                  <button className="button danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DonorManager = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredLanguage: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const newDonor = await response.json();
      setDonors([...donors, newDonor]);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        preferredLanguage: '',
        address: '',
      });
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  return (
    <div className="card">
      <h2>Donor Management</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={e => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
        />
        <input
          type="text"
          placeholder="Preferred Language"
          value={formData.preferredLanguage}
          onChange={e => setFormData({...formData, preferredLanguage: e.target.value})}
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
        />
        <button type="submit" className="button">Add Donor</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map(donor => (
              <tr key={donor.id}>
                <td>{`${donor.firstName} ${donor.lastName}`}</td>
                <td>{donor.email}</td>
                <td>{donor.phoneNumber}</td>
                <td>
                  <button className="button secondary">Edit</button>
                  <button className="button danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('charities');

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'charities' ? 'active' : ''}`}
          onClick={() => setActiveTab('charities')}
        >
          Charities
        </button>
        <button
          className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button
          className={`tab ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          Donors
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'charities' && <CharityManager />}
        {activeTab === 'campaigns' && <CampaignManager />}
        {activeTab === 'donors' && <DonorManager />}
      </div>
    </div>
  );
};

export default Dashboard;
