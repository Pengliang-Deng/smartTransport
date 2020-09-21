/* testData */
export const gameInfo1 = {
    fieldInfo: {
        // number of grids
        size: 12,
        // field styles
        tileBackground: 'stone-brick',
        fenceImage: 'normal',
        gridBackground: 'normal',
        gridOutline: 'normal',

        // the information of every grid
        grids: [
            {
                flower: 'eustoma',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'rose',
                status: 'normal',
                growthValue: 40,
                waterValue: 50
            },
            {
                flower: 'rose',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'tulip',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'eustoma',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'eustoma',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'eustoma',
                status: 'growth',
                growthValue: 100,
                waterValue: 50
            }
        ]
    },
    playerInfo: {
        playerName: 'new Player',
        /* TODO */
    },
    itemsInfo: {
        coins: 100,
        resources: {
            water: 3,
            fertilizer: 5,
            sunny: 200,
        },
        seeds: {
            /* TODO */
        }
    }
}