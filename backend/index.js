const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const {google} =require('googleapis')
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const { JWT }=require('google-auth-library') ;


const app = express();

const port = 3000;
// const private_key_id= "85694586835bf08eddbf1c6422ba3d8033a48a1d";
const spreadsheetId ='1d0YzhmjsrCOR8nvWucAMHiI_1vTwBES4URsB0nZfExg';
// const client_email= "sheets@banded-badge-247716.iam.gserviceaccount.com";


// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Change '*' to the specific origin(s) you want to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
    // Use body-parser to parse form data
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, age } = req.body;
    console.log("name",name,"email",email,"age",age);
  // Authenticate with Google Sheets using your credentials

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes:  'https://www.googleapis.com/auth/spreadsheets',
});
  const client = await auth.getClient();
    const googleSheets =google.sheets({version:'v4',auth:client})
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range:"Sheet1!A:C",
        valueInputOption:"USER_ENTERED",
        requestBody:{
            values:[[name,email,age]]
        }
        
    })
    console.log(metaData.data)

//   // Load the Google Sheet
//   await doc.loadInfo();

//   // Select the first sheet
//   const sheet = doc.sheetsByIndex[0];

//   // Append the form data to the Google Sheet
//   await sheet.addRow({ Name: name, Email: email, Age: age });

  // Send a confirmation message
  res.send('Form submitted successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
