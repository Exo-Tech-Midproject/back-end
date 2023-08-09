// // const { patient } = require("../../models");

// // physicianRouter.get('/patient/:username/groups',bearerAuthpatient , getpatientGroup);
// // patientRouter.get('/patient/:username/groups/:groupName',bearerAuthpatient , getOnepatientGroup);
// // // patientRouter.put('/patient/:username/groups/:id',bearerAuthpatient , updateGroup);
// // // patientRouter.delete('/patient/:username/groups/:id', bearerAuthpatient ,deleteGroup);
// // // patientRouter.post('/patient/:username/groups', bearerAuthpatient ,createGroup);
// // // patientRouter.post('/patient/:username/patients/:patientUN/addtogroup/:groupName', bearerAuthpatient ,addMembersToGroups);




// // async function getpatientGroup(req, res, next) {
// //     try{
// //         const {username} = req.params
// //         let foundpatient = await patient.getByUN(username)
// //         if(!foundpatient) throw new Error('patient not found')

// //         let groupsFound = await foundpatient.getGroup()

// //         if (!groupsFound[0]) throw new Error('You have no groups yet!')

// //         res.status(200).json(groupsFound)
// //     }catch(err){
// //         next(err)
// //     }
// // }
// // async function getOnepatientGroup(req, res, next) {
// //     try{
// //         const {username, groupName} = req.params
// //         let foundpatient = await patient.getByUN(username)
// //         if(!foundpatient) throw new Error('patient not found')

// //         let groupsFound = await foundpatient.getGroup(
// //             {
// //                 where: {
// //                     groupName: groupName
// //                 }
// //             }
// //         )

// //         if (!groupsFound[0]) throw new Error(`You aren't a memeber of this group`)

// //         res.status(200).json(groupsFound)
// //     }catch(err){
// //         next(err)
// //     }
// // }



// groupRouter.get('/patient/:username/groups/:id/posts', bearerAuth ,getAllgroupsPosts);
// groupRouter.get('/patient/:username/groups/:id/posts/:postID', getOneGroupsPostByID);





// async function getAllgroupsPosts(req, res, next) {
//     try{
//         const {username, id} = req.params
//         let foundpatient = await patient.getByUN(username)
//         if(!foundpatient) throw new Error('patient not found')
//         let foundGroup =  await foundpatient.getGroup({
//                 where:{
//                     id: id
//                 }
//         })

 
//         if(!foundGroup) throw new Error(`You aren't a member in that group`)
//         let groupsPostsFound = await groupPosts.model.findAll({
//             where: {
//                 groupID: id

//             }
//         })

//         if (!groupsPostsFound[0]) throw new Error('You have no posts yet!')


//         res.status(200).json(groupsPostsFound)
//     }catch(err){
//         next(err)
//     }
// }

// async function getOneGroupsPostByID(req, res, next ) {
//     try{
//         const {username, id ,postID} = req.params
//         let foundpatient = await patient.getByUN(username)
//         if(!foundpatient) throw new Error('patient not found')
//         let foundGroup =  await foundpatient.getGroup({
//                 where:{
//                     id: id
//                 }
//         })

 
//         if(!foundGroup) throw new Error(`You aren't a member in that group`)
//         let groupsPostsFound = await groupPosts.model.findOne({
//             where: {
//                 groupID: id,
//                 id:postID

//             }
//         })

//         if (!groupsPostsFound) throw new Error(`This post doesn't exist anymore`)


//         res.status(200).json(groupsPostsFound)
//     }catch(err){
//         next(err)
//     }
// }


// // async function addgroupsPosts(req, res ,next) {
// //     try{
// //         const { username, id } = req.params
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         let foundGroup = await group.model.findOne({
// //         where:{
// //             physicianUN: username,
// //             id: id
// //         }    

// //         })
// //         if (!foundGroup) throw new Error(`You don't own that group`)

// //         req.body.author = username
// //         req.body.groupID = id
        
// //         let createdPost = await groupPosts.create(req.body)
            

// //         res.status(201).json(createdPost)
// //     }catch(err){
// //         next(err)
// //     }
// // }

// // async function updateOneGroupsPostByID(req, res, next) {
// //     try{
// //         const { username, id ,postID } = req.params
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         req.body.author = username
// //         let foundGroup = await group.model.findOne({
// //             where:{
// //                 physicianUN: username,
// //                 id: id
// //             }    
    
// //             })

// //         if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
// //         let foundpost =  await groupPosts.model.findOne({
// //                 where:{
// //                     id: postID,
// //                     author: username,
// //                     groupID: id
// //                 }})

// //                 if(!foundpost) throw new Error(`This post doesn't exist anymore`)
// //         let updatedPost  = foundpost.updatE(req.body)




// //         res.status(202).json(updatedPost)
// //     }catch(err){
// //         next(err)
// //     }

// // }

// // async function deleteOneGroupsPostByID(req, res) {
// //     try{
// //         const { username, id ,postID } = req.params
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         let foundGroup = await group.model.findOne({
// //             where:{
// //                 physicianUN: username,
// //                 id: id
// //             }    
    
// //             })

// //         if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
// //         let foundpost =  await groupPosts.model.findOne({
// //                 where:{
// //                     id: postID,
// //                     author: username,
// //                     groupID: id
// //                 }})

// //                 if(!foundpost) throw new Error(`This post doesn't exist anymore`)
// //                 let deletedPost = await groupPosts.model.delete(
// //                     {where: {
// //                         id:postID,
// //                         author:username,
// //                         groupID:id
// //                     }}
// //                     )




// //         res.status(200).json(`Post with id ${postID} in group ${foundGroup.groupName} has been deleted successfully`)
// //     }catch(err){
// //         next(err)
// //     }
// // }