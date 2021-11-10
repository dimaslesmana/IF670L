const db = require('../models');
const studentModel = db.student;

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await studentModel.findAll(db);

    res.status(200).json(students);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.createStudent = async (req, res, next) => {
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

    await studentModel.create(db, data);

    res.status(200).json({ message: "Data mahasiswa berhasil dimasukkan!" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
