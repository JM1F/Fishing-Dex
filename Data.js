import Realm from "realm";

// Declare Schema
class FishSchema extends Realm.Object { }
FishSchema.schema = {
    name: 'Fish',
    properties: {
        coverImage: 'string',
        profileImage: 'string',
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

let addFishData = (fishCoverPicImage, fishProfileImage, fishName, fishKnownAsName = null, fishFamily = null, fishGenus = null, fishSpecies = null, fishDescription = null, fishSize = null, fishFeeding = null, fishDistribution = null, fishNotes = null, fishIndex = null) => {
    
    realm.write(() => {
        const fishDetails = realm.create('Fish', {
            coverImage: fishCoverPicImage,
            profileImage: fishProfileImage, 
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
let updateFishAtIndex = (Elementindex) => {
    const fishData = realm.objects('Fish');
    const indexedFishElement = realm.objects('Fish').filtered('index == $0', Elementindex);
    console.log(indexedFishElement)
    
    realm.write(() => {
        indexedFishElement[0].name = "te123123"
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
    updateFishAtIndex
}

