// Javascript for the Tempreture Chart
const xlabels = [];
const ylabels = [];

chartIt();

async function chartIt() {
  const data = await getData();

  const ctx = document.getElementById("myChart");

  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: data.xs,
        datasets: [
          {
            label: "Land-Ocean Temperature Index, L-OTI)",
            fill: false,
            data: data.ys,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                return value + '"';
              },
            },
          },
        },
      },
    });
  }
}

async function getData() {
  xs = [];
  ys = [];

  const response = await fetch("../temprature-data.csv");
  const data = await response.text();

  table = data.split("\n").slice(2);

  table.forEach((row) => {
    const cols = row.split(",");
    const year = cols[0];
    xs.push(year);

    const temp = cols[1];
    ys.push(parseFloat(temp) + 1);
  });

  return { xs, ys };
}

// Javascript for the towns data

useData();

async function useData() {
  const data = await getTownsData();

  console.log(data.xs, data.ys);
}

async function getTownsData() {
  xs = [];
  ys = [];

  const response = await fetch("../cities-towns.csv");
  const data = await response.text();

  table = data.split("\n").slice(2);

  table.forEach((row) => {
    const cols = row.split('"');
    const town = cols[0].substr(2);
    const population = cols[1];

    xs.push(town.slice(0, -1));
    ys.push(population);
  });

  return { xs, ys };
}
