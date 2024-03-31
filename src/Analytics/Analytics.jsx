import React from "react";

const Analytics = () => {
  return (
    <div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="card card-border" role="presentation">
          <div class="card-body">
            <h6 class="font-semibold mb-4 text-sm">Revenue</h6>
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-bold">
                  <span>$21,827.13</span>
                </h3>
                <p>
                  vs. 3 months prior to{" "}
                  <span class="font-semibold">20 Jan</span>
                </p>
              </div>
              <div class="tag gap-1 font-bold border-0 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>11.4%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-border" role="presentation">
          <div class="card-body">
            <h6 class="font-semibold mb-4 text-sm">Orders</h6>
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-bold">
                  <span>1,758</span>
                </h3>
                <p>
                  vs. 3 months prior to{" "}
                  <span class="font-semibold">20 Jan</span>
                </p>
              </div>
              <div class="tag gap-1 font-bold border-0 text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-500/20 dark:text-red-100">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>-3.2%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-border" role="presentation">
          <div class="card-body">
            <h6 class="font-semibold mb-4 text-sm">Purchases</h6>
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-bold">
                  <span>$7,249.31</span>
                </h3>
                <p>
                  vs. 3 months prior to{" "}
                  <span class="font-semibold">20 Jan</span>
                </p>
              </div>
              <div class="tag gap-1 font-bold border-0 text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100">
                <span>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>5.7%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
