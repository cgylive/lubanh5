"use strict";

/**
 * questionbank controller
 */
// 生成一个指定范围内的随机整数
function getRandomInt(min, max, num) {
   const res =  Math.floor(Math.random() * (max - min + 1)) + min;
   if(num && num.length && num.includes(res)){
    return -1
   }else{
    return res
   }
}
  
module.exports = {
    find: async (ctx) => {
      const { type }  = ctx.request.query;
      const resp = await strapi.services.questionbank.find();
      if(type === 'imagetext'){
        console.log(type)
        const res = resp.filter((el)=>el.type==='imagetext')
        let num = []
        let list = []
        for(let i =0;i<5;i++){
          const index = getRandomInt(0, res.length-1,num);
          if(index === -1){
            i--
          }else{
            num.push(index)
            list.push(res[index])
          }
        }
        return { message: 'success', status: 200, data:list };
      }else{
        const multi = resp.filter((el)=>el.type==='checkbox')
        const radio = resp.filter((el)=>el.type==='radio')
        const judgement = resp.filter((el)=>el.type==='judgement')
        let num = []
        let res = null
        let list = []
        for(let i =0;i<5;i++){
          if(i<2){
            res = radio
          }
          if(i === 2){
            num = []
            res = judgement
          }
          if(i === 3){
            num = []
          }
          if(i>2){
            res = multi
          }
          const index = getRandomInt(0, res.length-1,num);
          if(index === -1){
            i--
          }else{
            num.push(index)
            list.push(res[index])
            console.log(i,num)
          }
        }
        return { message: 'success', status: 200, data:list };
      }
    },
}








