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

// Solved on January 15, 2019.
// Count nodes along the longest path from the root to a leaf.
function maxTreeDepth(node) {
  if (node == null) return 0;
  let depth = 0;
  for (const child of node.children ?? []) {
    depth = Math.max(depth, maxTreeDepth(child));
  }
  return depth + 1;
}

// Solved on January 16, 2019.
// Scan from right to left and return the first matching index.
function findLastMatchingIndex(values, predicate) {
  for (let index = values.length - 1; index >= 0; index--) {
    if (predicate(values[index], index, values)) return index;
  }
  return -1;
}

// Solved on January 16, 2019.
// Return the largest sum of a nonempty contiguous subarray.
function maxSubarraySum(values) {
  if (!values.length) return undefined;
  let current = values[0];
  let best = current;
  for (let i = 1; i < values.length; i++) {
    current = Math.max(values[i], current + values[i]);
    best = Math.max(best, current);
  }
  return best;
}

// Solved on January 17, 2019.
// Use the Euclidean algorithm for two integers.
function greatestCommonDivisor(first, second) {
  let a = Math.abs(first);
  let b = Math.abs(second);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

// Solved on January 18, 2019.
// Find a value that occurs in more than half of the positions.
function majorityElement(values) {
  let candidate;
  let balance = 0;
  for (const value of values) {
    if (balance === 0) candidate = value;
    balance += Object.is(value, candidate) ? 1 : -1;
  }
  const count = values.filter((value) => Object.is(value, candidate)).length;
  return count > values.length / 2 ? candidate : undefined;
}

// Solved on January 21, 2019.
// Return node values level by level from left to right.
function breadthFirstValues(root) {
  if (!root) return [];
  const queue = [root];
  const values = [];
  for (let i = 0; i < queue.length; i++) {
    const node = queue[i];
    values.push(node.value);
    for (const child of node.children ?? []) queue.push(child);
  }
  return values;
}

// Solved on January 22, 2019.
// Combine intersecting intervals without mutating the inputs.
function mergeOverlappingIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of sorted) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }
  return merged;
}

// Solved on January 22, 2019.
// Return each product using all values except the value at that index.
function productsExceptSelf(values) {
  const result = new Array(values.length);
  let prefix = 1;
  for (let i = 0; i < values.length; i++) {
    result[i] = prefix;
    prefix *= values[i];
  }
  let suffix = 1;
  for (let i = values.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= values[i];
  }
  return result;
}

// Solved on January 22, 2019.
// Check a string in both directions, ignoring case and punctuation.
function isPalindrome(text) {
  const letters = [...text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')];
  for (let i = 0; i < letters.length / 2; i++) {
    if (letters[i] !== letters[letters.length - 1 - i]) return false;
  }
  return true;
}

// Solved on January 23, 2019.
// Return the matching values and the remaining values in order.
function partitionValues(values, predicate) {
  const matched = [];
  const remaining = [];
  values.forEach((value, index) => {
    (predicate(value, index, values) ? matched : remaining).push(value);
  });
  return [matched, remaining];
}

// Solved on January 24, 2019.
// Count paths to the top using steps of one or two stairs.
function countStairPaths(stairs) {
  if (!Number.isSafeInteger(stairs) || stairs < 0) throw new RangeError('Invalid stair count');
  let previous = 0n;
  let current = 1n;
  for (let i = 0; i < stairs; i++) [previous, current] = [current, previous + current];
  return current;
}

// Solved on January 25, 2019.
// Sum even numbers.
function sumEvenNumbers(values) {
  return values.filter(value => value % 2 === 0).reduce((sum, value) => sum + value, 0);
}

// Solved on January 28, 2019.
// Count negative numbers.
function countNegativeNumbers(values) {
  return values.filter(value => value < 0).length;
}

// Solved on January 28, 2019.
// Average numbers.
function averageNumbers(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined;
}

// Solved on January 29, 2019.
// Number span.
function numberSpan(values) {
  return values.length ? values.reduce((max, value) => Math.max(max, value), -Infinity) - values.reduce((min, value) => Math.min(min, value), Infinity) : undefined;
}

// Solved on January 29, 2019.
// Square numbers.
function squareNumbers(values) {
  return values.map(value => value * value);
}

// Solved on January 30, 2019.
// Sort numbers ascending.
function sortNumbersAscending(values) {
  return [...values].sort((a, b) => a - b);
}

// Solved on January 31, 2019.
// Sort numbers descending.
function sortNumbersDescending(values) {
  return [...values].sort((a, b) => b - a);
}

// Solved on January 31, 2019.
// Sum absolute values.
function sumAbsoluteValues(values) {
  return values.reduce((sum, value) => sum + Math.abs(value), 0);
}

// Solved on February  1, 2019.
// Median number.
function medianNumber(values) {
  return (() => { const sorted = sortNumbersAscending(values); const middle = Math.floor(sorted.length / 2); return !sorted.length ? undefined : sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2; })();
}

// Solved on February  4, 2019.
// Has adjacent duplicate.
function hasAdjacentDuplicate(values) {
  return values.some((value, index) => index > 0 && Object.is(value, values[index - 1]));
}

// Solved on February  5, 2019.
// Is nondecreasing.
function isNondecreasing(values) {
  return values.every((value, index) => index === 0 || value >= values[index - 1]);
}

// Solved on February  5, 2019.
// Adjacent differences.
function adjacentDifferences(values) {
  return values.slice(1).map((value, index) => value - values[index]);
}

// Solved on February  6, 2019.
// Max adjacent increase.
function maxAdjacentIncrease(values) {
  return values.length > 1 ? adjacentDifferences(values).reduce((best, value) => Math.max(best, value), -Infinity) : undefined;
}

// Solved on February  7, 2019.
// Symmetric difference.
function symmetricDifference(first, second) {
  return [...new Set([...arrayDifference(first, second), ...arrayDifference(second, first)])];
}

// Solved on February  8, 2019.
// Union values.
function unionValues(first, second) {
  return [...new Set([...first, ...second])];
}

// Solved on February  8, 2019.
// Split at index.
function splitAtIndex(values, index) {
  return [values.slice(0, index), values.slice(index)];
}

// Solved on February 11, 2019.
// Take every nth.
function takeEveryNth(values, step) {
  return values.filter((_, index) => step > 0 && index % step === 0);
}

// Solved on February 12, 2019.
// Remove at index.
function removeAtIndex(values, index) {
  return values.filter((_, position) => position !== index);
}

// Solved on February 12, 2019.
// Index final occurrences.
function indexFinalOccurrences(values) {
  return new Map(values.map((value, index) => [value, index]));
}

// Solved on February 13, 2019.
// Enumerate values.
function enumerateValues(values) {
  return Array.from(values.entries());
}

// Solved on February 13, 2019.
// Interleave arrays.
function interleaveArrays(first, second) {
  return Array.from({ length: Math.max(first.length, second.length) }, (_, i) => [...first.slice(i, i + 1), ...second.slice(i, i + 1)]).flat();
}

// Solved on February 14, 2019.
// Repeat values.
function repeatValues(values, count) {
  return Array.from({ length: count }, () => values).flat();
}
