'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    update:async (ctx) => {
        const formData = ctx.request.body;
        // 修改一条数据
        console.log('formData',formData)
        const line = await strapi.services.script.findOne({ id: ctx.params.id
        });
        console.log('line',line)
        let count = 2
        console.log('conut',count)
        const resp = await strapi.services.script.update({id: ctx.params.id},{count:count});
        console.log('resp',resp)
        ctx.body = { message: 'success', status: 200 };
    }
};
