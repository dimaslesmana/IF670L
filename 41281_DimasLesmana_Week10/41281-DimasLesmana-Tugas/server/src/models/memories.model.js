exports.findAll = async (db) => {
  try {
    return await db.client.select().table(db.table.memories);
  } catch (error) {
    throw new Error("Oops! Something went wrong.");
  }
};

exports.create = async (db, data) => {
  try {
    await db.client(db.table.memories).insert(data);
  } catch (error) {
    throw new Error("Oops! Something went wrong.");
  }
};
