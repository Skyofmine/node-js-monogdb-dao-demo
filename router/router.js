
'use strict'

const db = require('../db/db.js')

exports.insert = (req,res,next) =>{
  let username = req.query.username,password = req.query.password
  if(!username || !password){
    res.send('miss parameter')
    return
  }
  db.insertOne('student',{"username":username,"password":password},(err,result)=>{
    if(err){
      console.log(err)
      res.send('system is error')
      return
    }
    res.send(result)
  })
}

exports.remove = (req,res,next) =>{
  let name = req.query.name
  if(!name){
    res.send('miss parameter');
    return
  }
  db.remove('student',{"name":name},(err,result)=>{
    if(err){
      console.log(err)
      res.send('system is error')
      return
    }
    res.send(result)
  })
}

exports.search = (req,res,next) =>{
  let username = req.query.username
  if(!username){
    res.send('miss parameter')
    return
  }
  db.find('student',{"username":username},(err,result)=>{
    console.log(result)
    if(err){
      res.send('system is error')
      return
    }
    res.json(result)
  })
}

exports.sort = (req,res,next) => {
  let page_num = req.query.page_num,page_size = req.query.page_size
  if (!page_num || !page_size) {
    res.json({code:'1',msg:'miss parameter'})
    return
  }
  db.find('student',{"username":"landluck"},{"page_num": page_num, "page_size": page_size,"sort":{"password":-1}},(err,result) => {
    if (err) {
      console.log(err)
      res.json({code:'1',msg:'system is error'})
      return
    }
    res.json({code:'0',msg:'success',result:result})
  })
}

exports.updateInfo = (req,res,next) => {
  if(!req.query.password) {
    res.json({code:'1',msg:'miss parameter'})
    return
  }
  db.updateOne('student',{"password":1},{$set:{"username":"landluck124"}},(err,result) => {
    if(err){
      console.log(err)
      res.json({code:'1',msg:'system is error'})
      return
    }
    res.json({code:'0',msg:'success'})
  })
}