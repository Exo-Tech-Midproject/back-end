'use strict';
function handleCommentSchema(sequelize, DataTypes) {
    let Comment = sequelize.define("Comment", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postID:{
          type: DataTypes.INTEGER,
      }
    });
    return Comment;
  }
  
  module.exports = handleCommentSchema;
  