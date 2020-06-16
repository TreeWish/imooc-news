'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
  
  const {
    user_id, // 用户id
    article_id, // 文章id
    content, // 评论内容
    // comment_id = '', // 评论id
    // reply_id = "", // 子回复ID
    // is_reply = false // 是否子回复
  } = event
  // 获取用户对象
  let user = await db.collection('user').doc(user_id).get()
  user = user.data[0]
  // 获取当前的文章信息
  const article = await db.collection('article').doc(article_id).get()
  // 获取文章下的所有评论
  //const comments = article.data[0].comments
  let commentObj = {
    comment_id: getID(5), //评论ID
    comment_content: content, // 评论内容
    create_time: new Date().getTime(), // 创建时间
    author: {
      author_id: user._id, // 作者id
      author_name: user.author_name, // 作者名称
      avatar: user.avatar, // 作者头像
      professional: user.professional // 专业
    },
    reply: [],
  }
  await db.collection('article').doc(article_id).update({
    comments: dbCmd.unshift(commentObj)
  })
  
  return {
    code: 200,
    msg: '数据更新成功'
  }
};

function getID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}