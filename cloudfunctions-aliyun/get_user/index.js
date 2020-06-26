'use strict';
const db = uniCloud.database();
// 定义聚合的操作符
exports.main = async (event, context) => {
  //const user_id = '5ed5b51d770027004c4cbe8a'
  const {
    user_id
  } = event;


  // 使用聚合
  // 聚合 ： 更精细化的去处理数据 求和 、分组、指定那些字段
  const userinfo = await db.collection('user').doc(user_id).get()
  //event为客户端上传的参数
  // const list = await db.collection('article').field({
  //   // true 返回这个字段的， false 表示不返回
  //   content: false
  // }).get();
  //返回数据给客户端
  return {
    code: 200,
    msg: '数据请求成功',
    data: userinfo.data[0]
  }
};
