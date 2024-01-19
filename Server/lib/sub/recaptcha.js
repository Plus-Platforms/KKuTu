/**
 * Created by horyu1234 on 2017-11-14.
 */
const request = require('request');
const GLOBAL = require("./global.json");

exports.verifyRecaptcha = function (responseToken, remoteIp, callback) {
    const verifyUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify?secret=${GLOBAL.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${responseToken}&remoteip=${remoteIp}`;
    request(verifyUrl, (err, response, body) => {
        try {
            const responseBody = JSON.parse(body);
            callback(responseBody.success);
        } catch (e) {
            callback(false);
        }
    });
};