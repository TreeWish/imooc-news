export default function http(options) {
   const {url , data} = options;
   return new Promise((resolve, reject) => {
     uniCloud.callFunction({
       name: url,
       data
     }).then((res) => {
       if(res.result.code === 200) {
         // .then
         resolve(res.result);
       } else {
         // catch
         reject(res.result);
       }
       // 失败了则在catch里面返回
     }).catch((err) => {
       reject(err);
     }) 
   })
}