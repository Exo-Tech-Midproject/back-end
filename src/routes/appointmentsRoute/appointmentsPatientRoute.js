// // Appointment Routes

// const { patient, appointment } = require("../../models");

// //add Appointment
// userRouter.get('/patient/:username/appointments', getAllAppointmentsForPatient)
// userRouter.get('/patient/:username/physician/:physicianUN/appointments', getAllAppointmentsForPatientByPhysicianUn)
// userRouter.get('/patient/:username/appointments/:id', getAppointmentsByIdForPatient)

// async function getAllAppointmentsForPatient(req, res , next)  {
//     try{

//         const {username} = req.params;
//         const foundpatient = await patient.getByUN(username);
//         if (foundpatient){
//            let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username}})
//            if(allAppointments[0]) res.status(200).json(allAppointments)
//            else throw new Error('There are no appointments set by your physicians ')
           
//         } else throw new Error('Patient not found')

//     }catch(err){
//         next(err)
//     }

// };
// async function getAllAppointmentsForPatientByPhysicianUn(req, res, next)  {
//     try{

//         const {username, physicianUN} = req.params;
//         const foundpatient = await patient.getByUN(username);
//         if (foundpatient){
//            let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username, physicianUsername: physicianUN}})
//            if(allAppointments[0]) res.status(200).json(allAppointments)
//            else throw new Error('There are no appointments set by your physician ')
           
//         } else throw new Error('Patient not found')

//     }catch(err){
//         next(err)
//     }

// };
// async function getAppointmentsByIdForPatient(req, res, next)  {
//     try{

//         const {username, id} = req.params;
//         const foundpatient = await patient.getByUN(username);
//         if (foundpatient){
//            let  allAppointments =  await appointment.model.findAll({where:{patientUsername:username, id: id}})
//            if(allAppointments[0]) res.status(200).json(allAppointments)
//            else throw new Error('There are no appointments with this id ')
           
//         } else throw new Error('Patient not found')

//     }catch(err){
//         next(err)
//     }

// };

