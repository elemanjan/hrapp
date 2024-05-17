import sortBy from 'lodash/sortBy';

export function sortItems(items, criteria) {
  return sortBy(items, criteria);
}
