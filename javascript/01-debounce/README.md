# Exercise 01 - Implement `debounce`

## Objective

Implement a reusable JavaScript `debounce` utility from scratch.

Do **not** use an existing debounce implementation or a library.

The goal is to understand:

* Closures
* Function arguments
* `this` binding
* Timers
* Function invocation control

---

## Requirements

Implement:

```js
debounce(fn, delay)
```

It should return a new function.

When the returned function is called repeatedly, `fn` should only execute **after `delay` milliseconds have passed since the most recent call**.

### Example

```js
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

handleSearch('r');
handleSearch('re');
handleSearch('rea');
handleSearch('reac');
handleSearch('react');
```

`handleSearch` may be called five times, but `fn` should execute only once:

```text
Searching for: react
```

---

## Requirements in detail

### 1. Preserve arguments

The arguments from the **most recent call** must be passed to `fn`.

```js
const fn = debounce((name) => {
  console.log(name);
}, 300);

fn('Sriram');
fn('John');
fn('Alex');
```

Expected:

```text
Alex
```

---

### 2. Preserve `this`

`fn` must execute with the `this` value from the most recent invocation.

Example:

```js
const user = {
  name: 'Sriram',

  greet: debounce(function () {
    console.log(this.name);
  }, 300),
};

user.greet();
```

Expected:

```text
Sriram
```

---

### 3. Reset the timer

Every invocation should reset the timer.

For:

```js
const fn = debounce(callback, 300);

fn();
setTimeout(fn, 100);
setTimeout(fn, 200);
setTimeout(fn, 250);
```

`callback` should execute approximately **300ms after the final call**, not 300ms after the first call.

---

### 4. Return value

Think about what your implementation should return when the debounced function is called.

For the first version, you may return `undefined` for calls that merely schedule execution.

You do **not** need to implement lodash's complete return-value semantics.

---

### 5. Cancellation

The returned debounced function should expose:

```js
cancel()
```

Example:

```js
const fn = debounce(callback, 300);

fn();

fn.cancel();
```

`callback` must not execute.

---

## Constraints

* Use plain JavaScript.
* Do not use Lodash or another utility library.
* Do not copy an implementation from the internet.
* Use `setTimeout` / `clearTimeout`.
* Keep the implementation reasonably small.
* Write your own tests.

---

## Suggested project structure

```text
01-debounce/
├── README.md
├── debounce.js
└── debounce.test.js
```

You may choose the testing setup yourself.

For now, don't worry about making this production-grade.

---

## Acceptance criteria

Your implementation should correctly handle:

* [ ] Basic debouncing
* [ ] Multiple rapid calls
* [ ] Latest arguments
* [ ] Latest `this` context
* [ ] Timer reset
* [ ] Cancellation
* [ ] Calls separated by more than `delay`
* [ ] Multiple independent debounced functions

---

## Stretch Challenge

After the basic implementation works, add:

```js
flush()
```

`flush()` should immediately execute the pending invocation, if one exists.

Example:

```js
const fn = debounce(callback, 1000);

fn();

fn.flush();
```

The callback should execute immediately instead of waiting for the remaining delay.

**Do not implement the stretch challenge until the basic version is working.**

---

## What you should be able to explain afterward

Once you're done, you should be able to explain:

1. Why a closure is required here.
2. Where the timer ID is stored.
3. Why the timer ID must be cleared.
4. How the latest arguments are retained.
5. How `this` is preserved.
6. Why an arrow function would change the `this` behavior in certain implementations.
7. What happens if two completely separate debounced functions are created.
8. What happens to the old timer when a new invocation occurs.
