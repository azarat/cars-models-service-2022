import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema({
	name: String,
	value: String,
});

export default mongoose.model('Make', makeSchema);