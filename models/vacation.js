var mongoose = require('mongose');
var vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,
    description: String,
    priceInCents: Number,
    tags: [String],
    inSeason: Boolean,
    available: Boolean,
    requiresWaiver: Boolean,
    maximumGuests: Number,
    notes: String,
    packagesSold: Number,
});
vacationSchema.methods.getDisplayPrice= function(){
	return '$' + (this.priceInCents/100).toFixed(2);
};
var Vocation = mongoose.model('Vacation', vocationSchema);
module.exports = Vocation;

/*
	由于浮点数的特质,在 JavaScript 中涉及金融计算时要谨慎。
	以美分为单位 存储价格有帮助,但并不能根除这个问题。
	在下一版的 JavaScript(ES6)中 会有个适合做金融计算的 decimal 类型。
	
 */
