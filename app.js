let array = [];
let isSorting = false;
let speed = 100; 
let canvasSize = 50;
let barWidth = 20;
let intervalId;

document.addEventListener('DOMContentLoaded', () => {
  generateArray();
  drawArray();
});

function generateArray() {
  array = Array.from({ length: canvasSize }, () => randomIntFromInterval(5, 500));
  drawArray();
}

function randomizeArray() {
  if (isSorting) return;
  array.sort(() => Math.random() - 0.5);
  drawArray();
}

// function insertionSort() {
//   if (isSorting) return;
//   isSorting = true;
//   // Implement insertion sort visualization
//   intervalId = setInterval(() => {
//     // Perform one step of the algorithm
//     // Update array and drawArray()
//     // Check if the sorting is complete and clearInterval(intervalId) when done
//   }, speed);
// }

function insertionSort() {
    if (isSorting) return;
    isSorting = true;
    let i = 1;
  
    intervalId = setInterval(() => {
      if (i < array.length) {
        const key = array[i];
        let j = i - 1;
  
        // Move elements of array[0..i-1] that are greater than key to one position ahead of their current position
        while (j >= 0 && array[j] > key) {
          array[j + 1] = array[j];
          j = j - 1;
        }
  
        array[j + 1] = key;
  
        // Update the visualization
        drawArray();
        i++;
      } else {
        // Sorting is complete
        clearInterval(intervalId);
        isSorting = false;
      }
    }, speed);
  }
  
  function selectionSort() {
    if (isSorting) return;
    isSorting = true;
    let i = 0;
  
    intervalId = setInterval(() => {
      if (i < array.length - 1) {
        // Find the minimum element in unsorted array
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }
  
        // Swap the found minimum element with the first element
        const temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;
  
        // Update the visualization
        drawArray();
        i++;
      } else {
        // Sorting is complete
        clearInterval(intervalId);
        isSorting = false;
      }
    }, speed);
  }
  

  function bubbleSort() {
    if (isSorting) return;
    isSorting = true;
    let n = array.length;
  
    intervalId = setInterval(() => {
      if (n > 1) {
        for (let i = 0; i < n - 1; i++) {
          if (array[i] > array[i + 1]) {
            // Swap the elements
            const temp = array[i];
            array[i] = array[i + 1];
            array[i + 1] = temp;
  
            // Update the visualization
            drawArray();
          }
        }
        n--;
  
      } else {
        // Sorting is complete
        clearInterval(intervalId);
        isSorting = false;
      }
    }, speed);
  }

  function quickSort() {
    if (isSorting) return;
    isSorting = true;
  
    // Helper function for quickSort
    function partition(low, high) {
      const pivot = array[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
          i++;
          // Swap the elements
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
  
          // Update the visualization
          drawArray();
        }
      }
  
      // Swap the pivot element with the element at (i + 1)
      const temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;
  
      // Update the visualization
      drawArray();
  
      return i + 1;
    }
  
    // Helper function for quickSort
    function quickSortRecursive(low, high) {
      if (low < high) {
        const partitionIndex = partition(low, high);
  
        // Recursively sort the sub-arrays
        quickSortRecursive(low, partitionIndex - 1);
        quickSortRecursive(partitionIndex + 1, high);
      }
    }
  
    // Initial call to quickSortRecursive
    let low = 0;
    let high = array.length - 1;
  
    let stack = [];
    stack.push(low);
    stack.push(high);
  
    intervalId = setInterval(() => {
      if (stack.length > 0) {
        high = stack.pop();
        low = stack.pop();
  
        const partitionIndex = partition(low, high);
  
        if (partitionIndex - 1 > low) {
          stack.push(low);
          stack.push(partitionIndex - 1);
        }
  
        if (partitionIndex + 1 < high) {
          stack.push(partitionIndex + 1);
          stack.push(high);
        }
      } else {
        // Sorting is complete
        clearInterval(intervalId);
        isSorting = false;
      }
    }, speed);
  }
  

  function mergeSort() {
    if (isSorting) return;
    isSorting = true;
  
    // Helper function for mergeSort
    function merge(left, right) {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      // Merge the two arrays into a single sorted array
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
  
      // Concatenate any remaining elements in left and right
      return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }
  
    // Helper function for mergeSort
    function mergeSortRecursive(arr) {
      if (arr.length <= 1) {
        return arr;
      }
  
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
  
      // Recursively sort the left and right halves
      return merge(mergeSortRecursive(left), mergeSortRecursive(right));
    }
  
    // Perform the merge sort
    array = mergeSortRecursive(array);
  
    // Update the visualization
    drawArray();
  
    // Sorting is complete
    isSorting = false;
  }

  
  function shellSort() {
    if (isSorting) return;
    isSorting = true;
    let n = array.length;
    let gap = Math.floor(n / 2);
  
    intervalId = setInterval(() => {
      if (gap > 0) {
        for (let i = gap; i < n; i++) {
          const temp = array[i];
          let j = i;
  
          while (j >= gap && array[j - gap] > temp) {
            array[j] = array[j - gap];
            j -= gap;
          }
  
          array[j] = temp;
  
          // Update the visualization
          drawArray();
        }
        gap = Math.floor(gap / 2);
  
      } else {
        // Sorting is complete
        clearInterval(intervalId);
        isSorting = false;
      }
    }, speed);
  }
  

// Implement similar functions for other sorting algorithms

function changeSize() {
  if (isSorting) return;
  const newSize = prompt('Enter the new size of the array:');
  if (newSize && !isNaN(newSize) && newSize > 0) {
    canvasSize = parseInt(newSize);
    generateArray();
  }
}

function skipBack() {
    if (isSorting && step > 0) {
      // Decrement the step to go back
      step--;
  
      // Restore the array to the previous step
      array = [...steps[step]];
  
      // Update the visualization
      drawArray();
    }
  }
  
  function stepBack() {
    if (isSorting && step > 0) {
      // Decrement the step to go back
      step--;
  
      // Restore the array to the previous step
      array = [...steps[step]];
  
      // Update the visualization
      drawArray();
    }
  }
  

function pause() {
  clearInterval(intervalId);
  isSorting = false;
}

function stepForward() {
    if (isSorting && step < steps.length - 1) {
      // Increment the step to go forward
      step++;
  
      // Restore the array to the next step
      array = [...steps[step]];
  
      // Update the visualization
      drawArray();
    }
  }
  
  function skipForward() {
    if (isSorting && step < steps.length - 1) {
      // Increment the step to go forward
      step++;
  
      // Restore the array to the next step
      array = [...steps[step]];
  
      // Update the visualization
      drawArray();
    }
  }
  

function changeSpeed(newSpeed) {
  speed = 1000 / newSpeed;
}

function changeCanvasSize(newSize) {
  canvasSize = newSize;
  generateArray();
}

function changeBarWidth(newWidth) {
  barWidth = newWidth;
  drawArray();
}

function drawArray() {
  const visualizer = document.getElementById('sorting-visualizer');
  visualizer.innerHTML = '';

  array.forEach((value, idx) => {
    const bar = document.createElement('div');
    bar.className = 'array-bar';
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.marginRight = '1px';
    visualizer.appendChild(bar);
  });
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
