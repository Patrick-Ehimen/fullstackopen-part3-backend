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
const url = `mongodb+srv://patrickehimen22:${password}@cluster0.91tuixm.mongodb.net/phoneBook?retryWrites=true&w=majority`;
// 5dYBvMQ14Q0UxGJQ
// mongodb+srv://patrickehimen22:<password>@cluster1.iydofkb.mongodb.net/?retryWrites=true&w=majority

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

const entry = new PhonebookEntry({
  name: "Patrick",
  number: "123",
});

entry.save().then((result) => {
  console.log("Entry saved!");
  mongoose.connection.close();
});

// Adding an entry to the phonebook
// if (process.argv.length === 5) {
//   const name = process.argv[3];
//   const number = process.argv[4];

//   const entry = new PhonebookEntry({
//     name,
//     number,
//   });

//   entry.save().then((result) => {
//     console.log(`Added ${name} number ${number} to the phonebook.`);
//     mongoose.connection.close();
//   });
// }

// // Listing all entries in the phonebook
// if (process.argv.length === 3) {
//   PhonebookEntry.find({}).then((entries) => {
//     console.log("Phonebook entries:");
//     entries.forEach((entry) => {
//       console.log(`${entry.name} ${entry.number}`);
//     });
//     mongoose.connection.close();
//   });
// }
