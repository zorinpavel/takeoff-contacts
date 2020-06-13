const mongoose = require('mongoose');

const defaultContacts = [
    {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'Alisa Hester',
        'email': 'alisa.hester@gmail.com',
        'position': 'Marketing',
        'photo': 'https:\/\/i.imgur.com\/XVMNba2.jpg'
    },
    {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'Pedro Marques \u00f0\u0178\u008d\u0153',
        'email': 'pedro.marques.\u00f0\u0178\u008d\u0153@gmail.com',
        'position': 'Marketing',
        'photo': 'https:\/\/pbs.twimg.com\/profile_images\/1074967357716598784\/KsziMw9C.jpg'
    },
    {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'Veeti Seppanen',
        'email': 'veeti.seppanen@gmail.com',
        'position': 'Data Entry',
        'photo': 'https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg'
    },
    {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'Heriberto Howell',
        'email': 'heriberto.howell@gmail.com',
        'position': 'Clerical',
        'photo': 'https:\/\/i.imgur.com\/BVpUhtw.jpg'
    },
    {
        '_id': new mongoose.Types.ObjectId(),
        'name': 'Afonsinho',
        'email': 'afonsinho@gmail.com',
        'position': 'Marketing',
        'photo': 'https:\/\/pbs.twimg.com\/profile_images\/838955836554809344\/36K1AQPs.jpg'
    }
];

module.exports = defaultContacts;
