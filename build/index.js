"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var infrastructure_1 = require("./infrastructure");
var presentation_1 = require("./presentation");
var dotenv = __importStar(require("dotenv"));
// Load the ".env" file from the root. Afterwards check all required environment bindings
var envResult = dotenv.config();
if (envResult.error != undefined) {
    console.log("Warning: dotenv failed parsing the .env file ".concat(envResult.error));
}
if (process.env.API_PREFIX == undefined) {
    console.log("Missing environment variable 'API_PREFIX'");
    process.exit(1);
}
if (process.env.MONGO_CONNECTION_STRING == undefined) {
    console.log("Missing environment variable 'MONGO_CONNECTION_STRING'");
    process.exit(1);
}
if (process.env.MONGO_DOCUMENT_NAME == undefined) {
    console.log("Missing environment variable 'MONGO_DOCUMENT_NAME'");
    process.exit(1);
}
if (process.env.MONGO_DB_NAME == undefined) {
    console.log("Missing environment variable 'MONGO_DB_NAME'");
    process.exit(1);
}
if (process.env.PORT == undefined) {
    console.log("Missing environment variable 'PORT'");
    process.exit(1);
}
var server = (0, fastify_1.default)();
// Register the controllers
server.register(presentation_1.exerciseController, {
    prefix: process.env.API_PREFIX,
    // Constructing the Mongo repository also starts the connection to Mongo
    exerciseRepository: new infrastructure_1.MongoExerciseRepository(process.env.MONGO_CONNECTION_STRING, process.env.MONGO_DOCUMENT_NAME, process.env.MONGO_DB_NAME),
});
server.register(presentation_1.statusController, {
    prefix: process.env.API_PREFIX,
});
server.listen({ port: Number(process.env.PORT), host: '0.0.0.0' }, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Server listening at ".concat(address));
});
