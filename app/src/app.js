const bodyParser = require("body-parser");
const user_routes = require("./routes/route");
const productAPI = require(path.join(__dirname,"/products-API"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api", user_routes);

module.exports = app;
