//your code here
 function calculateMinCost() {
        // Get the input values
        let ropeLengthsStr = document.getElementById("rope-lengths").value;
        let ropeLengthsArr = ropeLengthsStr.split(",").map(Number);

        // Calculate the minimum cost
        let minCost = getMinCost(ropeLengthsArr);

        // Display the result
        document.getElementById("result").innerHTML = minCost;
      }

      function getMinCost(ropeLengthsArr) {
        // Create a min heap from the rope lengths array
        let heap = new MinHeap(ropeLengthsArr);

        // Calculate the minimum cost to connect the ropes
        let minCost = 0;
        while (heap.size() > 1) {
          let min1 = heap.extractMin();
          let min2 = heap.extractMin();
          let sum = min1 + min2;
          minCost += sum;
          heap.insert(sum);
        }

        return minCost;
      }

      // MinHeap class for maintaining a min heap
      class MinHeap {
        constructor(arr) {
          this.heap = [null, ...arr];
          for (let i = Math.floor(this.heap.length / 2); i > 0; i--) {
            this.heapify(i);
          }
        }

        size() {
          return this.heap.length - 1;
        }

        insert(val) {
          this.heap.push(val);
          let i = this.heap.length - 1;
          while (i > 1 && this.heap[i] < this.heap[Math.floor(i / 2)]) {
            [this.heap[i], this.heap[Math.floor(i / 2)]] = [this.heap[Math.floor(i / 2)], this.heap[i]];
            i = Math.floor(i / 2);
          }
        }

        extractMin() {
          if (this.heap.length === 2) {
            return this.heap.pop();
          }
          let min = this.heap[1];
          this.heap[1] = this.heap.pop();
          this.heapify(1);
          return min;
        }

        heapify(i) {
          let left = 2 * i;
          let right = 2 * i + 1;
          let smallest = i;
          if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
          }
          if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
          }
          if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this.heapify(smallest);
          }
        }
      }
