const fs = require('fs');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = 'token.json';

module.exports = {

    /**
     * Create an OAuth2 client with the given credentials, and then execute the given callback function.
     */
    authorize: function(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    },

    /**
    * Describe with given media and metaData and upload it using google.drive.create method()
    */ 
    uploadFile: function(auth) {
        const drive = google.drive({version: 'v3', auth});
        const fileMetadata = {
            'name': 'photo.jpg'
        };
        const media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('files/photo.jpg')
        };
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, (err, file) => {
            if (err) {
            // Handle error
            console.error(err);
            } else {
            console.log('File Id: ', file.id);
            }
        });


    },


};

