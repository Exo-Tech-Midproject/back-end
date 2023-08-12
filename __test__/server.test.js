"use strict";

require("dotenv").config();
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const {app} = require("../src/server");
const supertest = require("supertest");
const req = supertest(app);
const {db, patient} = require("../src/models/index");

const MethodCollection = require("../src/models/CRUD/CRUD");
const {testing, model2, model3} = require("../src/models/index");

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe("testing the server", () => {
    it("POST to /signup/:model to create a new user.", async () => {
        const res = await req.post("/signup/physician").send({
            username: "Hasan1",
            password: "12asd31",
            fullName: "HasaasdnTom111",
            licenseId: 123444,
            gender: "male",
            birthDate: "1996-08-07",
            mobileNumber: "13231",
            emailAddress: "hasasdad1@gmail.com",
            nationalID: "1asd",
            department: "ENT",
        });

        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual("Hasan1");
        expect(await bcrypt.compare("12asd31", res.body.user.password)).toEqual(true);
    });
    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .post("/login/physician")
        .set("Authorization", `Basic ${await base64.encode("Hasan1:12asd31")}`);

        // console.log(res.request._header.authorization); // Log the authorization header value
        expect(res.status).toBe(200); // since Jalal is in the database, the auth middleware will work fine and send 200 status code.
        expect(res.request._header.authorization).toBe("Basic SGFzYW4xOjEyYXNkMzE=");
    });

    it("404 on a bad route", async () => {
        const res = await req.get("/pageNotFound");
        expect(res.status).toBe(404);
    });

    it("500 on a invalid model", async () => {
        const res = await req.get("/patient/abdullah/profile");
        expect(res.status).toBe(500);
    });
});

describe("MethodCollection", () => {
    const mockModel = {
        findOne: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    };

    const methodCollection = new MethodCollection(mockModel);

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test get method
    it("should retrieve a record by id", async () => {
        mockModel.findOne.mockResolvedValue("mocked record");

        const result = await methodCollection.get(1);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {id: 1}});
        expect(result).toEqual("mocked record");
    });

    it("should retrieve all records if no id is provided", async () => {
        mockModel.findAll.mockResolvedValue(["record1", "record2"]);

        const result = await methodCollection.get();

        expect(mockModel.findAll).toHaveBeenCalledWith({});
        expect(result).toEqual(["record1", "record2"]);
    });

    // Test create method
    it("should create a record", async () => {
        const mockRecord = {name: "Test Record"};
        mockModel.create.mockResolvedValue("created record");

        const result = await methodCollection.create(mockRecord);

        expect(mockModel.create).toHaveBeenCalledWith(mockRecord);
        expect(result).toEqual("created record");
    });

    // Test update method
    it("should update a record by id", async () => {
        const mockData = {name: "Updated Record"};
        const mockRecord = {update: jest.fn().mockResolvedValue("updated record")};
        mockModel.findOne.mockResolvedValue(mockRecord);

        const result = await methodCollection.update(1, mockData);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {id: 1}});
        expect(mockRecord.update).toHaveBeenCalledWith(mockData);
        expect(result).toEqual("updated record");
    });

    // Test updateByUN method
    it("should update a record by username", async () => {
        const mockData = {name: "Updated Record"};
        const mockRecord = {update: jest.fn().mockResolvedValue("updated record")};
        mockModel.findOne.mockResolvedValue(mockRecord);

        const result = await methodCollection.updateByUN("testUser", mockData);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(mockRecord.update).toHaveBeenCalledWith(mockData);
        expect(result).toEqual("updated record");
    });

    // Test delete method
    it("should delete a record by id", async () => {
        mockModel.destroy.mockResolvedValue(1);

        const result = await methodCollection.delete(1);

        expect(mockModel.destroy).toHaveBeenCalledWith({where: {id: 1}});
        expect(result).toEqual(1);
    });

    // Test deleteByUN method
    it("should delete a record by username", async () => {
        mockModel.destroy.mockResolvedValue(1);

        const result = await methodCollection.deleteByUN("testUser");

        expect(mockModel.destroy).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(result).toEqual(1);
    });

    // Test getRelatedData method
    it("should retrieve related data for a model", async () => {
        // Mock your model's findOne with the expected response
        const mockRelatedModel = {History: ["history1", "history2"]};
        mockModel.findOne.mockResolvedValue({...mockRelatedModel});

        const result = await methodCollection.getRelatedData(testing); // Pass your related model

        expect(mockModel.findOne).toHaveBeenCalledWith({
            include: [
                {
                    model: testing, // Pass the related model
                    as: "History",
                    attributes: {
                        exclude: ["patientUN", "id"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "token", "password", "accountType"],
            },
        });
        expect(result).toEqual({...mockRelatedModel});
    });
    // Test getRelatedDataForOne method
    it("should retrieve related data for a model", async () => {
        // Mock your model's findOne with the expected response
        const mockRelatedModel = {History: ["history1", "history2"]};
        mockModel.findOne.mockResolvedValue({...mockRelatedModel});

        const result = await methodCollection.getRelatedData(testing); // Pass your related model

        expect(mockModel.findOne).toHaveBeenCalledWith({
            include: [
                {
                    model: testing, // Pass the related model
                    as: "History",
                    attributes: {
                        exclude: ["patientUN", "id"],
                    },
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "token", "password", "accountType"],
            },
        });
        expect(result).toEqual({...mockRelatedModel});
    });

    it("should retrieve a record by username", async () => {
        const mockRecord = {id: 1, username: "testUser"};
        mockModel.findOne.mockResolvedValue(mockRecord);

        const result = await methodCollection.getByUN("testUser");

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(result).toEqual(mockRecord);
    });

    it("should retrieve all records if no username is provided", async () => {
        const mockRecords = [
            {id: 1, username: "user1"},
            {id: 2, username: "user2"},
        ];
        mockModel.findAll.mockResolvedValue(mockRecords);

        const result = await methodCollection.getByUN();

        expect(mockModel.findAll).toHaveBeenCalledWith({});
        expect(result).toEqual(mockRecords);
    });

    it("should retrieve all records if an empty username is provided", async () => {
        const mockRecords = [
            {id: 1, username: "user1"},
            {id: 2, username: "user2"},
        ];
        mockModel.findAll.mockResolvedValue(mockRecords);

        const result = await methodCollection.getByUN("");

        expect(mockModel.findAll).toHaveBeenCalledWith({});
        expect(result).toEqual(mockRecords);
    });

    it("should retrieve related data for one record of a model (Prescriptions)", async () => {
        const mockPrescriptions = ["prescription1", "prescription2"];
        mockModel.findOne.mockResolvedValue({Prescriptions: mockPrescriptions});

        const result = await methodCollection.getRelatedDataForOne("testUser", testing);

        expect(mockModel.findOne).toHaveBeenCalledWith({
            where: {username: "testUser"},
            include: [
                {
                    model: testing,
                    as: "Prescriptions",
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "token", "password", "accountType"],
            },
        });
        expect(result).toEqual({Prescriptions: mockPrescriptions});
    });

    it("should get subscriptions for a physician", async () => {
        const mockUser = {username: "testUser"};
        const mockSubscriber = ["subscriber1", "subscriber2"];
        mockModel.findOne.mockResolvedValue(mockUser);
        mockUser.getSubscriber = jest.fn().mockResolvedValue(mockSubscriber);

        const result = await methodCollection.getSubscriptionsPhysician("testUser", model2, model2, model3);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(mockUser.getSubscriber).toHaveBeenCalledWith({
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "token",
                    "password",
                    "accountType",
                    "birthDate",
                    "address",
                    "nationalID",
                    "gender",
                ],
            },
        });
        expect(result).toEqual(mockSubscriber);
    });
    it("should retrieve related data for a model (HistoryCreated)", async () => {
        const mockHistoryCreated = [
            {id: 1, name: "history1"},
            {id: 2, name: "history2"},
        ];
        mockModel.findAll.mockResolvedValue(mockHistoryCreated);

        const result = await methodCollection.getRelatedDataPhysician(model2, model3);

        expect(mockModel.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: model2,
                    as: "HistoryCreated",
                    attributes: {
                        exclude: ["patientUN", "id"],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "token",
                    "password",
                    "accountType",
                    "birthDate",
                    "address",
                    "nationalID",
                    "gender",
                ],
            },
        });
        expect(result).toEqual(mockHistoryCreated);
    });

    it("should retrieve related data for one record of a model (HistoryCreated)", async () => {
        const mockHistoryCreated = {id: 1, name: "history1"};
        mockModel.findOne.mockResolvedValue(mockHistoryCreated);

        const result = await methodCollection.getRelatedDataOnePhysician("testUser", model2, model2, model3);

        expect(mockModel.findOne).toHaveBeenCalledWith({
            where: {username: "testUser"},
            include: [
                {
                    model: model2,
                    as: "HistoryCreated",
                    attributes: {
                        exclude: ["id"],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "token",
                    "password",
                    "accountType",
                    "birthDate",
                    "address",
                    "nationalID",
                    "gender",
                ],
            },
        });
        expect(result).toEqual(mockHistoryCreated);
    });

    it("should get subscriptions for a patient", async () => {
        const mockUser = {username: "testUser"};
        const mockSubscription = ["subscription1", "subscription2"];
        mockModel.findOne.mockResolvedValue(mockUser);
        mockUser.getSubscription = jest.fn().mockResolvedValue(mockSubscription);

        const result = await methodCollection.getSubscriptionsPatient("testUser", model2, model2, model3);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(mockUser.getSubscription).toHaveBeenCalledWith({
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "token",
                    "password",
                    "accountType",
                    "birthDate",
                    "address",
                    "nationalID",
                    "gender",
                ],
            },
        });
        expect(result).toEqual(mockSubscription);
    });

    it("should get subscriptions for a physician", async () => {
        const mockUser = {username: "testUser"};
        const mockSubscriber = ["subscriber1", "subscriber2"];
        mockModel.findOne.mockResolvedValue(mockUser);
        mockUser.getSubscriber = jest.fn().mockResolvedValue(mockSubscriber);

        const result = await methodCollection.getSubscriptionsPhysician("testUser", model2, model2, model3);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "testUser"}});
        expect(mockUser.getSubscriber).toHaveBeenCalledWith({
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "token",
                    "password",
                    "accountType",
                    "birthDate",
                    "address",
                    "nationalID",
                    "gender",
                ],
            },
        });
        expect(result).toEqual(mockSubscriber);
    });
    it("should retrieve physician groups by username", async () => {
        const mockUser = {username: "abdullah"};
        const mockGroups = ["group1", "group2"];
        mockModel.findOne.mockResolvedValue(mockUser);
        mockUser.getGroups = jest.fn().mockResolvedValue(mockGroups);

        const result = await methodCollection.readPhysicianGroups("abdullah", model2);

        expect(mockModel.findOne).toHaveBeenCalledWith({where: {username: "abdullah"}});
    });
});
