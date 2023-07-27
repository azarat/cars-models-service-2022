import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
	name: String,
	value: String,
    make: String
});

export default mongoose.model('Model', modelSchema);