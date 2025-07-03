'use strict';
const fs=require("fs").promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data=await fs.readFile("./dummy_data/posts.json","utf8")
    data=JSON.parse(data)
    data=data.map(e=>{
      delete e.id
      e.createdAt=new Date()
      e.updatedAt=new Date()
      return e
    })
    await queryInterface.bulkInsert("Posts",data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts",null,{})
  }
};
