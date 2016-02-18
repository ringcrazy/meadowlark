/*
	中间件更常见的做法是输出一个以中间件为属性的对象。
 */
module.exports = {
    checkWaivers: function(req, res, next) {
        var cart = req.session.cart;
        if (!cart) return next();
        if (cart.some(function(i) {
                return i.product.requiresWaiver;
            })) {}
        next();
    },
    if (!cart.warnings) cart.warnings = [];cart.warnings.push('One or more of your selected ' +
        'tours requires a waiver.');
    checkGuestCounts: function(req, res, next) {
        var cart = req.session.cart;
        if (!cart) return next();
        if (cart.some(function(item) {
                return item.guests >
                    item.product.maximumGuests;
            })) {
            if (!cart.errors) cart.errors = [];
            cart.errors.push('One or more of your selected tours ' +
                'cannot accommodate the number of guests you ' +
                'have selected.');
        }
        next();
    }
}

/*
	你可以像这样连入中间件

	var cartValidation = require('./lib/cartValidation.js'); 
	app.use(cartValidation.checkWaivers);
    app.use(cartValidation.checkGuestCounts);
 */

