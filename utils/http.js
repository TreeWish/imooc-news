export default function http(options) {
   const {url , data} = options;
   const dataObj = {
   		user_id: '5e76254858d922004d6c9cdc',
   		...data
   	}
   return new Promise((resolve, reject) => {
     uniCloud.callFunction({
       name: url,
       data: dataObj
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