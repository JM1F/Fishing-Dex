import Realm from "realm";

/**
 * Data.js
 * 
 * Handles the data of the app where it uses realms to store data locally on the device's hardware.
 * 
 * @exports returnAllFish 
 * @exports addFishData
 * @exports deleteAllFish
 * @exports deleteLastFish
 * @exports deleteSecondToLastFish
 * @exports deleteCurrentFish
 * @exports updateFishAtIndex
 * @exports returnAllCatches
 * @exports addCatchData
 * @exports deleteCurrentCatch
 * @exports updateCatchAtIndex
}
 * 
 */


// Declare Fish Scheme
class FishSchema extends Realm.Object { }
FishSchema.schema = {
    name: "Fish",
    properties: {
        coverImage: "string",
        profileImage: "string",
        name: "string",
        knowasName: "string?",
        family: "string?",
        genus: "string?",
        species: "string?",
        description: "string?",
        size: "string?",
        feeding: "string?",
        distribution: "string?",
        notes: "string?",
        index: "int?",
        catch: { type: "list", objectType: "Catches", default: [] }
    }
};
// Declare Catch Schema
class CatchSchema extends Realm.Object { }
CatchSchema.schema = {
    name: "Catches",
    embedded: true,
    properties: {
        date: "string",
        time: "string",
        encodedDate: "string",
        image: "string",
        location: "string?",
        bait: "string?",
        weather: "string?",
        length: "string?",
        weight: "string?",
        notes: "string?",
        index: "int?"
    }
};
// Generate new realm
let realm = new Realm({ schema: [FishSchema, CatchSchema], schemaVersion: 1 });
/**
 * Returns all "Fish" realm objects to where it's called.
 * @returns All "Fish" realm objects
 */
let returnAllFish = () => {
    return realm.objects("Fish");
}
/**
 * Returns all the current catches of the parent "Fish" field.
 * @param {int} fishIndex Index of parent field
 * @returns All "catch" objects
 */
let returnAllCatches = (fishIndex) => {
    return returnAllFish()[fishIndex].catch
}
/**
 * This function writes data to local storage via realm where different parameters are parsed in by the user.
 * @param {string} fishCoverPicImage URI cover image
 * @param {string} fishProfileImage URI profile image
 * @param {string} fishName Name of the fish
 * @param {string || null} fishKnownAsName Known as name of the fish
 * @param {string || null} fishFamily Scientific family name of the fish
 * @param {string || null} fishGenus Scientific genus name of the fish
 * @param {string || null} fishSpecies Scientific species name of the fish
 * @param {string || null} fishDescription General description of the the fish
 * @param {string || null} fishSize Normal sizes the fish grows to
 * @param {string || null} fishFeeding What the fish's usual feeding habbits are
 * @param {string || null} fishDistribution Where the fish is distributed or found
 * @param {string || null} fishNotes General notes on the fish
 * @param {int || null} fishIndex Index of fish in the local storage
 */
let addFishData = (fishCoverPicImage, fishProfileImage, fishName, fishKnownAsName = null, fishFamily = null, fishGenus = null, fishSpecies = null, fishDescription = null, fishSize = null, fishFeeding = null, fishDistribution = null, fishNotes = null, fishIndex = null) => {
    
    realm.write(() => {
        const fishDetails = realm.create("Fish", {
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
    })
};
/**
 * This function writes data to the embedded catch object within the parent object.
 * @param {int} defaultFishIndex Index number of the parent "Fish" object 
 * @param {string} dateCaught Date of capture 
 * @param {string} timeCaught Time of capture 
 * @param {string} encodedDate Encoded date/time string used to make changes when editing details 
 * @param {string} coverImage URI catch cover image
 * @param {string || null} locationCaught Where the fish was caught
 * @param {string || null} baitUsed The bait used to catch the fish
 * @param {string || null} weatherWhenCaught Weather conditions when the fish was caught
 * @param {string || null} fishLength The length of the fish
 * @param {string || null} fishWeight The weight of the fish
 * @param {string || null} fishNotes General notes about the catch of the fish
 * @param {int || null} catchIndex Index of the catch in local storage
 */
let addCatchData = (defaultFishIndex, dateCaught, timeCaught, encodedDate, coverImage, locationCaught = null, baitUsed = null, weatherWhenCaught = null, fishLength = null,  fishWeight = null, fishNotes = null, catchIndex = null) => {
    realm.write(() => {
        returnAllCatches(defaultFishIndex).push({date: dateCaught, time: timeCaught, encodedDate: encodedDate, image: coverImage, location: locationCaught, bait: baitUsed, weather: weatherWhenCaught, length: fishLength, weight: fishWeight, notes: fishNotes, index: catchIndex});
    })
};
/**
 * Updates data in the catch embedded object.
 * @param {int} defaultFishIndex Index number of the parent "Fish" object 
 * @param {int || null} catchIndex Index of the catch in local storage 
 * @param {string} dateCaught Date of capture 
 * @param {string} timeCaught Time of capture 
 * @param {string} encodedDate Encoded date/time string used to make changes when editing details 
 * @param {string} coverImage URI catch cover image
 * @param {string || null} locationCaught Where the fish was caught
 * @param {string || null} baitUsed The bait used to catch the fish
 * @param {string || null} weatherWhenCaught Weather conditions when the fish was caught
 * @param {string || null} fishLength The length of the fish
 * @param {string || null} fishWeight The weight of the fish
 * @param {string || null} fishNotes General notes about the catch of the fish
 */
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
};
/**
 * 
 * @param {int} Elementindex Index of fish in the local storage to update
 ** @param {string} fishCoverPicImage URI cover image to update
 * @param {string} fishProfileImage URI profile image to update
 * @param {string} fishName Name of the fish to update
 * @param {string || null} fishKnownAsName Known as name of the fish to update
 * @param {string || null} fishFamily Scientific family name of the fish to update
 * @param {string || null} fishGenus Scientific genus name of the fish to update
 * @param {string || null} fishSpecies Scientific species name of the fish to update
 * @param {string || null} fishDescription General description of the the fish to update
 * @param {string || null} fishSize Normal sizes the fish grows to (update)
 * @param {string || null} fishFeeding What the fish's usual feeding habbits are (update)
 * @param {string || null} fishDistribution Where the fish is distributed or found (update)
 * @param {string || null} fishNotes General notes on the fish to update
 */
let updateFishAtIndex = (Elementindex, fishCoverPicImage, fishProfileImage, fishName, fishKnownAsName, fishFamily, fishGenus, fishSpecies, fishDescription, fishSize, fishFeeding, fishDistribution, fishNotes) => {
    const fishData = realm.objects("Fish");
    // Filters "Fish" objects that has the same index number as the one inputted
    const indexedFishElement = realm.objects("Fish").filtered("index == $0", Elementindex)[0];
    
    realm.write(() => {
        // Update elements with new data
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
};
/**
 * Deletes all "Fish" objects stored. (Dev Tool)
 */
let deleteAllFish = () => {
    realm.write(() => {
        realm.delete(returnAllFish());
    })
};
/**
 * Deletes the last "Fish" object in the array. (Dev Tool)
 */
let deleteLastFish = () => {
    realm.write(() => {
        if (returnAllFish()[0] != null) {
            
            realm.delete(realm.objects("Fish")[returnAllFish().length - 1]);
        }   
        }  
    )
};
/**
 * Deletes the second to last fish in the array. (Dev Tool)
 */
let deleteSecondToLastFish = () => {
    realm.write(() => {
        if (returnAllFish()[0] != null) {
            if (returnAllFish().length != 1) {
                realm.delete(realm.objects("Fish")[returnAllFish().length - 2]);
            }
            else {
                realm.delete(realm.objects("Fish")[returnAllFish().length - 1]);
            }  
        }
    })
};
/**
 * Deletes the "Fish" data at the inputted index.
 * @param {int} index Index position of the current "Fish" object
 */
let deleteCurrentFish = (index) => {
    realm.write(() => {
        realm.delete(realm.objects("Fish")[index]); 
    })
};
/**
 * Deletes catch data at a specific position
 * @param {int} elementIndex Index of the catch data in the array
 * @param {int} fishIndex Index of the parent "Fish" object
 */
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
};