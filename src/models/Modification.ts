import mongoose from 'mongoose';

const modificationSchema = new mongoose.Schema({
	name: String,
	value: String,
    generationId: String,
});

export default mongoose.model('Modification', modificationSchema);