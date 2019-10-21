
const request = require("request")
const info = require("./studentInfo.js");

estudiante = function (id, callback) {
  const alumno = info.alumnos.find(function (item) {
    return item.id === id;
  });

  if (alumno) {
    callback(alumno, undefined)
  }
  else {
    callback({ error: "Matricula invalida y/o no tiene información" }, undefined);
  }

};

module.exports = { estudiante };