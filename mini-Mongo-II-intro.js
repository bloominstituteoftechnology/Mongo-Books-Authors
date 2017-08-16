/* Mongo
  Schema types: types and complexity
  Unique _id
  references
  docs.mongo.db.com: Operators
*/

// Complex Schema
const AddressSchema = new.mongoose.Schema({
  state: String,
  city: String,
  street: String,
  street2: String,
  zip: {
    type: Number,
    enum: [ 12345, 23456, 34567, ],
  },
});

const UserSchema = new.mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  referralLink: {
    type: Boolean,
  },
  // referralLink: Boolean // <-- does the same as above
  age: {
    type: Number,
    min: 3,
    max: 13,
  },
  // type: Array
  // hobbies: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "HobbiesSchema",
  //   }
  // ],
  // address: {
  //   state: String,
  //   city: String,
  //   street: String,
  //   street2: String,
  //   zip: {
  //     type: Number,
  //     enum: [ 12345, 23456, 34567, ],
  //   },
  //   require: true,
  // },
  address: AddressSchema,
  studentImg: {
    type: Buffer, // binary path to the file, not the image file itself
  },
  clubs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clubs',
  }
});

module.exports = mongoose.model('User', UserScema); // 'User' becomes 'users' database with 'users' collection

mongoose.connect('mongodb://localhost/users', )
