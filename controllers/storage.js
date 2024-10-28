const { Storage } = require('@google-cloud/storage');
const path = require("path");

// Set up Google Cloud Storage client
const storage = new Storage({
  keyFilename: path.join(__dirname, "./key.json"),
  projectId: 'valued-door-314304', // Update with your project ID
});

const bucket = storage.bucket('storefnapp'); // Replace with your bucket name

module.exports = bucket;