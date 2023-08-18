'use strict'

const express = require('express');
const patientRouter = express.Router();
const basicAuthPatient = require('../../middleware/auth/basicPatient')
const bearerAuthPatient = require('../../middleware/auth/bearerPatient')






const { group, physician, patient, appointment, vital, disease, prescription, QuestionAnswer, Comment, groupPosts, messages, rating, notification } = require('../../models');

const { Op } = require('sequelize');








// Signup & login patient routes
patientRouter.post('/signup/patient', signupPatientHandler);
patientRouter.post('/login/patient', basicAuthPatient, loginPatientHandler)
patientRouter.get('/logout', logoutHandler)

// patient subscription routes
patientRouter.get('/patient/:username/physicians/subscriptions', bearerAuthPatient, handleAllSubscriptions)

// patient profile routes
patientRouter.get('/patient/:username/profile', bearerAuthPatient, patientProfileGetHandlder)
patientRouter.put('/patient/:username/profile', bearerAuthPatient, patientProfileUpdateHandlder)


// patient Appointment routes
patientRouter.get('/patient/:username/appointments', bearerAuthPatient, getAllAppointmentsForPatient)
patientRouter.get('/patient/:username/physicians/:physicianUN/appointments', bearerAuthPatient, getAllAppointmentsForPatientByPhysicianUn)
patientRouter.get('/patient/:username/appointments/:id', bearerAuthPatient, getAppointmentsByIdForPatient)

// patient Groups routes
patientRouter.get('/patient/:username/groups', bearerAuthPatient, getpatientGroup);
patientRouter.get('/patient/:username/groups/:groupName', bearerAuthPatient, getOnepatientGroup);
// patient Groups posts routes

patientRouter.get('/patient/:username/groups/:id/posts', bearerAuthPatient, getAllgroupsPosts);
patientRouter.get('/patient/:username/groups/:id/posts/:postID', getOneGroupsPostByID);


// patient Vitals routees
patientRouter.post('/patient/:username/vitals', bearerAuthPatient, addVitals)
patientRouter.get('/patient/:username/vitals', bearerAuthPatient, getAllVitals)
patientRouter.get('/patient/:username/vitals/:id', bearerAuthPatient, getOneVitals)
patientRouter.put('/patient/:username/vitals/:id', bearerAuthPatient, updateVitals)
patientRouter.delete('/patient/:username/vitals/:id', bearerAuthPatient, deleteVitals)

// patient History routees
patientRouter.get('/patient/:username/disease', bearerAuthPatient, getPatientHistroyHandler)

// patient Prescription routees
patientRouter.get('/patient/:username/prescriptions', bearerAuthPatient, getAllPatientPrescriptions)
patientRouter.get('/patient/:username/prescriptions/:id', bearerAuthPatient, getPatientPrescriptionsById)
patientRouter.get('/patient/:username/prescriptions/by/:physicianUN', bearerAuthPatient, getPatientPrescriptionsByPhysicianName)

// patient Q&A routees
patientRouter.post('/patient/:username/Q&A', bearerAuthPatient, addQApostByPatient)
patientRouter.get('/patient/:username/Q&A', bearerAuthPatient, getAllQApostsByPatient)
patientRouter.get('/patient/:username/Q&A/:id', bearerAuthPatient, getOneQApostByPatientbyId)
patientRouter.put('/patient/:username/Q&A/:id', bearerAuthPatient, updateOneQApostByPatientbyId)
patientRouter.delete('/patient/:username/Q&A/:id', bearerAuthPatient, deleteOneQApostByPatientbyId)

// Chat routes 


patientRouter.get('/patient/:username/chat/:physicianUN', bearerAuthPatient, getAllmessagesforPatient)
patientRouter.post('/patient/:username/chat/:physicianUN', bearerAuthPatient, postMessagesFromPatient)
patientRouter.delete('/patient/:username/chat/:physicianUN/:msgID', bearerAuthPatient, delMessagesFromPatient)
patientRouter.put('/patient/:username/chat/:physicianUN/:msgID', bearerAuthPatient, editMessagesFromPatient)





// Rating Routes
patientRouter.get('/patient/:username/rating/',bearerAuthPatient, getAllCreatedRating)
patientRouter.post('/patient/:username/rating/:physicianUN',bearerAuthPatient, postRateFromPatient)
patientRouter.delete('/patient/:username/rating/:id',bearerAuthPatient, delRateFromPatient)
patientRouter.put('/patient/:username/rating/:id',bearerAuthPatient, editRateFromPatient)


// Patient Notifications routes
// patientRouter.post('/patient/:username/notifications',bearerAuthPatient, sendNotificationPatient)








// Functions



//----------------------------------------------------------------- Signup&Login handlers
//---------------------------------------------------------------------------------------

async function signupPatientHandler(req, res, next) {
    try {
        // req.body.username = req.body.username.toLowerCase()
        let user = await patient.create(req.body);
        const output = {
            user: user,
            token: user.token
        };
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
}
async function loginPatientHandler(req, res, next) {
    try {
        const user = {
            user: req.user,
            token: req.user.token
        };
        const authToken = user.token;
        console.log(authToken);
        console.log(req.user.username);

        res.cookie('authToken', authToken, { maxAge: 86400000, httpOnly: true, path: '/' }); // 1 day expiration
        //   res.redirect(`/patient/${req.user.username}/profile`);
        res.status(200).json(user);
    } catch (e) {
        next(e.message)
    }
}

async function logoutHandler(req, res) {
    res.cookie('authToken', '', { maxAge: 1 });
    res.redirect('/');
};

//----------------------------------------------------------------- Subscriptions handlers
//----------------------------------------------------------------------------------

async function handleAllSubscriptions(req, res, next) {
    const { username } = req.params
    try {

        let patientName = await patient.getByUN(username)




        if (!patientName) throw new Error(`patient doesn't exist`)

        let allSubscriptions = await patientName.getSubscription({
            attributes: ['username', 'mobileNumber', 'emailAddress', 'gender', 'fullName']
        })

        if (!allSubscriptions[0]) throw new Error('You got no subscriptions yet')


        res.status(200).json(allSubscriptions)
    } catch (err) {
        next(err)
    }
}

//----------------------------------------------------------------- Profile handlers
//----------------------------------------------------------------------------------
async function patientProfileGetHandlder(req, res, next) {
    try {

        const username = req.params.username;
        // console.log(username)

        const userProfile = await patient.getByUN(username);

        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            let result = {
                username: userProfile.username,
                fullName: userProfile.fullName,
                gender: userProfile.gender,
                birthdate: userProfile.birthdate,
                race: userProfile.race,
                maritalStatus: userProfile.maritalStatus
            }
            res.status(200).json(result);
        }
    } catch (err) {
        next(err)
    }

}
async function patientProfileUpdateHandlder(req, res, next) {
    try {

        const username = req.params.username;
        const obj = req.body;

        let updateProfile = await patient.updateByUN(username, obj);

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

async function getAllAppointmentsForPatient(req, res, next) {
    try {

        const { username } = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient) {
            let allAppointments = await appointment.model.findAll({ where: { patientUsername: username } })
            if (allAppointments[0]) res.status(200).json(allAppointments)
            else throw new Error('There are no appointments set by your physicians ')

        } else throw new Error('Patient not found')

    } catch (err) {
        next(err)
    }

};
async function getAllAppointmentsForPatientByPhysicianUn(req, res, next) {
    try {

        const { username, physicianUN } = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient) {
            let checkforSub = await foundpatient.getSubscription({
                where: {
                    username: physicianUN
                },
                through: {
                    model: "subscriptions"
                }
            })
            console.log(checkforSub)
            if (!checkforSub[0]) throw new Error(`You aren't subscribed for that physician`)
            let allAppointments = await appointment.model.findAll({ where: { patientUsername: username, physicianUsername: physicianUN } })
            if (allAppointments[0]) res.status(200).json(allAppointments)
            else throw new Error('There are no appointments set by your physician ')

        } else throw new Error('Patient not found')

    } catch (err) {
        next(err)
    }

};
async function getAppointmentsByIdForPatient(req, res, next) {
    try {

        const { username, id } = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient) {
            let allAppointments = await appointment.model.findAll({ where: { patientUsername: username, id: id } })
            if (allAppointments[0]) res.status(200).json(allAppointments)
            else throw new Error('There are no appointments with this id for you ')

        } else throw new Error('Patient not found')

    } catch (err) {
        next(err)
    }

};

//----------------------------------------------------------------- Groups handlers
//---------------------------------------------------------------------------------

async function getpatientGroup(req, res, next) {
    try {
        const { username } = req.params
        let foundpatient = await patient.getByUN(username)
        if (!foundpatient) throw new Error('patient not found')

        let groupsFound = await foundpatient.getGroup()

        if (!groupsFound[0]) throw new Error('You have no groups yet!')

        res.status(200).json(groupsFound)
    } catch (err) {
        next(err)
    }
}
async function getOnepatientGroup(req, res, next) {
    try {
        const { username, groupName } = req.params
        let foundpatient = await patient.getByUN(username)
        if (!foundpatient) throw new Error('patient not found')

        let groupsFound = await foundpatient.getGroup(
            {
                where: {
                    groupName: groupName
                }
            }
        )

        if (!groupsFound[0]) throw new Error(`You aren't a memeber of this group`)

        res.status(200).json(groupsFound[0])
    } catch (err) {
        next(err)
    }
}


//----------------------------------------------------------------- Groups posts handlers
//---------------------------------------------------------------------------------


async function getAllgroupsPosts(req, res, next) {
    try {
        const { username, id } = req.params
        let foundpatient = await patient.getByUN(username)
        if (!foundpatient) throw new Error('patient not found')
        let foundGroup = await foundpatient.getGroup({
            where: {
                id: id
            }
        })


        if (!foundGroup) throw new Error(`You aren't a member in that group`)
        let groupsPostsFound = await groupPosts.model.findAll({
            where: {
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
        let foundpatient = await patient.getByUN(username)
        if (!foundpatient) throw new Error('patient not found')
        let foundGroup = await foundpatient.getGroup({
            where: {
                id: id
            }
        })
        console.log(foundGroup)


        if (!foundGroup[0]) throw new Error(`You aren't a member in that group`)
        let groupsPostsFound = await groupPosts.model.findOne({
            where: {
                groupId: id,
                id: postID

            }
        })

        if (!groupsPostsFound) throw new Error(`This post doesn't exist anymore`)


        res.status(200).json(groupsPostsFound)
    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------- Vitals handlers
//---------------------------------------------------------------------------------
async function addVitals(req, res, next) {
    const { username } = req.params
    try {


        req.body.patientUN = username
        let addedVitals = await vital.create(req.body)

        //---------------------------------------------- new work
        let notificationCaptured = `Patient ${username} Abnormal Vitals: `;
        if (addedVitals.heartRate > 120 || addedVitals.heartRate < 60) {
            notificationCaptured += `Heart Rate: ${addedVitals.heartRate}`;
        }
        if (addedVitals.oxygenSat < 90) {
            notificationCaptured += ` - Oxygen Saturation: ${addedVitals.oxygenSat}`;
        }
        if (addedVitals.bloodGlucose > 100 || addedVitals.bloodGlucose < 70) {
            notificationCaptured += ` - Blood Glucose: ${addedVitals.bloodGlucose}`;
        }
        if (addedVitals.temperature > 37.1 || addedVitals.temperature < 36) {
            notificationCaptured += ` - Temperature: ${addedVitals.temperature}`;
        }
        if (addedVitals.systolicBP > 130 || addedVitals.systolicBP < 90) {
            notificationCaptured += ` - Systolic BP: ${addedVitals.systolicBP}`;
        }
        if (addedVitals.diastolicBP > 90 || addedVitals.diastolicBP < 60) {
            notificationCaptured += ` - Diastolic BP: ${addedVitals.diastolicBP}`;
        }

        console.log(notificationCaptured)


        if(notificationCaptured.length > 37) {

            let toCreateNotification = await notification.create({
                event: notificationCaptured,
                patientUN: username
            })
        }



        //----------------------------------------------
        res.status(201).json(addedVitals)
    } catch (err) {
        next(err)
    }


}
async function getAllVitals(req, res, next) {
    const { username } = req.params
    try {
        req.body.patientUN = username
        let allVitals = await vital.model.findAll({ where: { patientUN: username } })
        res.status(200).json(allVitals)
    } catch (err) {
        next(err)
    }


}
async function getOneVitals(req, res, next) {
    const { username, id } = req.params
    try {

        req.body.patientUN = username
        let oneVital = await vital.get(id)
        if (oneVital) {
            res.status(200).json(oneVital)
        } else throw new Error(`This record doesn't exist`)
    } catch (err) {
        next(err)
    }


}
async function updateVitals(req, res, next) {
    const { username, id } = req.params
    try {

        req.body.patientUN = username
        let updateVital = await vital.update(id, req.body)
        res.status(202).json(updateVital)
    } catch (err) {
        next(err)
    }


}
async function deleteVitals(req, res, next) {
    const { username, id } = req.params
    try {
        let deletedVital = await vital.delete(id)
        res.status(200).json('Deleted Successfully')
    } catch (err) {
        next(err)
    }


}

//----------------------------------------------------------------- History handlers
//---------------------------------------------------------------------------------

async function getPatientHistroyHandler(req, res, next) {
    {
        try {

            let { username } = req.params
            let user = await patient.getByUN(username);

            if (user) {

                let records = await disease.model.findOne({ where: { patientUN: username } });

                if (records) {

                    res.status(200).json(records);

                } else throw new Error('There are no records for this patient')
            } else throw new Error(`Patient doesn't exist`)
        } catch (e) {
            next(e.message)
        }
    }
}

//----------------------------------------------------------------- Prescription handlers
//---------------------------------------------------------------------------------

async function getAllPatientPrescriptions(req, res, next) {
    {
        try {

            let { username } = req.params
            let user = await patient.getByUN(username);

            if (user) {

                let records = await prescription.model.findAll({ where: { patientName: username } });

                if (records) {

                    res.status(200).json(records);

                } else throw new Error('There are no prescriptions for this patient')
            } else throw new Error(`Patient doesn't exist`)
        } catch (e) {
            next(e.message)
        }
    }
}
async function getPatientPrescriptionsById(req, res, next) {
    {
        try {

            let { username, id } = req.params
            let user = await patient.getByUN(username);

            if (user) {

                let records = await prescription.model.findOne({ where: { patientName: username, id: id } });

                if (records) {

                    res.status(200).json(records);

                } else throw new Error(`This prescriptions doesn't exist`)
            } else throw new Error(`Patient doesn't exist`)
        } catch (e) {
            next(e.message)
        }
    }
}
async function getPatientPrescriptionsByPhysicianName(req, res, next) {
    {
        try {

            let { username, physicianUN } = req.params
            let user = await patient.getByUN(username);

            if (user) {

                let records = await prescription.model.findAll({ where: { patientName: username, physicianName: physicianUN } });

                if (records[0]) {

                    res.status(200).json(records);

                } else throw new Error(`These prescriptions don't exist`)
            } else throw new Error(`Patient doesn't exist`)
        } catch (e) {
            next(e.message)
        }
    }
}

//----------------------------------------------------------------- Q&A handlers
//---------------------------------------------------------------------------------

async function addQApostByPatient(req, res, next) {

    try {

        const { username } = req.params
        const patientFound = await patient.getByUN(username);

        if (patientFound) {

            req.body.craetedBy = username;
            const newPost = await QuestionAnswer.create(req.body);
            res.status(201).json(newPost);

        } else throw new Error(`This patient doesn't exist`)


    } catch (error) {
        next(error)
    }
};

//! get all posts 
async function getAllQApostsByPatient(req, res, next) {
    try {
        const { username } = req.params
        const patientFound = await patient.getByUN(username);
        if (patientFound) {

            const allPosts = await QuestionAnswer.model.findAll({
                where: {
                    craetedBy: username
                }
            });
            if (allPosts[0]) {
                res.json(allPosts);
            } else throw new Error(`You didn't post anything yet`)

        } else throw new Error(`This patient doesn't exist`)
    } catch (error) {
        next(error)
    }
};

//! get post bt id 
async function getOneQApostByPatientbyId(req, res, next) {
    try {
        const { username, id } = req.params
        const patientFound = await patient.getByUN(username);
        if (patientFound) {

            const post = await QuestionAnswer.model.findOne({
                where: {
                    id: id,
                    craetedBy: username
                },
                include: {
                    model: Comment.model,
                    as: 'Comments'
                }
            });
            if (!post) throw new Error(`Post doesn't exist`)
            res.status(200).json(post);

        } throw new Error(`This patient doesn't exist`)


    } catch (error) {
        next(error)
    }
};

//! update a post
async function updateOneQApostByPatientbyId(req, res, next) {


    try {
        const { username, id } = req.params
        const patientFound = await patient.getByUN(username);


        if (!patientFound) throw new Error(`This patient doesn't exist`)

        const post = await QuestionAnswer.model.findOne({
            where: {
                id: id,
                craetedBy: username
            }
        });


        if (!post) throw new Error(`This post doesn't exist`)

        req.body.craetedBy = username
        await post.update(req.body);
        res.status(202).json(post);


    } catch (error) {
        next(error)
    }
};

//! delete a post
async function deleteOneQApostByPatientbyId(req, res, next) {
    try {
        const { username, id } = req.params
        const patientFound = await patient.getByUN(username);


        if (!patientFound) throw new Error(`This patient doesn't exist`)

        const post = await QuestionAnswer.model.findOne({
            where: {
                id: id,
                craetedBy: username
            }
        });


        if (!post) throw new Error(`This post doesn't exist`)


        await QuestionAnswer.delete(id);
        res.status(200).json(`Post with id ${id} has been deleted successfully.`);


    } catch (error) {
        next(error)
    }
};

//----------------------------------------------------------------- Chat handlers
//---------------------------------------------------------------------------------
async function getAllmessagesforPatient(req, res, next) {
    try {


        const { username, physicianUN } = req.params

        let physicianFound = await physician.model.findOne({
            where: {
                username: physicianUN
            }
        })
        if (!physicianFound) throw new Error(`this physician account doesn't exist`)
        let subscribed = await physicianFound.getSubscriber({
            where: {
                username: username
            }
        })

        if (!subscribed[0]) throw new Error(`You aren't subscribed for that physician yet`)
        let allMessages = await messages.model.findAll({
            where: {
                [Op.or]: [
                    {
                        sender: username,
                        reciever: physicianUN
                    },
                    {
                        sender: physicianUN,
                        reciever: username
                    }
                ]
            }
        });

        if (!allMessages[0]) throw new Error(`You don't have messeges with this physician yet!`)

        res.status(200).json(allMessages)
    } catch (err) {
        next(err)
    }


}
async function postMessagesFromPatient(req, res, next) {
    try {
        const { username, physicianUN } = req.params

        let physicianFound = await physician.model.findOne({
            where: {
                username: physicianUN
            }
        })
        if (!physicianFound) throw new Error(`this physician account doesn't exist`)
        let subscribed = await physicianFound.getSubscriber({
            where: {
                username: username
            }
        })

        if (!subscribed[0]) throw new Error(`You aren't subscribed for that physician yet`)

        let obj = {
            message: req.body.message,
            sender: username,
            reciever: physicianUN
        }
        let createMessage = await messages.create(obj)



        res.status(201).json(createMessage)

    } catch (err) {
        next(err)
    }
}
async function editMessagesFromPatient(req, res, next) {
    try {
        const { username, physicianUN, msgID } = req.params

        let physicianFound = await physician.model.findOne({
            where: {
                username: physicianUN
            }
        })
        if (!physicianFound) throw new Error(`this physician account doesn't exist`)
        let subscribed = await physicianFound.getSubscriber({
            where: {
                username: username
            }
        })

        if (!subscribed[0]) throw new Error(`You aren't subscribed for that physician yet`)
        let toUpdateMsg = await messages.model.findOne({
            where: {
                sender: username,
                reciever: physicianUN,
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
async function delMessagesFromPatient(req, res, next) {
    try {
        const { username, physicianUN, msgID } = req.params

        let physicianFound = await physician.model.findOne({
            where: {
                username: physicianUN
            }
        })
        if (!physicianFound) throw new Error(`this physician account doesn't exist`)
        let subscribed = await physicianFound.getSubscriber({
            where: {
                username: username
            }
        })

        if (!subscribed[0]) throw new Error(`You aren't subscribed for that physician yet`)
        let toDeleteMsg = await messages.model.findOne({
            where: {
                sender: username,
                reciever: physicianUN,
                id: msgID
            }
        })

        if (!toDeleteMsg) throw new Error(`This msg doesn't exist anymore`)
        let msgGone = toDeleteMsg.message
        let deleted = await toDeleteMsg.destroy()

        res.status(200).json(`message with id ${msgID} , messsage: ${msgGone} has been deleted successfully`)

    } catch (err) {
        next(err)
    }
}


//----------------------------------------------------------------- Rate handlers
//---------------------------------------------------------------------------------

async function getAllCreatedRating(req, res, next) {
    try {


        const { username } = req.params

        let allRating = await rating.model.findAll({
            where: {
                patient: username
            }
        });

        if (!allRating[0]) throw new Error(`You don't have Rating yet!`)

        res.status(200).json(allRating)
    } catch (err) {
        next(err)
    }


}
async function postRateFromPatient(req, res, next) {
    try {
        const { username, physicianUN } = req.params

        let physicianFound = await physician.model.findOne({
            where: {
                username: physicianUN
            }
        })
        if (!physicianFound) throw new Error(`this physician account doesn't exist`)

        let subscribed = await physicianFound.getSubscriber({
            where: {
                username: username
            }
        })

        if (!subscribed[0]) throw new Error(`You aren't subscribed for that physician yet`)

        let obj = {
            rating: req.body.rating,
            patient: username,
            physician: physicianUN
        }
        let createRating = await rating.create(obj)

        res.status(201).json(createRating)

    } catch (err) {
        next(err)
    }
}
async function editRateFromPatient(req, res, next) {
    try {
        const { username, id } = req.params


        let toUpdaterate = await rating.model.findOne({
            where: {
                patient: username,
                id: id
            }
        })

        if (!toUpdaterate) throw new Error(`This rate doesn't exist anymore`)
        let obj = {
            rating: req.body.rating
        }
        let updated = await toUpdaterate.update(obj)

        res.status(202).json(updated)

    } catch (err) {
        next(err)
    }
}
async function delRateFromPatient(req, res, next) {
    try {
        const { username, id } = req.params


        let toDeleterate = await rating.model.findOne({
            where: {
                patient: username,
                id: id
            }
        })

        if (!toDeleterate) throw new Error(`This rate doesn't exist anymore`)
        let rateGone = toDeleterate.rating
        let deleted = await toDeleterate.destroy()

        res.status(200).json(`Rate with id ${id} , Rate: ${rateGone} has been deleted successfully`)

    } catch (err) {
        next(err)
    }
}

//----------------------------------------------------------------- Notification  handlers
//---------------------------------------------------------------------------------




module.exports = patientRouter;

