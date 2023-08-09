'use strict'

const express = require('express');
const patientRouter = express.Router();
const basicAuthPatient = require('../../middleware/auth/basicPatient')
const bearerAuthPatient = require('../../middleware/auth/bearerPatient')



const { group , physician , patient, appointment, vital , disease , prescription ,QuestionAnswer ,Comment, groupPosts} = require('../../models')







//Signup & login patient routes
patientRouter.post('/signup/patient', signupPatientHandler);
patientRouter.post('/login/patient', basicAuthPatient, loginPatientHandler)

//patient profile routes
patientRouter.get('/patient/:username/profile', bearerAuthPatient , patientProfileGetHandlder)
patientRouter.put('/patient/:username/profile', bearerAuthPatient , patientProfileUpdateHandlder)

// patient Appointment routes
patientRouter.get('/patient/:username/appointments', bearerAuthPatient ,getAllAppointmentsForPatient)
patientRouter.get('/patient/:username/physicians/:physicianUN/appointments', bearerAuthPatient ,getAllAppointmentsForPatientByPhysicianUn)
patientRouter.get('/patient/:username/appointments/:id', bearerAuthPatient ,getAppointmentsByIdForPatient)

// patient Groups routes
patientRouter.get('/patient/:username/groups',bearerAuthPatient , getpatientGroup);
patientRouter.get('/patient/:username/groups/:groupName',bearerAuthPatient , getOnepatientGroup);
// patient Groups posts routes

patientRouter.get('/patient/:username/groups/:id/posts', bearerAuthPatient ,getAllgroupsPosts);
patientRouter.get('/patient/:username/groups/:id/posts/:postID', getOneGroupsPostByID);


// patient Vitals routees
patientRouter.post('/patient/:username/vitals', bearerAuthPatient ,addVitals)
patientRouter.get('/patient/:username/vitals', bearerAuthPatient ,getAllVitals)
patientRouter.get('/patient/:username/vitals/:id', bearerAuthPatient ,getOneVitals)
patientRouter.put('/patient/:username/vitals/:id', bearerAuthPatient ,updateVitals)
patientRouter.delete('/patient/:username/vitals/:id', bearerAuthPatient ,deleteVitals)

// patient History routees
patientRouter.get('/patient/:username/disease',bearerAuthPatient,getPatientHistroyHandler)

// patient Prescription routees
patientRouter.get('/patient/:username/prescriptions', bearerAuthPatient, getAllPatientPrescriptions)
patientRouter.get('/patient/:username/prescriptions/:id', bearerAuthPatient, getPatientPrescriptionsById)
patientRouter.get('/patient/:username/prescriptions/by/:physicianUN', bearerAuthPatient, getPatientPrescriptionsByPhysicianName)

// patient Q&A routees
patientRouter.post('/patient/:username/Q&A',bearerAuthPatient, addQApostByPatient)
patientRouter.get('/patient/:username/Q&A', bearerAuthPatient,getAllQApostsByPatient)
patientRouter.get('/patient/:username/Q&A/:id',bearerAuthPatient, getOneQApostByPatientbyId)
patientRouter.put('/patient/:username/Q&A/:id', bearerAuthPatient, updateOneQApostByPatientbyId)
patientRouter.delete('/patient/:username/Q&A/:id',bearerAuthPatient, deleteOneQApostByPatientbyId)











// Functions



//----------------------------------------------------------------- Signup&Login handlers
//---------------------------------------------------------------------------------------

async function  signupPatientHandler (req, res, next){
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
async function  loginPatientHandler (req, res, next){
    try {
        {
            const user = {
                user: req.user,
                token: req.user.token
            };
            res.status(200).json(user);
        }
    } catch (e) {
        next(e.message)
    }
}

//----------------------------------------------------------------- Profile handlers
//----------------------------------------------------------------------------------
async function  patientProfileGetHandlder (req, res, next){
    try{

        const username = req.params.username;
        // console.log(username)
    
        const userProfile = await patient.getByUN(username);
    
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(userProfile);
        }
    }catch(err){
        next(err)
    }

}
async function  patientProfileUpdateHandlder (req, res, next){
    try {

        const username = req.params.username;
        const obj = req.body;
    
        let updateProfile = await patient.updateByUN(username, obj);
    
        if (!updateProfile) {
            return res.status(404).json({ error: 'Access denied' });
        } else {
            res.status(200).json(updateProfile);
        }
    }catch(err){
        next(err)
    }
}

//----------------------------------------------------------------- Appointments handlers
//---------------------------------------------------------------------------------------

async function getAllAppointmentsForPatient(req, res , next)  {
    try{

        const {username} = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient){
           let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username}})
           if(allAppointments[0]) res.status(200).json(allAppointments)
           else throw new Error('There are no appointments set by your physicians ')
           
        } else throw new Error('Patient not found')

    }catch(err){
        next(err)
    }

};
async function getAllAppointmentsForPatientByPhysicianUn(req, res, next)  {
    try{

        const {username, physicianUN} = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient){
            let checkforSub = await foundpatient.getSubscription({
                where:{
                    username: physicianUN
                },
                through: {
                    model: "subscriptions"
                }
            })
            console.log(checkforSub)
            if(!checkforSub[0]) throw new Error(`You aren't subscribed for that physician`)
           let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username, physicianUsername: physicianUN}})
           if(allAppointments[0]) res.status(200).json(allAppointments)
           else throw new Error('There are no appointments set by your physician ')
           
        } else throw new Error('Patient not found')

    }catch(err){
        next(err)
    }

};
async function getAppointmentsByIdForPatient(req, res, next)  {
    try{

        const {username, id} = req.params;
        const foundpatient = await patient.getByUN(username);
        if (foundpatient){
           let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username, id: id}})
           if(allAppointments[0]) res.status(200).json(allAppointments)
           else throw new Error('There are no appointments with this id for you ')
           
        } else throw new Error('Patient not found')

    }catch(err){
        next(err)
    }

};

//----------------------------------------------------------------- Groups handlers
//---------------------------------------------------------------------------------

async function getpatientGroup(req, res, next) {
    try{
        const {username} = req.params
        let foundpatient = await patient.getByUN(username)
        if(!foundpatient) throw new Error('patient not found')

        let groupsFound = await foundpatient.getGroup()

        if (!groupsFound[0]) throw new Error('You have no groups yet!')

        res.status(200).json(groupsFound)
    }catch(err){
        next(err)
    }
}
async function getOnepatientGroup(req, res, next) {
    try{
        const {username, groupName} = req.params
        let foundpatient = await patient.getByUN(username)
        if(!foundpatient) throw new Error('patient not found')

        let groupsFound = await foundpatient.getGroup(
            {
                where: {
                    groupName: groupName
                }
            }
        )

        if (!groupsFound[0]) throw new Error(`You aren't a memeber of this group`)

        res.status(200).json(groupsFound[0])
    }catch(err){
        next(err)
    }
}


//----------------------------------------------------------------- Groups posts handlers
//---------------------------------------------------------------------------------


async function getAllgroupsPosts(req, res, next) {
    try{
        const {username, id} = req.params
        let foundpatient = await patient.getByUN(username)
        if(!foundpatient) throw new Error('patient not found')
        let foundGroup =  await foundpatient.getGroup({
                where:{
                    id: id
                }
        })

 
        if(!foundGroup) throw new Error(`You aren't a member in that group`)
        let groupsPostsFound = await groupPosts.model.findAll({
            where: {
                groupID: id

            }
        })

        if (!groupsPostsFound[0]) throw new Error('You have no posts yet!')


        res.status(200).json(groupsPostsFound)
    }catch(err){
        next(err)
    }
}

async function getOneGroupsPostByID(req, res, next ) {
    try{
        const {username, id ,postID} = req.params
        let foundpatient = await patient.getByUN(username)
        if(!foundpatient) throw new Error('patient not found')
        let foundGroup =  await foundpatient.getGroup({
                where:{
                    id: id
                }
        })
        console.log(foundGroup)

 
        if(!foundGroup[0]) throw new Error(`You aren't a member in that group`)
        let groupsPostsFound = await groupPosts.model.findOne({
            where: {
                groupID: id,
                id:postID

            }
        })

        if (!groupsPostsFound) throw new Error(`This post doesn't exist anymore`)


        res.status(200).json(groupsPostsFound)
    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------- Vitals handlers
//---------------------------------------------------------------------------------
async function addVitals (req,res,next){
    const { username } = req.params
    try {

        
        req.body.patientUN = username
        let addedVitals = await vital.create(req.body)
        res.status(201).json(addedVitals)
    } catch (err) {
        next(err)
    }
    

}
async function getAllVitals (req,res,next){
    const {  username } = req.params
    try {
        req.body.patientUN = username
        let allVitals = await vital.model.findAll({where:{patientUN:username}})
        res.status(200).json(allVitals)
    } catch (err) {
        next(err)
    }
    

}
async function getOneVitals (req,res,next){
    const { username, id } = req.params
    try {
        
        req.body.patientUN = username
        let oneVital = await vital.get(id)
        if(oneVital){
         res.status(200).json(oneVital)
        } else throw new Error(`This record doesn't exist`)
    } catch (err) {
        next(err)
    }
    

}    
async function updateVitals (req,res,next){
    const { username, id } = req.params
    try {
        
        req.body.patientUN = username
        let updateVital = await vital.update(id, req.body)
        res.status(200).json(updateVital)
    } catch (err) {
        next(err)
    }
    

}
async function deleteVitals (req,res,next){
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

async function getPatientHistroyHandler(req, res, next){
    {
        try {

        let { username } = req.params
        let user = await patient.getByUN(username);

        if(user){  

            let records = await disease.model.findOne({where:{patientUN:username}});

            if(records) {

                res.status(200).json(records);

            }else throw new Error('There are no records for this patient')
        }else throw new Error(`Patient doesn't exist`)
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

        if(user){  

            let records = await prescription.model.findAll({where:{ patientName: username }});

            if(records) {

                res.status(200).json(records);

            }else throw new Error('There are no prescriptions for this patient')
        }else throw new Error(`Patient doesn't exist`)
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

        if(user){  

            let records = await prescription.model.findOne({where:{ patientName: username , id: id}});

            if(records) {

                res.status(200).json(records);

            }else throw new Error(`This prescriptions doesn't exist`)
        }else throw new Error(`Patient doesn't exist`)
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

        if(user){  

            let records = await prescription.model.findAll({where:{ patientName: username , physicianName: physicianUN}});

            if(records[0]) {

                res.status(200).json(records);

            }else throw new Error(`These prescriptions don't exist`)
        }else throw new Error(`Patient doesn't exist`)
        } catch (e) {
        next(e.message)
        }
    }
}

//----------------------------------------------------------------- Q&A handlers
//---------------------------------------------------------------------------------

async function addQApostByPatient (req, res, next) {

    try {
      
        const { username } = req.params
        const patientFound = await patient.getByUN(username);

        if(patientFound){

            req.body.craetedBy = username;
            const newPost = await QuestionAnswer.create(req.body);
            res.status(201).json(newPost);
            
        }else throw new Error(`This patient doesn't exist`)
      
      
    } catch (error) {
      next(error)
    }
};

//! get all posts 
async function getAllQApostsByPatient(req, res, next) {
    try {
        const { username } = req.params
        const patientFound = await patient.getByUN(username);
        if(patientFound) {

            const allPosts = await QuestionAnswer.model.findAll({
                where: {
                    craetedBy: username
                }
            });
            if(allPosts[0]) {
                res.json(allPosts);
            } else throw new Error(`You didn't post anything yet`)

        } else throw new Error(`This patient doesn't exist`)
    } catch (error) {
        next(error)
    }
};

//! get post bt id 
async function getOneQApostByPatientbyId (req, res, next) {
    try {
      const { username, id } = req.params
      const patientFound = await patient.getByUN(username);
      if(patientFound) {

          const post = await QuestionAnswer.model.findOne({
            where:{
                id:id,
                craetedBy:username
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
async function updateOneQApostByPatientbyId (req, res, next)  {


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
 async function deleteOneQApostByPatientbyId (req, res, next)  {
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




module.exports = patientRouter;

