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
