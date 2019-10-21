const request = require('request')

const museo = function (searchArtist, callback) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + searchArtist
    console.log(url)
    request({ url, json: true }, function (error, response) {
        if (error) {
            callback('Error en la conexion con The Metropolitan Museum of Art Collection API ', undefined)
        }
        else {
            const data = response.body
            if (data.total == 0) {
                return callback('No existe ningun objecto relacionado con algun artista', undefined)
            }
            if (data.message) {
                return callback('Error en la escritura del url', undefined)
            }
            else {
                const objectID = data.objectIDs[0]
                const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID
                console.log(url)
                request({ url, json: true }, function (error, response) {
                    if (error) {
                      return callback(error, undefined)
                    }
                    else {
                        const data = response.body
                        if(data.message)
                        {
                            return callback('Esto no deberia estar pasando, error de objectID', undefined)
                        }
                        else
                        {
                            const info = {
                                searchTerm: searchArtist,
                                artist: data.constituents[0].name,
                                title: data.title,
                                year: data.objectEndDate,
                                technique: data.medium,
                                metUrl: data.objectURL
                            }
                          return  callback(undefined, info)
                        }
                       
                    }
            
                })
            }

        }

    })
}
module.exports = {
    museo: museo
}

