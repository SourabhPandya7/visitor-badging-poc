const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const HUBSPOT_ACCESSTOKEN = process.env.HUBSPOT_ACCESSTOKEN;


const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

// Helper to search for contact by name, company, or email
async function findContact({ name, company, email }) {
    console.log(`Searching for contact: Name: ${name}, Company: ${company}, Email: ${email}`);
    
    // Search by email if provided
    if (email) {
        const emailRes = await axios.get(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
            headers: {
                Authorization: `Bearer ${HUBSPOT_ACCESSTOKEN}`,
                'Content-Type': 'application/json',
            }

        });
        console.log(`Email search response: ${JSON.stringify(emailRes.data)}`);
        // If we find a contact with this email, return it
        if (emailRes.data.results && emailRes.data.results.length > 0) {
            // Find a contact with the exact email match
            const found = emailRes.data.results.find(
            contact => contact.properties.email === email
            );
        // If we find a contact with the exact email match, return it
        console.log(`Found contact by email: ${JSON.stringify(found)}`);
        
            if (found) {
            return found;
            }
        }
    }
    // Search by name and company
    const nameCompanyRes = await axios.get(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
         headers: {
                Authorization: `Bearer ${HUBSPOT_ACCESSTOKEN}`,
                'Content-Type': 'application/json',
            },
            params: {
                properties: 'email,firstname,company',
                limit: 1,
                query: email
            }
        });
    console.log(`Name and Company search response: ${JSON.stringify(nameCompanyRes.data)}`);
    // If we find a contact with this name and company, return it

    if (nameCompanyRes.data.results && nameCompanyRes.data.results.length > 0) {
        const contact = nameCompanyRes.data.results[0];
        if (contact.properties.company === company) {
            return contact;
        }
    }
    return null;
}

app.post('/api/visitor', async (req, res) => {
    const { name, company, email } = req.body;
    console.log(`Received visitor: ${name}, Company: ${company}, Email: ${email}`);
    
    try {
        const existing = await findContact({ name, company, email });
        console.log(`Existing contact found: ${JSON.stringify(existing)}`);
        if (
            existing &&
            existing.properties.email === email
        ) {
            return res.json({ duplicate: true, contact: existing });
        }
        console.log('No existing contact found, creating new contact...');
        // If no existing contact, create a new one
        // Create new contact
        try {const createRes = await axios.post(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
            {
                properties: {
                    email: email,
                    firstname: name,
                    company: company
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${HUBSPOT_ACCESSTOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );
            console.log(`Contact created: ${JSON.stringify(createRes.data)}`);
            
        } catch (error) {
            console.error('Error creating contact:', error.response ? error.response.data : error.message);
            return res.status(500).json({ error: 'Failed to create contact', details: error.response ? error.response.data : null });
            
        }

        console.log(`Contact created: ${JSON.stringify(createRes)}`);
        res.json({ duplicate: false, contact: createRes.data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));