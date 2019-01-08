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
