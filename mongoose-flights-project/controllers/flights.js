var Flight = require('../models/flight');
// var Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show
}

function index(req, res) {
    Flight.find({}).sort({departs: 1}).exec(function(err, flights){
        res.render('flights/index', { flights });
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight)
    {

        Ticket.find({flight: flight._id}, function(err, tickets) {
            //get an array with destinations excluding the flight airport and
            //any destination airport already added
            var dest = ['AUS', 'DAL', 'LAX', 'SEA'];
            //remove flight airport from dest
            dest.splice(dest.indexOf(flight.airport), 1);
            for(var i=0; i< flight.destinations.length; i++){
                if(dest.indexOf(flight.destinations[i].airport) != -1){
                    dest.splice(dest.indexOf(flight.destinations[i].airport), 1);
                }
            }
        flight.destinations.sort(function(a,b){
            if (a.arrival > b.arrival) return 1;
            return -1;
        });
        res.render('flights/show', { title: 'Flight Details', flight, tickets, dest});
        });
    });
}

function create(req, res) {
    for (let key in req.body){
        if (req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function(err) {
        //one way to handle errors
        if (err) return res.render('flights/new');
        console.log(flight);
        //for now, redirect right back to new.ejs
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}