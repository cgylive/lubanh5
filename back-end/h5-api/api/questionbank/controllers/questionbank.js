"use strict";

/**
 * questionbank controller
 */
// 生成一个指定范围内的随机整数
function getRandomInt(min, max, num) {
   const res =  Math.floor(Math.random() * (max - min + 1)) + min;
   if(num && num.length && num.includes(res)){
    getRandomInt(min, max, num)
   }
   if(num === res){
     getRandomInt(min, max, num)
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
        for(let i =0;i<6;i++){
          const index = getRandomInt(0, res.length-1,num);
          num.push(index)
          if(res[index]){
            list.push(res[index])
          }
        }
        return { message: 'success', status: 200, data:list };
      }else{
        const multi = resp.filter((el)=>el.type==='checkbox')
        const radio = resp.filter((el)=>el.type==='radio')
        const judgement = resp.filter((el)=>el.type==='judgement')
        const multiInt1 = getRandomInt(0, multi.length-1);
        const multiInt2 = getRandomInt(0, multi.length-1,multiInt1);
        const radioInt1 = getRandomInt(0, radio.length-1);
        const radioInt2 = getRandomInt(0, radio.length-1,radioInt1);
        const judgementInt = getRandomInt(0, judgement.length-1);
        const data = [radio[radioInt1],radio[radioInt2],judgement[judgementInt],multi[multiInt1],multi[multiInt2]]
        return { message: 'success', status: 200, data:data };
      }
    },
}








