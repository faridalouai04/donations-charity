const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

const supabase = createClient(
  'https://wdtpmpgijsaprzcxtzsl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkdHBtcGdpanNhcHJ6Y3h0enNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNzE5MzgsImV4cCI6MjA1MTY0NzkzOH0.b_c4CapGRWfNj3lMf-iMcFdfOoERdLsihYwLcdE8vKU'
);

// --- Utility function to validate required fields ---
const validateFields = (fields, requiredFields) => {
  for (const field of requiredFields) {
    if (!fields[field]) {
      return `${field} is required.`;
    }
  }
  return null;
};

// --- Campaign Routes ---
app.get('/api/campaigns', async (req, res) => {
  const { data, error } = await supabase.from('campaigns').select('*');
  if (error) {
    console.error('Error fetching campaigns:', error);
    return res.status(500).send('Error fetching campaigns');
  }
  if (!data || data.length === 0) {
    return res.status(404).send({ message: 'No campaigns found' });
  }
  res.status(200).json(data);
});

app.post('/api/campaigns', async (req, res) => {
  const { title, description, goalAmount, preferredCurrency, startDate, endDate, charityId } = req.body;

  // Validation for missing fields
  const validationError = validateFields(req.body, ['title', 'description', 'goalAmount', 'preferredCurrency', 'startDate', 'endDate', 'charityId']);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const goal_amount = parseFloat(goalAmount);
  const charity_id = parseInt(charityId, 10);

  if (isNaN(goal_amount) || isNaN(charity_id)) {
    return res.status(400).send({ message: 'Invalid number for goalAmount or charityId' });
  }

  const { data, error } = await supabase.from('campaigns').insert([
    {
      title,
      description,
      goal_amount,
      preferred_currency: preferredCurrency,
      start_date: startDate,
      end_date: endDate,
      charity_id,
    },
  ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).send({ message: 'Error inserting campaign', error });
  }

  if (!data || data.length === 0) {
    return res.status(500).send({ message: 'Failed to insert campaign, no data returned' });
  }

  res.status(201).json(data[0]);
});

app.put('/api/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, goalAmount, preferredCurrency, startDate, endDate, charityId } = req.body;

  // Validation for missing fields
  const validationError = validateFields(req.body, ['title', 'description', 'goalAmount', 'preferredCurrency', 'startDate', 'endDate', 'charityId']);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const goal_amount = parseFloat(goalAmount);
  const charity_id = parseInt(charityId, 10);

  if (isNaN(goal_amount) || isNaN(charity_id)) {
    return res.status(400).send({ message: 'Invalid number for goalAmount or charityId' });
  }

  const { data, error } = await supabase
    .from('campaigns')
    .update({
      title,
      description,
      goal_amount,
      preferred_currency: preferredCurrency,
      start_date: startDate,
      end_date: endDate,
      charity_id,
    })
    .eq('id', id)
    .select('*'); // Ensure updated record is returned

  if (error) {
    console.error('Error updating campaign:', error);
    return res.status(500).send('Error updating campaign');
  }

  if (!data || data.length === 0) {
    return res.status(404).send({ error: 'Campaign not found or no changes made' });
  }

  res.status(200).json(data[0]);
});

app.delete('/api/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('campaigns').delete().eq('id', id);
  if (error) {
    console.error('Error deleting campaign:', error);
    return res.status(500).send('Error deleting campaign');
  }

  if (!data || data.length === 0) {
    return res.status(404).send({ message: 'Campaign not found' });
  }

  res.status(204).send();
});

// --- Charity Routes ---
app.get('/api/charities', async (req, res) => {
  const { data, error } = await supabase.from('charities').select('*');
  if (error) {
    console.error('Error fetching charities:', error);
    return res.status(500).send('Error fetching charities');
  }
  if (!data || data.length === 0) {
    return res.status(404).send({ message: 'No charities found' });
  }
  res.status(200).json(data);
});

app.post('/api/charities', async (req, res) => {
  const { name, description, location, websiteUrl, contactInfo, identificationDocument, documentStatus } = req.body;

  // Validation for missing fields
  const validationError = validateFields(req.body, ['name', 'description']);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const { data, error } = await supabase.from('charities').insert([
    {
      name,
      description,
      location,
      website_url: websiteUrl,
      contact_info: contactInfo,
      identification_document: identificationDocument,
      document_status: documentStatus || 'Pending', // Default to 'Pending' if no status provided
    },
  ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).send({ message: 'Error inserting charity', error });
  }

  if (!data || data.length === 0) {
    return res.status(500).send({ message: 'Failed to insert charity, no data returned' });
  }

  res.status(201).json(data[0]);
});

// --- Donor Routes ---
app.get('/api/donors', async (req, res) => {
  const { data, error } = await supabase.from('donors').select('*');
  if (error) {
    console.error('Error fetching donors:', error);
    return res.status(500).send('Error fetching donors');
  }
  if (!data || data.length === 0) {
    return res.status(404).send({ message: 'No donors found' });
  }
  res.status(200).json(data);
});

app.post('/api/donors', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, preferredLanguage, address } = req.body;

  // Validation for missing fields
  const validationError = validateFields(req.body, ['firstName', 'lastName', 'email']);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const { data, error } = await supabase.from('donors').insert([
    {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      preferred_language: preferredLanguage,
      address,
    },
  ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).send({ message: 'Error inserting donor', error });
  }

  if (!data || data.length === 0) {
    return res.status(500).send({ message: 'Failed to insert donor, no data returned' });
  }

  res.status(201).json(data[0]);
});

// --- Donation Routes ---
app.get('/api/donations', async (req, res) => {
  const { data, error } = await supabase.from('donations').select('*');
  if (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).send('Error fetching donations');
  }
  if (!data || data.length === 0) {
    return res.status(404).send({ message: 'No donations found' });
  }
  res.status(200).json(data);
});

// Example: Express.js with Supabase
app.delete('/api/donors/:id', async (req, res) => {
  const { id } = req.params;

  // Make sure the ID is a valid number
  const donorId = parseInt(id, 10);
  if (isNaN(donorId)) {
    return res.status(400).send({ message: 'Invalid donor ID' });
  }

  try {
    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', donorId);

    if (error) {
      return res.status(500).send({ message: 'Error deleting donor' });
    }

    res.status(204).send(); // Success response without content
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).send({ message: 'Error deleting donor' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
