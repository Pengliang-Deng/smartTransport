/* functions for increasing game data */

let gameData = require('../../models/gameData.model');

/**
 * update isTracking attribute of the trackStatus
 * @param uid user's id
 * @param newValue new value
 */
function updateIsTracking(uid, newValue) {
    gameData.findOneAndUpdate({uid: uid},
        {$set: {"trackingStatus.isTracking": newValue}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * update startPoint attribute of the trackStatus
 * @param uid user's id
 * @param newValue new value
 */
function updateStartPoint(uid, newValue) {
    gameData.findOneAndUpdate({uid: uid},
        {$set: {"trackingStatus.startPoint": newValue}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * update endPoint attribute of the trackStatus
 * @param uid user's id
 * @param newValue new value
 */
function updateEndPoint(uid, newValue) {
    gameData.findOneAndUpdate({uid: uid},
        {$set: {"trackingStatus.endPoint": newValue}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * update hasConfirmed attribute of the trackStatus
 * @param uid user's id
 * @param newValue new value
 */
function updateHasConfirmed(uid, newValue) {
    gameData.findOneAndUpdate({uid: uid},
        {$set: {"trackingStatus.hasConfirmed": newValue}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * update mode attribute of the trackStatus
 * @param uid user's id
 * @param newValue new value
 */
function updateMode(uid, newValue) {
    gameData.findOneAndUpdate({uid: uid},
        {$set: {"trackingStatus.mode": newValue}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase/decrease counts of the travel mode : walk
 * @param uid user's id
 * @param number increment/decrement
 * @returns {boolean} true if succeded
 */
function changeWalkCounts (uid, number) {
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"weeklyTasks.walk": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase/decrease counts of the travel mode : bicycle
 * @param uid user's id
 * @param number increment/decrement
 * @returns {boolean} true if succeded
 */
function changeBicycleCounts (uid, number) {
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"weeklyTasks.bicycle": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase/decrease counts of the travel mode : transit
 * @param uid user's id
 * @param number increment/decrement
 * @returns {boolean} true if succeded
 */
function changeTransitCounts (uid, number) {
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"weeklyTasks.transit": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase player's coin resource
 * @param uid user's id
 * @param number increment
 * @returns {boolean} true if succeeded
 */
function increaseCoin (uid, number) {
    if (number < 0) return false;
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"itemsInfo.coins": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase player's water resource
 * @param uid user's id
 * @param number increment
 * @returns {boolean} ture if succeeded
 */
function increaseWater (uid, number) {
    if (number < 0) return false;
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"itemsInfo.resources.water": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase player's sunny resource
 * @param uid user's id
 * @param number increment
 * @returns {boolean} ture if succeeded
 */
function increaseSun (uid, number) {
    if (number < 0) return false;
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"itemsInfo.resources.sunny": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase player's fertilizer resource
 * @param uid user's id
 * @param number increment
 * @returns {boolean} ture if succeeded
 */
function increaseFertilizer (uid, number) {
    if (number < 0) return false;
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"itemsInfo.resources.fertilizer": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

/**
 * increase mystery seed
 * @param uid user's id
 * @param number increment
 * @returns {boolean} ture if succeeded
 */
function increaseRareSeed (uid, number) {
    if (number < 0) return false;
    gameData.findOneAndUpdate({uid: uid},
        {$inc: {"itemsInfo.seeds.mystery": number}})
        .catch(error => {console.error(error); return false;});
    return true;
}

module.exports = {increaseCoin, increaseFertilizer, increaseSun, increaseWater, increaseRareSeed, changeBicycleCounts, changeTransitCounts, changeWalkCounts,
        updateEndPoint, updateIsTracking, updateStartPoint, updateMode, updateHasConfirmed};