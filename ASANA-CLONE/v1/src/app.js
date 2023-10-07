const express = require("express");
const fileUpload = require ("express-fileupload");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const {ProjectRoute , UserRoute , SectionRoute , TaskRoute}= require("./api-routes");
const path = require("path");

config();   //çevresel 
loaders();  //database için

const app =express();
app.use("/uploads",express.static(path.join(__dirname,"./","uploads")))
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT,()=>{
    console.log("Sunucu ayakta şuan..");
    app.use("/projects",ProjectRoute);
    app.use("/users",UserRoute);
    app.use("/sections",SectionRoute);
    app.use("/tasks",TaskRoute);
})