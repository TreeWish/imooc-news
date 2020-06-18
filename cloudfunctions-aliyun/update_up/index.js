'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const {
    user_id,
    article_id
  } = event
  
  const user = await db.collection('user').doc(user_id).get()
  const thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
  
  let dbCmdFun = null;
  if (thumbs_up_article_ids.includes(article_id)) {
    return {
      code: 200,
      msg: '您已经点过赞了'
    }
  } else {
    dbCmdFun = dbCmd.addToSet(article_id)
  }
  
  await db.collection('user').doc(user_id).update({
    // inc 原子操作 ，减少一次请求
    thumbs_up_article_ids: dbCmdFun
  })
  await db.collection('article').doc(article_id).update({
    thumbs_up_count: dbCmd.inc(1)
  })
  
  //返回数据给客户端
  return {
    code: 200,
    msg: '点赞成功'
  }
};
