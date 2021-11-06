const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'views', "index.html"));
});

app.post('/submit', (req,res)=>{
  const email = req.body.email
  const key = req.body.key
  const url='https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates?email='+email+'&secret='+key;
  
  https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on('data', (data)=>{
      const userData = JSON.parse(data);
      console.log(userData)
      res.write("<p>You have registered!</p>")
      res.write("<p>ID: "+userData.id+"</p>")
      res.write("<p>Email: "+userData.email+"</p>")
      res.write("<p>Secret: "+userData.secret+"</p>")
      res.write("<p>Url: "+userData.repoURL+"</p>")
      res.write("<p>Created: "+userData.created+"</p>")
      res.write("<p>Modified: "+userData.modified+"</p>")
      res.send();
    })
  })
})

app.patch('/submit/:id', (req,res)=>{
  const id = req.params;
  const body = req.body;
  const url = 'https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates/'+id;
  const update = {"repoURL":"https://github.com/ben-yixin/API_Test","secret":"kfc"}
  https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on('data',(data)=>{

      res.json(update)
    })
  })
})

app.all('*', (req,res)=>{
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(3000,() => {
  console.log("Server is running on port 3000");
});