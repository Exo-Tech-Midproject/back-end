// // Appointment Routes

// const { physician, appointment } = require("../../models");

// //add Appointment
// userRouter.post('/physician/:username/patients/:patientUN/appointments', addAppointmentToPatientByUN)
// userRouter.get('/physician/:username/patients/:patientUN/appointments', getAppointmentOfPatientByUN)
// userRouter.get('/physician/:username/appointments', getAllAppointmentOfPatient)
// userRouter.put('/physician/:username/:patientUN/appointments/:id', updateAppointmentOfPatientByUNandID)
// userRouter.delete('/physician/:username/:patientUN/appointments/:id', deleteAppointmentOfPatientByUN)

//     async function addAppointmentToPatientByUN(req, res, next) {
//         try {

//             const { username, patientUN } = req.params;
//             const physicianFound = await physician.getByUN(username);

//             if (physicianFound) {
//                 let subscribers = await physicianFound.getSubscriber({
//                     where: {
//                         username: patientUN
//                     },
//                     through: {
//                         model: "subscriptions"
//                     }

//                 })
//                 if (subscribers[0]) {
//                     let appointmentData = req.body;
//                     appointmentData.physicianUsername = username;
//                     appointmentData.patientUsername = patientUN;

//                     const appointmentInfo = await appointment.create(appointmentData);

//                     return res.status(201).json(appointmentInfo);

//                 } else throw new Error(`This patient didn't subscribe for you`)
//             } else throw new Error(`Physician isn't found`)
//         } catch (err) {
//             next(err)
//         }

//     };
//     async function getAllAppointmentOfPatient(req, res, next) {
//         try {

//             const { username } = req.params;
//             const physicianFound = await physician.getByUN(username);

//             if (physicianFound) {

//                 const appointments = await appointment.model.findAll({ where: { physicianUsername: username } })   
//                 return res.status(201).json(appointments);

//             } else throw new Error(`Physician isn't found`)
//         } catch (err) {
//             next(err)
//         }

//     };
//     async function getAppointmentOfPatientByUN(req, res, next) {
//         try {

//             const { username , patientUN} = req.params;
//             const physicianFound = await physician.getByUN(username);

//             if (physicianFound) {
//                 let subscribers = await physicianFound.getSubscriber({
//                     where: {
//                         username: patientUN
//                     },
//                     through: {
//                         model: "subscriptions"
//                     }

//                 })
//                 if (subscribers[0]) {

//                     const appointments = await appointment.model.findAll({ where: { physicianUsername: username , patientUsername: patientUN} })
//                     return res.status(200).json(appointments);

//                 } else throw new Error(`This patient didn't subscribe for you`)
//             } else throw new Error(`Physician isn't found`)
//         } catch (err) {
//             next(err)
//         }

//     };
// async function updateAppointmentOfPatientByUNandID(req, res, next) {
//     try {

//         const { username, patientUN, id } = req.params;
//         const physicianFound = await physician.getByUN(username);

//         if (physicianFound) {
//             let subscribers = await physicianFound.getSubscriber({
//                 where: {
//                     username: patientUN
//                 },
//                 through: {
//                     model: "subscriptions"
//                 }

//             })
//             if (subscribers[0]) {

//                 const appointments = await appointment.model.findOne({ where: { physicianUsername: username, patientUsername: patientUN, id: id } })
//                 if (appointments) {
//                     let appointmentData = req.body;
//                     appointmentData.physicianUsername = username;
//                     appointmentData.patientUsername = patientUN;
//                     appointments.update(req.body)
//                     return res.status(200).json(appointments);
//                 } else throw new Error(`Appointment doesn't exist`)

//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)
//     } catch (err) {
//         next(err)
//     }

// };
// async function deleteAppointmentOfPatientByUN(req, res, next) {
//     try {

//         const { username, patientUN, id } = req.params;
//         const physicianFound = await physician.getByUN(username);

//         if (physicianFound) {
//             let subscribers = await physicianFound.getSubscriber({
//                 where: {
//                     username: patientUN
//                 },
//                 through: {
//                     model: "subscriptions"
//                 }

//             })
//             if (subscribers[0]) {

//                 const appointments = await appointment.model.findOne({ where: { physicianUsername: username, patientUsername: patientUN, id: id } })
//                 if (appointments) {
//                      appointment.delete(id)
//                     return res.status(200).json(`Appointment with id ${id} and date of ${appointment.date} has been deleted`);
//                 } else throw new Error(`Appointment doesn't exist`)

//             } else throw new Error(`This patient didn't subscribe for you`)
//         } else throw new Error(`Physician isn't found`)
//     } catch (err) {
//         next(err)
//     }

// };


