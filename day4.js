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
      }, 1100);
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