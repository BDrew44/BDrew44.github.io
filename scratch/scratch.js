var nums = [9, 3.14, Math.PI, 105, 67, -1, 0];

nums.push(42);

function pickBiggerNum(a, b) {
  return a - b;
}

var sorted = nums.sort(pickBiggerNum);

console.log({ sorted });

var smallNums = nums.filter((num) => num < 50);
return num < 5;
{
}
console.log({ smallNums, nums });
