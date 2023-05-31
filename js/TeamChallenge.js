d3.json('json_data/play_information.json')
  .then(playData => {
    // Fetch the JSON data from review_outcome_information.json
    d3.json('json_data/review_outcome_information.json')
      .then(reviewData => {
        // Group the data by challenging team and replay official ruling
        const groupedData = {};

        playData.slice(1).forEach(entry => {
          const team = entry.Challenging_Team;
          const reviewNum = entry.Replay_Review_Num;
          const ruling = reviewData
            .slice(1)
            .filter(review => review.Replay_Review_Num === reviewNum)
            .map(review => review.Replay_Official_Ruling);

          if (!groupedData[team]) {
            groupedData[team] = {};
          }

          ruling.forEach(r => {
            if (!groupedData[team][r]) {
              groupedData[team][r] = 0;
            }
            groupedData[team][r] += 1;
          });
        });

        // Get the unique replay official ruling categories
        const rulingCategories = Array.from(
          new Set(
            Object.values(groupedData)
              .map(Object.keys)
              .flat()
          )
        );

        // Set up the dimensions and margins for the chart
        const margin = { top: 40, right: 20, bottom: 40, left: 70 };
        const width = 1000 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Create an SVG element and set its dimensions
        const svg = d3.select('#team-challenge-container')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

        // Create a main group for the chart content
        const chart = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up the scales for the x and y axes
        const xScale = d3.scaleBand()
          .domain(Object.keys(groupedData))
          .range([0, width])
          .padding(0.1);

        const yScale = d3.scaleLinear()
          .domain([0, d3.max(Object.values(groupedData), d => d3.max(Object.values(d)))])
          .range([height, 0]);

        // Set up the color scale for the replay official rulings
        const colorScale = d3.scaleOrdinal()
          .domain(rulingCategories)
          .range(d3.schemeCategory10);

        // Create and append the x and y axes to the SVG
        chart.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(xScale))
          .selectAll('text')
          .attr('transform', 'rotate(-45)')
          .attr('text-anchor', 'end')
          .attr('dx', '-0.8em')
          .attr('dy', '0.15em');

        chart.append('g')
          .call(d3.axisLeft(yScale));

        // Create the bars representing each replay official ruling category for each challenging team
        const bars = chart
        .selectAll('.bar')
        .data(Object.entries(groupedData))
        .enter()
        .append('g')
        .attr('class', 'bar')
        .attr('transform', (d) => `translate(${xScale(d[0])},0)`)
        .selectAll('rect') // Select all rect elements within each bar group
        .data(
          ([team, rulings]) =>
            Object.entries(rulings).map(([ruling, count]) => ({
              team,
              ruling,
              count,
            }))
        )
        .enter()
        .append('rect')
        .attr('x', (d) => xScale.bandwidth() / rulingCategories.length * rulingCategories.indexOf(d.ruling))
        .attr('y', (d) => yScale(d.count))
        .attr('width', xScale.bandwidth() / rulingCategories.length)
        .attr('height', (d) => height - yScale(d.count))
        .attr('fill', (d) => colorScale(d.ruling))
        .on('mouseover', function (d) {
          // Get the current mouse position
          const [mouseX, mouseY] = d3.mouse(this);

          // Display a tooltip with the value
          d3.select(this).append('title').text(d.count);

          // Show the tooltip near the mouse position
          d3.select('#team-challenge-container')
            .append('div')
            .attr('class', 'tooltip')
            .style('left', `${mouseX + 10}px`)
            .style('top', `${mouseY}px`)
            .text(d.count);
        })
        .on('mouseout', function () {
          // Remove the tooltip when the mouse is moved away from the bar
          d3.select(this).select('title').remove();

          d3.select('#team-challenge-container').select('.tooltip').remove();
        });

        // Create a legend for the replay official rulings
        const legend = svg.append('g')
          .attr('class', 'legend')
          .attr('transform', `translate(${width - margin.right - 150},${margin.top})`);

        const legendItems = legend.selectAll('.legend-item')
          .data(rulingCategories)
          .enter()
          .append('g')
          .attr('class', 'legend-item')
          .attr('transform', (d, i) => `translate(0,${i * 20})`);

        legendItems.append('rect')
          .attr('x', 0)
          .attr('width', 10)
          .attr('height', 10)
          .style('fill', colorScale);

        legendItems.append('text')
          .attr('x', 15)
          .attr('y', 9)
          .text(d => d);
      });
  });