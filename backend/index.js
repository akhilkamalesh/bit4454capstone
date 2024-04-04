const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sql, ConnectionPool } = require('mssql');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Database ConnectionPool
const pool = new ConnectionPool({
    user: 'cpscadmin',
    password: 'CP$CD@taB!t4454',
    server: 'cpsc-server0313.database.windows.net',
    database: 'CPSCDatabase0313',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
});

// Login api endpoint
app.post('/api/login', async (req, res) => {
    // Get username and password from form
    const { username, password } = req.body;

    try {
        await pool.connect();

        const queryString = "SELECT CPSCType FROM [dbo].[User] where Username = @username and Password = @password";

        const result = await pool.request()
            .input('Username', username)
            .input('Password', password)
            .query(queryString);

        // No match found
        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Username and password matched
        const { CPSCType } = result.recordset[0];
        return res.status(200).json({ CPSCType });

    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await pool.close();
    }
});

// Load recalls table api endpoint
app.get('/api/load-recalls', async (req, res) => {
    try {
        await pool.connect();

        // Query database for recalls data, extracting only the date portion of the datetime values
        const result = await pool.request().query('SELECT RecallID, ProductName, UnitsInCirculation, RecallReason, LEFT(CONVERT(varchar, RecallDate, 120), 10) AS RecallDate FROM [dbo].[Recalls]');

        // Send recalls data as JSON response
        res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching recalls data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Prioritize recalls api endpoint
app.post('/api/prior-recalls', async (req, res) => {
    try {
        // Get the checked RecallIDs from the request body
        const { recallIDs } = req.body;

        // Check if recallIDs is an array
        if (!Array.isArray(recallIDs)) {
            throw new Error('RecallIDs must be an array');
        }

        // Check if recallIDs array is empty
        if (recallIDs.length === 0) {
            return res.status(400).json({ error: 'No RecallIDs provided' });
        }

        // Connect to the database
        await pool.connect();

        // Construct the SQL UPDATE statement with parameter placeholders
        const recallIDIntegers = recallIDs.map(id => parseInt(id));
        const placeholders = recallIDIntegers.map(() => '?').join(', ');
        const queryString = `UPDATE [dbo].[Recalls] SET IsPrioritized = 1 WHERE RecallID IN (${placeholders})`;
        res.json({message: queryString});
        // // Execute the query with recallIDs as parameters
        // const result = await pool.request().query(queryString);

        // // Send a success response
        // res.json({ message: 'Recalls updated successfully' });

    } catch (error) {
        console.error('Error updating recalls:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Close the database connection
        await pool.close();
    }
});

app.get('/api/load-tickets', async (req, res) => {
    try {
        await pool.connect();

        // Query database for recalls data, extracting only the date portion of the datetime values
        const ticketsQuery = 'SELECT ListingID, TicketID, PriorityLevel, LEFT(CONVERT(varchar, TicketDateTime, 120), 10) AS TicketDateTime FROM [dbo].[Ticket]';
        const ticketsResult = await pool.request().query(ticketsQuery);

        const listingIDs = ticketsResult.recordset.map(ticket => ticket.ListingID);

        const listingsQuery = `SELECT RecallID, ListingID, ListingName, Vendor FROM [dbo].[Listing] WHERE ListingID IN (${listingIDs.map(id => `'${id}'`).join(',')})`;
        const listingsResult = await pool.request().query(listingsQuery);

        // Send data as JSON response
        res.json({ tickets: ticketsResult.recordset, listings: listingsResult.recordset });

    } catch (error) {
        console.error('Error fetching recalls data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Load recalls table api endpoint
app.get('/api/load-listings', async (req, res) => {
    try {
        await pool.connect();

        // Query database for recalls data, extracting only the date portion of the datetime values
        const result = await pool.request().query('SELECT RecallID, ProductName, UnitsInCirculation, RecallReason, LEFT(CONVERT(varchar, RecallDate, 120), 10) AS RecallDate FROM [dbo].[Recalls]');

        // Send recalls data as JSON response
        res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching recalls data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
