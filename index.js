const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
const path = require('path');

const app = express();
app.set("view engine", "ejs");

// Google Drive API Setup
const apikeys = require('./apikey.json');
const SCOPE = ['https://www.googleapis.com/auth/drive.file'];

async function authorize() {
    const authClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );
    await authClient.authorize();
    return authClient;
}

// Multer Storage for Temporary File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload'); // Temporary folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});
const upload = multer({ storage: storage });

// Route to Show Upload Form
app.get("/", (req, res) => {
    res.render("abc");
});

// Upload Image to Google Drive
app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.send("❌ No file uploaded.");
    }

    const authClient = await authorize();
    const drive = google.drive({ version: 'v3', auth: authClient });

    const filePath = path.join(__dirname, "upload", req.file.filename); //ye file ka path bata raha hai ki kaha se file uthani hai jaise {__dirname = current directory, upload = upload folder , req.file.filename = ushka naam jo upload ki hai}
    const fileMetaData = {
        name: req.file.originalname,
        parents: ['1Ne6Nfps1adlcGxSHcl8Y8qmcano8VpYU'] // Replace with your Google Drive Folder ID
    };

    const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(filePath)
    };

    try {
        const response = await drive.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        const fileId = response.data.id;
        const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

        // Delete File from Local After Upload
        fs.unlinkSync(filePath);

        return res.send(`✅ File Uploaded Successfully! <br> 
        <a href="${fileUrl}" target="_blank">View File</a>` );
    } catch (error) {
        console.error('❌ Error Uploading File:', error.message);
        return res.send("❌ Upload Failed!");
    }
});

app.listen(8000, () => console.log("🚀 Server Running on Port 8000"));
