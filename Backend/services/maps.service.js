const axios = require('axios')
const captainModel = require('../models/captain.model')


module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${process.env.MAPS_API_KEY}`)
        if(response.data.status === 'OK'){
            const location= response.data.results[0].geometry.location
            return{
               
                lng: location.lng,
                ltd: location.lat,
            }
        }
    } catch (error) {
        console.log(error);
        throw error
        
    }

}

module.exports.getDistanceTime = async (origin,destination) => {
    try {
        if(!origin || !destination)
            throw new Error("Origin and Destination are required")

        const response = await axios.get(`https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.MAPS_API_KEY}`)

        // console.log(response);
        

        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error("No route found")}

            const distanceTime = response.data.rows[0].elements[0]
            return distanceTime}
        else{
            throw new Error("Unable to find distance and time")
        }



    } catch (error) {
        console.log(error);
        throw error
    }
}


module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input)
        throw new Error("Input is required")

    

    try{
        const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${process.env.MAPS_API_KEY}`)

        if(response.data.status === 'OK'){
            return response.data.predictions
        }else{
            throw new Error("Unable to find suggestions")
        }
    }
    catch(error){
        console.log(error);
        throw error
    }
}


module.exports.getCaptainsInTheRadius = async ({ ltd, lng, radius }) => {
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, ltd], radius / 6378.1]
                }
            }
        });
        console.log(captains);
        return captains;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
