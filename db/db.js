
'use strict'
//引入mongodb
const MongoClient = require('mongodb').MongoClient;
//加载开发配置
const config = require('../config/index.js');

//创建公用数据库连接
const _connectDB = (callback) => {
  MongoClient.connect(config.dev.databaseUrl, (err, client) => {
    console.log('db is connect')
    callback(err, client)
  });
}



/**
*@param collectionName 集合名
*@param json 插入的json数据
*@param callback 回调函数
*@return result {"n":1,"ok":1}
*/


//插入
const insertOne = (collectionName, json, callback) => {
  _connectDB((err, client) => {
    if (err) {
      callback(err, null)
      return
    }
    client.db(config.dev.database).collection(collectionName).insertOne(json, (err, result) => {
      callback(err, result)
      client.close()
    })
  })
}

//删除
const remove = (collectionName, json, callback) => {
  _connectDB((err, client) => {
    if (err) {
      callback(err, null)
      return
    }
    client.db(config.dev.database).collection(collectionName).deleteMany(json, (err, result) => {
      callback(err, result)
      client.close()
    })
  })
}
//查找
const find = (collectionName, json, c, d) => {
  let limit = 0,
    skip = 0,
    callback, result = [],
    sort = {};
  if (typeof (c) === 'function') {
    callback = c
  } else if (typeof (d) === 'function') {
    callback = d
    limit = c.page_size && typeof (c.page_size) === 'string' ? parseInt(c.page_size) : c.page_size || 0
    skip = (c.page_num - 1) * c.page_size || 0
    sort = c.sort
  }
  _connectDB((err, client) => {
    if (err) {
      callback(err, null)
      return
    }
    let cursor = client.db(config.dev.database).collection(collectionName).find(json).sort(sort).skip(skip).limit(limit)
    cursor.each((err, doc) => {
      if (err) {
        callback(err, null)
        client.close()
        return
      }
      if (doc !== null) {
        result.push(doc)
      } else {
        callback(null, result)
        client.close();
      }
    })
  })
}

//更新
const updateOne = (collectionName, json1, json2, callback) => {
  _connectDB((err, client) => {
    if (err) {
      callback(err, null)
      return
    }
    client.db(config.dev.database).collection(collectionName).update(json1, json2, (err, result) => {
      if(err){
        callback(err,null)
        return
      }
      callback(null,result)
      client.close();
    })
  })
}



module.exports = {
  insertOne,
  remove,
  find,
  updateOne
}