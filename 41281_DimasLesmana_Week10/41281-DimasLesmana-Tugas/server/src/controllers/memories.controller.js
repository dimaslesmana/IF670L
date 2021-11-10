const db = require('../models');
const memoriesModel = db.memories;

exports.getAllMemories = async (req, res, next) => {
  try {
    const students = await memoriesModel.findAll(db);

    res.status(200).json(students);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.createMemory = async (req, res, next) => {
  const { nim, nama, prodi } = req.body;
  const foto = req.file?.path;

  if (!nim || !nama || !prodi) {
    const error = {
      statusCode: 400,
      message: 'Data yang dimasukkan tidak lengkap!',
    };

    return next(error);
  }

  try {
    const data = {
      nim: nim,
      nama: nama,
      prodi: prodi,
      foto: foto ?? null,
    };

    await memoriesModel.create(db, data);

    res.status(200).json({ message: "Data mahasiswa berhasil dimasukkan!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
