const arrayContainsArray = (haystack: any[], needle: any) =>
  haystack.every((hay) => hay.includes(needle));

export default arrayContainsArray;
