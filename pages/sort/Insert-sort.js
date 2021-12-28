let arr = [
  1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 0, 1, 23, 23, 45, 65, 6, 76, 34, 33, 4, 34,
  3, 432, 4, 2, 2, 15, 67, 89, 09, 87, 65, 67, 89, 091, 87, 26, 356, 17, 890,
  98, 73, 65, 32, 71, 89, 02, 38, 4, 76, 2, 78, 19, 38, 4, 7, 6, 3, 2, 7, 8, 9,
  1, 28, 74, 6, 7, 3, 289,
];

function insertSort(arr = []) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];
    let j = i;
    while (j > 0 && temp < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
  return arr;
}
console.log(insertSort(arr));
