"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var dbConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URL, {
        tls: true,
        tlsAllowInvalidCertificates: true, // Use with caution. For development only.
        tlsAllowInvalidHostnames: true
    }).then(function () { return console.log('database connected successfully'); }, function (error) { return console.log(error); });
};
exports.dbConnect = dbConnect;
