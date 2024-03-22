import express from "express";

//routing api
const NAMES = [
  ["Michael", "Chang"], ["Neel", "Kishnani"], ["Kashif", "Nazir"]
];
const STUDENTS = {};
const COURSES = {};

for (let [givenName, surname] of NAMES) {
  let id = (givenName[0] + surname).toLowerCase();
  STUDENTS[id] = { id, givenName, surname, dept: null, units: 0 };
  COURSES[id] = [];
}

let myApi = express.Router();

myApi.get("/students", (req, res) => {

  console.log("List students");
  let students = Object.values(STUDENTS);
  let search = req.query.q;

  if(search){
    students = [];

    for(let student of Object.values(STUDENTS)){
      let name = `${student.givenName} ${student.surname}`.toLowerCase();
      if(name.includes(search.toLowerCase())){
        students.push(student);
      }
    }
  }

  res.json({students});


});



const initApi = (app) =>{
  app.use("/api", myApi);
}

export default initApi;
