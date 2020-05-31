const getPreviousPage = (page?: string): string | undefined => {
    switch (page) {
        case "movement":
            return undefined;
        case "ability":
            return "movement";
        case "dice":
            return "ability";
        case "combat":
            return "dice";
        case "spell":
            return "combat";
        case "item":
            return "spell";
        case "shop":
            return "item";
        case "hotkey":
            return "shop";
        default:
            return undefined;
    }
};

export default getPreviousPage;
