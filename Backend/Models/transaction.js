import {Schema,model} from "mongoose";

const transactionSchema = new Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  image:String,
  sold: Boolean
});



const Transaction=model("Transaction",transactionSchema);

export default Transaction;
