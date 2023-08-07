'use strict'

const { Router } = require("express");
const { testing } = require("../../models/index");

class MethodCollection {

    constructor(model) {
      this.model = model;
    }
  
    get(id) {
      if (id) {
        return this.model.findOne({ where: { id } });
      }
      else {
        return this.model.findAll({});
      }
    }

    getByUN(username) {
      if (username) {
        return this.model.findOne({ where: { username } });
      }
      else {
        return this.model.findAll({});
      }
    }
  
    create(record) {
      return this.model.create(record);
    }
  
    update(id, data) {
      return this.model.findOne({ where: { id } })
        .then(record => record.update(data));
    }

    updateByUN(username, data) {
      return this.model.findOne({ where: { username } })
        .then(record => record.update(data));
    }
  
    delete(id) {
      return this.model.destroy({ where: { id }});
    }

    deleteByUN(username) {
      return this.model.destroy({ where: { username }});
    }

    getRelatedData(model) {
      return this.model.findOne({
        // where:{username},
        include:[
          {
            model: model,
            as: 'History',
            attributes: {
              exclude: ['patientUN','id']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt','token','password','accountType']
        }
      })
  
    }
    getRelatedDataForOne(username,model) {
      return this.model.findOne({
        where:{username},
        include:[
          {
            model: model,
            as: 'Prescriptions',
            
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt','token','password','accountType']
        }
      })
  
    }
    getRelatedDataForOnephys(username,model) {
      return this.model.findOne({
        where:{username},
        include:[
          {
            model: model,
            as: 'PrescriptionsCreated',
            
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt','token','password','accountType']
        }
      })
  
    }
    getRelatedDataPhysician(model,model2,model3) {
      return this.model.findAll({
        // where:{username},
        include:[
          {
            model: model,
            as: 'HistoryCreated',
            attributes: {
              exclude: ['patientUN','id']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt','token','password','accountType','birthDate','address','nationalID','gender']
        }
      })
  
    }
    getRelatedDataOnePhysician(username,model,model2,model3) {
      return this.model.findOne({
        where:{username},
        include:[
          {
            model: model,
            as: 'HistoryCreated',
            attributes: {
              exclude: ['id']
            }
          }
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt','token','password','accountType','birthDate','address','nationalID','gender']
        }
      })
  
    }
      async getSubscriptionsPatient(username, model, model2, model3) {
        let usersfound = await this.model.findOne({
          where: { username },
        })
        let record = await usersfound.getSubscription({
          attributes:{
            exclude: ['createdAt', 'updatedAt','token','password','accountType','birthDate','address','nationalID','gender']
          }
        })
        return record
      }
      async getSubscriptionsPhysician(username, model, model2, model3) {
        let usersfound = await this.model.findOne({
          where: { username },
        })
        let record = await usersfound.getSubscriber({
          attributes:{
            exclude: ['createdAt', 'updatedAt','token','password','accountType','birthDate','address','nationalID','gender']
          }
        })
        return record
      }
      // return await this.model.findOne({
      //   where:{username},
      //   include:[
      //     {
      //       model: model,
      //       as: 'Subscriber',
      //       attributes: {
      //         exclude: ['patientUN','id']
      //       }
      //     }
      //   ],
      //   attributes: {
      //     exclude: ['createdAt', 'updatedAt','token','password','accountType','birthDate','address','nationalID','gender']
      //   }
      // })
  
    }
    
  

  

  }


  

module.exports = MethodCollection;