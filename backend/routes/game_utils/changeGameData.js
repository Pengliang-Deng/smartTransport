/* functions for increasing game data */

let gameData = require('../../models/gameData.model');

/**
 * increase player's coin resource
 * @param uid user's id
 * @param number increment
 * @returns {boolean} ture if succeeded
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

module.exports = {increaseCoin, increaseFertilizer, increaseSun, increaseWater, increaseRareSeed};