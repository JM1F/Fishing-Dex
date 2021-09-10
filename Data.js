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
        catch: { type: "list", objectType: "Catches", default: [] }
    }
};

class CatchSchema extends Realm.Object { }
CatchSchema.schema = {
    name: 'Catches',
    embedded: true,
    properties: {
        date: 'string',
        time: 'string',
        encodedDate: 'string',
        image: 'string',
        location: 'string?',
        bait: 'string?',
        weather: 'string?',
        length: 'string?',
        weight: 'string?',
        notes: 'string?',
        index: 'int?'
    }
};


let realm = new Realm({ schema: [FishSchema, CatchSchema], schemaVersion: 1 });



let returnAllFish = () => {
    return realm.objects('Fish');
}
let returnAllCatches = (fishIndex) => {
    return returnAllFish()[fishIndex].catch
}
//console.log(returnAllFish()[0].catch[0].size)
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
            index: fishIndex,
         })
         //fishDetails.catch.push({size: "test", name: "test"})

    })
    
}
let addCatchData = (defaultFishIndex, dateCaught, timeCaught, encodedDate, coverImage, locationCaught = null, baitUsed = null, weatherWhenCaught = null, fishLength = null,  fishWeight = null, fishNotes = null, catchIndex = null) => {
    realm.write(() => {
        returnAllCatches(defaultFishIndex).push({date: dateCaught, time: timeCaught, encodedDate: encodedDate, image: coverImage, location: locationCaught, bait: baitUsed, weather: weatherWhenCaught, length: fishLength, weight: fishWeight, notes: fishNotes, index: catchIndex});
    })
}
let updateCatchAtIndex = (defaultFishIndex, catchIndex, dateCaught, timeCaught, encodedDate, coverImage, locationCaught, baitUsed, weatherWhenCaught, fishLength, fishWeight, fishNotes) => {
    let catchObject = returnAllCatches(defaultFishIndex)[catchIndex];
    realm.write(() => {
        catchObject.date = dateCaught;
        catchObject.time = timeCaught;
        catchObject.encodedDate = encodedDate;
        catchObject.image = coverImage;
        catchObject.location = locationCaught;
        catchObject.bait = baitUsed;
        catchObject.weather = weatherWhenCaught;
        catchObject.length = fishLength;
        catchObject.weight = fishWeight;
        catchObject.notes = fishNotes;

    })
    
}
let updateFishAtIndex = (Elementindex, fishCoverPicImage, fishProfileImage, fishName, fishKnownAsName, fishFamily, fishGenus, fishSpecies, fishDescription, fishSize, fishFeeding, fishDistribution, fishNotes) => {
    const fishData = realm.objects('Fish');
    const indexedFishElement = realm.objects('Fish').filtered('index == $0', Elementindex)[0];
    
    realm.write(() => {
        indexedFishElement.coverImage = fishCoverPicImage;
        indexedFishElement.profileImage = fishProfileImage;
        indexedFishElement.name = fishName;
        indexedFishElement.knowasName = fishKnownAsName;
        indexedFishElement.family = fishFamily;
        indexedFishElement.genus = fishGenus;
        indexedFishElement.species = fishSpecies;
        indexedFishElement.description = fishDescription;
        indexedFishElement.size = fishSize;
        indexedFishElement.feeding = fishFeeding;
        indexedFishElement.distribution = fishDistribution;
        indexedFishElement.notes = fishNotes;
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

};
let deleteCurrentCatch = (elementIndex, fishIndex) => {
    console.log(elementIndex)
    realm.write(() => {
        returnAllCatches(fishIndex).splice(elementIndex, 1);
    })
    
};
export default realm;

export {
    returnAllFish,
    addFishData,
    deleteAllFish,
    deleteLastFish,
    deleteSecondToLastFish,
    deleteCurrentFish,
    updateFishAtIndex,
    returnAllCatches,
    addCatchData,
    deleteCurrentCatch,
    updateCatchAtIndex
}