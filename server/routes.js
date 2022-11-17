const controllers = require('./controllers.js');
const router = require('express').Router();

router.get('/places', controllers.getPlaces);

router.post('/places', controllers.addPlace);

router.delete('/places/:place_id', controllers.deletePlace);

router.patch('/places/:place_id', controllers.updatePlace);

router.get('/food', controllers.getFood);

router.get('/activities', controllers.getActivities);

router.get('/attractions', controllers.getAttractions);

router.get('/others', controllers.getOthers);

router.get('/faves', controllers.getFaves);

module.exports = router;
