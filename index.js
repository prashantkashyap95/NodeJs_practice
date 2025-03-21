// ...............................modular programming.......................................................

// const math = require("./math")

// console.log("Adding value is ",math.addFn(5,3));
// math.subFn(5,3);

// .............................File handling............................................................

// const fs = require("fs");

// fs.writeFileSync("./demo.txt", "namaste ye ek demo file hai...");
// const result = fs.readFileSync("./demo.txt","utf-8");
// fs.appendFileSync("./demo.txt", "or ye line demo ke liye h")
// console.log(result);

// const content =  fs.readFileSync("./demo.txt", "utf-8");
// console.log(content);

// fs.readFile("./demo.txt", "utf-8", (err, result) => {
//    console.log(result);
// })

// fs.cp("./demo.txt" , "./demoCpy.txt", (err) => {
//     if(err) {
//         console.log(err);
//     }
// });
// fs.unlink("./demoCpy.txt", (err) => {
//     if(err) {
//         console.log(err);
//     }
// });

//...............................Creating Server.................................................................

// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const myServer = http.createServer((req, res) => {

//     const myUrl = url.parse(req.url);

//     const log = `${Date.now()} ${req.method} ${req.url} new request received\n ${myUrl.query}`;
//    fs.appendFile("userReqData.txt", log ,((err, data) => {

//     console.log(myUrl);

//     if(myUrl.pathname === "/about") {
//         res.end("hello this is developed by prashant kashyap");
//     } else if (myUrl.pathname === "/contact") {
//         res.end("Email - Prashant@124.gmail.com\nPhone number - 1234567890");
//     } else  if (myUrl.pathname === "/"){
//         res.end("hello from server...");
//     } else  if (myUrl.pathname === "/search"){
//         res.end(`we are searching ${myUrl.query.search_query}`)

//     } else  if (myUrl.pathname === "/favicon.ico"){
//         res.end()

//     }

//     else {
//         res.end("No page found ('_')");
//     }

//    }))

// });

// myServer.listen(8000, () => console.log("server started"));

//.................................Express........................................................................

// const express = require("express");
// const users = require("./MOCK_DATA.json");
// const fs = require("fs");
// const app = express();
// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://chunnukashyap31:chunnukashyap1234@cluster0.bf0pp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(function(){
//     console.log("DB connected")
// })

// app.use(express.urlencoded({ extended: false }));

//...........................This is middleware.................................................................
// app.use((req, res, next) => {
    
//   console.log("hello from middleware 1");
//   next();
// }),
//   app.use((req, res, next) => {
//     console.log("hello from middleware 2");
//     next();
//   });
//.....................................................................................................................

// app.get("/", (req, res) => {
//   res.end("hello this is a homepage");
// });

// app.get("/" ,(req , res) => {
//     res.json({
//         msg: "this is homepage"
//     })
// } )

// app.get("/api/users", (req, res) => {
//   console.log(req.headers);
//   return res.json(users);
// });

// app.get("/users", (req, res) => {
//   const html = `<ol>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ol>`;

//   return res.send(html);
// });




//  app.get("/api/users/:userid" , (req, res) => {
//     const id = req.params.userid;
//     const user = users.find((user) =>
//          user.id == id
//      );
//     if(!user) {
//         res.send("404 NO USER FOUND")
//     } else {
//         res.send(`Name - ${user.first_name}<br> Email - ${user.email}`);
//     }
//  })

// app.get("/api/users/:userid", (req, res) => {
//   const id = req.params.userid;

//   const user = users.find((user) => {
//     return user.id == id;
//   });

//   if (!user) {
//     return res.status(404).json({ msg: "404 NOT FOUND" });
//   }

//   return res.json(user);
// }
// );




// //..............................POST REQUEST TO STORE DATA........................................................

// app.post("/api/users", (req, res) => {
//   const body = req.body;
//   if (
//     !body.first_name ||
//     !body.last_name ||
//     !body.email ||
//     !body.gender ||
//     !body.job_title
//   ) {
//     return res.status(400).json({ msg: "Please fill all the fields..." });
//   }
//   users.push({ ...body, id: users.length + 1 });
//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
//     if (err) {
//       return res.json({ msg: "Unable to save data..." });
//     } else {
//       return res.json({ msg: "successfully send..." });
//     }
//   });
// });



//..........................CONNECT MONGO_DB.........................................................................notesses


// const express = require("express");
// const app = express();
// const users = require("./MOCK_DATA.json");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const note = require("./db_schema");
// const multer = require("multer");
// const path = require("path");


// mongoose.connect("mongodb+srv://chunnukashyap31:chunnukashyap1234@cluster0.bf0pp.mongodb.net/notesDB?retryWrites=true&w=majority&appName=Cluster0").then(function(){
//    console.log("database connected successfully...")
   
// })

// app.use(express.urlencoded({extended: false}));




// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//     res.render("abc");
// });

// app.get("/notes/list" , async (req, res) => {
//     const notes = await note.find();
//     const html = `<ul> 
//       ${notes.map((note) => `<li>${note.userId}</li>`).join("")}
//     </ul>` //map  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     return res.send(html); 
// });


// app.get("/notes/list/:userid", async (req, res)=> {
//     const id = req.params.userid;
//     const notes = await note.find({userId: id});
//     return res.json(notes);
// })


// app.post("/notes/add", async (req, res) => {

//     const body = req.body;

//     const addNotes = new note({
//         id: body.id,
//         userId: body.userId,
//         title: body.title,
//         content: body.content
//     });

//     await addNotes.save();
//     return res.json({msg: "Data save successfully!"})
    
// });

// app.get("/notes/delete", async (req,res) => {
   
//     await note.deleteOne({id: req.body.id});
//     return res.json({msg: `successfully deleted note Id - ${req.body.id}`});
// });

// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "./Upload")
//     } , 
//     filename: (req, file, cb) => {
//         cb(null , file.originalname)
//     }
// });

// const upload = multer({storage: storage});

// app.post("/upload", upload.single('file'), (req, res) => {
//     return res.redirect("/");
// })

// app.listen(8000, () => console.log("server started successfully!!!!"));



// const fs = require('fs');
// const { google }= require('googleapis');

// const apikeys = require('./apikey.json');
// const SCOPE = 'https://www.googleapis.com/auth/drive';

// // A Function that can provide access to google drive api
// async function authorize(){
//     const jwtClient = new google.auth.JWT(
//         apikeys.client_email,
//         null,
//         apikeys.private_key,
//         SCOPE
//     );

//     await jwtClient.authorize();

//     return jwtClient;
// }

// // A Function that will upload the desired file to google drive folder
// async function uploadFile(authClient){
//     return new Promise((resolve,rejected)=>{
//         const drive = google.drive({version:'v3',auth:authClient}); 

//         var fileMetaData = {
//             name:'image.png',    
//             parents:['1Ne6Nfps1adlcGxSHcl8Y8qmcano8VpYU'] // A folder ID to which file will get uploaded
//         }

//         drive.files.create({
//             resource:fileMetaData,
//             media:{
//                 body: fs.createReadStream('business.png'), // files that will get uploaded
//                 mimeType: 'image/png',
//             },
//             fields:'id'
//         },function(error,file){
//             if(error){
//                 return rejected(error)
//             }
//             resolve(file);
//         })
//     });
// }

// authorize().then(uploadFile).catch("error",console.error()); // function call

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
