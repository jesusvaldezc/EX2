const express = require('express')
const map = require('./museum.js')
const aux = require("./alumnos.js")
const port = process.env.PORT || 3000
const app = express()

app.get("/students/:id", (req, res) => {
    var id = req.params.id;
    console.log(id);
    aux.estudiante(id, alumno => {
      res.send({alumno});
    });
  });

app.get('/met', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: "Debes de enviar una locación valida, asegurate de estar escribiendo bien el query de la direccion"
        })
    }
    map.museo(req.query.search, function (error, museumData) {
        if (error) {
            return res.send({
                error: error
            })
        } else {   
            return res.send({
                museumData
                });      
        }
    })
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });
  

app.get('/*', function (req, res) {
    return res.send({
        error: "Ruta no es valida, por favor proporciona otra ruta"
    })

})

app.listen(port, function () {
    console.log('Up and running!!!')
})