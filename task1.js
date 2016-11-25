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
// Реализовать strjoin(separator, ...values), соединяющую строки через разделитель.
function strjoin(separator, ...values) {
  return values.join(separator);
}

// Solved on November 15, 2016.
// Сжать целые числа в диапазоны: [5, 2, 1, 2, 3] → '1-3,5'.
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
// Проверить, есть ли в строке все три буквы A, B и C без учёта регистра.
function isPangram(text) {
  const letters = new Set(text.toUpperCase());
  return ['A', 'B', 'C'].every((letter) => letters.has(letter));
}

// Solved on November 18, 2016.
// Найти общие интервалы положительной длины в двух отсортированных списках.
// Внутри каждого списка интервалы не пересекаются.
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
// Сгруппировать элементы по ключу, который возвращает callback.
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
// Составить функции справа налево. Правая функция получает все исходные аргументы.
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
// Вызвать исходную функцию только при первом вызове обёртки.
function runOnce(callback) {
  let called = false;
  return function (...args) {
    if (called) return undefined;
    called = true;
    return callback.apply(this, args);
  };
}

// Solved on November 24, 2016.
// Дождаться чисел из всех промисов и вернуть их сумму.
async function sumPromises(...promises) {
  const values = await Promise.all(promises);
  return values.reduce((total, value) => total + value, 0);
}

// Solved on November 25, 2016.
// Вернуть промис, который выполнится через заданное число миллисекунд.
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
