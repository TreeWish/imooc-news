'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  const label = await db.collection('label').get();
 
  return {
    code: 200,
    msg: '数据请求成功',
    data: label.data
  }
};
