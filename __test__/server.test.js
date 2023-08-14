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

            let token = '';
            let token2 = ''

describe("testing the server", () => {
    // ---------------- signup ---------------
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
        token = res.body.user.token
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual("Hasan1");
        expect(await bcrypt.compare("12asd31", res.body.user.password)).toEqual(true);
    });


    it("POST to /signup/:model to create a new user. wrong info", async () => {
        const res = await req.post("/signup/physician").send({
            username: "Hasan1"
            
        });
        
        expect(res.status).toBe(500);
        
    });

    it("POST to /signup/:model to create a new user.", async () => {
        const res = await req.post("/signup/patient").send({
            username: "test2",
            fullName: "testtest2",
            password: "123456",
            gender: "male",
            birthdate: "1998-08-01",
            race: "white",
            maritalStatus:"single" ,
            mobileNumber:"1234" ,
            emailAddress: "test2@gmail.com"


        });

            

        token2 = res.body.user.token
        expect(res.status).toBe(201);
        expect(res.body.user.username).toEqual("test2");
        expect(await bcrypt.compare("123456", res.body.user.password)).toEqual(true);
    });


     // ---------------- login ---------------

    it("POST to /signup/:model to create a new user with wrong info.", async () => {
        const res = await req.post("/signup/patient").send({
            username: "test2",

            
          });
       
        expect(res.status).toBe(500);
        
    });

    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .post("/login/physician")
        .set("Authorization", `Basic ${await base64.encode("Hasan1:12asd31")}`);

        

        expect(res.status).toBe(200);


        expect(res.request._header.authorization).toBe("Basic SGFzYW4xOjEyYXNkMzE=");
    });
    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes wrong info.", async () => {
        const res = await req
        .post("/login/physician")
        .set("Authorization", `Basic ${await base64.encode("Hasan1:12asd12331")}`);

        
        expect(res.status).toBe(403); 
    });
    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .post("/login/patient")
        .set("Authorization", `Basic ${await base64.encode("test2:123456")}`);

        
        expect(res.status).toBe(200); 
        expect(res.request._header.authorization).toBe("Basic dGVzdDI6MTIzNDU2");
    });
    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes. wrong", async () => {
        const res = await req
        .post("/login/patient")
        .set("Authorization", `Basic ${await base64.encode("test2:1234523236")}`);

        
        expect(res.status).toBe(403); ;
    });

    it("POST to /login/:model to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .post("/login/patient")
        .set("Authorization", `Basic ${await base64.encode("test2:123456")}`);

        
        expect(res.status).toBe(200); 
        expect(res.request._header.authorization).toBe("Basic dGVzdDI6MTIzNDU2");
    });

 // ---------------- profile ---------------
    it("get to /physician/:username/profile to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/physician/Hasan1/profile")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
    it("get to /physician/:username/profile to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/patient/test2/profile")
        .set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(200);
    });
    it("put to /physician/:username/profile .", async () => {
        const res = await req
        .put("/physician/Hasan1/profile").send({
            username: "Hasan1",
            password: "12asd31",
            fullName: "Hasantest",
            licenseId: 123444,
            gender: "male",
            birthDate: "1996-08-07",
            mobileNumber: "13231",
            emailAddress: "hasasdad1@gmail.com",
            nationalID: "1asd",
            department: "ENT",
        })
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(202);
    });
    it("put to /patient/:username/profile .", async () => {
        const res = await req
        .put("/patient/test2/profile").send({
            username: "test2",
            fullName: "testtest22",
            password: "123456",
            gender: "male",
            birthdate: "1998-08-01",
            race: "white",
            maritalStatus:"single" ,
            mobileNumber:"1234" ,
            emailAddress: "test2@gmail.com"

        })
        .set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(202);
    });

     // ---------------- physician subscribe ---------------
    it("get to /physician/:username/patients/:patientUN/subscribe to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/subscribe")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it("get to /physician/Hasan1/patients/subscribersto login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/subscribers")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

     // ---------------- patient subscribe ---------------
    it("get to /patient/test2/physicians/subscriptions to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/patient/test2/physicians/subscriptions")
        .set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(200);
    });

     // ---------------- physician appointments ---------------

    // it("POST to /physician/:username/patients/:patientUN/appointments", async () => {
    //     const res = await req.post("/physician/Hasan1/patients/test2/appointments").send({
    //         date: "7-8-2023",
    //     }).set("Authorization", `Bearer ${token}`);

    //     expect(res.status).toBe(201);
    // })

    it("get to /physician/:username/patients/:patientUN/appointments", async () => {
        const res = await req  .get("/physician/Hasan1/patients/test2/appointments")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it("get to /physician/:username/appointments", async () => {
        const res = await req  .get("/physician/Hasan1/appointments")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    // it("delete to /physician/:username/patients/:patientUN/appointments/:id", async () => {
    //     const res = await req  .delete("/physician/Hasan1/patients/test2/appointments/1")
    //     .set("Authorization", `Bearer ${token}`);

    //     expect(res.status).toBe(204);
    // });

     // ---------------- physician groups ---------------

    it("post to /physician/:username/groups", async () => {
        const res = await req
        .post("/physician/Hasan1/groups").send({
            groupName:"group1",
            physicianUN:"Hasan1"
        })
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(201);
    });

    it("post to /physician/:username/patients/:patientUN/addtogroup/:groupName", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test2/addtogroup/group1")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(201);
    });

    it("get to /physician/:username/groups", async () => {
        const res = await req
        .get("/physician/Hasan1/groups")
        .set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(200);
    });

    it("get to /physician/:username/groups/:id", async () => {
        const res = await req
        .get("/physician/Hasan1/groups/1")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });

    it("put to /physician/:username/groups/:id", async () => {
        const res = await req
        .put("/physician/Hasan1/groups/1").send({
            groupName:"group2",
            physicianUN:"Hasan1"
        })
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(202);
    });

     // ---------------- patient Groups ---------------

     it("get to /patient/:username/groups", async () => {
        const res = await req
        .get("/patient/test2/groups")
        .set("Authorization", `Bearer ${token2}`);
        
        expect(res.status).toBe(200);
    });

    it("get to /patient/:username/groups/:groupName", async () => {
        const res = await req
        .get("/patient/test2/groups/group2")
        .set("Authorization", `Bearer ${token2}`);
        
        expect(res.status).toBe(200);
    });

     // ---------------- Delete Groups ---------------

    it("delete to /physician/:username/groups/:id", async () => {
        const res = await req
        .delete("/physician/Hasan1/groups/1")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(204);
    });

     // ---------------- errors ---------------
    it("404 on a bad route", async () => {
        const res = await req.get("/pageNotFound");
        expect(res.status).toBe(404);
    });

    it("500 on a invalid model", async () => {
        const res = await req.get("/patient/abdullah/profile");
        expect(res.status).toBe(500);
    });



     // ---------------- physician subscribe ---------------
     it("get to /physician/:username/patients/:patientUN/subscribe to login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/subscribe")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });
     it("get to /physician/:username/patients/:patientUN/subscribe to login as a user (use basic auth). & Need tests for auth middleware and the routes wrong token.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/subscribe")
        .set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(500);
    });
     it("subscribe but physician isn't authorized.", async () => {
        const res = await req
        .get("/physician/Hasan12/patients/test2/subscribe")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500);
    });

    it("get to /physician/Hasan1/patients/subscribersto login as a user (use basic auth). & Need tests for auth middleware and the routes.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/subscribers")
        .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
    });


    //--------------------------- Patient Vitals -------------------------
    it("post to /patient/:username/vitals .", async () => {
        const res = await req
        .post("/patient/test2/vitals").send({
            heartRate: 68
            
          })
        .set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(201); 
    })
    it("post to /patient/:username/vitals .", async () => {
        const res = await req
        .post("/patient/test2/vitals").send({
            heartRate: 2525
            
          })
        .set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(500); 
    })
    it("post to /patient/:username/vitals .", async () => {
        const res = await req
        .post("/patient/test222/vitals").send({
            heartRate: 2525
            
          })
        .set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(500); 
    })
    it("get to /patient/:username/vitals .", async () => {
        const res = await req
        .get("/patient/test2/vitals").set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(200); 
    })
    it("get to /patient/:username/vitals/id .", async () => {
        const res = await req
        .get("/patient/test2/vitals/1").set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(200); 
    })
    it("put to /patient/:username/vitals/:id .", async () => {
        const res = await req
        .put("/patient/test2/vitals/1").send({
            heartRate: 75
            
          })
        .set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(202); 
    })
    it("delete to /patient/:username/vitals/1 .", async () => {
        const res = await req
        .delete("/patient/test2/vitals/1").set("Authorization", `Bearer ${token2}`);

        
        expect(res.status).toBe(200); 
    })
    //--------------------------- Physician Vitals -------------------------
    
    it("get to /physician/:username/patients/vitals .", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/vitals").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(200); 
    })

    it("get to /physician/:username/patients/:PatientUN/vitals .", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/vitals").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200); 
    })
    it("get to /physician/:username/patients/:PatientUN/vitals  patient not subscribed.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test22/vitals").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    //--------------------------- Physician Appointment -------------------------
    
    it(" post to /physician/:username/patients/:patientUN/appointments correct info.", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test2/appointments").send({
            date: "2027-08-12"
        }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(201); 
    })
    it(" post to /physician/:username/patients/:patientUN/appointments wrong patient name.", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test23/appointments").send({
            date: "2027-08-12"
        }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })
    it(" post to /physician/:username/patients/:patientUN/appointments  wrong date.", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test2/appointments").send({
            date: "2022-08-12"
        }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })

    it("get to /physician/:username/patients/:patientUN/appointments  correct info.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/appointments").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200); 
    })
    it("get to /physician/:username/patients/:patientUN/appointments wrong patient name.", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test22/appointments").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("put to /physician/:username/patients/:patientUN/appointments correct info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test2/appointments/1").send({
            date: "2025-08-12"
        }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(202); 
    })
    it("put to /physician/:username/patients/:patientUN/appointments wroing patient info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test222/appointments/1").send({
            date: "2025-08-12"
        }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("put to /physician/:username/patients/:patientUN/appointments wrong appointment info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test2/appointments/99").send({
            date: "2025-08-12"
        }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("delete to /physician/:username/patients/:patientUN/appointments wrong appointment info.", async () => {
        const res = await req
        .delete("/physician/Hasan1/patients/test2/appointments/99").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("delete to /physician/:username/patients/:patientUN/appointments correct appointment info.", async () => {
        const res = await req
        .delete("/physician/Hasan1/patients/test2/appointments/1").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200); 
    })
    
    //--------------------------- Patient Appointment -------------------------
    it("get to /patient/:username/appointments  no appointments info.", async () => {
        const res = await req
        .get("/patient/test2/appointments").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(500); 
    })
    it("get to /patient/:username/physicians/:physicianUN/appointments  no appointments info.", async () => {
        const res = await req
        .get("/patient/test2/physicians/Hasan1/appointments").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(500); 
    })
    it("get to /patient/test2/appointments/99  no appointments info.", async () => {
        const res = await req
        .get("/patient/test2/appointments/99").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(500); 
    })
    it(" post to /physician/:username/patients/:patientUN/appointments correct info.", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test2/appointments").send({
            date: "2027-08-12"
        }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(201); 
    })
    it("get to /patient/:username/appointments  with appointment.", async () => {
        const res = await req
        .get("/patient/test2/appointments").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(200); 
    })
    it("get to /patient/:username/physicians/:physicianUN/appointments  correct appointments info.", async () => {
        const res = await req
        .get("/patient/test2/physicians/Hasan1/appointments").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(200); 
    })
    it("get to /patient/test2/appointments/2  found appointments info.", async () => {
        const res = await req
        .get("/patient/test2/appointments/2").set("Authorization", `Bearer ${token2}`);

        expect(res.status).toBe(200); 
    })

    //--------------------------- Physician Prescriptions -------------------------
    it(" get to /physician/:username/patients/prescriptions no Data", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/prescriptions").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })
    it(" get to /physician/:username/patients/:patientUN/prescriptions' no Data", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/prescriptions").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })
    it(" get to /physician/:username/patients/:patientUN/prescriptions' wrongPatient Data", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test22/prescriptions").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })
    it("put to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test2/prescriptions/99").send({
            
            dateOfIssue: "2023-01-12",
              patientName: "Ahmad",
              diagnosis: "Cold Flu",
              medicines: [{"drugname":"Metformin"},{"drugname":"Amaryl","dosage": "one tablet after the meal "}],
              physicianName: "Khalil" ,
              signature:"123123",
              username:"test12"

      }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("put to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test222/prescriptions/99").send({

            dateOfIssue: "2023-01-12",
              patientName: "Ahmad",
              diagnosis: "Cold Flu",
              medicines: [{"drugname":"Metformin"},{"drugname":"Amaryl","dosage": "one tablet after the meal "}],
              physicianName: "Khalil" ,
              signature:"123123",
              username:"test12"

      }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("delete to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .delete("/physician/Hasan1/patients/test2/prescriptions/99").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })
    it("delete to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .delete("/physician/Hasan1/patients/test222/prescriptions/99").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(500); 
    })


    it(" post to /physician/:username/patients/:patientUN/appointments correct info .", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test2/prescriptions").send({

            dateOfIssue: "2023-01-12",
              patientName: "Ahmad",
              diagnosis: "Cold Flu",
              medicines: [{"drugname":"Metformin"},{"drugname":"Amaryl","dosage": "one tablet after the meal "}],
              physicianName: "Khalil" ,
              signature:"123123",
              username:"test12"

      }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(201); 
    })
    it(" post to /physician/:username/patients/:patientUN/appointments wrong info .", async () => {
        const res = await req
        .post("/physician/Hasan1/patients/test22/prescriptions").send({

            dateOfIssue: "2023-01-12",
              patientName: "Ahmad",
              diagnosis: "Cold Flu",
              medicines: [{"drugname":"Metformin"},{"drugname":"Amaryl","dosage": "one tablet after the meal "}],
              physicianName: "Khalil" ,
              signature:"123123",
              username:"test12"

      }).set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(500); 
    })
    

    it(" get to /physician/:username/patients/prescriptions no Data", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/prescriptions").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(200); 
    })
    it(" get to /physician/:username/patients/:patientUN/prescriptions' no Data", async () => {
        const res = await req
        .get("/physician/Hasan1/patients/test2/prescriptions").set("Authorization", `Bearer ${token}`);
        
        expect(res.status).toBe(200); 
    })

    it("put to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .put("/physician/Hasan1/patients/test2/prescriptions/1").send({
            
            dateOfIssue: "2023-01-12",
              patientName: "Ahmad",
              diagnosis: "Cold Fluuu",
              medicines: [{"drugname":"Metformin"},{"drugname":"Amaryl","dosage": "one tablet after the meal "}],
              physicianName: "Khalil" ,
              signature:"123123",
              username:"test12"

      }).set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(202); 
    })
   
    it("delete to /physician/:username/patients/:patientUN/prescriptions/:id no info.", async () => {
        const res = await req
        .delete("/physician/Hasan1/patients/test2/prescriptions/1").set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200); 
    })
    
 //--------------------------- Patient Prescriptions -------------------------

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
