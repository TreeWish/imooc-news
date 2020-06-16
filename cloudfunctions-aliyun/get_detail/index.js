'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const {
    user_id,
    article_id
  } = event
  let userinfo = await db.collection('user').doc(user_id).get()
  userinfo = userinfo.data[0]
  let list = await db.collection('article').aggregate().addFields({
    // 是否关注作者
    is_author_like: $.in(['$author.id', userinfo.author_likes_ids]),
    // 是否收藏文章
    is_like: $.in(['$_id', userinfo.article_likes_ids]),
    // 是否点赞
    is_thumbs_up: $.in(['$_id', userinfo.thumbs_up_article_ids])
  })
  .match({
    _id: article_id
  })
  .project({
    comments: 0
  })
  .end()

  //返回数据给客户端
  return {
    code: 200,
    msg: '数据请求成功',
    data: list.data[0]
  }
};
