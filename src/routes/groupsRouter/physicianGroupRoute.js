// 'use strict';

// const express = require('express');
// const { group , patient, physician, groupPosts } = require('../../models');
// const groupRouter = express.Router();

// // groupRouter.get('/physician/:username:/groups', getGroup);
// // groupRouter.get('/physician/:username:/group/:id', getOneGroup);
// // groupRouter.put('/physician/:username:/group/:id', updateGroup);
// // groupRouter.delete('/physician/:username:/group/:id', deleteGroup);
// // groupRouter.post('/physician/:username:/group', createGroup);
// // groupRouter.post('/physician/:username:/patients/:patientUN/addtogroup/:groupName', addMembersToGroups);


// groupRouter.get('/physician/:username/groups/:id/posts', bearerAuth ,getAllgroupsPosts);
// groupRouter.post('/physician/:username/groups/:id/posts', bearerAuth ,addgroupsPosts);
// groupRouter.get('/physician/:username/groups/:id/posts/:postID', getOneGroupsPostByID);
// groupRouter.put('/physician/:username/groups/:id/posts/:postID', bearerAuth ,updateOneGroupsPostByID);
// groupRouter.delete('/physician/:username/groups/:id/posts/:postID', bearerAuth ,deleteOneGroupsPostByID);




// async function getAllgroupsPosts(req, res, next) {
//     try{
//         const {username, id} = req.params
//         let foundphysician = await physician.getByUN(username)
//         if(!foundphysician) throw new Error('physician not found')
//         let foundGroup = await group.model.findOne({
//         where:{
//             physicianUN: username,
//             id: id
//         }    

//     })
//         if(!foundGroup) throw new Error(`You don't own that group`)
//         let groupsPostsFound = await groupPosts.model.findAll({
//             where: {
//                 author: username,
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
//         const {username, id , postID} = req.params
//         let foundphysician = await physician.getByUN(username)
//         if(!foundphysician) throw new Error('physician not found')
//         let foundGroup = await group.model.findOne({
//         where:{
//             physicianUN: username,
//             id: id
//         }    

//     })
//         if(!foundGroup) throw new Error(`You don't own that group`)
//         let groupsPostsFound = await groupPosts.model.findOne({
//             where: {
//                 author: username,
//                 groupID: id,
//                 id : postID

//             }
//         })

//         if (!groupsFound[0]) throw new Error(`Post doesn't exist`)


//         res.status(200).json(groupsPostsFound)
//     }catch(err){
//         next(err)
//     }
// }


// async function addgroupsPosts(req, res ,next) {
//     try{
//         const { username, id } = req.params
//         let foundphysician = await physician.getByUN(username)
//         if(!foundphysician) throw new Error('physician not found')

//         let foundGroup = await group.model.findOne({
//         where:{
//             physicianUN: username,
//             id: id
//         }    

//         })
//         if (!foundGroup) throw new Error(`You don't own that group`)

//         req.body.author = username
//         req.body.groupID = id
        
//         let createdPost = await groupPosts.create(req.body)
            

//         res.status(201).json(createdPost)
//     }catch(err){
//         next(err)
//     }
// }

// async function updateOneGroupsPostByID(req, res, next) {
//     try{
//         const { username, id ,postID } = req.params
//         let foundphysician = await physician.getByUN(username)
//         if(!foundphysician) throw new Error('physician not found')

//         req.body.author = username
//         let foundGroup = await group.model.findOne({
//             where:{
//                 physicianUN: username,
//                 id: id
//             }    
    
//             })

//         if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
//         let foundpost =  await groupPosts.model.findOne({
//                 where:{
//                     id: postID,
//                     author: username,
//                     groupID: id
//                 }})

//                 if(!foundpost) throw new Error(`This post doesn't exist anymore`)
//         let updatedPost  = foundpost.updatE(req.body)




//         res.status(202).json(updatedPost)
//     }catch(err){
//         next(err)
//     }

// }

// async function deleteOneGroupsPostByID(req, res) {
//     try{
//         const { username, id ,postID } = req.params
//         let foundphysician = await physician.getByUN(username)
//         if(!foundphysician) throw new Error('physician not found')

//         let foundGroup = await group.model.findOne({
//             where:{
//                 physicianUN: username,
//                 id: id
//             }    
    
//             })

//         if (!foundGroup) throw new Error(`No Such group exists in your groups list`)
//         let foundpost =  await groupPosts.model.findOne({
//                 where:{
//                     id: postID,
//                     author: username,
//                     groupID: id
//                 }})

//                 if(!foundpost) throw new Error(`This post doesn't exist anymore`)
//                 let deletedPost = await groupPosts.model.delete(
//                     {where: {
//                         id:postID,
//                         author:username,
//                         groupID:id
//                     }}
//                     )




//         res.status(200).json(`Post with id ${postID} in group ${foundGroup.groupName} has been deleted successfully`)
//     }catch(err){
//         next(err)
//     }
// }



// // async function getGroup(req, res, next) {
// //     try{
// //         const {username} = req.param
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         let groupsFound = await group.model.findAll({
// //             where: {
// //                 physicianUN: username
// //             }
// //         })

// //         if (!groupsFound[0]) throw new Error('You have no groups yet!')

// //         res.status(200).json(groupsFound)
// //     }catch(err){
// //         next(err)
// //     }
// // }

// // async function getOneGroup(req, res ) {
// //     try{
// //         const {username,id} = req.param
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         let groupsFound = await group.model.findOne({
// //             where: {
// //                 physicianUN: username,
// //                 id:id

// //             }
// //         })

// //         if (!groupsFound) throw new Error(`This group doesn't exist`)

// //         res.status(200).json(groupsFound)
// //     }catch(err){
// //         next(err)
// //     }
// // }


// // async function createGroup(req, res ,next) {
// //     try{
// //         const { username } = req.param
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         req.body.physicianUN = username
// //         let groupsNamefound = req.body.groupName
// //         let groupsFound = await group.model.findOne({
// //             where: {
// //                 groupName: groupsNamefound,

// //             }
// //         })

// //         if (groupsFound) throw new Error(`This group name already taken choose another name`)
        
// //         let createdGroup = await group.create(req.body)

// //         res.status(201).json(createdGroup)
// //     }catch(err){
// //         next(err)
// //     }
// // }

// // async function updateGroup(req, res) {
// //     try{
// //         const { username, id } = req.param
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         req.body.physicianUN = username
// //         let groupsFound = await group.model.findOne({
// //             where: {
// //                 physicianUN: username,
// //                 id:id

// //             }
// //         })

// //         if (!groupsFound) throw new Error(`No Such group exists in your groups list`)
// //         let groupNameToChange = req.body.groupName
// //         let checkedGroup = await group.model.findOne({
// //             where: {
// //                 groupName: groupNameToChange

// //             }
// //         })
// //         if(checkedGroup) throw new Error("Group name exists, please choose another name")
// //         let updatedGroup = await groupsFound.update(req.body)

// //         res.status(202).json(updatedGroup)
// //     }catch(err){
// //         next(err)
// //     }

// // }

// // async function deleteGroup(req, res) {
// //     try{
// //         const { username, id } = req.param
// //         let foundphysician = await physician.getByUN(username)
// //         if(!foundphysician) throw new Error('physician not found')

// //         req.body.physicianUN = username
// //         let groupsFound = await group.model.findOne({
// //             where: {
// //                 physicianUN: username,
// //                 id:id

// //             }
// //         })

// //         if (!groupsFound) throw new Error(`No Such group exists in your groups list`)


        
// //         let deletedGroup = await group.delete(id)

// //         res.status(200).json(`Group with name : ${groupsFound.groupName} has deleted successfully`)
// //     }catch(err){
// //         next(err)
// //     }
// // }



// module.exports = groupRouter;