const admin = require('firebase-admin');
const serviceAccount = require('../../daring-precinct-237619-c196ea977ffb.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://daring-precinct-237619-default-rtdb.europe-west1.firebasedatabase.app"
});
exports.db = admin.database();
