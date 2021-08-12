import Realm from "realm";

// Declare Schema
class FishSchema extends Realm.Object { }
FishSchema.schema = {
    name: 'Fish',
    properties: {
        family: 'string',
        genus: 'string',
        species: 'string',
        description: 'string',
    }
};


let realm = new Realm({ schema: [FishSchema], schemaVersion: 1 });





let returnAllFish = () => {
    return realm.objects('Fish');
}

let addFishData = (fishfamily, fishgenus, fishspecies, fishdescription = null) => {
    realm.write(() => {
        const fishDetails = realm.create('Fish', { family: fishfamily, genus: fishgenus, species: fishspecies, description: fishdescription })
    })
    
}

let deleteAllFish = () => {
    realm.write(() => {
        realm.delete(returnAllFish());
    })
}

export default realm;

export {
    returnAllFish,
    addFishData,
    deleteAllFish

}

