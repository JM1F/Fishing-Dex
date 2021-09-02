import Realm from "realm";

// Declare Schema
class FishSchema extends Realm.Object { }
FishSchema.schema = {
    name: 'Fish',
    properties: {
        image: 'string',
        name: 'string',
        knowasName: 'string?',
        family: 'string?',
        genus: 'string?',
        species: 'string?',
        description: 'string?',
        size: 'string?',
        feeding: 'string?',
        distribution: 'string?',
        notes: 'string?',
        index: 'int?',
    }
};


let realm = new Realm({ schema: [FishSchema], schemaVersion: 1 });

let returnAllFish = () => {
    return realm.objects('Fish');
}

let addFishData = (fishImage, fishName, fishKnownAsName = null, fishFamily = null, fishGenus = null, fishSpecies = null, fishDescription = null, fishSize = null, fishFeeding = null, fishDistribution = null, fishNotes = null, fishIndex = null) => {
    
    realm.write(() => {
        const fishDetails = realm.create('Fish', {
            image: fishImage, 
            name: fishName, 
            knowasName: fishKnownAsName, 
            family: fishFamily, 
            genus: fishGenus, 
            species: fishSpecies, 
            description: fishDescription, 
            size: fishSize,
            feeding: fishFeeding,
            distribution: fishDistribution,
            notes: fishNotes,
            index: fishIndex
         })
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

let deleteCurrentFish = (index) => {
    realm.write(() => {
        realm.delete(realm.objects('Fish')[index]); 

    })

}


export default realm;

export {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
    deleteCurrentFish,
}

