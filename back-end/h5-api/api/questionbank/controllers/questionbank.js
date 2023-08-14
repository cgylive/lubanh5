"use strict";

/**
 * questionbank controller
 */
// 生成一个指定范围内的随机整数
function getRandomInt(min, max, num) {
   const res =  Math.floor(Math.random() * (max - min + 1)) + min;
   if(num === res){
     getRandomInt(min, max, num)
   }else{
    console.log(res)
    return res
   }
}
  
module.exports = {
    find: async (ctx) => {
        const resp = await strapi.services.questionbank.find();
        const multi = resp.filter((el)=>el.type==='multi')
        const radio = resp.filter((el)=>el.type==='radio')
        const judgement = resp.filter((el)=>el.type==='judgement')
        const multiInt1 = getRandomInt(0, multi.length-1);
        const multiInt2 = getRandomInt(0, multi.length-1,multiInt1);
        const radioInt1 = getRandomInt(0, radio.length-1);
        const radioInt2 = getRandomInt(0, radio.length-1,radioInt1);
        const judgementInt = getRandomInt(0, judgement.length-1);
        const data = [radio[radioInt1],radio[radioInt2],judgement[judgementInt],multi[multiInt1],multi[multiInt2]]
        return { message: 'success', status: 200, data:data };
    },
}








