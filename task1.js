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
