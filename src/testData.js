/* testData */
export const gameInfo1 = {
    fieldInfo: {
        // number of grids
        size: 12,
        // field styles
        tileBackground: 'grass',
        fenceImage: 'metal',
        gridBackground: 'normal',
        gridOutline: 'normal',

        // the information of every grid
        grids: [
            {
                flower: 'rose',
                status: 'normal',
                growthValue: 40,
                waterValue: 10
            },
            {
                flower: 'rose',
                status: 'normal',
                growthValue: 100,
                waterValue: 10
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
                flower: 'tulip',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'rose',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'dandelion',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'cow',
                status: 'normal',
                growthValue: 100,
                waterValue: 50
            },
            {
                flower: 'pumpkin',
                status: 'normal',
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
            water: 100,
            fertilizer: 100,
            sunny: 200,
        },
        seeds: {
            'eustoma': 10,
            'tulip': 10,
            'rose': 8,
            'mystery': 5,
        },
        styles: {
            tileBackground: [
                'stone-brick',
                'brown',
                'flower',
                'sand',
                'snow',
                'grass',
            ],
            fence: [
                'normal',
                'stone',
                'metal',
                'wood-premium',
            ]
        }
    }
}