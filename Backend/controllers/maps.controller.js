const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    
    const {address} = req.query
    try {
        const coordinates = await mapsService.getAddressCoordinates(address)
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({message: "Internal Server Error"})
    }

}

module.exports.getDistanceTime = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    
    const {origin,destination} = req.query
    try {
        const distanceTime = await mapsService.getDistanceTime(origin,destination)
        res.status(200).json(distanceTime)
    } catch (error) {
        res.status(404).json({message: "Internal Server Error"})
    }
    
}

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()})
        
        const {input} = req.query
        const suggestions = await mapsService.getAutoCompleteSuggestions(input)
        res.status(200).json(suggestions)
    } catch (error) {     
        res.status(404).json({message: "Internal Server Error"})
    } 
    
}