import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema({
	name: String,
	id: String,
    generations: [{
        generationId: String,
        name: String,
        yearFrom: String,
        yearTo: String,
        modelId: String,
        eng: String,
    }]
});

export default mongoose.model('Generation', generationSchema);