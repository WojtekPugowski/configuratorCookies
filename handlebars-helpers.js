const handlebarsHelpers = {
  'find-price': (entries, selectedItem) => {
    const found = entries.find(item => item[0] === selectedItem);
    if (!found) {
      throw new Error(`Cannot find price of "${selectedItem}"`);
    }
    const [, price] = found;
    return price;
  }
}
module.exports = {
  handlebarsHelpers,
}