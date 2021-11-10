const db = require('../models');
const memoriesModel = db.memories;

const base64 = require('../helpers/base64');

exports.getAllMemories = async (req, res, next) => {
  try {
    const memories = await memoriesModel.findAll(db);
    const newMemories = memories.map(({ lat, lng, ...memories }) => {
      memories.location = { lat, lng };
      return memories;
    });

    res.status(200).json(newMemories);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.createMemory = async (req, res, next) => {
  const { title, type, photo, lat, lng } = req.body;

  if (!title || !type || !lat || !lng) {
    const error = {
      statusCode: 400,
      message: 'Data yang dimasukkan tidak lengkap!',
    };

    return next(error);
  }

  const fileName = new Date().getTime() + '.jpg';
  base64.decode(fileName, photo);

  try {
    const data = {
      title: title,
      type: type,
      photo: `uploads/${fileName}`,
      lat: lat,
      lng: lng,
    };

    await memoriesModel.create(db, data);

    res.status(200).json({ message: "Data memory berhasil dimasukkan!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
