const mongoose =require('mongoose');

const tallySchema = new mongoose.Schema({
    state: Schema.Types.String,
    infected: Schema.Types.Number,
    recovered: Schema.Types.Number,
    death: Schema.Types.Number,
})

exports.tallySchema = tallySchema;
