const mongoose = require('mongoose');

const analyticScheme = new mongoose.Schema({
   dom_load: {type: Number},
   window_load: {type: Number},
   fcp: {type: Number},
   ttfb: {type: Number},

   url: {type: String},
   user_agent: {type: String},

   resources: [{
      name: {type: String},
      responseStart: {type: Number},
      responseEnd: {type: Number},
      type: {type: String},
   }],
   date: {
      type: Date,
      required: true
   }
});

module.exports = mongoose.model('Analytic', analyticScheme)