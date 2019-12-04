console.log(value);
const value = 12;
// ⬇️
setTimeout(() => console.log(value), 10);
var value = 12;
// ⬇️
setTimeout(() => console.log(value++), 10);
const value = 12;
// ⬇️
const value = "12";
console.log(+value);

let a = 12;
function foo() {
  if (false) {
    a = 1;
  }
  console.log(a);
}
foo();

if (a) {
  setTimeout(() => console.log(13));
}
a = 12;
console.log(a);

function foo(a) {
  return a++;
}
let data = 1;
console.log(foo(data));

console.log(typeof +[1]);
console.log(3 && 4 === 4);

// Solved on November 14, 2016.
// Implement strjoin(separator, ...values) to join strings with the given separator.
function strjoin(separator, ...values) {
  return values.join(separator);
}

// Solved on November 15, 2016.
// Compress consecutive integers into ranges. Example [5, 2, 1, 2, 3] becomes '1-3,5'.
function compress(numbers) {
  const sorted = [...new Set(numbers)].sort((a, b) => a - b);
  const ranges = [];

  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i];
    while (sorted[i + 1] === sorted[i] + 1) i++;
    const end = sorted[i];
    ranges.push(start === end ? String(start) : `${start}-${end}`);
  }

  return ranges.join(',');
}

// Solved on November 16, 2016.
// Check whether the string contains A, B, and C regardless of case.
function isPangram(text) {
  const letters = new Set(text.toUpperCase());
  return ['A', 'B', 'C'].every((letter) => letters.has(letter));
}

// Solved on November 18, 2016.
// Find all positive-length overlaps between two sorted lists of intervals.
// Intervals within each list do not overlap.
function intersection(first, second) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < first.length && j < second.length) {
    const [firstStart, firstEnd] = first[i];
    const [secondStart, secondEnd] = second[j];
    const start = Math.max(firstStart, secondStart);
    const end = Math.min(firstEnd, secondEnd);

    if (start < end) result.push([start, end]);
    if (firstEnd <= secondEnd) i++;
    if (secondEnd <= firstEnd) j++;
  }

  return result;
}

// Solved on November 21, 2016.
// Group values by the key returned by a callback.
function groupBy(values, getKey) {
  const groups = Object.create(null);
  for (const value of values) {
    const key = getKey(value);
    if (!(key in groups)) groups[key] = [];
    groups[key].push(value);
  }
  return groups;
}

// Solved on November 22, 2016.
// Compose functions from right to left. The rightmost function receives all arguments.
function compose(...functions) {
  return function (...args) {
    if (functions.length === 0) return args[0];

    const last = functions.length - 1;
    let result = functions[last].apply(this, args);
    for (let i = last - 1; i >= 0; i--) {
      result = functions[i].call(this, result);
    }
    return result;
  };
}

// Solved on November 23, 2016.
// Call the original function only on the first invocation of the wrapper.
function runOnce(callback) {
  let called = false;
  return function (...args) {
    if (called) return undefined;
    called = true;
    return callback.apply(this, args);
  };
}

// Solved on November 24, 2016.
// Wait for all promises to resolve and return the sum of their numeric values.
async function sumPromises(...promises) {
  const values = await Promise.all(promises);
  return values.reduce((total, value) => total + value, 0);
}

// Solved on November 25, 2016.
// Return a promise that resolves after the given number of milliseconds.
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Solved on November 28, 2016.
// Fetch JSON from a URL, allowing up to five total attempts.
async function get(url, fetchJsonResponse = fetch) {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetchJsonResponse(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (attempt === maxAttempts) throw error;
    }
  }
}

// Solved on November 29, 2016.
// Resolve with the first fulfilled input or reject with all errors in input order.
function promiseAny(inputs) {
  const promises = Array.from(inputs);
  return new Promise((resolve, reject) => {
    const errors = new Array(promises.length);
    let remaining = promises.length;
    if (remaining === 0) {
      reject(new AggregateError(errors, 'All inputs rejected'));
      return;
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(resolve, (error) => {
        errors[index] = error;
        if (--remaining === 0) reject(new AggregateError(errors, 'All inputs rejected'));
      });
    });
  });
}

// Solved on November 30, 2016.
// Allow at most limit calls, notify when the limit is reached, and support reset.
function callLimit(callback, limit, onLimit) {
  let calls = 0;
  function limited(...args) {
    if (calls >= limit) return undefined;
    const reachedLimit = ++calls === limit;
    const result = callback.apply(this, args);
    if (reachedLimit) onLimit?.();
    return result;
  }
  limited.reset = () => { calls = 0; };
  return limited;
}

// Solved on December 1, 2016.
// Reject if the wrapped function fails to settle before the deadline.
class TimeLimitError extends Error {}

function timeLimit(callback, milliseconds) {
  return async function (...args) {
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new TimeLimitError('Time limit exceeded')), milliseconds);
    });
    try {
      const result = Promise.resolve().then(() => callback.apply(this, args));
      return await Promise.race([result, timeout]);
    } finally {
      clearTimeout(timer);
    }
  };
}

// Solved on December 2, 2016.
// Return true on the first match, skipping holes and preserving the callback receiver.
function arraySome(array, predicate, thisArg) {
  if (typeof predicate !== 'function') throw new TypeError('Expected a function');
  const length = array.length;
  for (let index = 0; index < length; index++) {
    if (index in array && predicate.call(thisArg, array[index], index, array)) {
      return true;
    }
  }
  return false;
}

// Solved on December 5, 2016.
// Run two checks concurrently and return timeout, error, fail, or success.
async function checkResult(check, milliseconds) {
  const deadline = Symbol('deadline');
  const run = timeLimit(check, milliseconds);
  const results = await Promise.allSettled([run(), run()]);
  const statuses = results.map(({ status, value, reason }) => {
    if (status === 'fulfilled') return value;
    return reason instanceof TimeLimitError
      ? deadline
      : 'error';
  });
  if (statuses.includes(deadline)) return 'timeout';
  if (statuses.includes('error')) return 'error';
  return statuses.every((value) => value === true) ? 'success' : 'fail';
}

// Solved on December 6, 2016.
// Add every number in an array that can contain other arrays.
function flattenSum(values) {
  let sum = 0;
  for (const value of values) {
    sum += Array.isArray(value) ? flattenSum(value) : value;
  }
  return sum;
}

// Solved on December 7, 2016.
// Implement push, pop, and max in constant time, including duplicate maxima.
class MaxStack {
  constructor() {
    this.entries = [];
  }

  push(value) {
    const previous = this.entries[this.entries.length - 1];
    const max = previous ? Math.max(previous.max, value) : value;
    this.entries.push({ value, max });
  }

  pop() {
    if (this.entries.length === 0) throw new Error('Stack is empty');
    return this.entries.pop().value;
  }

  max() {
    if (this.entries.length === 0) throw new Error('Stack is empty');
    return this.entries[this.entries.length - 1].max;
  }
}

// Solved on December 8, 2016.
// Buffer messages with sequential IDs starting at 1 and ignore already rendered IDs.
function renderInOrder(connect, render) {
  const pending = new Map();
  let nextId = 1;
  connect((message) => {
    if (message.id < nextId) return;
    pending.set(message.id, message);
    while (pending.has(nextId)) {
      const next = pending.get(nextId);
      pending.delete(nextId++);
      render(next);
    }
  });
}

// Solved on December 9, 2016.
// Group nonnegative integers with the same nonzero digits, counting repeated digits.
function digitPermutation(numbers) {
  const groups = new Map();
  for (const number of numbers) {
    const key = [...String(number)]
      .filter((digit) => digit !== '0')
      .sort()
      .join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(number);
  }
  return [...groups.values()];
}

// Solved on December 12, 2016.
// Return the original ticket objects in travel order from the known starting city.
function getRoute(tickets, start) {
  const departures = new Map(tickets.map((ticket) => [ticket.from, ticket]));
  const route = [];
  let city = start;
  while (departures.has(city)) {
    const ticket = departures.get(city);
    departures.delete(city);
    route.push(ticket);
    city = ticket.to;
  }
  return route;
}

// Solved on December 13, 2016.
// Flatten nested plain objects into dot-separated paths.
function flattenObject(object) {
  const entries = [];
  function visit(node, prefix) {
    for (const [key, value] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value !== null && Object.getPrototypeOf(Object(value)) === Object.prototype) {
        visit(value, path);
      } else {
        entries.push([path, value]);
      }
    }
  }
  visit(object, '');
  return Object.fromEntries(entries);
}

// Solved on December 14, 2016.
// Add numeric values in a nested object and ignore other values.
function sumNumericProperties(value) {
  if (typeof value === 'number') return value;
  if (value === null || typeof value !== 'object') return 0;
  return Object.values(value).reduce((sum, child) => sum + sumNumericProperties(child), 0);
}

// Solved on December 15, 2016.
// Add each node's value in a tree with optional children.
function sumTreeValues(node) {
  return (node.children ?? []).reduce((sum, child) => sum + sumTreeValues(child), node.value);
}

// Solved on December 16, 2016.
// Clone arrays and plain objects while preserving shared references and cycles.
function cloneNested(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return seen.get(value);
  const clone = Array.isArray(value) ? new Array(value.length) : {};
  seen.set(value, clone);
  for (const key of Object.keys(value)) {
    Object.defineProperty(clone, key, {
      value: cloneNested(value[key], seen),
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return clone;
}

// Solved on December 19, 2016.
// Return the nth Fibonacci number, starting with 1 and 1.
function fibonacci(n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError('Expected a positive integer');
  let previous = 0;
  let current = 1;
  for (let i = 1; i < n; i++) {
    [previous, current] = [current, previous + current];
  }
  return current;
}

// Solved on December 20, 2016.
// Replace consecutive repeats with the character and its count when the count exceeds one.
function compressString(text) {
  const characters = [...text];
  const groups = [];
  for (let start = 0; start < characters.length;) {
    const character = characters[start];
    let end = start + 1;
    while (characters[end] === character) end++;
    const count = end - start;
    groups.push(count === 1 ? character : character + count);
    start = end;
  }
  return groups.join('');
}

// Solved on December 21, 2016.
// Return the strings containing the given substring in their original order.
function findSubstring(substring, strings) {
  return strings.filter((text) => text.includes(substring));
}

// Solved on December 22, 2016.
// Uppercase each word's first letter, treating hyphenated words as one word.
function capitalize(input) {
  return input.replace(/\p{L}+(?:-\p{L}+)*/gu, (word) =>
    word.replace(/^\p{L}/u, (letter) => letter.toUpperCase())
  );
}

// Solved on December 23, 2016.
// Collapse runs of the same character, including spaces, into a single character.
function removeRepeats(text) {
  return text.replace(/([\s\S])\1+/gu, '$1');
}

// Solved on December 27, 2016.
// Merge two ascending arrays into a new ascending array.
function mergeSortedArrays(first, second) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    if (first[i] <= second[j]) merged.push(first[i++]);
    else merged.push(second[j++]);
  }
  return merged.concat(first.slice(i), second.slice(j));
}

// Solved on December 28, 2016.
// Return the indices of two distinct elements whose sum equals the target.
function twoSum(numbers, target) {
  const seen = new Map();
  for (const [index, number] of numbers.entries()) {
    if (seen.has(target - number)) return [seen.get(target - number), index];
    seen.set(number, index);
  }
  return [];
}

// Solved on December 29, 2016.
// Check whether both strings contain the same characters with the same counts.
function isAnagram(first, second) {
  return [...first].sort().join('') === [...second].sort().join('');
}

// Solved on December 30, 2016.
// Keep values from the first array that do not appear in the second.
function arrayDifference(first, second) {
  const excluded = new Set(second);
  return first.filter((value) => !excluded.has(value));
}

// Solved on January 2, 2017.
// Check that each bracket closes in the correct order.
function checkBrackets(text) {
  const pairs = new Map([['(', ')'], ['[', ']'], ['{', '}']]);
  const stack = [];
  for (const bracket of text) {
    if (pairs.has(bracket)) stack.push(pairs.get(bracket));
    else if (stack.pop() !== bracket) return false;
  }
  return stack.length === 0;
}

// Solved on January 3, 2017.
// Find the largest number among elements at the greatest nesting depth.
function findDeepestMaxElement(array) {
  let maxDepth = -1;
  let maximum;
  function visit(values, depth) {
    for (const value of values) {
      if (Array.isArray(value)) visit(value, depth + 1);
      else if (depth > maxDepth || (depth === maxDepth && value > maximum)) {
        maxDepth = depth;
        maximum = value;
      }
    }
  }
  visit(array, 0);
  return maximum;
}

// Solved on January 4, 2017.
// Sort active entries, reverse each value, and keep the first occurrence of each character.
function combineActiveEntries(entries) {
  const active = entries.filter((entry) => !entry.expired);
  active.sort((first, second) => first.order - second.order);
  const characters = new Set();
  for (const { value } of active) {
    for (const character of [...value].reverse()) characters.add(character);
  }
  return [...characters].join('');
}

// Solved on January 5, 2017.
// Cache successful return values by receiver and argument identity.
function memoize(callback) {
  const cache = new Map();
  const resultKey = Symbol('result');
  return function (...args) {
    let node = cache;
    for (const key of [this, ...args]) {
      if (!node.has(key)) node.set(key, new Map());
      node = node.get(key);
    }
    if (!node.has(resultKey)) node.set(resultKey, callback.apply(this, args));
    return node.get(resultKey);
  };
}

// Solved on January 6, 2017.
// Flatten nested arrays up to the requested depth and skip holes.
function flattenArray(array, depth = 1) {
  const limit = Math.max(0, Math.trunc(depth));
  const result = [];
  function visit(values, remaining) {
    for (let i = 0; i < values.length; i++) {
      if (!(i in values)) continue;
      const value = values[i];
      if (remaining > 0 && Array.isArray(value)) visit(value, remaining - 1);
      else result.push(value);
    }
  }
  visit(array, limit);
  return result;
}

// Solved on January 9, 2017.
// Group words that have the same characters with the same counts.
function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}

// Solved on January 10, 2017.
// Resolve all inputs in their original order or reject on the first failure.
function customPromiseAll(inputs) {
  return new Promise((resolve, reject) => {
    const values = Array.from(inputs);
    const results = new Array(values.length);
    let remaining = values.length;
    if (remaining === 0) resolve(results);
    values.forEach((value, index) => {
      Promise.resolve(value).then((result) => {
        results[index] = result;
        if (--remaining === 0) resolve(results);
      }, reject);
    });
  });
}

// Solved on January 11, 2017.
// Map existing elements and preserve holes in the result.
function customMap(array, callback, thisArg) {
  if (typeof callback !== 'function') throw new TypeError('Expected a function');
  const result = new Array(array.length);
  for (let i = 0; i < result.length; i++) {
    if (i in array) result[i] = callback.call(thisArg, array[i], i, array);
  }
  return result;
}

// Solved on January 12, 2017.
// Follow a dot-separated path and return undefined when an own property is missing.
function getByPath(object, path) {
  let value = object;
  for (const key of path.split('.')) {
    if (value == null || !Object.prototype.hasOwnProperty.call(value, key)) return undefined;
    value = value[key];
  }
  return value;
}

// Solved on January 13, 2017.
// Wait for a quiet period, then invoke the callback with the latest arguments.
function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  };
}

// Solved on January 16, 2017.
// Find the fewest banknotes using the given unlimited denominations.
function chooseBanknotes(amount) {
  if (!Number.isSafeInteger(amount) || amount < 0 || amount % 50 !== 0) return undefined;
  const notes = new Map();
  for (const denomination of [5000, 1000, 500, 100, 50]) {
    const count = Math.floor(amount / denomination);
    if (count > 0) notes.set(denomination, count);
    amount %= denomination;
  }
  return notes;
}

// Solved on January 17, 2017.
// Charge the weekday or weekend rate for each night starting on the check-in date.
function bookingPrice(nights, checkIn, weekdayRate, weekendRate) {
  const date = new Date(checkIn);
  let total = 0;
  for (let i = 0; i < nights; i++) {
    const day = date.getDay();
    total += day === 0 || day === 6 ? weekendRate : weekdayRate;
    date.setDate(date.getDate() + 1);
  }
  return total;
}

// Solved on January 18, 2017.
// Group records by a field and index the records in each group by ID.
function indexGroups(records, field) {
  const groups = new Map();
  for (const record of records) {
    const { id, ...fields } = record;
    const key = record[field];
    if (!groups.has(key)) groups.set(key, new Map());
    groups.get(key).set(id, fields);
  }
  return groups;
}

// Solved on January 19, 2017.
// Register and remove handlers and call listeners with emitted arguments.
class PracticeEventEmitter {
  constructor() {
    this.listeners = new Map();
  }

  on(event, handler) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(handler);
    return () => this.listeners.get(event)?.delete(handler);
  }

  emit(event, ...args) {
    for (const handler of [...(this.listeners.get(event) ?? [])]) handler(...args);
  }
}

// Solved on January 20, 2017.
// Partition players into groups based on whether they have a squad.
function partitionPlayers(players) {
  const assigned = [];
  const unassigned = [];
  for (const player of players) {
    (player.squad ? assigned : unassigned).push(player);
  }
  return { assigned, unassigned };
}

// Solved on January 23, 2017.
// Return a wrapper that fixes the receiver and prepends initial arguments.
function bindReceiver(callback, receiver, ...initial) {
  return (...args) => callback.apply(receiver, [...initial, ...args]);
}

// Solved on January 24, 2017.
// Build callbacks that each return the loop value captured when they were created.
function createIndexReaders(count) {
  const readers = [];
  for (let index = 0; index < count; index++) {
    readers.push(() => index);
  }
  return readers;
}

// Solved on January 25, 2017.
// Collect two arguments in separate calls.
function curryTwo(callback) {
  return (first) => (second) => callback(first, second);
}

// Solved on January 26, 2017.
// Collect one number per call and return the total when called with no arguments.
function curriedSum(total = 0) {
  return (...args) => args.length === 0 ? total : curriedSum(total + args[0]);
}

// Solved on January 27, 2017.
// Format nested files and directories with two spaces of indentation per level.
function formatDirectoryTree(root) {
  const lines = [];
  function visit(entry, depth) {
    lines.push('  '.repeat(depth) + entry.name);
    for (const child of entry.children ?? []) visit(child, depth + 1);
  }
  visit(root, 0);
  return lines.join('\n');
}

// Solved on January 3, 2019.
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

// Solved on January 4, 2019.
// Report the outcome of each input in its original order.
function customAllSettled(inputs) {
  return Promise.all(Array.from(inputs, (input) =>
    Promise.resolve(input).then(
      (value) => ({ status: 'fulfilled', value }),
      (reason) => ({ status: 'rejected', reason })
    )
  ));
}

// Solved on January 7, 2019.
// Split an array into groups of a given positive size.
function chunkArray(values, size) {
  if (!Number.isSafeInteger(size) || size < 1) throw new RangeError('Invalid size');
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

// Solved on January 8, 2019.
// Return the first matching index or -1.
function findMatchingIndex(values, predicate) {
  const length = values.length;
  for (let index = 0; index < length; index++) {
    if (predicate(values[index], index, values)) return index;
  }
  return -1;
}

// Solved on January 9, 2019.
// Count Unicode code points in a string.
function countCharacters(text) {
  const counts = new Map();
  for (const character of text) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }
  return counts;
}

// Solved on January 10, 2019.
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

// Solved on January 11, 2019.
// Rotate an array to the right without changing the input.
function rotateRight(values, steps) {
  if (values.length === 0) return [];
  const offset = ((steps % values.length) + values.length) % values.length;
  const split = values.length - offset;
  return values.slice(split).concat(values.slice(0, split));
}

// Solved on January 14, 2019.
// Return unique values appearing in both arrays in first-array order.
function commonValues(first, second) {
  const remaining = new Set(second);
  return first.filter((value) => remaining.delete(value));
}

// Solved on January 15, 2019.
// Pass the result of each asynchronous step to the next one.
async function runAsyncSteps(initial, steps) {
  let value = initial;
  for (const step of steps) value = await step(value);
  return value;
}

// Solved on January 16, 2019.
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

// Solved on January 17, 2019.
// Return the first character that appears exactly once.
function firstUniqueCharacter(text) {
  const counts = countCharacters(text);
  for (const [character, count] of counts) {
    if (count === 1) return character;
  }
  return undefined;
}

// Solved on January 17, 2019.
// Count words case-insensitively, ignoring punctuation.
function countWords(text) {
  const counts = new Map();
  for (const word of text.toLowerCase().match(/\p{L}+/gu) ?? []) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}

// Solved on January 18, 2019.
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

// Solved on January 18, 2019.
// Move zeros after all other values while keeping their order.
function moveZeros(values) {
  const nonzero = values.filter((value) => value !== 0);
  return nonzero.concat(Array(values.length - nonzero.length).fill(0));
}

// Solved on January 18, 2019.
// Pair values by index until the shorter array ends.
function zipArrays(first, second) {
  const pairs = [];
  for (let i = 0; i < Math.min(first.length, second.length); i++) {
    pairs.push([first[i], second[i]]);
  }
  return pairs;
}

// Solved on January 21, 2019.
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

// Solved on January 21, 2019.
// Swap rows and columns of a rectangular matrix.
function transposeMatrix(matrix) {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, column) => matrix.map((row) => row[column]));
}

// Solved on January 21, 2019.
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

// Solved on January 22, 2019.
// Return cumulative sums with a leading zero.
function prefixSums(values) {
  const sums = [0];
  for (const value of values) sums.push(sums[sums.length - 1] + value);
  return sums;
}

// Solved on January 22, 2019.
// Count nodes along the longest path from the root to a leaf.
function maxTreeDepth(node) {
  if (node == null) return 0;
  let depth = 0;
  for (const child of node.children ?? []) {
    depth = Math.max(depth, maxTreeDepth(child));
  }
  return depth + 1;
}

// Solved on January 23, 2019.
// Scan from right to left and return the first matching index.
function findLastMatchingIndex(values, predicate) {
  for (let index = values.length - 1; index >= 0; index--) {
    if (predicate(values[index], index, values)) return index;
  }
  return -1;
}

// Solved on January 24, 2019.
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

// Solved on January 24, 2019.
// Use the Euclidean algorithm for two integers.
function greatestCommonDivisor(first, second) {
  let a = Math.abs(first);
  let b = Math.abs(second);
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

// Solved on January 24, 2019.
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

// Solved on January 24, 2019.
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

// Solved on January 24, 2019.
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

// Solved on January 25, 2019.
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

// Solved on January 25, 2019.
// Check a string in both directions, ignoring case and punctuation.
function isPalindrome(text) {
  const letters = [...text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '')];
  for (let i = 0; i < letters.length / 2; i++) {
    if (letters[i] !== letters[letters.length - 1 - i]) return false;
  }
  return true;
}

// Solved on January 25, 2019.
// Return the matching values and the remaining values in order.
function partitionValues(values, predicate) {
  const matched = [];
  const remaining = [];
  values.forEach((value, index) => {
    (predicate(value, index, values) ? matched : remaining).push(value);
  });
  return [matched, remaining];
}

// Solved on January 25, 2019.
// Count paths to the top using steps of one or two stairs.
function countStairPaths(stairs) {
  if (!Number.isSafeInteger(stairs) || stairs < 0) throw new RangeError('Invalid stair count');
  let previous = 0n;
  let current = 1n;
  for (let i = 0; i < stairs; i++) [previous, current] = [current, previous + current];
  return current;
}

// Solved on January 28, 2019.
// Sum even numbers.
function sumEvenNumbers(values) {
  return values.filter(value => value % 2 === 0).reduce((sum, value) => sum + value, 0);
}

// Solved on January 28, 2019.
// Count negative numbers.
function countNegativeNumbers(values) {
  return values.filter(value => value < 0).length;
}

// Solved on January 29, 2019.
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

// Solved on January 30, 2019.
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

// Solved on February  5, 2019.
// Max adjacent increase.
function maxAdjacentIncrease(values) {
  return values.length > 1 ? adjacentDifferences(values).reduce((best, value) => Math.max(best, value), -Infinity) : undefined;
}

// Solved on February  6, 2019.
// Symmetric difference.
function symmetricDifference(first, second) {
  return [...new Set([...arrayDifference(first, second), ...arrayDifference(second, first)])];
}

// Solved on February  7, 2019.
// Union values.
function unionValues(first, second) {
  return [...new Set([...first, ...second])];
}

// Solved on February  7, 2019.
// Split at index.
function splitAtIndex(values, index) {
  return [values.slice(0, index), values.slice(index)];
}

// Solved on February  7, 2019.
// Take every nth.
function takeEveryNth(values, step) {
  return values.filter((_, index) => step > 0 && index % step === 0);
}

// Solved on February  8, 2019.
// Remove at index.
function removeAtIndex(values, index) {
  return values.filter((_, position) => position !== index);
}

// Solved on February 11, 2019.
// Index final occurrences.
function indexFinalOccurrences(values) {
  return new Map(values.map((value, index) => [value, index]));
}

// Solved on February 12, 2019.
// Enumerate values.
function enumerateValues(values) {
  return Array.from(values.entries());
}

// Solved on February 12, 2019.
// Interleave arrays.
function interleaveArrays(first, second) {
  return Array.from({ length: Math.max(first.length, second.length) }, (_, i) => [...first.slice(i, i + 1), ...second.slice(i, i + 1)]).flat();
}

// Solved on February 13, 2019.
// Repeat values.
function repeatValues(values, count) {
  return Array.from({ length: count }, () => values).flat();
}

// Solved on February 14, 2019.
// Flatten one level.
function flattenOneLevel(values) {
  return values.flat(1);
}

// Solved on February 14, 2019.
// Compact values.
function compactValues(values) {
  return values.filter(value => value != null);
}

// Solved on February 15, 2019.
// Count truthy.
function countTruthy(values) {
  return values.reduce((count, value) => count + Number(Boolean(value)), 0);
}

// Solved on February 18, 2019.
// Find last value.
function findLastValue(values, predicate) {
  return values[findLastMatchingIndex(values, predicate)];
}

// Solved on February 18, 2019.
// Reverse words.
function reverseWords(text) {
  return text.trim().split(/\s+/u).reverse().join(' ');
}

// Solved on February 19, 2019.
// Count words in sentence.
function countWordsInSentence(text) {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

// Solved on February 19, 2019.
// Get initials.
function getInitials(text) {
  return text.trim().split(/\s+/u).filter(Boolean).map(word => [...word][0].toUpperCase()).join('');
}

// Solved on February 20, 2019.
// To kebab case.
function toKebabCase(text) {
  return (text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).join('-');
}

// Solved on February 21, 2019.
// Truncate code points.
function truncateCodePoints(text, length) {
  return [...text].slice(0, Math.max(0, length)).join('');
}

// Solved on February 22, 2019.
// Common prefix.
function commonPrefix(first, second) {
  return (() => { const a = [...first]; const b = [...second]; let i = 0; while (i < a.length && a[i] === b[i]) i++; return a.slice(0, i).join(''); })();
}

// Solved on February 22, 2019.
// Strip accent marks.
function stripAccentMarks(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').normalize('NFC');
}

// Solved on February 25, 2019.
// Escape html text.
function escapeHtmlText(text) {
  return text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

// Solved on February 26, 2019.
// Count ascii digits.
function countAsciiDigits(text) {
  return (text.match(/[0-9]/g) ?? []).length;
}

// Solved on February 26, 2019.
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

// Solved on March  8, 2019.
// Count tree nodes.
function countTreeNodes(root) {
  return root == null ? 0 : 1 + (root.children ?? []).reduce((sum, child) => sum + countTreeNodes(child), 0);
}

// Solved on March 11, 2019.
// Count tree leaves.
function countTreeLeaves(root) {
  return root == null ? 0 : root.children?.length ? root.children.reduce((sum, child) => sum + countTreeLeaves(child), 0) : 1;
}

// Solved on March 11, 2019.
// Collect leaf values.
function collectLeafValues(root) {
  return root == null ? [] : root.children?.length ? root.children.flatMap(collectLeafValues) : [root.value];
}

// Solved on March 12, 2019.
// Contains tree value.
function containsTreeValue(root, target) {
  return root != null && (Object.is(root.value, target) || (root.children ?? []).some(child => containsTreeValue(child, target)));
}

// Solved on March 12, 2019.
// Map tree values.
function mapTreeValues(root, transform) {
  return root == null ? null : { ...root, value: transform(root.value), children: (root.children ?? []).map(child => mapTreeValues(child, transform)) };
}

// Solved on March 13, 2019.
// Clamp number.
function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Solved on March 14, 2019.
// Normalize modulo.
function normalizeModulo(value, divisor) {
  return ((value % divisor) + divisor) % divisor;
}

// Solved on March 15, 2019.
// Is power of two big int.
function isPowerOfTwoBigInt(value) {
  return value > 0n && (value & (value - 1n)) === 0n;
}

// Solved on March 15, 2019.
// Least common multiple.
function leastCommonMultiple(a, b) {
  return a === 0 || b === 0 ? 0 : Math.abs((a / greatestCommonDivisor(a, b)) * b);
}

// Solved on March 18, 2019.
// Factorial big int.
function factorialBigInt(value) {
  return (() => { if (value < 0n) throw new RangeError('Expected a nonnegative integer'); let result = 1n; for (let i = 2n; i <= value; i++) result *= i; return result; })();
}

// Solved on March 18, 2019.
// Degrees to radians.
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Solved on March 19, 2019.
// Radians to degrees.
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

// Solved on March 19, 2019.
// Manhattan distance.
function manhattanDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Solved on March 20, 2019.
// Euclidean distance.
function euclideanDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Solved on March 21, 2019.
// Contains point.
function containsPoint(rectangle, point) {
  return point.x >= rectangle.left && point.x <= rectangle.right && point.y >= rectangle.top && point.y <= rectangle.bottom;
}

// Solved on March 22, 2019.
// Rectangle area.
function rectangleArea(rectangle) {
  return (rectangle.right - rectangle.left) * (rectangle.bottom - rectangle.top);
}

// Solved on March 25, 2019.
// Get array extrema.
function getArrayExtrema(values) {
  return values.reduce(({ min, max }, value) => ({ min: Math.min(min, value), max: Math.max(max, value) }), { min: Infinity, max: -Infinity });
}

// Solved on March 25, 2019.
// Create number range.
function createNumberRange(start, end) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

// Solved on March 25, 2019.
// Pad number.
function padNumber(value, width) {
  return String(value).padStart(width, '0');
}

// Solved on March 26, 2019.
// Parse decimal integer.
function parseDecimalInteger(text) {
  return /^[+-]?\d+$/.test(text.trim()) && Number.isSafeInteger(Number(text)) ? Number(text) : undefined;
}

// Solved on March 27, 2019.
// Compare numeric pairs.
function compareNumericPairs(first, second) {
  return first[0] - second[0] || first[1] - second[1];
}

// Solved on December  2, 2019.
// Check whether a safe integer is prime.
function isPrimeNumber(value) {
  if (!Number.isSafeInteger(value) || value < 2) return false;
  for (let divisor = 2; divisor <= value / divisor; divisor++) {
    if (value % divisor === 0) return false;
  }
  return true;
}

// Solved on December  3, 2019.
// Sum the decimal digits of a nonnegative safe integer.
function sumDigits(value) {
  return [...String(value)].reduce((sum, digit) => sum + Number(digit), 0);
}

// Solved on December  4, 2019.
// Check whether a Gregorian year has 366 days.
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
