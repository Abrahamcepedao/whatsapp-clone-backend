//imports
import mongoose from "mongoose";

//data schema
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
})

//export
export default mongoose.model('messageContent', whatsappSchema);