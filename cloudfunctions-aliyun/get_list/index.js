'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  const {label} = event; 
  let matchObj = {};
  if (label !== '全部') {
    matchObj = {
      classify: label
    }
  }
  // 使用聚合
  const list = await db.collection('article')
  .aggregate()
  .match({
    matchObj
  })
  .project({
    content: 0
  })
  .end()
  //event为客户端上传的参数
  // const list = await db.collection('article').field({
  //   // true 返回这个字段的， false 表示不返回
  //   content: false
  // }).get();
  //返回数据给客户端
  return {
    code: 200,
    msg: '数据请求成功',
    data: list.data
  }
};
