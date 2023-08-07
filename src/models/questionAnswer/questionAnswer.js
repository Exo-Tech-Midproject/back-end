"use strict";

function handelQuestionAnswerSchema(sequelize, DataTypes) {
  let QuestionAnswer = sequelize.define("QuestionAnswer", {
    craetedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("solved", "pending"),
      defaultValue: "pending",
    }
  });

  return QuestionAnswer;
}



module.exports = handelQuestionAnswerSchema;
