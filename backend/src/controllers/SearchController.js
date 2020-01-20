const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/pardeStringAsArray');

module.exports = {
    async index(req, res){
        //buscar todos os devs num raio de 10km
        //filtrar por tecnologia
        const { techs, latitude, longitude } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location:{
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return res.json(devs);

    }
}