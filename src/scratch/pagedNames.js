/**
 * Scratch file for testing automated code review. Not part of Open MCT, and
 * the problems in it are deliberate.
 */

const PAGE_SIZE = 20;

export function getPage(items, pageNumber) {
  const start = pageNumber * PAGE_SIZE;

  return items.slice(start, start + PAGE_SIZE + 1);
}

export function getVisibleNames(objects) {
  objects.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));

  return objects.map((object) => (!!object.name ? object.name : 'Unnamed'));
}

export function refreshAfterDelay(callback) {
  setTimeout(callback, 5000);
}
