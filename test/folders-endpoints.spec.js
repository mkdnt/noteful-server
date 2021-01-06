require('dotenv')
const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { Context } = require('mocha');
const supertest = require('supertest');
const { makeFoldersArray } = require("./folders-fixtures");

describe("Folders Endpoints", function () {
    let db;

    before("make knex instance", () => {
        db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    console.log(process.env.TEST_DATABASE_URL)

    after("disconnect from db", () => db.destroy());

    before("clean the table", () => db.raw("TRUNCATE folders, notes RESTART IDENTITY CASCADE")
    );

    afterEach("cleanup", () =>     db.raw("TRUNCATE folders, notes RESTART IDENTITY CASCADE")
    );

    describe(`GET /folders`, () => {
        context("Given there are folders in the database", () => {
        const testFolders = makeFoldersArray();

        beforeEach("insert folders", () => {
            return db.into("folders").insert(testFolders);
        });

        it("GET /folders repsponds with 200 and all of the folders", () => {
            return supertest(app).get("/folders").expect(200, testFolders);
        });
        });

        context(`Given no folders`, () => {
        it(`responds with 200 and an empty list`, () => {
            return supertest(app).get("/folders").expect(200, []);
        });
        });
    });

    describe(`GET /folders/:folder_id`, () => {
        context(`Given there are folders in the database`, () => {
        const testFolders = makeFoldersArray();

        beforeEach(`insert articles`, () => {
            return db.into("folders").insert(testFolders);
        });

        it("GET /folders/:folder_id responds with 200 and the specified folder", () => {
            const folderId = 2;
            const expectedFolder = testFolders[folderId - 1];
            return supertest(app)
            .get(`/folders/${folderId}`)
            .expect(200, expectedFolder);
        });
        });

        context(`Given no folders`, () => {
        it(`responds with 404`, () => {
            const folderId = 123456;
            return supertest(app)
            .get(`/folders/${folderId}`)
            .expect(404, { error: { message: `Folder doesn't exist` } });
        });
        });
    });
});