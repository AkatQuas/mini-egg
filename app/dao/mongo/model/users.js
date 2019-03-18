
module.exports = (Schema) => {
  const { Types } = Schema;
  const casesSchame = new Schema({
    name: String,
    time: Date
  })

  return {
    name: 'User',
    schema: {
      first_name: String,
      last_name: String,
      mobile: {
        type: String,
        match: /\d{11}/,
        unique: true,
        required: [true, 'Why no mobile?']
      },
      age: {
        type: Number,
        min: [0, 'No minus age!'],
        max: [99, 'Sorry we can not count more than 100!']
      },
      job: {
        type: String,
        required: function () {
          // if you are older than 30, we need your job infomation
          return this.age > 30;
        }
      },
      hobbies: [String],
      created_at: Date,
      updated_at: Date,
      // sub document
      cases: [casesSchame]
    },
    methods: {
      // https://mongoosejs.com/docs/api.html#schema_Schema-method
      call: function () {
        console.log('Calling ', this.mobile);
      }
    },
    virtuals: [
      // https://mongoosejs.com/docs/guide.html#virtuals
      {
        name: 'fullName',
        get: function () {
          return this.first_name + ' ' + this.last_name;
        },
        set: function (v) {
          const space = v.indexOf(' ');
          this.first_name = v.substr(0, space);
          this.last_name = v.substr(space + 1);
        },
      }
    ],
    index: [{
      fields: { mobile: 1 },
      option: { unique: true }
    }]
  };
}
