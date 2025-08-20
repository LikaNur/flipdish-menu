export function displayPrice(menuItem) {
  const masterOptionsSet = menuItem.MenuItemOptionSets.find(
    optionSet => optionSet.IsMasterOptionSet
  );

  if (masterOptionsSet) {
    return `from £${masterOptionsSet?.MinPrice.toFixed(2)}`;
  } else {
    return `£${menuItem?.Price.toFixed(2)}`;
  }
}
