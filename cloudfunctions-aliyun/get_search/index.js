'use strict';
const db = uniCloud.database();
// 定义聚合的操作符
const $ = db.command.aggregate;
exports.main = async (event, context) => {
  const {
    user_id,
    value
  } = event;
 const userinfo = await db.collection('user').field({
   "article_likes_ids": true
 }).get();
   const like_id = userinfo.data[0].article_likes_ids;
  // 使用聚合
  // 聚合 ： 更精细化的去处理数据 求和 、分组、指定那些字段
  const list = await db.collection('article')
    .aggregate()
    // 追加字段
    .addFields({
      //  给定一个值和一个数组，如果值在数组中则返回 true，否则返回 false
      is_like: $.in(['$_id', like_id])
    })
    .project({
      content: 0
    })
    .match({
      title: new RegExp(value)
    })
    .end()
  return {
    code: 200,
    msg: '数据请求成功',
    data: list.data
  }
};
