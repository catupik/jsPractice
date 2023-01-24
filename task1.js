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

// Solved on February 15, 2019.
// Flatten one level.
function flattenOneLevel(values) {
  return values.flat(1);
}

// Solved on February 18, 2019.
// Compact values.
function compactValues(values) {
  return values.filter(value => value != null);
}

// Solved on February 18, 2019.
// Count truthy.
function countTruthy(values) {
  return values.reduce((count, value) => count + Number(Boolean(value)), 0);
}

// Solved on February 19, 2019.
// Find last value.
function findLastValue(values, predicate) {
  return values[findLastMatchingIndex(values, predicate)];
}

// Solved on February 20, 2019.
// Reverse words.
function reverseWords(text) {
  return text.trim().split(/\s+/u).reverse().join(' ');
}

// Solved on February 21, 2019.
// Count words in sentence.
function countWordsInSentence(text) {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

// Solved on February 21, 2019.
// Get initials.
function getInitials(text) {
  return text.trim().split(/\s+/u).filter(Boolean).map(word => [...word][0].toUpperCase()).join('');
}

// Solved on February 22, 2019.
// To kebab case.
function toKebabCase(text) {
  return (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).join('-');
}

// Solved on February 22, 2019.
// Truncate code points.
function truncateCodePoints(text, length) {
  return [...text].slice(0, Math.max(0, length)).join('');
}

// Solved on February 25, 2019.
// Common prefix.
function commonPrefix(first, second) {
  return (() => { const a = [...first]; const b = [...second]; let i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i).join(''); })();
}

// Solved on February 25, 2019.
// Strip accent marks.
function stripAccentMarks(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
}

// Solved on February 26, 2019.
// Escape html text.
function escapeHtmlText(text) {
  return text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

// Solved on February 27, 2019.
// Count ascii digits.
function countAsciiDigits(text) {
  return (text.match(/[0-9]/g) ?? []).length;
}

// Solved on February 27, 2019.
// Reverse code points.
function reverseCodePoints(text) {
  return [...text].reverse().join('');
}

// Solved on February 27, 2019.
// First non empty string.
function firstNonEmptyString(values) {
  return values.find(value => typeof value === 'string' && value.trim().length > 0);
}

// Solved on February 28, 2019.
// Unique words ignoring case.
function uniqueWordsIgnoringCase(text) {
  return [...new Set(text.toLowerCase().match(/\p{L}+/gu) ?? [])];
}

// Solved on March  1, 2019.
// Pick own fields.
function pickOwnFields(object, keys) {
  return Object.fromEntries(keys.filter(key => Object.hasOwn(object, key)).map(key => [key, object[key]]));
}

// Solved on March  4, 2019.
// Omit own fields.
function omitOwnFields(object, keys) {
  return (() => { const omitted = new Set(keys); return Object.fromEntries(Object.entries(object).filter(([key]) => !omitted.has(key))); })();
}

// Solved on March  5, 2019.
// Invert record.
function invertRecord(object) {
  return new Map(Object.entries(object).map(([key, value]) => [value, key]));
}

// Solved on March  6, 2019.
// Map record values.
function mapRecordValues(object, transform) {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
}

// Solved on March  7, 2019.
// Filter record values.
function filterRecordValues(object, predicate) {
  return Object.fromEntries(Object.entries(object).filter(([key, value]) => predicate(value, key)));
}

// Solved on March  7, 2019.
// Has all own fields.
function hasAllOwnFields(object, keys) {
  return keys.every(key => Object.hasOwn(object, key));
}

// Solved on March  8, 2019.
// Sum record values.
function sumRecordValues(object) {
  return Object.values(object).reduce((sum, value) => sum + value, 0);
}

// Solved on March 11, 2019.
// Count tree nodes.
function countTreeNodes(root) {
  return root == null ? 0 : 1 + (root.children ?? []).reduce((sum, child) => sum + countTreeNodes(child), 0);
}

// Solved on March 12, 2019.
// Count tree leaves.
function countTreeLeaves(root) {
  return root == null ? 0 : root.children?.length ? root.children.reduce((sum, child) => sum + countTreeLeaves(child), 0) : 1;
}

// Solved on March 13, 2019.
// Collect leaf values.
function collectLeafValues(root) {
  return root == null ? [] : root.children?.length ? root.children.flatMap(collectLeafValues) : [root.value];
}

// Solved on March 14, 2019.
// Contains tree value.
function containsTreeValue(root, target) {
  return root != null && (Object.is(root.value, target) || (root.children ?? []).some(child => containsTreeValue(child, target)));
}

// Solved on March 15, 2019.
// Map tree values.
function mapTreeValues(root, transform) {
  return root == null ? null : { ...root, value: transform(root.value), children: (root.children ?? []).map(child => mapTreeValues(child, transform)) };
}

// Solved on March 18, 2019.
// Clamp number.
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Solved on March 19, 2019.
// Normalize modulo.
function normalizeModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

// Solved on March 20, 2019.
// Is power of two big int.
function isPowerOfTwoBigInt(value) {
  return value > 0n && (value & (value - 1n)) === 0n;
}

// Solved on March 20, 2019.
// Least common multiple.
function leastCommonMultiple(a, b) {
  return a === 0 || b === 0 ? 0 : Math.abs((a / greatestCommonDivisor(a, b)) * b);
}

// Solved on March 21, 2019.
// Factorial big int.
function factorialBigInt(value) {
  return (() => { if (value < 0n) throw new RangeError('Expected a nonnegative integer'); let result = 1n; for (let i = 2n; i <= value; i++) result *= i; return result; })();
}

// Solved on March 22, 2019.
// Degrees to radians.
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Solved on March 25, 2019.
// Radians to degrees.
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

// Solved on March 26, 2019.
// Manhattan distance.
function manhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Solved on March 27, 2019.
// Euclidean distance.
function euclideanDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Solved on March 28, 2019.
// Contains point.
function containsPoint(rectangle, point) {
  return point.x >= rectangle.left && point.x <= rectangle.right && point.y >= rectangle.top && point.y <= rectangle.bottom;
}

// Solved on March 29, 2019.
// Rectangle area.
function rectangleArea(rectangle) {
  return (rectangle.right - rectangle.left) * (rectangle.bottom - rectangle.top);
}

// Solved on April  1, 2019.
// Get array extrema.
function getArrayExtrema(values) {
  return values.reduce(({ min, max }, value) => ({ min: Math.min(min, value), max: Math.max(max, value) }), { min: Infinity, max: -Infinity });
}

// Solved on April  2, 2019.
// Create number range.
function createNumberRange(start, end) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

// Solved on April  3, 2019.
// Pad number.
function padNumber(value, width) {
  return String(value).padStart(width, '0');
}

// Solved on April  4, 2019.
// Parse decimal integer.
function parseDecimalInteger(text) {
  return /^[+-]?\d+$/.test(text.trim()) && Number.isSafeInteger(Number(text)) ? Number(text) : undefined;
}

// Solved on April  5, 2019.
// Compare numeric pairs.
function compareNumericPairs(first, second) {
  return first[0] - second[0] || first[1] - second[1];
}

// Solved on April  8, 2019.
// Sum the total values across the orders.
function sumOrdersPractice(records) {
  return records.reduce((total, record) => total + record.total, 0);
}

// Solved on April  9, 2019.
// Return the mean total of the orders, or undefined for empty input.
function averageOrdersPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.total, 0) / records.length : undefined;
}

// Solved on April  9, 2019.
// Return the first orders record with the greatest total.
function maxOrdersPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.total > best.total) best = record;
  }
  return best;
}

// Solved on April  9, 2019.
// Keep orders whose total is at least the threshold.
function filterOrdersPractice(records, threshold) {
  return records.filter(record => record.total >= threshold);
}

// Solved on April 10, 2019.
// Return a copy of the orders in ascending total order.
function sortOrdersPractice(records) {
  return [...records].sort((first, second) => first.total - second.total);
}

// Solved on April 11, 2019.
// Count orders records by status.
function countGroupsOrdersPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.status;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on April 12, 2019.
// Sum total of orders within each status.
function sumGroupsOrdersPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.status;
    totals.set(key, (totals.get(key) ?? 0) + record.total);
  }
  return totals;
}

// Solved on April 15, 2019.
// Keep the first orders record for each status.
function firstPerGroupOrdersPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.status)) groups.set(record.status, record);
  }
  return [...groups.values()];
}

// Solved on April 16, 2019.
// Group orders by status while preserving their order.
function groupOrdersPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.status;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on April 16, 2019.
// Return up to limit orders with the highest total.
function rankOrdersPractice(records, limit) {
  return [...records].sort((first, second) => second.total - first.total).slice(0, Math.max(0, limit));
}

// Solved on April 17, 2019.
// Return cumulative total totals for the orders in input order.
function prefixOrdersPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.total;
    return total;
  });
}

// Solved on April 17, 2019.
// Sum the amount values across the invoices.
function sumInvoicesPractice(records) {
  return records.reduce((total, record) => total + record.amount, 0);
}

// Solved on April 18, 2019.
// Return the mean amount of the invoices, or undefined for empty input.
function averageInvoicesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.amount, 0) / records.length : undefined;
}

// Solved on April 18, 2019.
// Return the first invoices record with the greatest amount.
function maxInvoicesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.amount > best.amount) best = record;
  }
  return best;
}

// Solved on April 18, 2019.
// Keep invoices whose amount is at least the threshold.
function filterInvoicesPractice(records, threshold) {
  return records.filter(record => record.amount >= threshold);
}

// Solved on April 23, 2019.
// Return a copy of the invoices in ascending amount order.
function sortInvoicesPractice(records) {
  return [...records].sort((first, second) => first.amount - second.amount);
}

// Solved on April 24, 2019.
// Count invoices records by customerId.
function countGroupsInvoicesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.customerId;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on April 25, 2019.
// Sum amount of invoices within each customerId.
function sumGroupsInvoicesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.customerId;
    totals.set(key, (totals.get(key) ?? 0) + record.amount);
  }
  return totals;
}

// Solved on April 26, 2019.
// Keep the first invoices record for each customerId.
function firstPerGroupInvoicesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.customerId)) groups.set(record.customerId, record);
  }
  return [...groups.values()];
}

// Solved on April 29, 2019.
// Group invoices by customerId while preserving their order.
function groupInvoicesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.customerId;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on April 30, 2019.
// Return up to limit invoices with the highest amount.
function rankInvoicesPractice(records, limit) {
  return [...records].sort((first, second) => second.amount - first.amount).slice(0, Math.max(0, limit));
}

// Solved on May  2, 2019.
// Return cumulative amount totals for the invoices in input order.
function prefixInvoicesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.amount;
    return total;
  });
}

// Solved on May  3, 2019.
// Sum the price values across the products.
function sumProductsPractice(records) {
  return records.reduce((total, record) => total + record.price, 0);
}

// Solved on May  6, 2019.
// Return the mean price of the products, or undefined for empty input.
function averageProductsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.price, 0) / records.length : undefined;
}

// Solved on May  6, 2019.
// Return the first products record with the greatest price.
function maxProductsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.price > best.price) best = record;
  }
  return best;
}

// Solved on May  7, 2019.
// Keep products whose price is at least the threshold.
function filterProductsPractice(records, threshold) {
  return records.filter(record => record.price >= threshold);
}

// Solved on May  9, 2019.
// Return a copy of the products in ascending price order.
function sortProductsPractice(records) {
  return [...records].sort((first, second) => first.price - second.price);
}

// Solved on May 10, 2019.
// Count products records by category.
function countGroupsProductsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.category;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on May 13, 2019.
// Sum price of products within each category.
function sumGroupsProductsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.category;
    totals.set(key, (totals.get(key) ?? 0) + record.price);
  }
  return totals;
}

// Solved on May 14, 2019.
// Keep the first products record for each category.
function firstPerGroupProductsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.category)) groups.set(record.category, record);
  }
  return [...groups.values()];
}

// Solved on May 14, 2019.
// Group products by category while preserving their order.
function groupProductsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.category;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on May 15, 2019.
// Return up to limit products with the highest price.
function rankProductsPractice(records, limit) {
  return [...records].sort((first, second) => second.price - first.price).slice(0, Math.max(0, limit));
}

// Solved on May 16, 2019.
// Return cumulative price totals for the products in input order.
function prefixProductsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.price;
    return total;
  });
}

// Solved on May 17, 2019.
// Sum the weight values across the shipments.
function sumShipmentsPractice(records) {
  return records.reduce((total, record) => total + record.weight, 0);
}

// Solved on May 20, 2019.
// Return the mean weight of the shipments, or undefined for empty input.
function averageShipmentsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.weight, 0) / records.length : undefined;
}

// Solved on May 21, 2019.
// Return the first shipments record with the greatest weight.
function maxShipmentsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.weight > best.weight) best = record;
  }
  return best;
}

// Solved on May 22, 2019.
// Keep shipments whose weight is at least the threshold.
function filterShipmentsPractice(records, threshold) {
  return records.filter(record => record.weight >= threshold);
}

// Solved on May 23, 2019.
// Return a copy of the shipments in ascending weight order.
function sortShipmentsPractice(records) {
  return [...records].sort((first, second) => first.weight - second.weight);
}

// Solved on May 24, 2019.
// Count shipments records by destination.
function countGroupsShipmentsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.destination;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on May 27, 2019.
// Sum weight of shipments within each destination.
function sumGroupsShipmentsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.destination;
    totals.set(key, (totals.get(key) ?? 0) + record.weight);
  }
  return totals;
}

// Solved on May 28, 2019.
// Keep the first shipments record for each destination.
function firstPerGroupShipmentsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.destination)) groups.set(record.destination, record);
  }
  return [...groups.values()];
}

// Solved on May 29, 2019.
// Group shipments by destination while preserving their order.
function groupShipmentsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.destination;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on May 30, 2019.
// Return up to limit shipments with the highest weight.
function rankShipmentsPractice(records, limit) {
  return [...records].sort((first, second) => second.weight - first.weight).slice(0, Math.max(0, limit));
}

// Solved on May 31, 2019.
// Return cumulative weight totals for the shipments in input order.
function prefixShipmentsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.weight;
    return total;
  });
}

// Solved on June  3, 2019.
// Sum the duration values across the movies.
function sumMoviesPractice(records) {
  return records.reduce((total, record) => total + record.duration, 0);
}

// Solved on June  3, 2019.
// Return the mean duration of the movies, or undefined for empty input.
function averageMoviesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.duration, 0) / records.length : undefined;
}

// Solved on June  4, 2019.
// Return the first movies record with the greatest duration.
function maxMoviesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.duration > best.duration) best = record;
  }
  return best;
}

// Solved on June  5, 2019.
// Keep movies whose duration is at least the threshold.
function filterMoviesPractice(records, threshold) {
  return records.filter(record => record.duration >= threshold);
}

// Solved on June  6, 2019.
// Return a copy of the movies in ascending duration order.
function sortMoviesPractice(records) {
  return [...records].sort((first, second) => first.duration - second.duration);
}

// Solved on June  6, 2019.
// Count movies records by genre.
function countGroupsMoviesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.genre;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on June  7, 2019.
// Sum duration of movies within each genre.
function sumGroupsMoviesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.genre;
    totals.set(key, (totals.get(key) ?? 0) + record.duration);
  }
  return totals;
}

// Solved on June 10, 2019.
// Keep the first movies record for each genre.
function firstPerGroupMoviesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.genre)) groups.set(record.genre, record);
  }
  return [...groups.values()];
}

// Solved on June 11, 2019.
// Group movies by genre while preserving their order.
function groupMoviesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.genre;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on June 12, 2019.
// Return up to limit movies with the highest duration.
function rankMoviesPractice(records, limit) {
  return [...records].sort((first, second) => second.duration - first.duration).slice(0, Math.max(0, limit));
}

// Solved on June 13, 2019.
// Return cumulative duration totals for the movies in input order.
function prefixMoviesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.duration;
    return total;
  });
}

// Solved on June 14, 2019.
// Sum the pages values across the books.
function sumBooksPractice(records) {
  return records.reduce((total, record) => total + record.pages, 0);
}

// Solved on June 17, 2019.
// Return the mean pages of the books, or undefined for empty input.
function averageBooksPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.pages, 0) / records.length : undefined;
}

// Solved on June 18, 2019.
// Return the first books record with the greatest pages.
function maxBooksPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.pages > best.pages) best = record;
  }
  return best;
}

// Solved on June 19, 2019.
// Keep books whose pages is at least the threshold.
function filterBooksPractice(records, threshold) {
  return records.filter(record => record.pages >= threshold);
}

// Solved on June 20, 2019.
// Return a copy of the books in ascending pages order.
function sortBooksPractice(records) {
  return [...records].sort((first, second) => first.pages - second.pages);
}

// Solved on June 21, 2019.
// Count books records by author.
function countGroupsBooksPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.author;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on June 24, 2019.
// Sum pages of books within each author.
function sumGroupsBooksPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.author;
    totals.set(key, (totals.get(key) ?? 0) + record.pages);
  }
  return totals;
}

// Solved on June 24, 2019.
// Keep the first books record for each author.
function firstPerGroupBooksPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.author)) groups.set(record.author, record);
  }
  return [...groups.values()];
}

// Solved on June 25, 2019.
// Group books by author while preserving their order.
function groupBooksPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.author;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on June 26, 2019.
// Return up to limit books with the highest pages.
function rankBooksPractice(records, limit) {
  return [...records].sort((first, second) => second.pages - first.pages).slice(0, Math.max(0, limit));
}

// Solved on June 27, 2019.
// Return cumulative pages totals for the books in input order.
function prefixBooksPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.pages;
    return total;
  });
}

// Solved on June 28, 2019.
// Sum the score values across the games.
function sumGamesPractice(records) {
  return records.reduce((total, record) => total + record.score, 0);
}

// Solved on July  1, 2019.
// Return the mean score of the games, or undefined for empty input.
function averageGamesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.score, 0) / records.length : undefined;
}

// Solved on July  1, 2019.
// Return the first games record with the greatest score.
function maxGamesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.score > best.score) best = record;
  }
  return best;
}

// Solved on July  2, 2019.
// Keep games whose score is at least the threshold.
function filterGamesPractice(records, threshold) {
  return records.filter(record => record.score >= threshold);
}

// Solved on July  3, 2019.
// Return a copy of the games in ascending score order.
function sortGamesPractice(records) {
  return [...records].sort((first, second) => first.score - second.score);
}

// Solved on July  4, 2019.
// Count games records by team.
function countGroupsGamesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.team;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on July  8, 2019.
// Sum score of games within each team.
function sumGroupsGamesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.team;
    totals.set(key, (totals.get(key) ?? 0) + record.score);
  }
  return totals;
}

// Solved on July  9, 2019.
// Keep the first games record for each team.
function firstPerGroupGamesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.team)) groups.set(record.team, record);
  }
  return [...groups.values()];
}

// Solved on July 10, 2019.
// Group games by team while preserving their order.
function groupGamesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.team;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on July 11, 2019.
// Return up to limit games with the highest score.
function rankGamesPractice(records, limit) {
  return [...records].sort((first, second) => second.score - first.score).slice(0, Math.max(0, limit));
}

// Solved on July 12, 2019.
// Return cumulative score totals for the games in input order.
function prefixGamesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.score;
    return total;
  });
}

// Solved on July 15, 2019.
// Sum the price values across the tickets.
function sumTicketsPractice(records) {
  return records.reduce((total, record) => total + record.price, 0);
}

// Solved on July 16, 2019.
// Return the mean price of the tickets, or undefined for empty input.
function averageTicketsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.price, 0) / records.length : undefined;
}

// Solved on July 17, 2019.
// Return the first tickets record with the greatest price.
function maxTicketsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.price > best.price) best = record;
  }
  return best;
}

// Solved on July 18, 2019.
// Keep tickets whose price is at least the threshold.
function filterTicketsPractice(records, threshold) {
  return records.filter(record => record.price >= threshold);
}

// Solved on July 18, 2019.
// Return a copy of the tickets in ascending price order.
function sortTicketsPractice(records) {
  return [...records].sort((first, second) => first.price - second.price);
}

// Solved on July 19, 2019.
// Count tickets records by section.
function countGroupsTicketsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.section;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on July 22, 2019.
// Sum price of tickets within each section.
function sumGroupsTicketsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.section;
    totals.set(key, (totals.get(key) ?? 0) + record.price);
  }
  return totals;
}

// Solved on July 23, 2019.
// Keep the first tickets record for each section.
function firstPerGroupTicketsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.section)) groups.set(record.section, record);
  }
  return [...groups.values()];
}

// Solved on July 24, 2019.
// Group tickets by section while preserving their order.
function groupTicketsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.section;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on July 25, 2019.
// Return up to limit tickets with the highest price.
function rankTicketsPractice(records, limit) {
  return [...records].sort((first, second) => second.price - first.price).slice(0, Math.max(0, limit));
}

// Solved on July 26, 2019.
// Return cumulative price totals for the tickets in input order.
function prefixTicketsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.price;
    return total;
  });
}

// Solved on July 29, 2019.
// Sum the duration values across the sessions.
function sumSessionsPractice(records) {
  return records.reduce((total, record) => total + record.duration, 0);
}

// Solved on July 30, 2019.
// Return the mean duration of the sessions, or undefined for empty input.
function averageSessionsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.duration, 0) / records.length : undefined;
}

// Solved on July 31, 2019.
// Return the first sessions record with the greatest duration.
function maxSessionsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.duration > best.duration) best = record;
  }
  return best;
}

// Solved on August  1, 2019.
// Keep sessions whose duration is at least the threshold.
function filterSessionsPractice(records, threshold) {
  return records.filter(record => record.duration >= threshold);
}

// Solved on August  1, 2019.
// Return a copy of the sessions in ascending duration order.
function sortSessionsPractice(records) {
  return [...records].sort((first, second) => first.duration - second.duration);
}

// Solved on August  2, 2019.
// Count sessions records by userId.
function countGroupsSessionsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.userId;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on August  2, 2019.
// Sum duration of sessions within each userId.
function sumGroupsSessionsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.userId;
    totals.set(key, (totals.get(key) ?? 0) + record.duration);
  }
  return totals;
}

// Solved on August  5, 2019.
// Keep the first sessions record for each userId.
function firstPerGroupSessionsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.userId)) groups.set(record.userId, record);
  }
  return [...groups.values()];
}

// Solved on August  6, 2019.
// Group sessions by userId while preserving their order.
function groupSessionsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.userId;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on August  7, 2019.
// Return up to limit sessions with the highest duration.
function rankSessionsPractice(records, limit) {
  return [...records].sort((first, second) => second.duration - first.duration).slice(0, Math.max(0, limit));
}

// Solved on August  8, 2019.
// Return cumulative duration totals for the sessions in input order.
function prefixSessionsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.duration;
    return total;
  });
}

// Solved on August  8, 2019.
// Sum the amount values across the transactions.
function sumTransactionsPractice(records) {
  return records.reduce((total, record) => total + record.amount, 0);
}

// Solved on August  9, 2019.
// Return the mean amount of the transactions, or undefined for empty input.
function averageTransactionsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.amount, 0) / records.length : undefined;
}

// Solved on August 12, 2019.
// Return the first transactions record with the greatest amount.
function maxTransactionsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.amount > best.amount) best = record;
  }
  return best;
}

// Solved on August 13, 2019.
// Keep transactions whose amount is at least the threshold.
function filterTransactionsPractice(records, threshold) {
  return records.filter(record => record.amount >= threshold);
}

// Solved on August 14, 2019.
// Return a copy of the transactions in ascending amount order.
function sortTransactionsPractice(records) {
  return [...records].sort((first, second) => first.amount - second.amount);
}

// Solved on August 15, 2019.
// Count transactions records by currency.
function countGroupsTransactionsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.currency;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on August 16, 2019.
// Sum amount of transactions within each currency.
function sumGroupsTransactionsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.currency;
    totals.set(key, (totals.get(key) ?? 0) + record.amount);
  }
  return totals;
}

// Solved on August 19, 2019.
// Keep the first transactions record for each currency.
function firstPerGroupTransactionsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.currency)) groups.set(record.currency, record);
  }
  return [...groups.values()];
}

// Solved on August 20, 2019.
// Group transactions by currency while preserving their order.
function groupTransactionsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.currency;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on August 21, 2019.
// Return up to limit transactions with the highest amount.
function rankTransactionsPractice(records, limit) {
  return [...records].sort((first, second) => second.amount - first.amount).slice(0, Math.max(0, limit));
}

// Solved on August 21, 2019.
// Return cumulative amount totals for the transactions in input order.
function prefixTransactionsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.amount;
    return total;
  });
}

// Solved on August 22, 2019.
// Sum the salary values across the employees.
function sumEmployeesPractice(records) {
  return records.reduce((total, record) => total + record.salary, 0);
}

// Solved on August 23, 2019.
// Return the mean salary of the employees, or undefined for empty input.
function averageEmployeesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.salary, 0) / records.length : undefined;
}

// Solved on August 26, 2019.
// Return the first employees record with the greatest salary.
function maxEmployeesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.salary > best.salary) best = record;
  }
  return best;
}

// Solved on August 27, 2019.
// Keep employees whose salary is at least the threshold.
function filterEmployeesPractice(records, threshold) {
  return records.filter(record => record.salary >= threshold);
}

// Solved on August 28, 2019.
// Return a copy of the employees in ascending salary order.
function sortEmployeesPractice(records) {
  return [...records].sort((first, second) => first.salary - second.salary);
}

// Solved on August 29, 2019.
// Count employees records by department.
function countGroupsEmployeesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.department;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on August 30, 2019.
// Sum salary of employees within each department.
function sumGroupsEmployeesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.department;
    totals.set(key, (totals.get(key) ?? 0) + record.salary);
  }
  return totals;
}

// Solved on September  2, 2019.
// Keep the first employees record for each department.
function firstPerGroupEmployeesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.department)) groups.set(record.department, record);
  }
  return [...groups.values()];
}

// Solved on September  3, 2019.
// Group employees by department while preserving their order.
function groupEmployeesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.department;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on September  4, 2019.
// Return up to limit employees with the highest salary.
function rankEmployeesPractice(records, limit) {
  return [...records].sort((first, second) => second.salary - first.salary).slice(0, Math.max(0, limit));
}

// Solved on September  5, 2019.
// Return cumulative salary totals for the employees in input order.
function prefixEmployeesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.salary;
    return total;
  });
}

// Solved on September  5, 2019.
// Sum the distance values across the trips.
function sumTripsPractice(records) {
  return records.reduce((total, record) => total + record.distance, 0);
}

// Solved on September  6, 2019.
// Return the mean distance of the trips, or undefined for empty input.
function averageTripsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.distance, 0) / records.length : undefined;
}

// Solved on September  9, 2019.
// Return the first trips record with the greatest distance.
function maxTripsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.distance > best.distance) best = record;
  }
  return best;
}

// Solved on September 10, 2019.
// Keep trips whose distance is at least the threshold.
function filterTripsPractice(records, threshold) {
  return records.filter(record => record.distance >= threshold);
}

// Solved on September 11, 2019.
// Return a copy of the trips in ascending distance order.
function sortTripsPractice(records) {
  return [...records].sort((first, second) => first.distance - second.distance);
}

// Solved on September 12, 2019.
// Count trips records by destination.
function countGroupsTripsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.destination;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on September 13, 2019.
// Sum distance of trips within each destination.
function sumGroupsTripsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.destination;
    totals.set(key, (totals.get(key) ?? 0) + record.distance);
  }
  return totals;
}

// Solved on September 16, 2019.
// Keep the first trips record for each destination.
function firstPerGroupTripsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.destination)) groups.set(record.destination, record);
  }
  return [...groups.values()];
}

// Solved on September 17, 2019.
// Group trips by destination while preserving their order.
function groupTripsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.destination;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on September 18, 2019.
// Return up to limit trips with the highest distance.
function rankTripsPractice(records, limit) {
  return [...records].sort((first, second) => second.distance - first.distance).slice(0, Math.max(0, limit));
}

// Solved on September 19, 2019.
// Return cumulative distance totals for the trips in input order.
function prefixTripsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.distance;
    return total;
  });
}

// Solved on September 20, 2019.
// Sum the value values across the measurements.
function sumMeasurementsPractice(records) {
  return records.reduce((total, record) => total + record.value, 0);
}

// Solved on September 23, 2019.
// Return the mean value of the measurements, or undefined for empty input.
function averageMeasurementsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.value, 0) / records.length : undefined;
}

// Solved on September 24, 2019.
// Return the first measurements record with the greatest value.
function maxMeasurementsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.value > best.value) best = record;
  }
  return best;
}

// Solved on September 25, 2019.
// Keep measurements whose value is at least the threshold.
function filterMeasurementsPractice(records, threshold) {
  return records.filter(record => record.value >= threshold);
}

// Solved on September 26, 2019.
// Return a copy of the measurements in ascending value order.
function sortMeasurementsPractice(records) {
  return [...records].sort((first, second) => first.value - second.value);
}

// Solved on September 27, 2019.
// Count measurements records by sensorId.
function countGroupsMeasurementsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.sensorId;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on September 30, 2019.
// Sum value of measurements within each sensorId.
function sumGroupsMeasurementsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.sensorId;
    totals.set(key, (totals.get(key) ?? 0) + record.value);
  }
  return totals;
}

// Solved on October  1, 2019.
// Keep the first measurements record for each sensorId.
function firstPerGroupMeasurementsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.sensorId)) groups.set(record.sensorId, record);
  }
  return [...groups.values()];
}

// Solved on October  2, 2019.
// Group measurements by sensorId while preserving their order.
function groupMeasurementsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.sensorId;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on October  3, 2019.
// Return up to limit measurements with the highest value.
function rankMeasurementsPractice(records, limit) {
  return [...records].sort((first, second) => second.value - first.value).slice(0, Math.max(0, limit));
}

// Solved on October  4, 2019.
// Return cumulative value totals for the measurements in input order.
function prefixMeasurementsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.value;
    return total;
  });
}

// Solved on October  7, 2019.
// Sum the likes values across the posts.
function sumPostsPractice(records) {
  return records.reduce((total, record) => total + record.likes, 0);
}

// Solved on October  8, 2019.
// Return the mean likes of the posts, or undefined for empty input.
function averagePostsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.likes, 0) / records.length : undefined;
}

// Solved on October  9, 2019.
// Return the first posts record with the greatest likes.
function maxPostsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.likes > best.likes) best = record;
  }
  return best;
}

// Solved on October 10, 2019.
// Keep posts whose likes is at least the threshold.
function filterPostsPractice(records, threshold) {
  return records.filter(record => record.likes >= threshold);
}

// Solved on October 10, 2019.
// Return a copy of the posts in ascending likes order.
function sortPostsPractice(records) {
  return [...records].sort((first, second) => first.likes - second.likes);
}

// Solved on October 11, 2019.
// Count posts records by author.
function countGroupsPostsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.author;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on October 14, 2019.
// Sum likes of posts within each author.
function sumGroupsPostsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.author;
    totals.set(key, (totals.get(key) ?? 0) + record.likes);
  }
  return totals;
}

// Solved on October 15, 2019.
// Keep the first posts record for each author.
function firstPerGroupPostsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.author)) groups.set(record.author, record);
  }
  return [...groups.values()];
}

// Solved on October 16, 2019.
// Group posts by author while preserving their order.
function groupPostsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.author;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on October 17, 2019.
// Return up to limit posts with the highest likes.
function rankPostsPractice(records, limit) {
  return [...records].sort((first, second) => second.likes - first.likes).slice(0, Math.max(0, limit));
}

// Solved on October 18, 2019.
// Return cumulative likes totals for the posts in input order.
function prefixPostsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.likes;
    return total;
  });
}

// Solved on October 21, 2019.
// Sum the latency values across the responses.
function sumResponsesPractice(records) {
  return records.reduce((total, record) => total + record.latency, 0);
}

// Solved on October 21, 2019.
// Return the mean latency of the responses, or undefined for empty input.
function averageResponsesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.latency, 0) / records.length : undefined;
}

// Solved on October 22, 2019.
// Return the first responses record with the greatest latency.
function maxResponsesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.latency > best.latency) best = record;
  }
  return best;
}

// Solved on October 22, 2019.
// Keep responses whose latency is at least the threshold.
function filterResponsesPractice(records, threshold) {
  return records.filter(record => record.latency >= threshold);
}

// Solved on October 23, 2019.
// Return a copy of the responses in ascending latency order.
function sortResponsesPractice(records) {
  return [...records].sort((first, second) => first.latency - second.latency);
}

// Solved on October 24, 2019.
// Count responses records by endpoint.
function countGroupsResponsesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.endpoint;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on October 25, 2019.
// Sum latency of responses within each endpoint.
function sumGroupsResponsesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.endpoint;
    totals.set(key, (totals.get(key) ?? 0) + record.latency);
  }
  return totals;
}

// Solved on October 29, 2019.
// Keep the first responses record for each endpoint.
function firstPerGroupResponsesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.endpoint)) groups.set(record.endpoint, record);
  }
  return [...groups.values()];
}

// Solved on October 30, 2019.
// Group responses by endpoint while preserving their order.
function groupResponsesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.endpoint;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on October 31, 2019.
// Return up to limit responses with the highest latency.
function rankResponsesPractice(records, limit) {
  return [...records].sort((first, second) => second.latency - first.latency).slice(0, Math.max(0, limit));
}

// Solved on November  1, 2019.
// Return cumulative latency totals for the responses in input order.
function prefixResponsesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.latency;
    return total;
  });
}

// Solved on November  1, 2019.
// Sum the amount values across the donations.
function sumDonationsPractice(records) {
  return records.reduce((total, record) => total + record.amount, 0);
}

// Solved on November  4, 2019.
// Return the mean amount of the donations, or undefined for empty input.
function averageDonationsPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.amount, 0) / records.length : undefined;
}

// Solved on November  5, 2019.
// Return the first donations record with the greatest amount.
function maxDonationsPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.amount > best.amount) best = record;
  }
  return best;
}

// Solved on November  6, 2019.
// Keep donations whose amount is at least the threshold.
function filterDonationsPractice(records, threshold) {
  return records.filter(record => record.amount >= threshold);
}

// Solved on November  7, 2019.
// Return a copy of the donations in ascending amount order.
function sortDonationsPractice(records) {
  return [...records].sort((first, second) => first.amount - second.amount);
}

// Solved on November  7, 2019.
// Count donations records by campaign.
function countGroupsDonationsPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.campaign;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on November  8, 2019.
// Sum amount of donations within each campaign.
function sumGroupsDonationsPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.campaign;
    totals.set(key, (totals.get(key) ?? 0) + record.amount);
  }
  return totals;
}

// Solved on November 11, 2019.
// Keep the first donations record for each campaign.
function firstPerGroupDonationsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.campaign)) groups.set(record.campaign, record);
  }
  return [...groups.values()];
}

// Solved on November 11, 2019.
// Group donations by campaign while preserving their order.
function groupDonationsPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.campaign;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on November 12, 2019.
// Return up to limit donations with the highest amount.
function rankDonationsPractice(records, limit) {
  return [...records].sort((first, second) => second.amount - first.amount).slice(0, Math.max(0, limit));
}

// Solved on November 13, 2019.
// Return cumulative amount totals for the donations in input order.
function prefixDonationsPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.amount;
    return total;
  });
}

// Solved on November 14, 2019.
// Sum the servings values across the recipes.
function sumRecipesPractice(records) {
  return records.reduce((total, record) => total + record.servings, 0);
}

// Solved on November 15, 2019.
// Return the mean servings of the recipes, or undefined for empty input.
function averageRecipesPractice(records) {
  return records.length ? records.reduce((total, record) => total + record.servings, 0) / records.length : undefined;
}

// Solved on November 18, 2019.
// Return the first recipes record with the greatest servings.
function maxRecipesPractice(records) {
  let best;
  for (const record of records) {
    if (best === undefined || record.servings > best.servings) best = record;
  }
  return best;
}

// Solved on November 19, 2019.
// Keep recipes whose servings is at least the threshold.
function filterRecipesPractice(records, threshold) {
  return records.filter(record => record.servings >= threshold);
}

// Solved on November 20, 2019.
// Return a copy of the recipes in ascending servings order.
function sortRecipesPractice(records) {
  return [...records].sort((first, second) => first.servings - second.servings);
}

// Solved on November 21, 2019.
// Count recipes records by cuisine.
function countGroupsRecipesPractice(records) {
  const counts = new Map();
  for (const record of records) {
    const key = record.cuisine;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

// Solved on November 22, 2019.
// Sum servings of recipes within each cuisine.
function sumGroupsRecipesPractice(records) {
  const totals = new Map();
  for (const record of records) {
    const key = record.cuisine;
    totals.set(key, (totals.get(key) ?? 0) + record.servings);
  }
  return totals;
}

// Solved on November 22, 2019.
// Keep the first recipes record for each cuisine.
function firstPerGroupRecipesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    if (!groups.has(record.cuisine)) groups.set(record.cuisine, record);
  }
  return [...groups.values()];
}

// Solved on November 25, 2019.
// Group recipes by cuisine while preserving their order.
function groupRecipesPractice(records) {
  const groups = new Map();
  for (const record of records) {
    const key = record.cuisine;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }
  return groups;
}

// Solved on November 26, 2019.
// Return up to limit recipes with the highest servings.
function rankRecipesPractice(records, limit) {
  return [...records].sort((first, second) => second.servings - first.servings).slice(0, Math.max(0, limit));
}

// Solved on November 27, 2019.
// Return cumulative servings totals for the recipes in input order.
function prefixRecipesPractice(records) {
  let total = 0;
  return records.map(record => {
    total += record.servings;
    return total;
  });
}

// Solved on November 28, 2019.
// Check whether a safe integer is prime.
function isPrimeNumber(value) {
  if (!Number.isSafeInteger(value) || value < 2) return false;
  for (let divisor = 2; divisor <= value / divisor; divisor++) {
    if (value % divisor === 0) return false;
  }
  return true;
}

// Solved on November 29, 2019.
// Sum the decimal digits of a nonnegative safe integer.
function sumDigits(value) {
  return [...String(value)].reduce((sum, digit) => sum + Number(digit), 0);
}

// Solved on December  2, 2019.
// Check whether a Gregorian year has 366 days.
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

// Solved on December  3, 2019.
// Count differing positions in two equal-length arrays.
function hammingDistance(first, second) {
  return first.reduce((count, value, i) => count + Number(!Object.is(value, second[i])), 0);
}

// Solved on December  4, 2019.
// Count runs of consecutive equal values.
function countRuns(values) {
  return values.reduce((count, value, i) => count + Number(i === 0 || !Object.is(value, values[i - 1])), 0);
}

// Solved on December  5, 2019.
// Reverse each run of non-whitespace characters while preserving spacing.
function reverseEachWord(text) {
  return text.replace(/\S+/gu, word => [...word].reverse().join(''));
}

// Solved on December  6, 2019.
// Toggle the case of ASCII letters.
function swapAsciiCase(text) {
  return text.replace(/[a-z]/gi, letter => letter === letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase());
}

// Solved on December  9, 2019.
// Count overlapping occurrences of a nonempty substring.
function countOverlappingMatches(text, needle) {
  if (!needle) return 0;
  let count = 0;
  for (let index = text.indexOf(needle); index !== -1; index = text.indexOf(needle, index + 1)) {
    count++;
  }
  return count;
}

// Solved on December 10, 2019.
// Remove all trailing slashes.
function stripTrailingSlash(text) {
  return text.replace(/\/+$/, '');
}

// Solved on December 11, 2019.
// Format three integer channels from 0 to 255 as a hex color.
function encodeHexColor(red, green, blue) {
  return '#' + [red, green, blue].map(channel => channel.toString(16).padStart(2, '0')).join('');
}

// Solved on December 12, 2019.
// Decode a six-digit hex color into three integer channels.
function decodeHexColor(color) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) return undefined;
  return color.slice(1).match(/../g).map(pair => parseInt(pair, 16));
}

// Solved on December 13, 2019.
// Sort a copy of the records by a numeric field.
function sortByNumericField(records, field) {
  return [...records].sort((a, b) => a[field] - b[field]);
}

// Solved on December 13, 2019.
// List the union of enumerable string keys across records.
function collectOwnKeys(records) {
  return [...new Set(records.flatMap(Object.keys))];
}

// Solved on December 16, 2019.
// Sum the numeric values of a field across records.
function sumByField(records, field) {
  return records.reduce((sum, record) => sum + record[field], 0);
}

// Solved on December 17, 2019.
// Index records using the last record for each key.
function indexRecordsByField(records, field) {
  return new Map(records.map(record => [record[field], record]));
}

// Solved on December 18, 2019.
// Return the main diagonal of a rectangular matrix.
function matrixDiagonal(matrix) {
  return matrix.slice(0, matrix[0]?.length ?? 0).map((row, index) => row[index]);
}

// Solved on December 19, 2019.
// Sum each row of a numeric matrix.
function matrixRowSums(matrix) {
  return matrix.map(row => row.reduce((sum, value) => sum + value, 0));
}

// Solved on December 20, 2019.
// Sum each column of a rectangular numeric matrix.
function matrixColumnSums(matrix) {
  return matrix[0]?.map((_, index) => matrix.reduce((sum, row) => sum + row[index], 0)) ?? [];
}

// Solved on December 20, 2019.
// Count set bits in a nonnegative BigInt.
function countBinaryOnes(value) {
  if (value < 0n) throw new RangeError('Expected a nonnegative integer');
  let count = 0;
  while (value > 0n) {
    value &= value - 1n;
    count++;
  }
  return count;
}

// Solved on December 23, 2019.
// Format minutes since midnight as HH:MM.
function convertMinutesToClock(minutes) {
  return [Math.floor(minutes / 60), minutes % 60].map(value => String(value).padStart(2, '0')).join(':');
}

// Solved on December 27, 2019.
// Merge ascending input arrays and remove duplicate values.
function mergeSortedUnique(first, second) {
  return [...new Set(mergeSortedArrays(first, second))];
}

// Solved on December 30, 2019.
// Check whether two distinct entries differ by the specified nonnegative distance.
function hasPairWithDifference(values, distance) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value - distance) || seen.has(value + distance)) return true;
    seen.add(value);
  }
  return false;
}

// Solved on December 30, 2019.
// Sum the positive multiples of a positive divisor strictly below a limit.
function sumMultiplesBelow(limit, divisor) {
  const count = Math.max(0, Math.ceil(limit / divisor) - 1);
  return divisor * count * (count + 1) / 2;
}

// Solved on December 31, 2019.
// Return the longest shared suffix of two strings.
function commonSuffix(first, second) {
  const a = [...first];
  const b = [...second];
  let count = 0;
  while (count < Math.min(a.length, b.length) && a[a.length - 1 - count] === b[b.length - 1 - count]) {
    count++;
  }
  return a.slice(a.length - count).join('');
}

// Solved on March  1, 2020.
// Absolute difference.
function absoluteDifference(a, b) {
  return Math.abs(a - b);
}

// Solved on March  2, 2020.
// Sum odd numbers.
function sumOddNumbers(values) {
  return values.reduce((sum, value) => value % 2 !== 0 ? sum + value : sum, 0);
}

// Solved on March  4, 2020.
// Count positive numbers.
function countPositiveNumbers(values) {
  return values.filter(value => value > 0).length;
}

// Solved on March  7, 2020.
// Sum squares.
function sumSquares(values) {
  return values.reduce((sum, value) => sum + value ** 2, 0);
}

// Solved on March  8, 2020.
// Has all unique values.
function hasAllUniqueValues(values) {
  return new Set(values).size === values.length;
}

// Solved on March  9, 2020.
// Without value.
function withoutValue(values, excluded) {
  return values.filter(value => !Object.is(value, excluded));
}

// Solved on March  9, 2020.
// Rotate left.
function rotateLeft(values, steps) {
  return rotateRight(values, -steps);
}

// Solved on March 10, 2020.
// Partition at value.
function partitionAtValue(values, threshold) {
  return partitionValues(values, value => value < threshold);
}

// Solved on March 12, 2020.
// Count occurrences.
function countOccurrences(values, target) {
  return values.reduce((count, value) => count + Number(Object.is(value, target)), 0);
}

// Solved on March 14, 2020.
// Array ends.
function arrayEnds(values) {
  return values.length ? [values[0], values[values.length - 1]] : [];
}

// Solved on March 14, 2020.
// String has prefix.
function stringHasPrefix(text, prefix) {
  return text.slice(0, prefix.length) === prefix;
}

// Solved on March 16, 2020.
// Strip whitespace.
function stripWhitespace(text) {
  return text.replace(/\s+/gu, '');
}

// Solved on March 17, 2020.
// Collapse whitespace.
function collapseWhitespace(text) {
  return text.trim().replace(/\s+/gu, ' ');
}

// Solved on March 21, 2020.
// Repeat code point.
function repeatCodePoint(point, count) {
  return String.fromCodePoint(point).repeat(count);
}

// Solved on March 22, 2020.
// Is ascii digit string.
function isAsciiDigitString(text) {
  return /^[0-9]+$/.test(text);
}

// Solved on March 22, 2020.
// Sort words by length.
function sortWordsByLength(words) {
  return [...words].sort((a, b) => [...a].length - [...b].length);
}

// Solved on March 23, 2020.
// Sum matrix.
function sumMatrix(matrix) {
  return matrix.reduce((sum, row) => sum + row.reduce((rowSum, value) => rowSum + value, 0), 0);
}

// Solved on March 24, 2020.
// Mirror matrix rows.
function mirrorMatrixRows(matrix) {
  return matrix.map(row => [...row].reverse());
}

// Solved on March 26, 2020.
// Make identity matrix.
function makeIdentityMatrix(size) {
  return Array.from({ length: size }, (_, row) => Array.from({ length: size }, (_, column) => Number(row === column)));
}

// Solved on March 27, 2020.
// Add matrices.
function addMatrices(first, second) {
  return first.map((row, i) => row.map((value, j) => value + second[i][j]));
}

// Solved on March 27, 2020.
// Convert celsius to fahrenheit.
function convertCelsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

// Solved on March 31, 2020.
// Convert fahrenheit to celsius.
function convertFahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

// Solved on April  1, 2020.
// Dot product.
function dotProduct(first, second) {
  return first.reduce((sum, value, i) => sum + value * second[i], 0);
}

// Solved on April  2, 2020.
// Squared distance.
function squaredDistance(a, b) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

// Solved on April  3, 2020.
// Count own fields.
function countOwnFields(record) {
  return Object.keys(record).length;
}

// Solved on April  3, 2020.
// Record to pairs.
function recordToPairs(record) {
  return Object.entries(record);
}

// Solved on April  6, 2020.
// Prefix matches.
function prefixMatches(values, prefix) {
  return values.filter(value => value.startsWith(prefix));
}

// Solved on April  7, 2020.
// Get tree child count.
function getTreeChildCount(node) {
  return node.children?.length ?? 0;
}

// Solved on April  9, 2020.
// Is divisible by.
function isDivisibleBy(value, divisor) {
  return divisor !== 0 && value % divisor === 0;
}

// Solved on April 12, 2020.
// Convert seconds to parts.
function convertSecondsToParts(seconds) {
  return ({ hours: Math.floor(seconds / 3600), minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 });
}

// Solved on April 14, 2020.
// Count even numbers.
function countEvenNumbers(a) {
  return a.filter(n => n % 2 === 0).length;
}

// Solved on April 15, 2020.
// Multiply numbers.
function multiplyNumbers(a) {
  return a.reduce((p, n) => p * n, 1);
}

// Solved on April 16, 2020.
// Running maximums.
function runningMaximums(a) {
  let max;
  return a.map((n, i) => i === 0 ? (max = n) : (max = Math.max(max, n)));
}

// Solved on April 16, 2020.
// Count distinct values.
function countDistinctValues(a) {
  return new Set(a).size;
}

// Solved on April 17, 2020.
// Has any negative number.
function hasAnyNegativeNumber(a) {
  return a.some(n => n < 0);
}

// Solved on April 20, 2020.
// Last array index.
function lastArrayIndex(a, x) {
  return a.lastIndexOf(x);
}

// Solved on April 24, 2020.
// Replace first value.
function replaceFirstValue(a, oldValue, newValue) {
  const i = a.indexOf(oldValue);
  return i === -1 ? [...a] : [...a.slice(0, i), newValue, ...a.slice(i + 1)];
}

// Solved on April 25, 2020.
// Remove array slice.
function removeArraySlice(a, start, length) {
  return [...a.slice(0, start), ...a.slice(start + length)];
}

// Solved on April 26, 2020.
// Values at indices.
function valuesAtIndices(a, indices) {
  return indices.map(i => a[i]);
}

// Solved on April 27, 2020.
// Pair with successor.
function pairWithSuccessor(a) {
  return a.slice(1).map((value, i) => [a[i], value]);
}

// Solved on April 28, 2020.
// Split by sign.
function splitBySign(a) {
  return [a.filter(n => n < 0), a.filter(n => n >= 0)];
}

// Solved on April 28, 2020.
// Double values at even indices.
function doubleValuesAtEvenIndices(a) {
  return a.map((n, i) => i % 2 === 0 ? n * 2 : n);
}

// Solved on April 30, 2020.
// Join nonempty strings.
function joinNonemptyStrings(a, separator) {
  return a.filter(s => s !== '').join(separator);
}

// Solved on April 30, 2020.
// Count lines.
function countLines(text) {
  return text === '' ? 0 : text.split(/\r\n|[\r\n]/).length;
}

// Solved on May  1, 2020.
// Remove ascii digits.
function removeAsciiDigits(text) {
  return text.replace(/[0-9]/g, '');
}

// Solved on May  4, 2020.
// Extract ascii digits.
function extractAsciiDigits(text) {
  return (text.match(/[0-9]/g) ?? []).join('');
}

// Solved on May  6, 2020.
// Ends with any suffix.
function endsWithAnySuffix(text, suffixes) {
  return suffixes.some(suffix => text.endsWith(suffix));
}

// Solved on May  7, 2020.
// Surround text.
function surroundText(text, left, right) {
  return left + text + right;
}

// Solved on May  8, 2020.
// Capitalize ascii initial.
function capitalizeAsciiInitial(text) {
  return text.replace(/^[a-z]/, letter => letter.toUpperCase());
}

// Solved on May 11, 2020.
// Partition words by length.
function partitionWordsByLength(words, limit) {
  return partitionValues(words, word => [...word].length <= limit);
}

// Solved on May 14, 2020.
// Entries with defined values.
function entriesWithDefinedValues(object) {
  return Object.entries(object).filter(([, value]) => value !== undefined);
}

// Solved on May 15, 2020.
// Make record from keys.
function makeRecordFromKeys(keys, value) {
  return Object.fromEntries(keys.map(key => [key, value]));
}

// Solved on May 16, 2020.
// Merge records right wins.
function mergeRecordsRightWins(first, second) {
  return { ...first, ...second };
}

// Solved on May 18, 2020.
// Count records matching field.
function countRecordsMatchingField(records, key, value) {
  return records.filter(record => Object.is(record[key], value)).length;
}

// Solved on May 20, 2020.
// Scale matrix.
function scaleMatrix(matrix, factor) {
  return matrix.map(row => row.map(value => value * factor));
}

// Solved on May 21, 2020.
// Matrix anti diagonal.
function matrixAntiDiagonal(matrix) {
  return matrix.map((row, i) => row[matrix.length - 1 - i]);
}

// Solved on May 23, 2020.
// Is square matrix.
function isSquareMatrix(matrix) {
  return matrix.every(row => row.length === matrix.length);
}

// Solved on May 25, 2020.
// Rectangle perimeter.
function rectanglePerimeter(width, height) {
  return 2 * (width + height);
}

// Solved on May 26, 2020.
// Midpoint coordinates.
function midpointCoordinates(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

// Solved on May 29, 2020.
// Seconds from clock parts.
function secondsFromClockParts(hours, minutes, seconds) {
  return hours * 3600 + minutes * 60 + seconds;
}

// Solved on May 30, 2020.
// Temperatures (degrees). Count entries above a limit.
function temperaturesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on June  2, 2020.
// Temperatures (degrees). Keep entries in the inclusive interval.
function temperaturesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on June  3, 2020.
// Temperatures (degrees). Return the minimum through each position.
function temperaturesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on June  3, 2020.
// Temperatures (degrees). Return the largest absolute change, or undefined for fewer than two entries.
function temperaturesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on June  5, 2020.
// Temperatures (degrees). Return the index closest to the target, preferring the first tie.
function temperaturesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on June  7, 2020.
// Temperatures (degrees). Multiply each entry by the factor.
function temperaturesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on June  8, 2020.
// Temperatures (degrees). Find the first entry strictly below the limit.
function temperaturesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on June  9, 2020.
// Temperatures (degrees). Return the population variance, or undefined for empty input.
function temperaturesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on June 12, 2020.
// Readings (reading). Count entries above a limit.
function readingsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on June 13, 2020.
// Readings (reading). Keep entries in the inclusive interval.
function readingsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on June 16, 2020.
// Readings (reading). Return the minimum through each position.
function readingsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on June 16, 2020.
// Readings (reading). Return the largest absolute change, or undefined for fewer than two entries.
function readingsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on June 17, 2020.
// Readings (reading). Return the index closest to the target, preferring the first tie.
function readingsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on June 20, 2020.
// Readings (reading). Multiply each entry by the factor.
function readingsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on June 20, 2020.
// Readings (reading). Find the first entry strictly below the limit.
function readingsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on June 21, 2020.
// Readings (reading). Return the population variance, or undefined for empty input.
function readingsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on June 22, 2020.
// Prices (price). Count entries above a limit.
function pricesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on June 23, 2020.
// Prices (price). Keep entries in the inclusive interval.
function pricesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on June 26, 2020.
// Prices (price). Return the minimum through each position.
function pricesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on June 28, 2020.
// Prices (price). Return the largest absolute change, or undefined for fewer than two entries.
function pricesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on July  1, 2020.
// Prices (price). Return the index closest to the target, preferring the first tie.
function pricesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on July  2, 2020.
// Prices (price). Multiply each entry by the factor.
function pricesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on July  2, 2020.
// Prices (price). Find the first entry strictly below the limit.
function pricesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on July  3, 2020.
// Prices (price). Return the population variance, or undefined for empty input.
function pricesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on July  4, 2020.
// Weights (weight). Count entries above a limit.
function weightsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on July  6, 2020.
// Weights (weight). Keep entries in the inclusive interval.
function weightsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on July 10, 2020.
// Weights (weight). Return the minimum through each position.
function weightsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on July 11, 2020.
// Weights (weight). Return the largest absolute change, or undefined for fewer than two entries.
function weightsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on July 12, 2020.
// Weights (weight). Return the index closest to the target, preferring the first tie.
function weightsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on July 13, 2020.
// Weights (weight). Multiply each entry by the factor.
function weightsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on July 14, 2020.
// Weights (weight). Find the first entry strictly below the limit.
function weightsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on July 15, 2020.
// Weights (weight). Return the population variance, or undefined for empty input.
function weightsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on July 19, 2020.
// Distances (distance). Count entries above a limit.
function distancesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on July 19, 2020.
// Distances (distance). Keep entries in the inclusive interval.
function distancesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on July 19, 2020.
// Distances (distance). Return the minimum through each position.
function distancesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on July 20, 2020.
// Distances (distance). Return the largest absolute change, or undefined for fewer than two entries.
function distancesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on July 20, 2020.
// Distances (distance). Return the index closest to the target, preferring the first tie.
function distancesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on July 21, 2020.
// Distances (distance). Multiply each entry by the factor.
function distancesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on July 22, 2020.
// Distances (distance). Find the first entry strictly below the limit.
function distancesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on July 26, 2020.
// Distances (distance). Return the population variance, or undefined for empty input.
function distancesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on July 27, 2020.
// Durations (duration). Count entries above a limit.
function durationsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on July 28, 2020.
// Durations (duration). Keep entries in the inclusive interval.
function durationsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on July 30, 2020.
// Durations (duration). Return the minimum through each position.
function durationsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on August  1, 2020.
// Durations (duration). Return the largest absolute change, or undefined for fewer than two entries.
function durationsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on August  3, 2020.
// Durations (duration). Return the index closest to the target, preferring the first tie.
function durationsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on August  6, 2020.
// Durations (duration). Multiply each entry by the factor.
function durationsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on August  7, 2020.
// Durations (duration). Find the first entry strictly below the limit.
function durationsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on August  7, 2020.
// Durations (duration). Return the population variance, or undefined for empty input.
function durationsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on August  9, 2020.
// Grades (grade). Count entries above a limit.
function gradesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on August 10, 2020.
// Grades (grade). Keep entries in the inclusive interval.
function gradesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on August 11, 2020.
// Grades (grade). Return the minimum through each position.
function gradesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on August 11, 2020.
// Grades (grade). Return the largest absolute change, or undefined for fewer than two entries.
function gradesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on August 11, 2020.
// Grades (grade). Return the index closest to the target, preferring the first tie.
function gradesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on August 13, 2020.
// Grades (grade). Multiply each entry by the factor.
function gradesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on August 15, 2020.
// Grades (grade). Find the first entry strictly below the limit.
function gradesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on August 18, 2020.
// Grades (grade). Return the population variance, or undefined for empty input.
function gradesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on August 19, 2020.
// Balances (balance). Count entries above a limit.
function balancesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on August 20, 2020.
// Balances (balance). Keep entries in the inclusive interval.
function balancesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on August 22, 2020.
// Balances (balance). Return the minimum through each position.
function balancesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on August 24, 2020.
// Balances (balance). Return the largest absolute change, or undefined for fewer than two entries.
function balancesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on August 27, 2020.
// Balances (balance). Return the index closest to the target, preferring the first tie.
function balancesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on August 29, 2020.
// Balances (balance). Multiply each entry by the factor.
function balancesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on August 30, 2020.
// Balances (balance). Find the first entry strictly below the limit.
function balancesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on August 31, 2020.
// Balances (balance). Return the population variance, or undefined for empty input.
function balancesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on September  3, 2020.
// Speeds (speed). Count entries above a limit.
function speedsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on September  3, 2020.
// Speeds (speed). Keep entries in the inclusive interval.
function speedsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on September  4, 2020.
// Speeds (speed). Return the minimum through each position.
function speedsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on September  5, 2020.
// Speeds (speed). Return the largest absolute change, or undefined for fewer than two entries.
function speedsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on September 10, 2020.
// Speeds (speed). Return the index closest to the target, preferring the first tie.
function speedsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on September 11, 2020.
// Speeds (speed). Multiply each entry by the factor.
function speedsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on September 12, 2020.
// Speeds (speed). Find the first entry strictly below the limit.
function speedsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on September 13, 2020.
// Speeds (speed). Return the population variance, or undefined for empty input.
function speedsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on September 13, 2020.
// Elevations (elevation). Count entries above a limit.
function elevationsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on September 17, 2020.
// Elevations (elevation). Keep entries in the inclusive interval.
function elevationsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on September 18, 2020.
// Elevations (elevation). Return the minimum through each position.
function elevationsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on September 19, 2020.
// Elevations (elevation). Return the largest absolute change, or undefined for fewer than two entries.
function elevationsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on September 20, 2020.
// Elevations (elevation). Return the index closest to the target, preferring the first tie.
function elevationsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on September 23, 2020.
// Elevations (elevation). Multiply each entry by the factor.
function elevationsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on September 24, 2020.
// Elevations (elevation). Find the first entry strictly below the limit.
function elevationsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on September 24, 2020.
// Elevations (elevation). Return the population variance, or undefined for empty input.
function elevationsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on September 25, 2020.
// Counts (count). Count entries above a limit.
function countsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on September 27, 2020.
// Counts (count). Keep entries in the inclusive interval.
function countsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on September 29, 2020.
// Counts (count). Return the minimum through each position.
function countsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on October  1, 2020.
// Counts (count). Return the largest absolute change, or undefined for fewer than two entries.
function countsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on October  2, 2020.
// Counts (count). Return the index closest to the target, preferring the first tie.
function countsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on October  4, 2020.
// Counts (count). Multiply each entry by the factor.
function countsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on October  5, 2020.
// Counts (count). Find the first entry strictly below the limit.
function countsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on October  5, 2020.
// Counts (count). Return the population variance, or undefined for empty input.
function countsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on October  5, 2020.
// Volumes (volume). Count entries above a limit.
function volumesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on October  9, 2020.
// Volumes (volume). Keep entries in the inclusive interval.
function volumesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on October 10, 2020.
// Volumes (volume). Return the minimum through each position.
function volumesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on October 11, 2020.
// Volumes (volume). Return the largest absolute change, or undefined for fewer than two entries.
function volumesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on October 12, 2020.
// Volumes (volume). Return the index closest to the target, preferring the first tie.
function volumesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on October 12, 2020.
// Volumes (volume). Multiply each entry by the factor.
function volumesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on October 13, 2020.
// Volumes (volume). Find the first entry strictly below the limit.
function volumesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on October 14, 2020.
// Volumes (volume). Return the population variance, or undefined for empty input.
function volumesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on October 16, 2020.
// Areas (area). Count entries above a limit.
function areasPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on October 20, 2020.
// Areas (area). Keep entries in the inclusive interval.
function areasPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on October 22, 2020.
// Areas (area). Return the minimum through each position.
function areasPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on October 24, 2020.
// Areas (area). Return the largest absolute change, or undefined for fewer than two entries.
function areasPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on October 25, 2020.
// Areas (area). Return the index closest to the target, preferring the first tie.
function areasPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on October 26, 2020.
// Areas (area). Multiply each entry by the factor.
function areasPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on October 28, 2020.
// Areas (area). Find the first entry strictly below the limit.
function areasPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on October 30, 2020.
// Areas (area). Return the population variance, or undefined for empty input.
function areasPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on November  1, 2020.
// Lengths (length). Count entries above a limit.
function lengthsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on November  3, 2020.
// Lengths (length). Keep entries in the inclusive interval.
function lengthsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on November  4, 2020.
// Lengths (length). Return the minimum through each position.
function lengthsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on November  6, 2020.
// Lengths (length). Return the largest absolute change, or undefined for fewer than two entries.
function lengthsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on November  6, 2020.
// Lengths (length). Return the index closest to the target, preferring the first tie.
function lengthsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on November  7, 2020.
// Lengths (length). Multiply each entry by the factor.
function lengthsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on November  9, 2020.
// Lengths (length). Find the first entry strictly below the limit.
function lengthsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on November 11, 2020.
// Lengths (length). Return the population variance, or undefined for empty input.
function lengthsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on November 14, 2020.
// Ratings (rating). Count entries above a limit.
function ratingsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on November 15, 2020.
// Ratings (rating). Keep entries in the inclusive interval.
function ratingsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on November 17, 2020.
// Ratings (rating). Return the minimum through each position.
function ratingsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on November 20, 2020.
// Ratings (rating). Return the largest absolute change, or undefined for fewer than two entries.
function ratingsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on November 21, 2020.
// Ratings (rating). Return the index closest to the target, preferring the first tie.
function ratingsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on November 22, 2020.
// Ratings (rating). Multiply each entry by the factor.
function ratingsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on November 23, 2020.
// Ratings (rating). Find the first entry strictly below the limit.
function ratingsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on November 25, 2020.
// Ratings (rating). Return the population variance, or undefined for empty input.
function ratingsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on November 27, 2020.
// Capacities (capacity). Count entries above a limit.
function capacitiesPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on November 28, 2020.
// Capacities (capacity). Keep entries in the inclusive interval.
function capacitiesPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on November 30, 2020.
// Capacities (capacity). Return the minimum through each position.
function capacitiesPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on December  2, 2020.
// Capacities (capacity). Return the largest absolute change, or undefined for fewer than two entries.
function capacitiesPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on December  3, 2020.
// Capacities (capacity). Return the index closest to the target, preferring the first tie.
function capacitiesPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on December  4, 2020.
// Capacities (capacity). Multiply each entry by the factor.
function capacitiesPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on December  7, 2020.
// Capacities (capacity). Find the first entry strictly below the limit.
function capacitiesPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on December 10, 2020.
// Capacities (capacity). Return the population variance, or undefined for empty input.
function capacitiesPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on December 10, 2020.
// Heights (height). Count entries above a limit.
function heightsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on December 12, 2020.
// Heights (height). Keep entries in the inclusive interval.
function heightsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on December 12, 2020.
// Heights (height). Return the minimum through each position.
function heightsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on December 13, 2020.
// Heights (height). Return the largest absolute change, or undefined for fewer than two entries.
function heightsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on December 14, 2020.
// Heights (height). Return the index closest to the target, preferring the first tie.
function heightsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on December 16, 2020.
// Heights (height). Multiply each entry by the factor.
function heightsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on December 16, 2020.
// Heights (height). Find the first entry strictly below the limit.
function heightsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on December 17, 2020.
// Heights (height). Return the population variance, or undefined for empty input.
function heightsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on December 17, 2020.
// Depths (depth). Count entries above a limit.
function depthsPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on December 20, 2020.
// Depths (depth). Keep entries in the inclusive interval.
function depthsPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on December 21, 2020.
// Depths (depth). Return the minimum through each position.
function depthsPracticeRunningMinima(values) {
  let minimum = Infinity;
  return values.map(value => (minimum = Math.min(minimum, value)));
}

// Solved on December 22, 2020.
// Depths (depth). Return the largest absolute change, or undefined for fewer than two entries.
function depthsPracticeLargestJump(values) {
  if (values.length < 2) return undefined;
  let largest = 0;
  for (let i = 1; i < values.length; i++) largest = Math.max(largest, Math.abs(values[i] - values[i - 1]));
  return largest;
}

// Solved on December 23, 2020.
// Depths (depth). Return the index closest to the target, preferring the first tie.
function depthsPracticeClosestIndex(values, target) {
  let best = -1;
  for (let i = 0; i < values.length; i++) {
    if (best === -1 || Math.abs(values[i] - target) < Math.abs(values[best] - target)) best = i;
  }
  return best;
}

// Solved on December 27, 2020.
// Depths (depth). Multiply each entry by the factor.
function depthsPracticeScale(values, factor) {
  return values.map(value => value * factor);
}

// Solved on December 27, 2020.
// Depths (depth). Find the first entry strictly below the limit.
function depthsPracticeFindFirstBelow(values, limit) {
  return values.find(value => value < limit);
}

// Solved on December 28, 2020.
// Depths (depth). Return the population variance, or undefined for empty input.
function depthsPracticePopulationVariance(values) {
  if (!values.length) return undefined;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
}

// Solved on December 29, 2020.
// Scores (score). Count entries above a limit.
function scoresPracticeCountAbove(values, limit) {
  return values.reduce((count, value) => count + Number(value > limit), 0);
}

// Solved on December 30, 2020.
// Scores (score). Keep entries in the inclusive interval.
function scoresPracticeSelectWithin(values, minimum, maximum) {
  return values.filter(value => value >= minimum && value <= maximum);
}

// Solved on January  1, 2021.
// Alerts. Return the first record with the given ID.
function alertsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on January  2, 2021.
// Alerts. Return all records except those with the given ID.
function alertsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on January  3, 2021.
// Alerts. Return active record IDs in input order.
function alertsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on January  3, 2021.
// Alerts. Index records by ID, keeping the final record for repeated IDs.
function alertsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on January  5, 2021.
// Alerts. Group records by status while preserving input order.
function alertsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on January  7, 2021.
// Alerts. Count records for each owner.
function alertsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on January  9, 2021.
// Alerts. Sort a copy by descending numeric priority.
function alertsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on January  9, 2021.
// Alerts. Sum priorities for the specified owner.
function alertsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on January 10, 2021.
// Alerts. List distinct tags by first appearance across records.
function alertsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on January 10, 2021.
// Alerts. Return active and inactive records as separate arrays.
function alertsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on January 14, 2021.
// Articles. Return the first record with the given ID.
function articlesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on January 15, 2021.
// Articles. Return all records except those with the given ID.
function articlesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on January 15, 2021.
// Articles. Return active record IDs in input order.
function articlesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on January 16, 2021.
// Articles. Index records by ID, keeping the final record for repeated IDs.
function articlesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on January 17, 2021.
// Articles. Group records by status while preserving input order.
function articlesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on January 19, 2021.
// Articles. Count records for each owner.
function articlesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on January 20, 2021.
// Articles. Sort a copy by descending numeric priority.
function articlesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on January 23, 2021.
// Articles. Sum priorities for the specified owner.
function articlesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on January 24, 2021.
// Articles. List distinct tags by first appearance across records.
function articlesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on January 25, 2021.
// Articles. Return active and inactive records as separate arrays.
function articlesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on January 27, 2021.
// Assets. Return the first record with the given ID.
function assetsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on January 29, 2021.
// Assets. Return all records except those with the given ID.
function assetsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on January 30, 2021.
// Assets. Return active record IDs in input order.
function assetsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on January 30, 2021.
// Assets. Index records by ID, keeping the final record for repeated IDs.
function assetsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on February  1, 2021.
// Assets. Group records by status while preserving input order.
function assetsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on February  2, 2021.
// Assets. Count records for each owner.
function assetsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on February  3, 2021.
// Assets. Sort a copy by descending numeric priority.
function assetsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on February  6, 2021.
// Assets. Sum priorities for the specified owner.
function assetsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on February 10, 2021.
// Assets. List distinct tags by first appearance across records.
function assetsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on February 11, 2021.
// Assets. Return active and inactive records as separate arrays.
function assetsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on February 12, 2021.
// Audits. Return the first record with the given ID.
function auditsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on February 13, 2021.
// Audits. Return all records except those with the given ID.
function auditsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on February 16, 2021.
// Audits. Return active record IDs in input order.
function auditsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on February 18, 2021.
// Audits. Index records by ID, keeping the final record for repeated IDs.
function auditsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on February 19, 2021.
// Audits. Group records by status while preserving input order.
function auditsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on February 21, 2021.
// Audits. Count records for each owner.
function auditsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on February 22, 2021.
// Audits. Sort a copy by descending numeric priority.
function auditsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on February 24, 2021.
// Audits. Sum priorities for the specified owner.
function auditsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on February 26, 2021.
// Audits. List distinct tags by first appearance across records.
function auditsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on February 28, 2021.
// Audits. Return active and inactive records as separate arrays.
function auditsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on February 28, 2021.
// Batches. Return the first record with the given ID.
function batchesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on March  4, 2021.
// Batches. Return all records except those with the given ID.
function batchesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on March  5, 2021.
// Batches. Return active record IDs in input order.
function batchesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on March  6, 2021.
// Batches. Index records by ID, keeping the final record for repeated IDs.
function batchesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on March  7, 2021.
// Batches. Group records by status while preserving input order.
function batchesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on March  9, 2021.
// Batches. Count records for each owner.
function batchesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on March  9, 2021.
// Batches. Sort a copy by descending numeric priority.
function batchesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on March 10, 2021.
// Batches. Sum priorities for the specified owner.
function batchesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on March 12, 2021.
// Batches. List distinct tags by first appearance across records.
function batchesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on March 13, 2021.
// Batches. Return active and inactive records as separate arrays.
function batchesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on March 16, 2021.
// Bookings. Return the first record with the given ID.
function bookingsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on March 17, 2021.
// Bookings. Return all records except those with the given ID.
function bookingsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on March 18, 2021.
// Bookings. Return active record IDs in input order.
function bookingsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on March 19, 2021.
// Bookings. Index records by ID, keeping the final record for repeated IDs.
function bookingsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on March 23, 2021.
// Bookings. Group records by status while preserving input order.
function bookingsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on March 24, 2021.
// Bookings. Count records for each owner.
function bookingsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on March 26, 2021.
// Bookings. Sort a copy by descending numeric priority.
function bookingsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on March 28, 2021.
// Bookings. Sum priorities for the specified owner.
function bookingsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on March 28, 2021.
// Bookings. List distinct tags by first appearance across records.
function bookingsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on March 31, 2021.
// Bookings. Return active and inactive records as separate arrays.
function bookingsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on March 31, 2021.
// Branches. Return the first record with the given ID.
function branchesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on April  1, 2021.
// Branches. Return all records except those with the given ID.
function branchesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on April  2, 2021.
// Branches. Return active record IDs in input order.
function branchesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on April  4, 2021.
// Branches. Index records by ID, keeping the final record for repeated IDs.
function branchesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on April  5, 2021.
// Branches. Group records by status while preserving input order.
function branchesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on April  6, 2021.
// Branches. Count records for each owner.
function branchesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on April  8, 2021.
// Branches. Sort a copy by descending numeric priority.
function branchesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on April 10, 2021.
// Branches. Sum priorities for the specified owner.
function branchesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on April 13, 2021.
// Branches. List distinct tags by first appearance across records.
function branchesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on April 14, 2021.
// Branches. Return active and inactive records as separate arrays.
function branchesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on April 16, 2021.
// Builds. Return the first record with the given ID.
function buildsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on April 17, 2021.
// Builds. Return all records except those with the given ID.
function buildsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on April 20, 2021.
// Builds. Return active record IDs in input order.
function buildsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on April 22, 2021.
// Builds. Index records by ID, keeping the final record for repeated IDs.
function buildsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on April 23, 2021.
// Builds. Group records by status while preserving input order.
function buildsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on April 25, 2021.
// Builds. Count records for each owner.
function buildsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on April 25, 2021.
// Builds. Sort a copy by descending numeric priority.
function buildsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on April 26, 2021.
// Builds. Sum priorities for the specified owner.
function buildsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on April 27, 2021.
// Builds. List distinct tags by first appearance across records.
function buildsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on April 28, 2021.
// Builds. Return active and inactive records as separate arrays.
function buildsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on May  2, 2021.
// Catalogs. Return the first record with the given ID.
function catalogsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on May  3, 2021.
// Catalogs. Return all records except those with the given ID.
function catalogsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on May  5, 2021.
// Catalogs. Return active record IDs in input order.
function catalogsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on May  6, 2021.
// Catalogs. Index records by ID, keeping the final record for repeated IDs.
function catalogsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on May  8, 2021.
// Catalogs. Group records by status while preserving input order.
function catalogsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on May 10, 2021.
// Catalogs. Count records for each owner.
function catalogsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on May 11, 2021.
// Catalogs. Sort a copy by descending numeric priority.
function catalogsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on May 11, 2021.
// Catalogs. Sum priorities for the specified owner.
function catalogsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on May 12, 2021.
// Catalogs. List distinct tags by first appearance across records.
function catalogsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on May 16, 2021.
// Catalogs. Return active and inactive records as separate arrays.
function catalogsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on May 18, 2021.
// Coupons. Return the first record with the given ID.
function couponsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on May 20, 2021.
// Coupons. Return all records except those with the given ID.
function couponsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on May 20, 2021.
// Coupons. Return active record IDs in input order.
function couponsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on May 22, 2021.
// Coupons. Index records by ID, keeping the final record for repeated IDs.
function couponsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on May 23, 2021.
// Coupons. Group records by status while preserving input order.
function couponsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on May 25, 2021.
// Coupons. Count records for each owner.
function couponsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on May 27, 2021.
// Coupons. Sort a copy by descending numeric priority.
function couponsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on May 29, 2021.
// Coupons. Sum priorities for the specified owner.
function couponsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on May 30, 2021.
// Coupons. List distinct tags by first appearance across records.
function couponsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on May 31, 2021.
// Coupons. Return active and inactive records as separate arrays.
function couponsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on May 31, 2021.
// Devices. Return the first record with the given ID.
function devicesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on June  2, 2021.
// Devices. Return all records except those with the given ID.
function devicesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on June  2, 2021.
// Devices. Return active record IDs in input order.
function devicesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on June  3, 2021.
// Devices. Index records by ID, keeping the final record for repeated IDs.
function devicesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on June  6, 2021.
// Devices. Group records by status while preserving input order.
function devicesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on June  8, 2021.
// Devices. Count records for each owner.
function devicesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on June 10, 2021.
// Devices. Sort a copy by descending numeric priority.
function devicesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on June 10, 2021.
// Devices. Sum priorities for the specified owner.
function devicesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on June 11, 2021.
// Devices. List distinct tags by first appearance across records.
function devicesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on June 13, 2021.
// Devices. Return active and inactive records as separate arrays.
function devicesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on June 14, 2021.
// Documents. Return the first record with the given ID.
function documentsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on June 15, 2021.
// Documents. Return all records except those with the given ID.
function documentsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on June 16, 2021.
// Documents. Return active record IDs in input order.
function documentsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on June 17, 2021.
// Documents. Index records by ID, keeping the final record for repeated IDs.
function documentsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on June 21, 2021.
// Documents. Group records by status while preserving input order.
function documentsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on June 22, 2021.
// Documents. Count records for each owner.
function documentsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on June 22, 2021.
// Documents. Sort a copy by descending numeric priority.
function documentsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on June 24, 2021.
// Documents. Sum priorities for the specified owner.
function documentsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on June 27, 2021.
// Documents. List distinct tags by first appearance across records.
function documentsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on June 29, 2021.
// Documents. Return active and inactive records as separate arrays.
function documentsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on June 30, 2021.
// Exports. Return the first record with the given ID.
function exportsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on June 30, 2021.
// Exports. Return all records except those with the given ID.
function exportsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on July  2, 2021.
// Exports. Return active record IDs in input order.
function exportsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on July  4, 2021.
// Exports. Index records by ID, keeping the final record for repeated IDs.
function exportsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on July  6, 2021.
// Exports. Group records by status while preserving input order.
function exportsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on July  8, 2021.
// Exports. Count records for each owner.
function exportsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on July  9, 2021.
// Exports. Sort a copy by descending numeric priority.
function exportsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on July  9, 2021.
// Exports. Sum priorities for the specified owner.
function exportsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on July 11, 2021.
// Exports. List distinct tags by first appearance across records.
function exportsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on July 12, 2021.
// Exports. Return active and inactive records as separate arrays.
function exportsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on July 12, 2021.
// Feeds. Return the first record with the given ID.
function feedsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on July 13, 2021.
// Feeds. Return all records except those with the given ID.
function feedsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on July 16, 2021.
// Feeds. Return active record IDs in input order.
function feedsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on July 18, 2021.
// Feeds. Index records by ID, keeping the final record for repeated IDs.
function feedsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on July 19, 2021.
// Feeds. Group records by status while preserving input order.
function feedsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on July 20, 2021.
// Feeds. Count records for each owner.
function feedsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on July 23, 2021.
// Feeds. Sort a copy by descending numeric priority.
function feedsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on July 24, 2021.
// Feeds. Sum priorities for the specified owner.
function feedsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on July 29, 2021.
// Feeds. List distinct tags by first appearance across records.
function feedsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on July 30, 2021.
// Feeds. Return active and inactive records as separate arrays.
function feedsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on July 31, 2021.
// Files. Return the first record with the given ID.
function filesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on August  1, 2021.
// Files. Return all records except those with the given ID.
function filesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on August  2, 2021.
// Files. Return active record IDs in input order.
function filesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on August  3, 2021.
// Files. Index records by ID, keeping the final record for repeated IDs.
function filesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on August  4, 2021.
// Files. Group records by status while preserving input order.
function filesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on August  7, 2021.
// Files. Count records for each owner.
function filesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on August  9, 2021.
// Files. Sort a copy by descending numeric priority.
function filesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on August 12, 2021.
// Files. Sum priorities for the specified owner.
function filesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on August 14, 2021.
// Files. List distinct tags by first appearance across records.
function filesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on August 15, 2021.
// Files. Return active and inactive records as separate arrays.
function filesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on August 16, 2021.
// Imports. Return the first record with the given ID.
function importsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on August 17, 2021.
// Imports. Return all records except those with the given ID.
function importsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on August 18, 2021.
// Imports. Return active record IDs in input order.
function importsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on August 19, 2021.
// Imports. Index records by ID, keeping the final record for repeated IDs.
function importsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on August 24, 2021.
// Imports. Group records by status while preserving input order.
function importsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on August 25, 2021.
// Imports. Count records for each owner.
function importsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on August 25, 2021.
// Imports. Sort a copy by descending numeric priority.
function importsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on August 27, 2021.
// Imports. Sum priorities for the specified owner.
function importsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on August 27, 2021.
// Imports. List distinct tags by first appearance across records.
function importsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on August 29, 2021.
// Imports. Return active and inactive records as separate arrays.
function importsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on August 30, 2021.
// Incidents. Return the first record with the given ID.
function incidentsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on September  1, 2021.
// Incidents. Return all records except those with the given ID.
function incidentsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on September  4, 2021.
// Incidents. Return active record IDs in input order.
function incidentsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on September  5, 2021.
// Incidents. Index records by ID, keeping the final record for repeated IDs.
function incidentsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on September  7, 2021.
// Incidents. Group records by status while preserving input order.
function incidentsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on September  8, 2021.
// Incidents. Count records for each owner.
function incidentsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on September  9, 2021.
// Incidents. Sort a copy by descending numeric priority.
function incidentsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on September 11, 2021.
// Incidents. Sum priorities for the specified owner.
function incidentsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on September 13, 2021.
// Incidents. List distinct tags by first appearance across records.
function incidentsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on September 15, 2021.
// Incidents. Return active and inactive records as separate arrays.
function incidentsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on September 17, 2021.
// Jobs. Return the first record with the given ID.
function jobsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on September 19, 2021.
// Jobs. Return all records except those with the given ID.
function jobsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on September 20, 2021.
// Jobs. Return active record IDs in input order.
function jobsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on September 22, 2021.
// Jobs. Index records by ID, keeping the final record for repeated IDs.
function jobsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on September 22, 2021.
// Jobs. Group records by status while preserving input order.
function jobsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on September 24, 2021.
// Jobs. Count records for each owner.
function jobsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on September 25, 2021.
// Jobs. Sort a copy by descending numeric priority.
function jobsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on September 29, 2021.
// Jobs. Sum priorities for the specified owner.
function jobsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on September 30, 2021.
// Jobs. List distinct tags by first appearance across records.
function jobsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on October  2, 2021.
// Jobs. Return active and inactive records as separate arrays.
function jobsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on October  3, 2021.
// Messages. Return the first record with the given ID.
function messagesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on October  4, 2021.
// Messages. Return all records except those with the given ID.
function messagesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on October  5, 2021.
// Messages. Return active record IDs in input order.
function messagesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on October  7, 2021.
// Messages. Index records by ID, keeping the final record for repeated IDs.
function messagesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on October  7, 2021.
// Messages. Group records by status while preserving input order.
function messagesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on October  9, 2021.
// Messages. Count records for each owner.
function messagesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on October 12, 2021.
// Messages. Sort a copy by descending numeric priority.
function messagesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on October 12, 2021.
// Messages. Sum priorities for the specified owner.
function messagesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on October 13, 2021.
// Messages. List distinct tags by first appearance across records.
function messagesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on October 14, 2021.
// Messages. Return active and inactive records as separate arrays.
function messagesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on October 15, 2021.
// Notifications. Return the first record with the given ID.
function notificationsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on October 18, 2021.
// Notifications. Return all records except those with the given ID.
function notificationsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on October 20, 2021.
// Notifications. Return active record IDs in input order.
function notificationsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on October 21, 2021.
// Notifications. Index records by ID, keeping the final record for repeated IDs.
function notificationsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on October 23, 2021.
// Notifications. Group records by status while preserving input order.
function notificationsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on October 26, 2021.
// Notifications. Count records for each owner.
function notificationsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on October 27, 2021.
// Notifications. Sort a copy by descending numeric priority.
function notificationsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on October 29, 2021.
// Notifications. Sum priorities for the specified owner.
function notificationsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on October 31, 2021.
// Notifications. List distinct tags by first appearance across records.
function notificationsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on November  1, 2021.
// Notifications. Return active and inactive records as separate arrays.
function notificationsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on November  2, 2021.
// Packages. Return the first record with the given ID.
function packagesPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on November  3, 2021.
// Packages. Return all records except those with the given ID.
function packagesPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on November  6, 2021.
// Packages. Return active record IDs in input order.
function packagesPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on November  8, 2021.
// Packages. Index records by ID, keeping the final record for repeated IDs.
function packagesPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on November  9, 2021.
// Packages. Group records by status while preserving input order.
function packagesPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on November 12, 2021.
// Packages. Count records for each owner.
function packagesPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on November 14, 2021.
// Packages. Sort a copy by descending numeric priority.
function packagesPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on November 16, 2021.
// Packages. Sum priorities for the specified owner.
function packagesPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on November 17, 2021.
// Packages. List distinct tags by first appearance across records.
function packagesPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on November 18, 2021.
// Packages. Return active and inactive records as separate arrays.
function packagesPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on November 20, 2021.
// Payments. Return the first record with the given ID.
function paymentsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on November 22, 2021.
// Payments. Return all records except those with the given ID.
function paymentsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on November 23, 2021.
// Payments. Return active record IDs in input order.
function paymentsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on November 26, 2021.
// Payments. Index records by ID, keeping the final record for repeated IDs.
function paymentsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on November 26, 2021.
// Payments. Group records by status while preserving input order.
function paymentsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on November 26, 2021.
// Payments. Count records for each owner.
function paymentsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on November 27, 2021.
// Payments. Sort a copy by descending numeric priority.
function paymentsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on November 29, 2021.
// Payments. Sum priorities for the specified owner.
function paymentsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on November 30, 2021.
// Payments. List distinct tags by first appearance across records.
function paymentsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on November 30, 2021.
// Payments. Return active and inactive records as separate arrays.
function paymentsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on December  1, 2021.
// Reports. Return the first record with the given ID.
function reportsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on December  3, 2021.
// Reports. Return all records except those with the given ID.
function reportsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on December  7, 2021.
// Reports. Return active record IDs in input order.
function reportsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on December  8, 2021.
// Reports. Index records by ID, keeping the final record for repeated IDs.
function reportsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on December  9, 2021.
// Reports. Group records by status while preserving input order.
function reportsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on December  9, 2021.
// Reports. Count records for each owner.
function reportsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on December 11, 2021.
// Reports. Sort a copy by descending numeric priority.
function reportsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on December 14, 2021.
// Reports. Sum priorities for the specified owner.
function reportsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on December 15, 2021.
// Reports. List distinct tags by first appearance across records.
function reportsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on December 17, 2021.
// Reports. Return active and inactive records as separate arrays.
function reportsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on December 19, 2021.
// Subscriptions. Return the first record with the given ID.
function subscriptionsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on December 19, 2021.
// Subscriptions. Return all records except those with the given ID.
function subscriptionsPracticeWithoutId(records, id) {
  return records.filter(record => record.id !== id);
}

// Solved on December 20, 2021.
// Subscriptions. Return active record IDs in input order.
function subscriptionsPracticeActiveIds(records) {
  return records.filter(record => record.active).map(record => record.id);
}

// Solved on December 21, 2021.
// Subscriptions. Index records by ID, keeping the final record for repeated IDs.
function subscriptionsPracticeIndexById(records) {
  return new Map(records.map(record => [record.id, record]));
}

// Solved on December 22, 2021.
// Subscriptions. Group records by status while preserving input order.
function subscriptionsPracticeGroupByStatus(records) {
  const groups = new Map();
  for (const record of records) {
    const status = record.status;
    if (!groups.has(status)) groups.set(status, []);
    groups.get(status).push(record);
  }
  return groups;
}

// Solved on December 23, 2021.
// Subscriptions. Count records for each owner.
function subscriptionsPracticeCountByOwner(records) {
  const counts = new Map();
  for (const record of records) {
    const owner = record.owner;
    counts.set(owner, (counts.get(owner) ?? 0) + 1);
  }
  return counts;
}

// Solved on December 23, 2021.
// Subscriptions. Sort a copy by descending numeric priority.
function subscriptionsPracticeSortByPriority(records) {
  return [...records].sort((a, b) => b.priority - a.priority);
}

// Solved on December 27, 2021.
// Subscriptions. Sum priorities for the specified owner.
function subscriptionsPracticeTotalPriorityForOwner(records, owner) {
  return records.reduce((total, record) => record.owner === owner ? total + record.priority : total, 0);
}

// Solved on December 28, 2021.
// Subscriptions. List distinct tags by first appearance across records.
function subscriptionsPracticeUniqueTags(records) {
  return [...new Set(records.flatMap(record => record.tags ?? []))];
}

// Solved on December 29, 2021.
// Subscriptions. Return active and inactive records as separate arrays.
function subscriptionsPracticePartitionByActivity(records) {
  const active = [];
  const inactive = [];
  for (const record of records) (record.active ? active : inactive).push(record);
  return [active, inactive];
}

// Solved on December 30, 2021.
// Uploads. Return the first record with the given ID.
function uploadsPracticeFindById(records, id) {
  return records.find(record => record.id === id);
}

// Solved on January  1, 2022.
// Practice with temperatures. Sum every amount.
function temperaturesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on January  2, 2022.
// Practice with temperatures. Count positive amounts.
function temperaturesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on January  2, 2022.
// Practice with temperatures. Keep amounts strictly above the threshold.
function temperaturesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on January  3, 2022.
// Practice with temperatures. Return distinct amounts in ascending order.
function temperaturesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on January  4, 2022.
// Practice with temperatures. Return a cumulative total at each position.
function temperaturesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on January  5, 2022.
// Practice with temperatures. Find the median, or undefined for an empty array.
function temperaturesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on January  9, 2022.
// Practice with temperatures. Find the difference between consecutive amounts.
function temperaturesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on January 11, 2022.
// Practice with temperatures. Clamp each amount to the inclusive range.
function temperaturesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on January 12, 2022.
// Practice with temperatures. Map each amount to its occurrence count.
function temperaturesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on January 13, 2022.
// Practice with temperatures. Return the mean absolute amount, or undefined for an empty array.
function temperaturesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on January 14, 2022.
// Practice with rainfall. Sum every amount.
function rainfallExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on January 19, 2022.
// Practice with rainfall. Count positive amounts.
function rainfallExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on January 20, 2022.
// Practice with rainfall. Keep amounts strictly above the threshold.
function rainfallExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on January 22, 2022.
// Practice with rainfall. Return distinct amounts in ascending order.
function rainfallExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on January 23, 2022.
// Practice with rainfall. Return a cumulative total at each position.
function rainfallExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on January 24, 2022.
// Practice with rainfall. Find the median, or undefined for an empty array.
function rainfallExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on January 24, 2022.
// Practice with rainfall. Find the difference between consecutive amounts.
function rainfallExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on January 25, 2022.
// Practice with rainfall. Clamp each amount to the inclusive range.
function rainfallExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on January 27, 2022.
// Practice with rainfall. Map each amount to its occurrence count.
function rainfallExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on January 30, 2022.
// Practice with rainfall. Return the mean absolute amount, or undefined for an empty array.
function rainfallExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on January 31, 2022.
// Practice with wind speeds. Sum every amount.
function windSpeedsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on February  4, 2022.
// Practice with wind speeds. Count positive amounts.
function windSpeedsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on February  5, 2022.
// Practice with wind speeds. Keep amounts strictly above the threshold.
function windSpeedsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on February  6, 2022.
// Practice with wind speeds. Return distinct amounts in ascending order.
function windSpeedsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on February 10, 2022.
// Practice with wind speeds. Return a cumulative total at each position.
function windSpeedsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on February 11, 2022.
// Practice with wind speeds. Find the median, or undefined for an empty array.
function windSpeedsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on February 12, 2022.
// Practice with wind speeds. Find the difference between consecutive amounts.
function windSpeedsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on February 13, 2022.
// Practice with wind speeds. Clamp each amount to the inclusive range.
function windSpeedsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on February 14, 2022.
// Practice with wind speeds. Map each amount to its occurrence count.
function windSpeedsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on February 18, 2022.
// Practice with wind speeds. Return the mean absolute amount, or undefined for an empty array.
function windSpeedsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on February 18, 2022.
// Practice with energy readings. Sum every amount.
function energyReadingsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on February 19, 2022.
// Practice with energy readings. Count positive amounts.
function energyReadingsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on February 20, 2022.
// Practice with energy readings. Keep amounts strictly above the threshold.
function energyReadingsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on February 22, 2022.
// Practice with energy readings. Return distinct amounts in ascending order.
function energyReadingsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on February 24, 2022.
// Practice with energy readings. Return a cumulative total at each position.
function energyReadingsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on February 25, 2022.
// Practice with energy readings. Find the median, or undefined for an empty array.
function energyReadingsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on February 26, 2022.
// Practice with energy readings. Find the difference between consecutive amounts.
function energyReadingsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on March  1, 2022.
// Practice with energy readings. Clamp each amount to the inclusive range.
function energyReadingsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on March  2, 2022.
// Practice with energy readings. Map each amount to its occurrence count.
function energyReadingsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on March  4, 2022.
// Practice with energy readings. Return the mean absolute amount, or undefined for an empty array.
function energyReadingsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on March  5, 2022.
// Practice with garden heights. Sum every amount.
function gardenHeightsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on March  5, 2022.
// Practice with garden heights. Count positive amounts.
function gardenHeightsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on March  7, 2022.
// Practice with garden heights. Keep amounts strictly above the threshold.
function gardenHeightsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on March  8, 2022.
// Practice with garden heights. Return distinct amounts in ascending order.
function gardenHeightsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on March  9, 2022.
// Practice with garden heights. Return a cumulative total at each position.
function gardenHeightsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on March 11, 2022.
// Practice with garden heights. Find the median, or undefined for an empty array.
function gardenHeightsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on March 15, 2022.
// Practice with garden heights. Find the difference between consecutive amounts.
function gardenHeightsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on March 17, 2022.
// Practice with garden heights. Clamp each amount to the inclusive range.
function gardenHeightsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on March 18, 2022.
// Practice with garden heights. Map each amount to its occurrence count.
function gardenHeightsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on March 20, 2022.
// Practice with garden heights. Return the mean absolute amount, or undefined for an empty array.
function gardenHeightsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on March 22, 2022.
// Practice with shipment weights. Sum every amount.
function shipmentWeightsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on March 24, 2022.
// Practice with shipment weights. Count positive amounts.
function shipmentWeightsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on March 25, 2022.
// Practice with shipment weights. Keep amounts strictly above the threshold.
function shipmentWeightsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on March 26, 2022.
// Practice with shipment weights. Return distinct amounts in ascending order.
function shipmentWeightsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on March 29, 2022.
// Practice with shipment weights. Return a cumulative total at each position.
function shipmentWeightsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on March 30, 2022.
// Practice with shipment weights. Find the median, or undefined for an empty array.
function shipmentWeightsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on April  2, 2022.
// Practice with shipment weights. Find the difference between consecutive amounts.
function shipmentWeightsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on April  3, 2022.
// Practice with shipment weights. Clamp each amount to the inclusive range.
function shipmentWeightsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on April  7, 2022.
// Practice with shipment weights. Map each amount to its occurrence count.
function shipmentWeightsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on April  8, 2022.
// Practice with shipment weights. Return the mean absolute amount, or undefined for an empty array.
function shipmentWeightsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on April  9, 2022.
// Practice with travel distances. Sum every amount.
function travelDistancesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on April 10, 2022.
// Practice with travel distances. Count positive amounts.
function travelDistancesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on April 10, 2022.
// Practice with travel distances. Keep amounts strictly above the threshold.
function travelDistancesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on April 11, 2022.
// Practice with travel distances. Return distinct amounts in ascending order.
function travelDistancesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on April 11, 2022.
// Practice with travel distances. Return a cumulative total at each position.
function travelDistancesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on April 12, 2022.
// Practice with travel distances. Find the median, or undefined for an empty array.
function travelDistancesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on April 12, 2022.
// Practice with travel distances. Find the difference between consecutive amounts.
function travelDistancesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on April 14, 2022.
// Practice with travel distances. Clamp each amount to the inclusive range.
function travelDistancesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on April 15, 2022.
// Practice with travel distances. Map each amount to its occurrence count.
function travelDistancesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on April 18, 2022.
// Practice with travel distances. Return the mean absolute amount, or undefined for an empty array.
function travelDistancesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on April 19, 2022.
// Practice with sound levels. Sum every amount.
function soundLevelsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on April 21, 2022.
// Practice with sound levels. Count positive amounts.
function soundLevelsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on April 24, 2022.
// Practice with sound levels. Keep amounts strictly above the threshold.
function soundLevelsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on April 25, 2022.
// Practice with sound levels. Return distinct amounts in ascending order.
function soundLevelsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on April 25, 2022.
// Practice with sound levels. Return a cumulative total at each position.
function soundLevelsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on April 27, 2022.
// Practice with sound levels. Find the median, or undefined for an empty array.
function soundLevelsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on April 28, 2022.
// Practice with sound levels. Find the difference between consecutive amounts.
function soundLevelsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on April 28, 2022.
// Practice with sound levels. Clamp each amount to the inclusive range.
function soundLevelsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on May  1, 2022.
// Practice with sound levels. Map each amount to its occurrence count.
function soundLevelsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on May  2, 2022.
// Practice with sound levels. Return the mean absolute amount, or undefined for an empty array.
function soundLevelsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on May  3, 2022.
// Practice with battery readings. Sum every amount.
function batteryReadingsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on May  6, 2022.
// Practice with battery readings. Count positive amounts.
function batteryReadingsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on May  7, 2022.
// Practice with battery readings. Keep amounts strictly above the threshold.
function batteryReadingsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on May  9, 2022.
// Practice with battery readings. Return distinct amounts in ascending order.
function batteryReadingsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on May 11, 2022.
// Practice with battery readings. Return a cumulative total at each position.
function batteryReadingsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on May 11, 2022.
// Practice with battery readings. Find the median, or undefined for an empty array.
function batteryReadingsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on May 11, 2022.
// Practice with battery readings. Find the difference between consecutive amounts.
function batteryReadingsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on May 12, 2022.
// Practice with battery readings. Clamp each amount to the inclusive range.
function batteryReadingsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on May 14, 2022.
// Practice with battery readings. Map each amount to its occurrence count.
function batteryReadingsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on May 16, 2022.
// Practice with battery readings. Return the mean absolute amount, or undefined for an empty array.
function batteryReadingsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on May 18, 2022.
// Practice with course scores. Sum every amount.
function courseScoresExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on May 19, 2022.
// Practice with course scores. Count positive amounts.
function courseScoresExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on May 21, 2022.
// Practice with course scores. Keep amounts strictly above the threshold.
function courseScoresExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on May 21, 2022.
// Practice with course scores. Return distinct amounts in ascending order.
function courseScoresExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on May 23, 2022.
// Practice with course scores. Return a cumulative total at each position.
function courseScoresExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on May 23, 2022.
// Practice with course scores. Find the median, or undefined for an empty array.
function courseScoresExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on May 24, 2022.
// Practice with course scores. Find the difference between consecutive amounts.
function courseScoresExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on May 25, 2022.
// Practice with course scores. Clamp each amount to the inclusive range.
function courseScoresExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on May 29, 2022.
// Practice with course scores. Map each amount to its occurrence count.
function courseScoresExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on May 31, 2022.
// Practice with course scores. Return the mean absolute amount, or undefined for an empty array.
function courseScoresExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on June  1, 2022.
// Practice with serving sizes. Sum every amount.
function servingSizesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on June  2, 2022.
// Practice with serving sizes. Count positive amounts.
function servingSizesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on June  3, 2022.
// Practice with serving sizes. Keep amounts strictly above the threshold.
function servingSizesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on June  6, 2022.
// Practice with serving sizes. Return distinct amounts in ascending order.
function servingSizesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on June  7, 2022.
// Practice with serving sizes. Return a cumulative total at each position.
function servingSizesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on June 10, 2022.
// Practice with serving sizes. Find the median, or undefined for an empty array.
function servingSizesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on June 12, 2022.
// Practice with serving sizes. Find the difference between consecutive amounts.
function servingSizesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on June 12, 2022.
// Practice with serving sizes. Clamp each amount to the inclusive range.
function servingSizesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on June 14, 2022.
// Practice with serving sizes. Map each amount to its occurrence count.
function servingSizesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on June 15, 2022.
// Practice with serving sizes. Return the mean absolute amount, or undefined for an empty array.
function servingSizesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on June 15, 2022.
// Practice with item prices. Sum every amount.
function itemPricesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on June 16, 2022.
// Practice with item prices. Count positive amounts.
function itemPricesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on June 18, 2022.
// Practice with item prices. Keep amounts strictly above the threshold.
function itemPricesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on June 20, 2022.
// Practice with item prices. Return distinct amounts in ascending order.
function itemPricesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on June 21, 2022.
// Practice with item prices. Return a cumulative total at each position.
function itemPricesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on June 22, 2022.
// Practice with item prices. Find the median, or undefined for an empty array.
function itemPricesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on June 23, 2022.
// Practice with item prices. Find the difference between consecutive amounts.
function itemPricesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on June 29, 2022.
// Practice with item prices. Clamp each amount to the inclusive range.
function itemPricesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on June 30, 2022.
// Practice with item prices. Map each amount to its occurrence count.
function itemPricesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on July  2, 2022.
// Practice with item prices. Return the mean absolute amount, or undefined for an empty array.
function itemPricesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on July  3, 2022.
// Practice with session lengths. Sum every amount.
function sessionLengthsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on July  3, 2022.
// Practice with session lengths. Count positive amounts.
function sessionLengthsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on July  4, 2022.
// Practice with session lengths. Keep amounts strictly above the threshold.
function sessionLengthsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on July  4, 2022.
// Practice with session lengths. Return distinct amounts in ascending order.
function sessionLengthsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on July  5, 2022.
// Practice with session lengths. Return a cumulative total at each position.
function sessionLengthsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on July  6, 2022.
// Practice with session lengths. Find the median, or undefined for an empty array.
function sessionLengthsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on July  7, 2022.
// Practice with session lengths. Find the difference between consecutive amounts.
function sessionLengthsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on July 11, 2022.
// Practice with session lengths. Clamp each amount to the inclusive range.
function sessionLengthsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on July 14, 2022.
// Practice with session lengths. Map each amount to its occurrence count.
function sessionLengthsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on July 15, 2022.
// Practice with session lengths. Return the mean absolute amount, or undefined for an empty array.
function sessionLengthsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on July 16, 2022.
// Practice with screen widths. Sum every amount.
function screenWidthsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on July 16, 2022.
// Practice with screen widths. Count positive amounts.
function screenWidthsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on July 21, 2022.
// Practice with screen widths. Keep amounts strictly above the threshold.
function screenWidthsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on July 22, 2022.
// Practice with screen widths. Return distinct amounts in ascending order.
function screenWidthsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on July 23, 2022.
// Practice with screen widths. Return a cumulative total at each position.
function screenWidthsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on July 24, 2022.
// Practice with screen widths. Find the median, or undefined for an empty array.
function screenWidthsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on July 25, 2022.
// Practice with screen widths. Find the difference between consecutive amounts.
function screenWidthsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on July 26, 2022.
// Practice with screen widths. Clamp each amount to the inclusive range.
function screenWidthsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on July 29, 2022.
// Practice with screen widths. Map each amount to its occurrence count.
function screenWidthsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on July 31, 2022.
// Practice with screen widths. Return the mean absolute amount, or undefined for an empty array.
function screenWidthsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on July 31, 2022.
// Practice with engine readings. Sum every amount.
function engineReadingsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on August  1, 2022.
// Practice with engine readings. Count positive amounts.
function engineReadingsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on August  2, 2022.
// Practice with engine readings. Keep amounts strictly above the threshold.
function engineReadingsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on August  6, 2022.
// Practice with engine readings. Return distinct amounts in ascending order.
function engineReadingsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on August  7, 2022.
// Practice with engine readings. Return a cumulative total at each position.
function engineReadingsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on August  8, 2022.
// Practice with engine readings. Find the median, or undefined for an empty array.
function engineReadingsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on August  9, 2022.
// Practice with engine readings. Find the difference between consecutive amounts.
function engineReadingsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on August 10, 2022.
// Practice with engine readings. Clamp each amount to the inclusive range.
function engineReadingsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on August 12, 2022.
// Practice with engine readings. Map each amount to its occurrence count.
function engineReadingsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on August 16, 2022.
// Practice with engine readings. Return the mean absolute amount, or undefined for an empty array.
function engineReadingsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on August 17, 2022.
// Practice with room areas. Sum every amount.
function roomAreasExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on August 19, 2022.
// Practice with room areas. Count positive amounts.
function roomAreasExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on August 19, 2022.
// Practice with room areas. Keep amounts strictly above the threshold.
function roomAreasExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on August 21, 2022.
// Practice with room areas. Return distinct amounts in ascending order.
function roomAreasExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on August 22, 2022.
// Practice with room areas. Return a cumulative total at each position.
function roomAreasExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on August 22, 2022.
// Practice with room areas. Find the median, or undefined for an empty array.
function roomAreasExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on August 25, 2022.
// Practice with room areas. Find the difference between consecutive amounts.
function roomAreasExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on August 27, 2022.
// Practice with room areas. Clamp each amount to the inclusive range.
function roomAreasExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on August 28, 2022.
// Practice with room areas. Map each amount to its occurrence count.
function roomAreasExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on August 29, 2022.
// Practice with room areas. Return the mean absolute amount, or undefined for an empty array.
function roomAreasExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on September  1, 2022.
// Practice with network delays. Sum every amount.
function networkDelaysExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on September  3, 2022.
// Practice with network delays. Count positive amounts.
function networkDelaysExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on September  3, 2022.
// Practice with network delays. Keep amounts strictly above the threshold.
function networkDelaysExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on September  4, 2022.
// Practice with network delays. Return distinct amounts in ascending order.
function networkDelaysExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on September  5, 2022.
// Practice with network delays. Return a cumulative total at each position.
function networkDelaysExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on September  8, 2022.
// Practice with network delays. Find the median, or undefined for an empty array.
function networkDelaysExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on September  9, 2022.
// Practice with network delays. Find the difference between consecutive amounts.
function networkDelaysExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on September 11, 2022.
// Practice with network delays. Clamp each amount to the inclusive range.
function networkDelaysExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on September 13, 2022.
// Practice with network delays. Map each amount to its occurrence count.
function networkDelaysExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on September 16, 2022.
// Practice with network delays. Return the mean absolute amount, or undefined for an empty array.
function networkDelaysExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on September 17, 2022.
// Practice with download sizes. Sum every amount.
function downloadSizesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on September 18, 2022.
// Practice with download sizes. Count positive amounts.
function downloadSizesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on September 20, 2022.
// Practice with download sizes. Keep amounts strictly above the threshold.
function downloadSizesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on September 20, 2022.
// Practice with download sizes. Return distinct amounts in ascending order.
function downloadSizesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on September 22, 2022.
// Practice with download sizes. Return a cumulative total at each position.
function downloadSizesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on September 24, 2022.
// Practice with download sizes. Find the median, or undefined for an empty array.
function downloadSizesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on September 25, 2022.
// Practice with download sizes. Find the difference between consecutive amounts.
function downloadSizesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on September 26, 2022.
// Practice with download sizes. Clamp each amount to the inclusive range.
function downloadSizesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on September 27, 2022.
// Practice with download sizes. Map each amount to its occurrence count.
function downloadSizesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on September 29, 2022.
// Practice with download sizes. Return the mean absolute amount, or undefined for an empty array.
function downloadSizesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on September 30, 2022.
// Practice with storage totals. Sum every amount.
function storageTotalsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on October  3, 2022.
// Practice with storage totals. Count positive amounts.
function storageTotalsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on October  3, 2022.
// Practice with storage totals. Keep amounts strictly above the threshold.
function storageTotalsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on October  4, 2022.
// Practice with storage totals. Return distinct amounts in ascending order.
function storageTotalsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on October  6, 2022.
// Practice with storage totals. Return a cumulative total at each position.
function storageTotalsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on October  8, 2022.
// Practice with storage totals. Find the median, or undefined for an empty array.
function storageTotalsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on October 13, 2022.
// Practice with storage totals. Find the difference between consecutive amounts.
function storageTotalsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on October 14, 2022.
// Practice with storage totals. Clamp each amount to the inclusive range.
function storageTotalsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on October 15, 2022.
// Practice with storage totals. Map each amount to its occurrence count.
function storageTotalsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on October 16, 2022.
// Practice with storage totals. Return the mean absolute amount, or undefined for an empty array.
function storageTotalsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on October 17, 2022.
// Practice with page counts. Sum every amount.
function pageCountsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on October 18, 2022.
// Practice with page counts. Count positive amounts.
function pageCountsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on October 21, 2022.
// Practice with page counts. Keep amounts strictly above the threshold.
function pageCountsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on October 21, 2022.
// Practice with page counts. Return distinct amounts in ascending order.
function pageCountsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on October 23, 2022.
// Practice with page counts. Return a cumulative total at each position.
function pageCountsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on October 26, 2022.
// Practice with page counts. Find the median, or undefined for an empty array.
function pageCountsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on October 28, 2022.
// Practice with page counts. Find the difference between consecutive amounts.
function pageCountsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on October 29, 2022.
// Practice with page counts. Clamp each amount to the inclusive range.
function pageCountsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on October 30, 2022.
// Practice with page counts. Map each amount to its occurrence count.
function pageCountsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on November  1, 2022.
// Practice with page counts. Return the mean absolute amount, or undefined for an empty array.
function pageCountsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on November  2, 2022.
// Practice with cycle times. Sum every amount.
function cycleTimesExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on November  5, 2022.
// Practice with cycle times. Count positive amounts.
function cycleTimesExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on November  6, 2022.
// Practice with cycle times. Keep amounts strictly above the threshold.
function cycleTimesExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on November  6, 2022.
// Practice with cycle times. Return distinct amounts in ascending order.
function cycleTimesExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on November  8, 2022.
// Practice with cycle times. Return a cumulative total at each position.
function cycleTimesExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on November 10, 2022.
// Practice with cycle times. Find the median, or undefined for an empty array.
function cycleTimesExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on November 12, 2022.
// Practice with cycle times. Find the difference between consecutive amounts.
function cycleTimesExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on November 13, 2022.
// Practice with cycle times. Clamp each amount to the inclusive range.
function cycleTimesExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on November 14, 2022.
// Practice with cycle times. Map each amount to its occurrence count.
function cycleTimesExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on November 15, 2022.
// Practice with cycle times. Return the mean absolute amount, or undefined for an empty array.
function cycleTimesExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on November 19, 2022.
// Practice with event budgets. Sum every amount.
function eventBudgetsExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on November 20, 2022.
// Practice with event budgets. Count positive amounts.
function eventBudgetsExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on November 22, 2022.
// Practice with event budgets. Keep amounts strictly above the threshold.
function eventBudgetsExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on November 23, 2022.
// Practice with event budgets. Return distinct amounts in ascending order.
function eventBudgetsExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on November 24, 2022.
// Practice with event budgets. Return a cumulative total at each position.
function eventBudgetsExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on November 26, 2022.
// Practice with event budgets. Find the median, or undefined for an empty array.
function eventBudgetsExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on November 30, 2022.
// Practice with event budgets. Find the difference between consecutive amounts.
function eventBudgetsExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on December  2, 2022.
// Practice with event budgets. Clamp each amount to the inclusive range.
function eventBudgetsExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on December  3, 2022.
// Practice with event budgets. Map each amount to its occurrence count.
function eventBudgetsExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on December  4, 2022.
// Practice with event budgets. Return the mean absolute amount, or undefined for an empty array.
function eventBudgetsExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on December  5, 2022.
// Practice with water usage. Sum every amount.
function waterUsageExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on December  5, 2022.
// Practice with water usage. Count positive amounts.
function waterUsageExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on December  5, 2022.
// Practice with water usage. Keep amounts strictly above the threshold.
function waterUsageExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on December  7, 2022.
// Practice with water usage. Return distinct amounts in ascending order.
function waterUsageExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on December  7, 2022.
// Practice with water usage. Return a cumulative total at each position.
function waterUsageExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on December  8, 2022.
// Practice with water usage. Find the median, or undefined for an empty array.
function waterUsageExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on December 10, 2022.
// Practice with water usage. Find the difference between consecutive amounts.
function waterUsageExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on December 10, 2022.
// Practice with water usage. Clamp each amount to the inclusive range.
function waterUsageExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on December 12, 2022.
// Practice with water usage. Map each amount to its occurrence count.
function waterUsageExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on December 13, 2022.
// Practice with water usage. Return the mean absolute amount, or undefined for an empty array.
function waterUsageExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on December 14, 2022.
// Practice with shop revenue. Sum every amount.
function shopRevenueExerciseTotal(values) {
  return values.reduce((sum, value) => sum + value, 0);
}

// Solved on December 17, 2022.
// Practice with shop revenue. Count positive amounts.
function shopRevenueExercisePositiveCount(values) {
  return values.filter(value => value > 0).length;
}

// Solved on December 19, 2022.
// Practice with shop revenue. Keep amounts strictly above the threshold.
function shopRevenueExerciseAbove(values, threshold) {
  return values.filter(value => value > threshold);
}

// Solved on December 21, 2022.
// Practice with shop revenue. Return distinct amounts in ascending order.
function shopRevenueExerciseSortedDistinct(values) {
  return [...new Set(values)].sort((a, b) => a - b);
}

// Solved on December 22, 2022.
// Practice with shop revenue. Return a cumulative total at each position.
function shopRevenueExerciseRunningTotals(values) {
  let total = 0;
  return values.map(value => (total += value));
}

// Solved on December 23, 2022.
// Practice with shop revenue. Find the median, or undefined for an empty array.
function shopRevenueExerciseMedian(values) {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Solved on December 27, 2022.
// Practice with shop revenue. Find the difference between consecutive amounts.
function shopRevenueExercisePairDifferences(values) {
  return values.slice(1).map((value, i) => value - values[i]);
}

// Solved on December 28, 2022.
// Practice with shop revenue. Clamp each amount to the inclusive range.
function shopRevenueExerciseClamp(values, minimum, maximum) {
  return values.map(value => Math.min(maximum, Math.max(minimum, value)));
}

// Solved on December 29, 2022.
// Practice with shop revenue. Map each amount to its occurrence count.
function shopRevenueExerciseFrequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
}

// Solved on December 30, 2022.
// Practice with shop revenue. Return the mean absolute amount, or undefined for an empty array.
function shopRevenueExerciseMeanAbsolute(values) {
  return values.length ? values.reduce((sum, x) => sum + Math.abs(x), 0) / values.length : undefined;
}

// Solved on January  1, 2023.
// Product records. Normalize names by trimming and lowercasing.
function productPractice2023NormalizeNames(records) {
  return records.map(record => record.name.trim().toLowerCase());
}

// Solved on January  2, 2023.
// Product records. Check whether any entry has the given status.
function productPractice2023HasStatus(records, key) {
  return records.some(record => record.status === key);
}

// Solved on January  3, 2023.
// Product records. Check whether every entry has the given type.
function productPractice2023AllMatchType(records, key) {
  return records.every(record => record.type === key);
}

// Solved on January  6, 2023.
// Product records. Return the IDs of records whose type matches.
function productPractice2023SelectIds(records, key) {
  return records.filter(record => record.type === key).map(record => record.id);
}

// Solved on January  8, 2023.
// Product records. Build a map from IDs to trimmed names.
function productPractice2023TitlesById(records) {
  return new Map(records.map(record => [record.id, record.name.trim()]));
}

// Solved on January 10, 2023.
// Product records. Sort a copy by descending numeric timestamp.
function productPractice2023NewestFirst(records) {
  return [...records].sort((first, second) => second.timestamp - first.timestamp);
}

// Solved on January 13, 2023.
// Product records. Keep records containing the requested tag.
function productPractice2023Tagged(records, key) {
  return records.filter(record => (record.tags ?? []).includes(key));
}

// Solved on January 13, 2023.
// Product records. List unique types in order of first appearance.
function productPractice2023DistinctTypes(records) {
  return [...new Set(records.map(record => record.type))];
}

// Solved on January 14, 2023.
// Customer records. Normalize names by trimming and lowercasing.
function customerPractice2023NormalizeNames(records) {
  return records.map(record => record.name.trim().toLowerCase());
}

// Solved on January 15, 2023.
// Customer records. Check whether any entry has the given status.
function customerPractice2023HasStatus(records, key) {
  return records.some(record => record.status === key);
}

// Solved on January 17, 2023.
// Customer records. Check whether every entry has the given type.
function customerPractice2023AllMatchType(records, key) {
  return records.every(record => record.type === key);
}

// Solved on January 19, 2023.
// Customer records. Return the IDs of records whose type matches.
function customerPractice2023SelectIds(records, key) {
  return records.filter(record => record.type === key).map(record => record.id);
}

// Solved on January 19, 2023.
// Customer records. Build a map from IDs to trimmed names.
function customerPractice2023TitlesById(records) {
  return new Map(records.map(record => [record.id, record.name.trim()]));
}

// Solved on January 19, 2023.
// Customer records. Sort a copy by descending numeric timestamp.
function customerPractice2023NewestFirst(records) {
  return [...records].sort((first, second) => second.timestamp - first.timestamp);
}

// Solved on January 21, 2023.
// Customer records. Keep records containing the requested tag.
function customerPractice2023Tagged(records, key) {
  return records.filter(record => (record.tags ?? []).includes(key));
}

// Solved on January 22, 2023.
// Customer records. List unique types in order of first appearance.
function customerPractice2023DistinctTypes(records) {
  return [...new Set(records.map(record => record.type))];
}

// Solved on January 23, 2023.
// Shipment records. Normalize names by trimming and lowercasing.
function shipmentPractice2023NormalizeNames(records) {
  return records.map(record => record.name.trim().toLowerCase());
}

// Solved on January 24, 2023.
// Shipment records. Check whether any entry has the given status.
function shipmentPractice2023HasStatus(records, key) {
  return records.some(record => record.status === key);
}

// Solved on January 24, 2023.
// Shipment records. Check whether every entry has the given type.
function shipmentPractice2023AllMatchType(records, key) {
  return records.every(record => record.type === key);
}

// Solved on January 24, 2023.
// Shipment records. Return the IDs of records whose type matches.
function shipmentPractice2023SelectIds(records, key) {
  return records.filter(record => record.type === key).map(record => record.id);
}

// Solved on January 24, 2023.
// Shipment records. Build a map from IDs to trimmed names.
function shipmentPractice2023TitlesById(records) {
  return new Map(records.map(record => [record.id, record.name.trim()]));
}

// Solved on January 24, 2023.
// Shipment records. Sort a copy by descending numeric timestamp.
function shipmentPractice2023NewestFirst(records) {
  return [...records].sort((first, second) => second.timestamp - first.timestamp);
}

// Solved on January 24, 2023.
// Shipment records. Keep records containing the requested tag.
function shipmentPractice2023Tagged(records, key) {
  return records.filter(record => (record.tags ?? []).includes(key));
}
