exports.findAll = async (db) => {
  try {
    return await db.client.select().table(db.table.students);
  } catch (error) {
    throw new Error("Oops! Something went wrong.");
  }
};

exports.create = async (db, data) => {
  try {
    await db.client(db.table.students).insert(data);
  } catch (error) {
    throw new Error("Oops! Something went wrong.");
  }
};
