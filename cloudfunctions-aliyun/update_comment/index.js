'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
  
  const {
    user_id, // 用户id
    article_id, // 文章id
    content, // 评论内容
    comment_id = '', // 评论id
    reply_id = "", // 子回复ID
    is_reply = false // 是否子回复
  } = event
  // 获取用户对象
  let user = await db.collection('user').doc(user_id).get()
  user = user.data[0]
  // 获取当前的文章信息
  const article = await db.collection('article').doc(article_id).get()
  // 获取文章下的所有评论
  const comments = article.data[0].comments
  let commentObj = {
    comment_id: getID(5), //评论ID
    comment_content: content, // 评论内容
    create_time: new Date().getTime(), // 创建时间
    is_reply: is_reply, // 区分主回复，还是子回复 
    author: {
      author_id: user._id, // 作者id
      author_name: user.author_name, // 作者名称
      avatar: user.avatar, // 作者头像
      professional: user.professional // 专业
    },
    reply: [],
  }
  // 判断当前是评论文章还是回复评论
  if (comment_id === '') {
    // 评论文章
    commentObj.replys = []
    commentObj = dbCmd.unshift(commentObj)
  } else {
    // 回复评论 
    // 获取评论索引
    let index = comments.findIndex(item => item.comment_id === comment_id)
    
     let commentAuthor = ''
    // 判断是否为子回复
    if (is_reply) {
      //子回复
      commentAuthor = comments[index].reply.find(item => item.comment_id === reply_id)
    } else {
      // 主回复
      // 获取作者信息
      commentAuthor = comments.find(item => item.comment_id === comment_id)
    }
    commentAuthor = commentAuthor.author.author_name
    // 收件人信息  字符串数组类型，输入的地址收件人信息必须符合消息类型格式。 
    commentObj.to = commentAuthor
    
    // 更新回复信息
    commentObj = {
      [index]: {
        reply: dbCmd.unshift(commentObj)
      }
    }
  }
  
  await db.collection('article').doc(article_id).update({
    comments: commentObj
  })
  
  return {
    code: 200,
    msg: '数据更新成功'
  }
};

function getID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}