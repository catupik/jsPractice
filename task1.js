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
