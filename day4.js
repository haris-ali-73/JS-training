const logBeautify = require("log-beautify");
const log = require("log-beautify");

console.log("\n\nExploring Shallow vs deep copy!");

const obj = {
  name: "haris",
  age: 22,
};

const inObj = {
  obj,
  food: {
    dinner: "bindhi",
    favorite: "Saag :P",
  },
};

console.table(obj);

var obj1 = obj;

obj1.name = "Ahmed";

console.log("Changed 1- level Object: ", obj1);
console.log("Original 1- level Object: ", obj);

log.show();
log.warning("Hence Both Objects were only Shallowed Copied!");

//regular in-efficient way
log.show();
log.debug("Using spread operator NoW!\n\n");

//Getting back original data

obj.name = "haris";

obj1 = { ...obj };

obj1.name = "Ahmed";

console.log("Changed 1- level Object: ", obj1);
console.log("Original 1- level Object: ", obj);

log.show();
log.success("Hence Both Objects were deep Copied!");

//regular in-efficient way
log.show();
log.debug("Using regular way\n\n");
let nestedcopy = { ...inObj };

//Change in copy
nestedcopy.food.dinner = "biryani";

//Printing Both
console.log("Original 2 - level Object", inObj);
console.log("Copied 2 - level Object", nestedcopy);

log.show();
log.warning("Hence Both Objects were only Shallowed Copied!");

//Having Back original Data
nestedcopy.food.dinner = "bindhi";

//using JSON.stringify now
log.show();
log.debug("Using JSON.stringify now\n\n");
nestedcopy = JSON.parse(JSON.stringify(inObj));

//Change in copy
nestedcopy.food.dinner = "biryani";

//Printing Both
console.log("Original 2 - level Object", inObj);
console.log("Copied 2 - level Object", nestedcopy);

log.show();
log.success("Hence Deep Copied both objects succesfully!\n\n");

function resolveAfter2Seconds(x) {
  if (x > 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 100);
    });
  } else {
    throw new Error("Not Resolved, Value must be greater than 1!");
  }
}

async function asyncCall(x) {
  try {
    console.log(`calling with ${x}`);
    let result = await resolveAfter2Seconds(x);
    log.success(result);
  } catch (err) {
    log.error(err);
  } finally {
    log.warning(`Testing with ${x} DONE!`);
  }
}

// expected output: "resolved"
asyncCall(1);
// expected output: "Error"
asyncCall(0);

log.show();
log.debug("Now Testing HOFs!\n\n");

// Regular multiple functions approach

log.warning(
  "Using Regular Non Modular Approach results in too much of code duplication violating the DRY principle"
);

let radius = [1, 2, 3, 4, 5];

const calArea = function (radius) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(Math.PI * (radius[i] * radius[i]));
  }
  return output;
};

const calCircum = function (radius) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(2 * Math.PI * radius[i]);
  }
  return output;
};

const calDiam = function (radius) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(2 * radius[i]);
  }
  return output;
};

console.log("\nArea: ", calArea(radius));
console.log("\nCircumference: ", calCircum(radius));
console.log("\nDiameter: ", calDiam(radius));

log.success(
  "Now Using Modular Approach with HOF that will not violate the DRY principle and stil result in same answer without that much hassle"
);

const Area = function (x) {
  return Math.PI * (x * x);
};

const Circum = function (x) {
  return 2 * Math.PI * x;
};

const Diam = function (x) {
  return 2 * x;
};

const calculate = function (radius, logic) {
  const output = [];
  for (let i = 0; i < radius.length; i++) {
    output.push(logic(radius[i]));
  }
  return output;
};

console.log("\nArea: ", calculate(radius, Area));
console.log("\nCircumference: ", calculate(radius, Circum));
console.log("\nDiameter: ", calculate(radius, Diam));

log.show();
log.debug("Making out customize function like map\n\n");

Array.prototype.customMap = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]));
  }
  return output;
};

console.log("\nArea: ", radius.customMap(Area));
console.log("\nCircumference: ", radius.customMap(Circum));
console.log("\nDiameter: ", radius.customMap(Diam));

log.show();
log.success("Hence, the results are same!");

// Adding Generators
log.show();
log.debug("Generators!\n\n");

const SimpleGenerator = function* () {
  yield 1;
  yield 2;
};

const generateID = function* () {
  let id = 1;
  while (true) {
    yield id++;
  }
};

const generate = generateID();
console.table(generate.next());
console.table(generate.next());
console.table(generate.next()); // return done: false cause it is an infinte loop;

const generate2 = SimpleGenerator();
console.table(generate2.next());
console.table(generate2.next());
console.table(generate2.next()); // value: undefined, done: true // cause it has ended!e

const generate2copy = generate2;
console.table(generate2copy.next()); // will result the same cause the gennerator has done generating

// Adding Generators
log.show();
log.debug("Using Generators as an Iterator!\n\n");

const arrayIterator = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
};

const arrit = arrayIterator([1, 3, 5, 7, 9, 11]);
console.table(arrit.next());

const customGenerateID = function* () {
  let id = 1;
  while (true) {
    const x = yield id;
    if (x != null) {
      id += x;
    } else {
      id++;
    }
  }
};

const gx = customGenerateID();
console.table(gx.next());
console.table(gx.next(3)); // increment by 3
console.table(gx.next()); // null passed so increment by 1
console.table(gx.return(10)); // return 10 and exit generator
