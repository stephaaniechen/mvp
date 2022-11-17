const Place = require('./db.js');

exports.getPlaces = (req, res) => {
  Place.find()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

exports.addPlace = (req, res) => {
  Place.create(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send(err));
};

exports.deletePlace = (req, res) => {
  Place.deleteOne(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send(err));
};

exports.updatePlace = (req, res) => {
  Place.findOneAndUpdate({_id: req.params.place_id}, req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(500).send(err));
};

exports.getFood = (req, res) => {
  Place.find({ category: 'food' })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

exports.getActivities = (req, res) => {
  Place.find({ category: 'activity' })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

exports.getAttractions = (req, res) => {
  Place.find({ category: 'attraction' })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

exports.getOthers = (req, res) => {
  Place.find({ category: 'other' })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};

exports.getFaves = (req, res) => {
  Place.find({ favorite: true })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
};
