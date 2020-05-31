const getNextPage = (page?: string): string | undefined => {
    switch (page) {
        case undefined:
            return "movement";
        case "movement":
            return "ability";
        case "ability":
            return "dice";
        case "dice":
            return "combat";
        case "combat":
            return "spell";
        case "spell":
            return "item";
        case "item":
            return "shop";
        case "shop":
            return "hotkey";
        case "hotkey":
            return undefined;
        default:
            return undefined;
    }
};

export default getNextPage;
