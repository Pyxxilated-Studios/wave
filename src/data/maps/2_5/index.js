const tiles = [
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 8, 8, 8, 20, 9, 20, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 2, 0, 8, 8, 8, 0, 0, 0, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 8, 8, 8, 0, 0, 0, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 8, 0, 0, 0, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8, 8, 8, 8, 8, 0, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 20, 0, 20, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 20, 0, 20, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 20, 20, 20, 0, 20, 20, 20, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 20, 0, 0, 0, 0, 0, 0, 0, 20, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 20, 0, 0, 0, 10, 0, 0, 0, 20, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 20, 0, 0, 0, 0, 0, 0, 0, 20, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 20, 20, 20, 20, 20, 20, 20, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
];

const monsters = [
    {
        type: 'lich',
        position: [12, 12],
    },
];

const stairs = {
    down: '2_4',
};

const message = {
    title: '<> feels a strong force in this area as they notice the skull covered walls. The voice speaks once more...',
    body: `"THIS IS IT! COME BOW BEFORE ME MORTAL....."`,
};

export default {
    tiles,
    monsters,
    stairs,
    message,
};
