'use strict'

const express = require('express');
const physicianRouter = express.Router();
const basicAuthPhysician = require('../../middleware/auth/basicPhysician')
const bearerAuthphysician = require('../../middleware/auth/bearerPhysician')
const sequelize = require('sequelize')
const { storage, cloudinary } = require('../../cloudinary/cloudinary')
const multer = require('multer')
const upload = multer({ storage })






const { group, physician, patient, appointment, vital, disease, prescription, QuestionAnswer, Comment, groupPosts, messages, rating, notification } = require('../../models');

const { Op } = require('sequelize');
const e = require('express');







//Signup & login patient routes
physicianRouter.post('/signup/physician', signupPhysicianHandler);
physicianRouter.post('/login/physician', basicAuthPhysician, loginPhysiciantHandler)
physicianRouter.get('/logout', logoutHandler)


// physician subscription routes
physicianRouter.get('/physician/:username/patients/:patientUN/subscribe', bearerAuthphysician, handleSubscirbe)
physicianRouter.get('/physician/:username/patients/subscribers', bearerAuthphysician, handleAllSubscribers)

// physician profile routes
physicianRouter.get('/physician/:username/profile', bearerAuthphysician, physicianProfileGetHandlder)
physicianRouter.put('/physician/:username/profile', bearerAuthphysician, physicianProfileUpdateHandlder)

// physician Appointment routes
physicianRouter.post('/physician/:username/patients/:patientUN/appointments', bearerAuthphysician, addAppointmentToPatientByUN)
physicianRouter.get('/physician/:username/patients/:patientUN/appointments', bearerAuthphysician, getAppointmentOfPatientByUN)
physicianRouter.get('/physician/:username/appointments', bearerAuthphysician, getAllAppointmentOfPatient)
physicianRouter.put('/physician/:username/patients/:patientUN/appointments/:id', bearerAuthphysician, updateAppointmentOfPatientByUNandID)
physicianRouter.delete('/physician/:username/patients/:patientUN/appointments/:id', bearerAuthphysician, deleteAppointmentOfPatientByUN)

// physician Groups routes
physicianRouter.get('/physician/:username/groups', bearerAuthphysician, getGroup);
physicianRouter.get('/physician/:username/groups/:id', bearerAuthphysician, getOneGroup);
physicianRouter.put('/physician/:username/groups/:id', bearerAuthphysician, updateGroup);
physicianRouter.delete('/physician/:username/groups/:id', bearerAuthphysician, deleteGroup);
physicianRouter.post('/physician/:username/groups', bearerAuthphysician, createGroup);
physicianRouter.post('/physician/:username/patients/:patientUN/addtogroup/:groupName', bearerAuthphysician, addMembersToGroups);

// physician group posts routes
physicianRouter.get('/physician/:username/groups/:id/posts', bearerAuthphysician, getAllgroupsPosts);
physicianRouter.post('/physician/:username/groups/:id/posts', bearerAuthphysician, addgroupsPosts);
physicianRouter.get('/physician/:username/groups/:id/posts/:postID', bearerAuthphysician, getOneGroupsPostByID);
physicianRouter.put('/physician/:username/groups/:id/posts/:postID', bearerAuthphysician, updateOneGroupsPostByID);
physicianRouter.delete('/physician/:username/groups/:id/posts/:postID', bearerAuthphysician, deleteOneGroupsPostByID);

// physician Vitals routees
physicianRouter.get('/physician/:username/patients/vitals', bearerAuthphysician, getAllPatientsVitals)
physicianRouter.get('/physician/:username/patients/:PatientUN/vitals', bearerAuthphysician, getOnePatientVitals)


// physician History routees
physicianRouter.get('/physician/:username/patients/disease', bearerAuthphysician, getAllPatientHistory)
physicianRouter.get('/physician/:username/patients/:patientUN/disease', bearerAuthphysician, getPatientHistoryForPhysicianByUN)
physicianRouter.post('/physician/:username/patients/:patientUN/disease', bearerAuthphysician, addHistoryToPatientByUN)
physicianRouter.put('/physician/:username/patients/:patientUN/disease', bearerAuthphysician, updateSinglePatientHistoryByUn)

// physician prescriptions routees
physicianRouter.get('/physician/:username/patients/prescriptions', bearerAuthphysician, handleAllUserPrescriptions)
physicianRouter.get('/physician/:username/patients/:patientUN/prescriptions', bearerAuthphysician, getOnePatientAllPrescriptions)
physicianRouter.post('/physician/:username/patients/:patientUN/prescriptions', bearerAuthphysician, AddOnePatientPrescriptions)
physicianRouter.put('/physician/:username/patients/:patientUN/prescriptions/:id', bearerAuthphysician, updatePatientPrescriptionsByID)
physicianRouter.delete('/physician/:username/patients/:patientUN/prescriptions/:id', bearerAuthphysician, deleteOnePatientPrescriptionsByID)

// physician Q&A routes

physicianRouter.post('/physician/:username/Q&A/:id/comments', bearerAuthphysician, addComments);
physicianRouter.get('/physician/:username/Q&A/:id/comments', bearerAuthphysician, getComments);
physicianRouter.get('/physician/:username/Q&A', bearerAuthphysician, getAllPosts);
physicianRouter.put('/physician/:username/Q&A/:id/comments/:commentID', bearerAuthphysician, updateComments);
physicianRouter.delete('/physician/:username/Q&A/:id/comments/:commentID', bearerAuthphysician, deleteComments);


// physician  Chat routes
physicianRouter.get('/physician/:username/chat/:patientUN', bearerAuthphysician, getAllmessagesforphysician)
physicianRouter.post('/physician/:username/chat/:patientUN', bearerAuthphysician, postMessagesFromphysician)
physicianRouter.delete('/physician/:username/chat/:patientUN/:msgID', bearerAuthphysician, delMessagesFromphysician)
physicianRouter.put('/physician/:username/chat/:patientUN/:msgID', bearerAuthphysician, editMessagesFromphysician)



// physician  Rate routes
physicianRouter.get('/physician/:username/rating/', bearerAuthphysician, getAllRating)

// Physician Notifications routes
physicianRouter.get('/physician/:username/notifications', bearerAuthphysician, getAllNotifications)



//patient upload images route
physicianRouter.post('/physician/:username/uploadpfp', bearerAuthphysician, upload.single('image'), handlePhysicianProfileImage)
physicianRouter.post('/physician/:username/uploadcover', bearerAuthphysician, upload.single('image'), handlePhysicianCoverImage)

//Group && PostsImages
physicianRouter.post('/physician/:username/groups/:id/groupImg', bearerAuthphysician, upload.single('image'), handlePhysicianGroupImage)
physicianRouter.post('/physician/:username/groups/:id/posts/:postID/postImg', bearerAuthphysician, upload.single('image'), handlePhysicianPostImage)
// Functions



//----------------------------------------------------------------- Signup&Login handlers
//---------------------------------------------------------------------------------------

async function signupPhysicianHandler(req, res, next) {
    try {
        // req.body.username = req.body.username.toLowerCase()
        let user = await physician.create(req.body);
        const output = {
            user: user,
            token: user.token
        };
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
}
async function loginPhysiciantHandler(req, res, next) {
    try {
        const user = {
            user: req.user,
            token: req.user.token
        };
        const authToken = user.token;
        console.log(authToken);

        res.cookie('authToken', authToken, { maxAge: 86400000, httpOnly: true, path: '/' }); // 1 day expiration
        res.status(200).json(user);
    } catch (e) {
        next(e.message)
    }

}

async function logoutHandler(req, res) {
    res.cookie('authToken', '', { maxAge: 1 });
    res.redirect('/');
};
//----------------------------------------------------------------- Subscription handlers
//----------------------------------------------------------------------------------

async function handleSubscirbe(req, res, next) {
    const { username, patientUN } = req.params
    try {
        console.log(patientUN, username)
        let physicianName = await physician.getByUN(username)
        let patientName = await patient.getByUN(patientUN)



        if (!physicianName || !patientName) throw new Error(`Patient or Physician doesn't exist`)

        let exist = await physicianName.getSubscriber({
            where: {
                username: patientUN
            }
        })

        if (exist[0]) throw new Error('This patient already is a subscriber')

        console.log(physicianName, patientName)
        await physicianName.addSubscriber(patientName)

        let result = await physicianName.getSubscriber({
            attributes: ['fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race', 'profileImg', 'coverImg']

        })


        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}
async function handleAllSubscribers(req, res, next) {
    const { username } = req.params
    try {

        let physicianName = await physician.getByUN(username)




        if (!physicianName) throw new Error(`Physician doesn't exist`)

        let allSubscribers = await physicianName.getSubscriber({
            // attributes: ['username', 'mobileNumber', 'emailAddress', 'gender', 'fullName']
            attributes: ['username', 'fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race', 'profileImg', 'coverImg']
        })

        if (!allSubscribers[0]) throw new Error('You got no subscribers yet')


        res.status(200).json(allSubscribers)
    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------- Profile handlers
//----------------------------------------------------------------------------------
async function physicianProfileGetHandlder(req, res, next) {
    try {

        const username = req.params.username;


        // const userProfile = await physician.getByUN(username);
        const userProfile = await physician.model.findOne({
            where: { username: username },
            attributes: ['fullName', 'username', 'licenseId', 'gender', 'birthDate', 'mobileNumber', 'emailAddress', 'department', 'address', 'profileImg', 'coverImg', 'nationalID']
        });
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            // let result = {

            //     username:userProfile.username,
            //     fullName:userProfile.fullName,
            //     gender:userProfile.gender,
            //     birthdate:userProfile.birthDate,
            //     department:userProfile.department,

            // }
            res.status(200).json(userProfile);
        }
    } catch (err) {
        next(err)
    }

}
async function physicianProfileUpdateHandlder(req, res, next) {
    try {
        const { username } = req.params;
        const obj = req.body;

        let updateProfile = await physician.updateByUN(username, obj);

        if (!updateProfile) {
            return res.status(404).json({ error: 'Access denied' });
        } else {
            res.status(202).json(updateProfile);
        }
    } catch (err) {
        next(err)
    }
}

//----------------------------------------------------------------- Appointments handlers
//---------------------------------------------------------------------------------------

async function addAppointmentToPatientByUN(req, res, next) {
    try {

        const { username, patientUN } = req.params;
        const physicianFound = await physician.getByUN(username);

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })
            if (subscribers[0]) {

                let appointmentData = req.body;

                let mustAfter = `${new Date()}`.split(' ').slice(2, 4).reverse()
                let month = `0${new Date().getMonth() + 1}`
                mustAfter.splice(1, 0, month).join('-')
                if (!req.body.date > mustAfter) throw new Error("fix date")


                appointmentData.physicianUsername = username;
                appointmentData.patientUsername = patientUN;

                const appointmentInfo = await appointment.create(appointmentData);

                return res.status(201).json(appointmentInfo);

            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)
    } catch (err) {
        next(err)
    }

};
async function getAllAppointmentOfPatient(req, res, next) {
    try {

        const { username } = req.params;
        const physicianFound = await physician.getByUN(username);

        if (physicianFound) {

            const appointments = await appointment.model.findAll({ where: { physicianUsername: username } })
            return res.status(200).json(appointments);

        } else throw new Error(`Physician isn't found`)
    } catch (err) {
        next(err)
    }

};
async function getAppointmentOfPatientByUN(req, res, next) {
    try {

        const { username, patientUN } = req.params;
        const physicianFound = await physician.getByUN(username);

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })
            if (subscribers[0]) {

                const appointments = await appointment.model.findAll({ where: { physicianUsername: username, patientUsername: patientUN } })
                return res.status(200).json(appointments);

            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)
    } catch (err) {
        next(err)
    }

};
async function updateAppointmentOfPatientByUNandID(req, res, next) {
    try {

        const { username, patientUN, id } = req.params;
        const physicianFound = await physician.getByUN(username);

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })
            if (subscribers[0]) {

                const appointments = await appointment.model.findOne({ where: { physicianUsername: username, patientUsername: patientUN, id: id } })
                if (appointments) {
                    let appointmentData = req.body;
                    appointmentData.physicianUsername = username;
                    appointmentData.patientUsername = patientUN;
                    appointments.update(req.body)
                    return res.status(202).json(appointments);
                } else throw new Error(`Appointment doesn't exist`)

            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)
    } catch (err) {
        next(err)
    }

};
async function deleteAppointmentOfPatientByUN(req, res, next) {
    try {

        const { username, patientUN, id } = req.params;
        const physicianFound = await physician.getByUN(username);

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })
            if (subscribers[0]) {

                const appointments = await appointment.model.findOne({ where: { physicianUsername: username, patientUsername: patientUN, id: id } })
                if (appointments) {
                    let dateTosendBack = appointments.date;
                    console.log(dateTosendBack)
                    appointment.delete(id)
                    return res.status(200).json(`Appointment with id ${id} and date of ${dateTosendBack} has been deleted`);
                } else throw new Error(`Appointment doesn't exist`)

            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)
    } catch (err) {
        next(err)
    }

};

//----------------------------------------------------------------- Groups handlers
//---------------------------------------------------------------------------------

async function addMembersToGroups(req, res, next) {
    try {
        const { username, patientUN, groupName } = req.params
        let physicianFound = await physician.getByUN(username)
        if (!physicianFound) throw new Error('physician not found')
        let subscribers = await physicianFound.getSubscriber({
            where: {
                username: patientUN
            },
            through: {
                model: "subscriptions"
            }

        })
        if (!subscribers[0]) throw new Error(`This patient isn't a Subscriber yet`)
        let memberFOund = await patient.getByUN(patientUN)
        let groupsFound = await group.model.findOne({
            where: {
                groupName: groupName,
                physicianUN: username
            }
        })

        if (!groupsFound) throw new Error(`You don't own this group`)

        let addingMember = await groupsFound.addMember(memberFOund)
        let memberSoFar = await groupsFound.getMember()

        res.status(201).json(memberSoFar)
    } catch (err) {
        next(err)
    }
}

async function getGroup(req, res, next) {
    try {
        const { username } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        let groupsFound = await group.model.findAll({
            where: {
                physicianUN: username
            }
        })

        if (!groupsFound[0]) throw new Error('You have no groups yet!')

        res.status(200).json(groupsFound)
    } catch (err) {
        next(err)
    }
}

async function getOneGroup(req, res, next) {
    try {
        const { username, id } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        let groupsFound = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id

            }
        })

        if (!groupsFound) throw new Error(`This group doesn't exist`)

        res.status(200).json(groupsFound)
    } catch (err) {
        next(err)
    }
}


async function createGroup(req, res, next) {
    try {
        const { username } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        req.body.physicianUN = username
        let groupsNamefound = req.body.groupName
        let groupsFound = await group.model.findOne({
            where: {
                groupName: groupsNamefound,

            }
        })

        if (groupsFound) throw new Error(`This group name already taken choose another name`)

        let createdGroup = await group.create(req.body)

        res.status(201).json(createdGroup)
    } catch (err) {
        next(err)
    }
}

async function updateGroup(req, res, next) {
    try {
        const { username, id } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        req.body.physicianUN = username
        let groupsFound = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id

            }
        })

        if (!groupsFound) throw new Error(`No Such group exists in your groups list`)
        let groupNameToChange = req.body.groupName
        let checkedGroup = await group.model.findOne({
            where: {
                groupName: groupNameToChange

            }
        })
        if (checkedGroup) throw new Error("Group name exists, please choose another name")
        let updatedGroup = await groupsFound.update(req.body)

        res.status(202).json(updatedGroup)
    } catch (err) {
        next(err)
    }

}

async function deleteGroup(req, res, next) {
    try {
        const { username, id } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        req.body.physicianUN = username
        let groupsFound = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id

            }
        })

        if (!groupsFound) throw new Error(`No Such group exists in your groups list`)



        let deletedGroup = await group.delete(id)

        res.status(200).json(`Group with name : ${groupsFound.groupName} has deleted successfully`)
    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------- Groups posts  handlers
//---------------------------------------------------------------------------------
async function getAllgroupsPosts(req, res, next) {
    try {
        const { username, id } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')
        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })
        if (!foundGroup) throw new Error(`You don't own that group`)
        let groupsPostsFound = await groupPosts.model.findAll({
            where: {
                author: username,
                groupId: id

            }
        })

        if (!groupsPostsFound[0]) throw new Error('You have no posts yet!')


        res.status(200).json(groupsPostsFound)
    } catch (err) {
        next(err)
    }
}

async function getOneGroupsPostByID(req, res, next) {
    try {
        const { username, id, postID } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')
        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })
        if (!foundGroup) throw new Error(`You don't own that group`)
        let groupsPostsFound = await groupPosts.model.findOne({
            where: {
                author: username,
                groupId: id,
                id: postID

            }
        })

        if (!groupsPostsFound) throw new Error(`Post doesn't exist`)


        res.status(200).json(groupsPostsFound)
    } catch (err) {
        next(err)
    }
}


async function addgroupsPosts(req, res, next) {
    try {
        const { username, id } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })
        if (!foundGroup) throw new Error(`You don't own that group`)

        req.body.author = username
        req.body.groupId = id

        let createdPost = await groupPosts.create(req.body)


        res.status(201).json(createdPost)
    } catch (err) {
        next(err)
    }
}

async function updateOneGroupsPostByID(req, res, next) {
    try {
        const { username, id, postID } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        req.body.author = username
        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })

        if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
        let foundpost = await groupPosts.model.findOne({
            where: {
                id: postID,
                author: username,
                groupId: id
            }
        })

        if (!foundpost) throw new Error(`This post doesn't exist anymore`)
        let updatedPost = await foundpost.update(req.body)




        res.status(202).json(updatedPost)
    } catch (err) {
        next(err)
    }

}

async function deleteOneGroupsPostByID(req, res, next) {
    try {
        const { username, id, postID } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })

        if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
        let foundpost = await groupPosts.model.findOne({
            where: {
                id: postID,
                author: username,
                groupId: id
            }
        })

        if (!foundpost) throw new Error(`This post doesn't exist anymore`)
        let deletedPost = await groupPosts.model.destroy(
            {
                where: {
                    id: postID,
                    author: username,
                    groupId: id
                }
            }
        )




        res.status(200).json(`Post with id ${postID} in group ${foundGroup.groupName} has been deleted successfully`)
    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------- Vitals handlers
//---------------------------------------------------------------------------------
async function getAllPatientsVitals(req, res, next) {
    const { username } = req.params
    try {
        let getAllPatientsRecords = await physician.model.findByPk(username, {
            include: [
                {
                    model: patient.model,
                    as: 'Subscriber',
                    attributes: ['username', 'fullName', 'gender', 'insurance', 'race', 'maritalStatus'],
                    include:
                    {
                        model: vital.model,
                        as: 'VitalsRecord'
                    }
                }
            ],
            attributes: ['username']
        })
        if (!getAllPatientsRecords) throw new Error('Physician Not Found')
        let patientsRecordsCleaned = getAllPatientsRecords.Subscriber
        res.status(200).json(patientsRecordsCleaned)
    } catch (err) {
        next(err)
    }


}
async function getOnePatientVitals(req, res, next) {
    const { username, id, PatientUN } = req.params
    try {

        let getAllPatientsRecords = await physician.model.findByPk(username, {
            include: [
                {

                    model: patient.model,
                    as: 'Subscriber',
                    where: {
                        username: PatientUN
                    },
                    attributes: ['username', 'fullName', 'gender', 'insurance', 'race', 'maritalStatus'],
                    include:
                    {
                        model: vital.model,
                        as: 'VitalsRecord'
                    }
                }
            ],
            attributes: ['username']
        })
        if (!getAllPatientsRecords) throw new Error(`this patient is not a subscriber yet`)
        let patientsRecordsCleaned = getAllPatientsRecords.Subscriber[0]
        res.status(200).json(patientsRecordsCleaned)
    } catch (err) {
        next(err)
    }


}


//----------------------------------------------------------------- History handlers
//---------------------------------------------------------------------------------
async function getAllPatientHistory(req, res, next) {
    try {

        let { username } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let Allsubscribers = await physician.model.findOne({
                where: {
                    username: username
                },
                include: [
                    {
                        model: patient.model,
                        as: 'Subscriber',
                        attributes: ['username', 'fullName', 'gender', 'insurance', 'race', 'maritalStatus'],
                        include: {
                            model: disease.model,
                            as: 'History'
                        }

                    }
                ]


            })

            if (Allsubscribers) {

                res.status(200).json(Allsubscribers.Subscriber);
            } else throw new Error(`You don't have subscribers yet`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}

async function getPatientHistoryForPhysicianByUN(req, res, next) {

    try {

        let { patientUN, username } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                let records = await disease.model.findOne({ where: { patientUN } });
                res.status(200).json(records);
            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }

}

async function addHistoryToPatientByUN(req, res, next) {
    try {

        let { patientUN, username } = req.params
        let physicianFound = await physician.getByUN(username)


        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                req.body.patientUN = patientUN
                req.body.physicianUN = username
                let existedRecord = await disease.model.findOne({ where: { patientUN } })
                if (!existedRecord) {
                    let records = await disease.create(req.body);
                    res.status(201).json(records);
                } else throw new Error(`This patient already has a History, please choose updating instead of creating`)
            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
};

async function updateSinglePatientHistoryByUn(req, res, next) {
    try {

        let { patientUN, username } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                req.body.patientUN = patientUN
                req.body.physicianUN = username
                let existedRecord = await disease.model.findOne({ where: { patientUN } })
                if (existedRecord) {
                    let records = await existedRecord.update(req.body);
                    res.status(202).json(records);
                } else throw new Error(`This patient doesn't have a current record, please create one first`)
            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
};

//----------------------------------------------------------------- Prescriptions handlers
//---------------------------------------------------------------------------------
async function handleAllUserPrescriptions(req, res, next) {
    try {

        let { username } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let allPrescriptions = await prescription.model.findAll({
                where: {
                    physicianName: username
                },
                include: [
                    {
                        model: physician.model,
                        as: 'PrescribedBy',
                        attributes: ['username', 'fullName', 'licenseId', 'gender', 'birthDate', 'mobileNumber', 'emailAddress', 'department', 'address', 'profileImg', 'coverImg'],
                    },
                    {
                        model: patient.model,
                        as: 'Owner',
                        attributes: ['username', 'fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race', 'profileImg', 'coverImg'], // Add the patient attributes you need
                    },
                ]
            })

            if (allPrescriptions[0]) {

                res.status(200).json(allPrescriptions);
            } else throw new Error(`You don't have any prescriptions yet`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}
async function getOnePatientAllPrescriptions(req, res, next) {
    try {

        let { username, patientUN } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })
            if (subscribers[0]) {
                let allPrescriptions = await prescription.model.findAll({
                    where: {
                        physicianName: username,
                        patientName: patientUN
                    },
                    include: [
                        {
                            model: physician.model,
                            as: 'PrescribedBy',
                            attributes: ['fullName', 'licenseId', 'gender', 'birthDate', 'mobileNumber', 'emailAddress', 'department', 'address', 'profileImg', 'coverImg'],
                        },
                        {
                            model: patient.model,
                            as: 'Owner',
                            attributes: ['fullName', 'insurance', 'gender', 'birthdate', 'maritalStatus', 'mobileNumber', 'emailAddress', 'race', 'profileImg', 'coverImg'], // Add the patient attributes you need
                        },
                    ],
                })
                if (allPrescriptions[0]) {

                    res.status(200).json(allPrescriptions);
                } else throw new Error(`You don't have any prescriptions yet for this patient`)

            } else throw new Error(`This patient didn't subscribe for you`)

        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}
async function AddOnePatientPrescriptions(req, res, next) {
    try {

        let { patientUN, username } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                req.body.patientName = patientUN
                req.body.physicianName = username


                let records = await prescription.create(req.body);
                res.status(201).json(records);

            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}
async function updatePatientPrescriptionsByID(req, res, next) {
    try {

        let { patientUN, username, id } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                req.body.patientName = patientUN
                req.body.physicianName = username
                let existedRecord = await prescription.model.findOne({
                    where: {
                        id: id,
                        patientName: patientUN,
                        physicianName: username
                    }
                })
                if (existedRecord) {
                    let records = await prescription.update(id, req.body);
                    res.status(202).json(records);
                } else throw new Error(`This patient doesn't have a current record, please create one first`)
            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}
async function deleteOnePatientPrescriptionsByID(req, res, next) {
    try {

        let { patientUN, username, id } = req.params
        let physicianFound = await physician.getByUN(username)

        if (physicianFound) {
            let subscribers = await physicianFound.getSubscriber({
                where: {
                    username: patientUN
                },
                through: {
                    model: "subscriptions"
                }

            })

            if (subscribers[0]) {
                let existedRecord = await prescription.model.findOne({
                    where: {
                        id: id,
                        patientName: patientUN,
                        physicianName: username
                    }
                })
                if (existedRecord) {
                    let records = await prescription.delete(id);
                    res.status(200).json(`Prescription of id: - ${id} - is deleted successfully`);
                } else throw new Error(`This patient doesn't have a current record, please create one first`)
            } else throw new Error(`This patient didn't subscribe for you`)
        } else throw new Error(`Physician isn't found`)


    } catch (e) {
        next(e.message)
    }
}

//----------------------------------------------------------------- Q&A handlers
//---------------------------------------------------------------------------------

//! add comment
async function addComments(req, res, next) {
    try {
        const { username, id } = req.params;
        let post = await QuestionAnswer.get(id)
        if (post) {
            //if(status === 'solved') cant add any comments
            req.body.postID = id;
            req.body.author = username;
            let comment = await Comment.create(req.body)
            res.status(201).json(comment);
        } else throw new Error('Post Not Found');
    } catch (err) {
        next(err);
    }
}

//! get comment
async function getComments(req, res, next) {
    try {
        const { username, id } = req.params;
        //let post = await QuestionAnswer.get(id)
        let post = await QuestionAnswer.model.findOne({
            where: { id: id }, include: {
                model: Comment.model,
                as: 'Comments'
            }
        })
        if (post) {
            //let comments = await post.getComments()
            res.status(200).json(post);
        } else throw new Error('Post Not Found');
    } catch (err) {
        next(err);
    }
}
async function getAllPosts(req, res, next) {
    try {
        const { username } = req.params;
        //let post = await QuestionAnswer.get(id)
        let post = await QuestionAnswer.model.findAll({
            include: {
                model: Comment.model,
                as: 'Comments'
            }
        })
        if (post) {
            //let comments = await post.getComments()
            res.status(200).json(post);
        } else throw new Error('Post Not Found');
    } catch (err) {
        next(err);
    }
}

//! update comment
async function updateComments(req, res, next) {
    try {
        const { username, id, commentID } = req.params;
        let post = await QuestionAnswer.get(id)
        if (post) {
            //if(status === 'solved') cant add any comments
            let comment = await Comment.get(commentID)
            if (!comment) throw new Error(`comment no longer exist`)
            if (comment.author === username) {
                let updatedComment = await Comment.update(commentID, req.body)
                res.status(202).json(updatedComment);
            } else {
                throw new Error('Access denied')
            }
        } else throw new Error('Post Not Found');
    } catch (err) {
        next(err);
    }
}

//! delete comment
async function deleteComments(req, res, next) {
    try {
        const { username, id, commentID } = req.params;
        let post = await QuestionAnswer.model.findOne({
            where: {
                id: id
            },
            include: {
                where: {
                    id: commentID
                },
                model: Comment.model,
                as: "Comments"
            }
        })
        if (post) {
            //if(status === 'solved') cant add any comments

            let comment = await Comment.get(commentID)
            if (comment) {
                if (comment.author === username) {
                    let deleteComment = await Comment.delete(commentID)
                    res.status(200).json(`Message : Comment (${comment.text}) deleted successfully`);
                } else {
                    throw new Error('Access denied')
                }
            } else throw new Error('Comment Not Found');

        } else throw new Error(`This post no longer has this comment`);
    } catch (err) {
        next(err);
    }
}






//----------------------------------------------------------------- Chat handlers
//---------------------------------------------------------------------------------
async function getAllmessagesforphysician(req, res, next) {
    try {


        const { username, patientUN } = req.params

        let patientFound = await patient.model.findOne({
            where: {
                username: patientUN
            }
        })
        if (!patientFound) throw new Error(`this patient account doesn't exist`)
        let subscribed = await patientFound.getSubscription({
            where: {
                username: username
            }

        })

        if (!subscribed[0]) throw new Error(`This patient is not one of your Subscribers`)
        let allMessages = await messages.model.findAll({
            where: {
                [Op.or]: [
                    {
                        sender: username,
                        reciever: patientUN
                    },
                    {
                        sender: patientUN,
                        reciever: username
                    }
                ]
            }
        });

        // if (!allMessages[0]) throw new Error(`You don't have messeges with this patient yet!`)

        res.status(200).json(allMessages)
    } catch (err) {
        next(err)
    }


}
async function postMessagesFromphysician(req, res, next) {
    try {
        const { username, patientUN } = req.params

        let patientFound = await patient.model.findOne({
            where: {
                username: patientUN
            }
        })
        if (!patientFound) throw new Error(`this patient account doesn't exist`)
        let subscribed = await patientFound.getSubscription({
            where: {
                username: username
            }

        })
        console.log(subscribed)

        if (!subscribed[0]) throw new Error(`This patient is not one of your Subscribers`)

        let obj = {
            message: req.body.message,
            sender: username,
            reciever: patientUN
        }
        let createMessage = await messages.create(obj)



        res.status(201).json(createMessage)

    } catch (err) {
        next(err)
    }
}
async function editMessagesFromphysician(req, res, next) {
    try {
        const { username, patientUN, msgID } = req.params

        let patientFound = await patient.model.findOne({
            where: {
                username: patientUN
            }
        })
        if (!patientFound) throw new Error(`this patient account doesn't exist`)
        let subscribed = await patientFound.getSubscription({
            where: {
                username: username
            }

        })

        if (!subscribed[0]) throw new Error(`This patient is not one of your Subscribers`)
        let toUpdateMsg = await messages.model.findOne({
            where: {
                sender: username,
                reciever: patientUN,
                id: msgID
            }
        })

        if (!toUpdateMsg) throw new Error(`This msg doesn't exist anymore`)
        let obj = {
            message: req.body.message
        }
        let updated = await toUpdateMsg.update(obj)

        res.status(202).json(updated)

    } catch (err) {
        next(err)
    }
}
async function delMessagesFromphysician(req, res, next) {
    try {
        const { username, patientUN, msgID } = req.params

        let patientFound = await patient.model.findOne({
            where: {
                username: patientUN
            }
        })
        if (!patientFound) throw new Error(`this patient account doesn't exist`)
        let subscribed = await patientFound.getSubscription({
            where: {
                username: username
            }

        })

        if (!subscribed[0]) throw new Error(`This patient is not one of your Subscribers`)
        let toDeleteMsg = await messages.model.findOne({
            where: {
                sender: username,
                reciever: patientUN,
                id: msgID
            }
        })

        if (!toDeleteMsg) throw new Error(`This msg doesn't exist anymore`)
        let msgGone = toDeleteMsg.message
        let deleted = await toDeleteMsg.destroy()

        res.status(200).json(`message with id ${msgID} , messsage:(${msgGone}) has been deleted successfully`)

    } catch (err) {
        next(err)
    }
}


//----------------------------------------------------------------- rate handlers
//---------------------------------------------------------------------------------

async function getAllRating(req, res, next) {
    try {
        const { username } = req.params;

        let allRating = await rating.model.findAll({
            where: {
                physician: username
            }
        });

        if (!allRating[0]) {
            throw new Error(`You don't have any ratings yet!`);
        }

        // Calculate average rating
        const averageRating = await rating.model.findOne({
            attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'averageRating']],
            where: {
                physician: username
            }
        });

        res.status(200).json({
            allRating,
            averageRating: averageRating.dataValues.averageRating
        });
    } catch (err) {
        next(err);
    }
}

//----------------------------------------------------------------- Notification  handlers
//---------------------------------------------------------------------------------
async function getAllNotifications(req, res, next) {
    try {


        const { username } = req.params

        let currentPhysician = await physician.model.findOne({
            where: {
                username: username
            }
        })

        let subscribers = await currentPhysician.getSubscriber()

        // console.log(subscribers[0])
        let finalArr = [];
        let arr = await Promise.all(subscribers.map(async subscriber => {
            let subNotifications = await notification.model.findAll({
                where: {
                    patientUN: subscriber.username
                }
            })
            // let obj = {
            //     username: subscriber.username,
            //     notifications: subNotifications
            // }
            return subNotifications;
        }));
        let arr2 = arr.forEach(element => {
            finalArr.push(...element)
        })



        //   console.log(arr)
        res.status(200).json(finalArr)

    } catch (err) {
        next(err)
    }
}//----------------------------------------------------------------- Upload  handlers
//---------------------------------------------------------------------------------

async function handlePhysicianProfileImage(req, res, next) {
    try {
        const { username } = req.params


        const result = await cloudinary.uploader.upload(req.file.path);
        const { secure_url } = result;
        // const userId = req.params.id;

        // Update the user's profileImg using the userId
        let userData = await physician.model.update({ profileImg: secure_url }, { where: { username: username } });

        // res.json({ message: 'Image uploaded and profile updated successfully!' });
        console.log(req.body, req.file)
        res.status(201).json(userData)

    } catch (err) {
        next(err)
    }
}
async function handlePhysicianCoverImage(req, res, next) {
    try {
        const { username } = req.params


        const result = await cloudinary.uploader.upload(req.file.path);
        const { secure_url } = result;
        // const userId = req.params.id;

        // Update the user's profileImg using the userId
        let userData = await physician.model.update({ coverImg: secure_url }, { where: { username: username } });

        // res.json({ message: 'Image uploaded and profile updated successfully!' });
        console.log(req.body, req.file)
        res.status(201).json(userData)

    } catch (err) {
        next(err)
    }
}
async function handlePhysicianGroupImage(req, res, next) {
    try {
        const { username, id } = req.params

        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')

        let groupsFound = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id

            }
        })

        if (!groupsFound) throw new Error(`This group doesn't exist`)

        const result = await cloudinary.uploader.upload(req.file.path);
        const { secure_url } = result;
        // const userId = req.params.id;

        // Update the user's profileImg using the userId
        let userData = await group.model.update({ groupImage: secure_url }, { where: { id: id } });

        // res.json({ message: 'Image uploaded and profile updated successfully!' });
        console.log(req.body, req.file)
        res.status(201).json(userData)

    } catch (err) {
        next(err)
    }
}
async function handlePhysicianPostImage(req, res, next) {
    try {
        const { username, id, postID } = req.params
        let foundphysician = await physician.getByUN(username)
        if (!foundphysician) throw new Error('physician not found')
        let foundGroup = await group.model.findOne({
            where: {
                physicianUN: username,
                id: id
            }

        })
        if (!foundGroup) throw new Error(`You don't own that group`)
        let groupsPostsFound = await groupPosts.model.findOne({
            where: {
                author: username,
                groupId: id,
                id: postID

            }
        })

        if (!groupsPostsFound) throw new Error(`Post doesn't exist`)


        const result = await cloudinary.uploader.upload(req.file.path);
        const { secure_url } = result;
        // const userId = req.params.id;

        // Update the user's profileImg using the userId
        let userData = await groupPosts.model.update({ postImage: secure_url }, { where: { id: postID } });

        // res.json({ message: 'Image uploaded and profile updated successfully!' });
        console.log(req.body, req.file)
        res.status(201).json(userData)

    } catch (err) {
        next(err)
    }
}

module.exports = physicianRouter;

