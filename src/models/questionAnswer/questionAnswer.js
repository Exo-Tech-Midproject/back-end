"use strict";

function handelQuestionAnswerSchema(sequelize, DataTypes) {
  let QuestionAnswer = sequelize.define("QuestionAnswer", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.JSON,
      defaultValue: '[]', 
      get() {
        const rawValue = this.getDataValue('comments');
        return JSON.parse(rawValue);
      },
      set(value) {
        this.setDataValue('comments', JSON.stringify(value));
      },
    },
    status: {
      type: DataTypes.ENUM("solved", "pending"),
      defaultValue: "pending",
    },
  });
  return QuestionAnswer;
}

module.exports = handelQuestionAnswerSchema;
