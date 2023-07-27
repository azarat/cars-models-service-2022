import Make from './models/Make'
import Model from './models/Model'
import Generation from './models/Generation'
import Modification from './models/Modification'

class Repository {
    async getMakes() {
        return await Make.find({}).lean();
    }

    async getModels(makeId: number|undefined) {
        let params = {}
        if (makeId != undefined) params = {make: makeId}

        return await Model.find(params).lean();
    }

    async getGeneraions(modelId: number|undefined) {
        let params = {}
        if (modelId != undefined) params = {id: modelId}

        return await Generation.find(params).lean();
    }

    async getModifications(generationId: number|undefined) {
        let params = {}
        if (generationId != undefined) params = {generationId}

        return await Modification.find(params).lean();
    }
}

export default new Repository();