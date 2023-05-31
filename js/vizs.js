// Fetch play_information.json
fetchJSONData('./json_data/play_information.json')
  .then((data) => {
    createPieChart(data);
    createBarChart(data);
  })
  .catch((error) => {
    console.error('Error fetching play_information.json:', error);
  });

// Function to fetch JSON data from a file
function fetchJSONData(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching JSON data:', error);
    });
}

function createPieChart(data) {
  const reviewTypes = data.map(entry => entry["Play_Type"]);
  const reviewTypeCounts = {};

  reviewTypes.forEach(reviewType => {
    if (reviewTypeCounts[reviewType]) {
      reviewTypeCounts[reviewType]++;
    } else {
      reviewTypeCounts[reviewType] = 1;
    }
  });

  const sortedReviewTypes = Object.keys(reviewTypeCounts).sort((a, b) => reviewTypeCounts[b] - reviewTypeCounts[a]);
  const commonReviewType = sortedReviewTypes[0];

  console.log("Common Review Type:", commonReviewType);

  const colors = generateColors(sortedReviewTypes.length);

  const totalReviewCount = reviewTypes.length; // Get the total count of review types

  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: sortedReviewTypes,
      datasets: [
        {
          label: 'Most Common Review Types',
          data: sortedReviewTypes.map(reviewType => reviewTypeCounts[reviewType]),
          backgroundColor: colors,
          datalabels: {
            formatter: (value, ctx) => {
              const count = value;
              const percentage = ((value / totalReviewCount) * 100).toFixed(2);
              return `${count} (${percentage}%)`;
            },
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 12
            }
          }
        },
        title: {
          display: true,
          text: 'Common Review Types',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const reviewCount = context.parsed;
              const percentage = ((reviewCount / totalReviewCount) * 100).toFixed(2);
              return `${context.label}: ${reviewCount} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

function generateColors(count) {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    const color = `hsl(${hue}, 50%, 50%)`;
    colors.push(color);
  }

  return colors;
}

function createBarChart(data) {
  const innings = data.map(entry => entry["Inning"]);
  const inningCounts = {};

  innings.forEach(inning => {
    if (inningCounts[inning]) {
      inningCounts[inning]++;
    } else {
      inningCounts[inning] = 1;
    }
  });

  const sortedInnings = Object.keys(inningCounts).sort((a, b) => inningCounts[b] - inningCounts[a]);
  const commonInning = sortedInnings[0];
  console.log("Most Common Inning:", commonInning);

  const totalInningCount = innings.length; // Get the total count of innings

  const ctx = document.getElementById('barChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedInnings,
      datasets: [
        {
          label: 'Review Counts',
          data: sortedInnings.map(inning => inningCounts[inning]),
          backgroundColor: 'blue', // Set custom color here
          datalabels: {
            formatter: (value, ctx) => {
              const count = value;
              const percentage = ((value / totalInningCount) * 100).toFixed(2);
              return `${count} (${percentage}%)`;
            },
            color: 'white',
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Innings',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const inningCount = context.parsed;
              const percentage = ((inningCount / totalInningCount) * 100).toFixed(2);
              return `${context.label}: ${inningCount} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}