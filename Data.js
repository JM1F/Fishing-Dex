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
        index: 'int',
    }
};


let realm = new Realm({ schema: [FishSchema], schemaVersion: 1 });

let returnAllFish = () => {
    return realm.objects('Fish');
}

let addFishData = (fishfamily, fishgenus, fishspecies, fishdescription = null, fishindex) => {
    
    realm.write(() => {
        const fishDetails = realm.create('Fish', { family: fishfamily, genus: fishgenus, species: fishspecies, description: fishdescription, index: fishindex })
    })
    
}

let deleteAllFish = () => {
    realm.write(() => {
        realm.delete(returnAllFish());
    })
}

let deleteLastFish = () => {
    realm.write(() => {
        if (returnAllFish()[0] != null) {
            
            realm.delete(realm.objects('Fish')[returnAllFish().length - 1]);
        }
            
            
        }
        
    )
}

let deleteSecondToLastFish = () => {
    console.log(returnAllFish());
    realm.write(() => {
        if (returnAllFish()[0] != null) {
            if (returnAllFish().length != 1) {
                realm.delete(realm.objects('Fish')[returnAllFish().length - 2]);
            }
            else {
                realm.delete(realm.objects('Fish')[returnAllFish().length - 1]);
            }
            
            
        }
        
    })
}
export default realm;

export {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
}

