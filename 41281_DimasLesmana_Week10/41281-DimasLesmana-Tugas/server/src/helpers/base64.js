const fs = require('fs');

exports.decode = (filename, base64Data) => {
  const buffer = Buffer.from(base64Data, 'base64');

  fs.writeFileSync(`uploads/${filename}`, buffer);

  buffer.fill(0);
};
