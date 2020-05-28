const phrases = [
    "You are a weak mortal...",
    "Not that strong after all...",
    "Now who will save the princess?",
    "Muhahaha... Bwahahaha!!",
];

export const randomPhrase = (): string => {
    const randomNumber = Math.floor(Math.random() * phrases.length);
    return phrases[randomNumber];
};
