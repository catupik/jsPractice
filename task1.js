// Solved on January  2, 2019.
// Collect squirrel names in depth-first order.
function collectSquirrelNames(tree) {
  const names = [];
  const pending = [tree];
  while (pending.length > 0) {
    const { nest, branches = [] } = pending.pop();
    if (nest.type === 'squirrel') names.push(nest.name);
    for (let index = branches.length - 1; index >= 0; index--) {
      pending.push(branches[index]);
    }
  }
  return names;
}

// Solved on January  2, 2019.
// Report the outcome of each input in its original order.
function customAllSettled(inputs) {
  return Promise.all(Array.from(inputs, (input) =>
    Promise.resolve(input).then(
      (value) => ({ status: 'fulfilled', value }),
      (reason) => ({ status: 'rejected', reason })
    )
  ));
}

// Solved on January  3, 2019.
// Split an array into groups of a given positive size.
function chunkArray(values, size) {
  if (!Number.isSafeInteger(size) || size < 1) throw new RangeError('Invalid size');
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

// Solved on January  3, 2019.
// Return the first matching index or -1.
function findMatchingIndex(values, predicate) {
  const length = values.length;
  for (let index = 0; index < length; index++) {
    if (predicate(values[index], index, values)) return index;
  }
  return -1;
}

// Solved on January  4, 2019.
// Count Unicode code points in a string.
function countCharacters(text) {
  const counts = new Map();
  for (const character of text) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }
  return counts;
}

// Solved on January  7, 2019.
// Return an index of the target in an ascending array or -1.
function binarySearch(values, target) {
  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] === target) return middle;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return -1;
}

// Solved on January  7, 2019.
// Rotate an array to the right without changing the input.
function rotateRight(values, steps) {
  if (values.length === 0) return [];
  const offset = ((steps % values.length) + values.length) % values.length;
  const split = values.length - offset;
  return values.slice(split).concat(values.slice(0, split));
}

// Solved on January  8, 2019.
// Return unique values appearing in both arrays in first-array order.
function commonValues(first, second) {
  const remaining = new Set(second);
  return first.filter((value) => remaining.delete(value));
}

// Solved on January  8, 2019.
// Pass the result of each asynchronous step to the next one.
async function runAsyncSteps(initial, steps) {
  let value = initial;
  for (const step of steps) value = await step(value);
  return value;
}

// Solved on January  9, 2019.
// Find the longest run of characters without a duplicate.
function longestUniqueSubstringLength(text) {
  const lastSeen = new Map();
  let start = 0;
  let best = 0;
  let index = 0;
  for (const character of text) {
    if (lastSeen.has(character)) start = Math.max(start, lastSeen.get(character) + 1);
    best = Math.max(best, index - start + 1);
    lastSeen.set(character, index++);
  }
  return best;
}

// Solved on January  9, 2019.
// Return the first character that appears exactly once.
function firstUniqueCharacter(text) {
  const counts = countCharacters(text);
  for (const [character, count] of counts) {
    if (count === 1) return character;
  }
  return undefined;
}

// Solved on January 10, 2019.
// Count words case-insensitively, ignoring punctuation.
function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().match(/\p{L}+/gu) ?? []) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}

// Solved on January 10, 2019.
// Return the first index whose value is at least the target.
function lowerBound(values, target) {
  let left = 0;
  let right = values.length;
  while (left < right) {
    const middle = left + Math.floor((right - left) / 2);
    if (values[middle] < target) left = middle + 1;
    else right = middle;
  }
  return left;
}

// Solved on January 10, 2019.
// Move zeros after all other values while keeping their order.
function moveZeros(values) {
  const nonzero = values.filter((value) => value !== 0);
  return nonzero.concat(Array(values.length - nonzero.length).fill(0));
}

// Solved on January 11, 2019.
// Pair values by index until the shorter array ends.
function zipArrays(first, second) {
  const pairs = [];
  for (let i = 0; i < Math.min(first.length, second.length); i++) {
    pairs.push([first[i], second[i]]);
  }
  return pairs;
}

// Solved on January 11, 2019.
// Return the largest sum across windows of the given size.
function maxWindowSum(values, size) {
  if (!Number.isInteger(size) || size < 1 || size > values.length) {
    throw new RangeError('Invalid window size');
  }
  let sum = values.slice(0, size).reduce((total, value) => total + value, 0);
  let best = sum;
  for (let i = size; i < values.length; i++) {
    sum += values[i] - values[i - size];
    best = Math.max(best, sum);
  }
  return best;
}

// Solved on January 11, 2019.
// Swap rows and columns of a rectangular matrix.
function transposeMatrix(matrix) {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

// Solved on January 11, 2019.
// Keep the first value associated with each key.
function uniqueBy(values, getKey) {
  const seen = new Set();
  return values.filter((value) => {
    const key = getKey(value);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Solved on January 14, 2019.
// Return cumulative sums with a leading zero.
function prefixSums(values) {
  const sums = [0];
  for (const value of values) sums.push(sums[sums.length - 1] + value);
  return sums;
}
