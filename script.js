function generateTable(data) {
  const standings = data.standings[0].table;
  const tableContainer = document.getElementById("table-container");

  const table = document.createElement("table");

  table.innerHTML = `
      <thead>
        <tr>
          <th>Position</th>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Goal Difference</th>
        </tr>
      </thead>
    `;

  const tbody = document.createElement("tbody");
  standings.forEach((team) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${team.position}</td>
        <td class="team-name">
          <img src="${team.team.crest}" alt="${team.team.name} logo">
          ${team.team.name}
        </td>
        <td>${team.playedGames}</td>
        <td>${team.won}</td>
        <td>${team.draw}</td>
        <td>${team.lost}</td>
        <td>${team.points}</td>
        <td>${team.goalsFor}</td>
        <td>${team.goalsAgainst}</td>
        <td>${team.goalDifference}</td>
      `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

async function fetchFootballData(leagueCode) {
  if (!leagueCode) {
    return;
  }

  const response = await fetch(`/api/fetchFootballData?league=${leagueCode}`);
  const data = await response.json();
  generateTable(data);
}

document
  .getElementById("league-selector")
  .addEventListener("change", (event) => {
    const leagueCode = event.target.value;

    const header = document.getElementById("header");
    header.classList.add("moved");

    fetchFootballData(leagueCode);
  });

document
  .getElementById("league-selector")
  .addEventListener("change", (event) => {
    const leagueCode = event.target.value;

    if (leagueCode) {
      const dropdownContainer = document.getElementById("dropdown-container");
      dropdownContainer.style.marginTop = "20px";
      dropdownContainer.style.transition = "margin 0.5s ease";

      fetchFootballData(leagueCode);
    }
  });

  function displayLeagueTable(leagueData) {
    const tableContainer = document.getElementById('table-container');
    const table = document.querySelector('#table-container table');
  
    if (leagueData && leagueData.length > 0) {
      tableContainer.style.display = 'block'; // Show container when data is available
      table.innerHTML = generateTableHTML(leagueData); // Populate table with data
    } else {
      tableContainer.style.display = 'none'; // Hide container if no data
    }
  }
  