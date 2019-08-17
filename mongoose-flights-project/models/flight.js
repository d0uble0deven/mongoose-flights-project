var mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
var Schema = mongoose.Schema;
 
var destinationSchema = new Schema({
    airport: 
    {type: String,
        enum: ['American', 'Southwest', 'United']
    },
    arrival: {
    type: Date
    }
});

var flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function () {
            var redate = new Date();
            redate.setFullYear(redate.getFullYear()+1)
            return redate.toLocaleDateString();}
    },
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    destinations:[destinationSchema]
    }, {
    timestamps: true
    });

 module.exports = mongoose.model('Flight', flightSchema);