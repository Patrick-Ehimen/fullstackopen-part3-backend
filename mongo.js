// Importing mongoose module
const mongoose = require("mongoose");

// Ensuring password is passed as command-line argument
if (process.argv.length < 3) {
  console.log("Please provide the password as a command-line argument.");
  process.exit(1);
}

// Capturing password from command-line arguments
const password = process.argv[2];

// Constructing the connection string URL
const url = `mongodb+srv://patrickehimen22:${password}@cluster1.iydofkb.mongodb.net/phonebook?retryWrites=true&w=majority`;
// 5dYBvMQ14Q0UxGJQ

// Configuring mongoose
mongoose.set("strictQuery", false);

// Connecting to the database
mongoose.connect(url);

// Defining the schema for "PhonebookEntry"
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Creating a model from the phonebook entry schema
const PhonebookEntry = mongoose.model("PhonebookEntry", phonebookSchema);

const name = process.argv[3];
const number = process.argv[4];

const entry = new PhonebookEntry({
  name: name,
  number: number,
});

entry.save().then(() => {
  console.log(`Added ${name} number ${number} to phonebook`);
  mongoose.connection.close();
});

PhonebookEntry.find({}).then((result) => {
  result.forEach((entry) => {
    console.log(`${entry.name} ${entry.number}`);
  });

  mongoose.connection.close();
});
