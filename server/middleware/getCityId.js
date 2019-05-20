const axios = require('axios')

module.exports = {
    async getCityId(req, res, next) {

        let alldata = await axios
            .get('https://api.rajaongkir.com/starter/city', {
                headers: {
                    key: process.env.APIKEY
                }
            })
        let allCities = alldata.data.rajaongkir.results

        let cityId = null

        allCities.map(async (e) => {
            if (e.province.toLowerCase() === req.body.province.toLowerCase() && e.city_name.toLowerCase() === req.body.city.toLowerCase()) {
                cityId = e.city_id
            }
        })
        req.body.cityId = cityId
        next()
    }
}