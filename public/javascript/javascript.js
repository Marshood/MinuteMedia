 
//fill the combox
var selectTeams = document.getElementById("teams");
var selectTournament = document.getElementById("tournament");
var table = document.querySelector("#mainTable");
const loadingFlag=true;
function hideAndShowLoader() {
    var x = document.getElementById("loader");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
 loadData();
async function loadData(){
   
    fetch('/GetListOfTeams')
    .then(res => res.json())
    .then(data => {
         for(var i = 0; i < data.length; i++) {
            var opt = data[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            selectTeams.appendChild(el);
        }
    });
    fetch('/GetListOftournament')
    .then(res => res.json())
    .then(data => {
         for(var i = 0; i < data.length; i++) {
            var opt = data[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            selectTournament.appendChild(el);
        }
    });
    fetch('/GetAllData')
    .then(res => res.json())
    .then(data => {
         hideAndShowLoader();
       for(var i = 0; i < data.length; i++) {
        table.innerHTML += 
        `<tr>
        <td>${data[i].home_team}</td>
        <td>${data[i].away_team}</td>
         <td>${data[i].home_score}</td>
        <td>${data[i].away_score}</td>
        <td>${data[i].tournament}</td>
        <td>${data[i].start_time}</td>
        <td>${data[i].kickoff}</td>
        <td>${data[i].status}</td>
      </tr>`;
       }
    });


}


function filtermatches(){
    var e = document.getElementById("tournament");
    var tournamentValue = e.options[e.selectedIndex].text;
    e=document.getElementById("teams");
    var teamsValue=e.options[e.selectedIndex].text;
    e=document.getElementById("Status");
    var StatusValue=e.options[e.selectedIndex].text;
     hideAndShowLoader();
    
    fetch('/matchesFilter', {
        method: 'POST',
        body: JSON.stringify({
            "tournament":tournamentValue,
            "Status":StatusValue,
            "team":teamsValue
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            hideAndShowLoader();
            table.innerHTML =`    <thead> 
            <tr>
              <th>home_team</th>
              <th>away_team</th>
              <th>home_score</th>
              <th>away_score</th>
              <th>tournament</th>
              <th>start_time</th>
              <th>kickoff</th>
              <th>status</th>
            </tr>
        </thead>`;
       for(var i = 0; i < data.length; i++) {
        table.innerHTML += 
        `<tr>
        <td>${data[i].home_team}</td>
        <td>${data[i].away_team}</td>
         <td>${data[i].home_score}</td>
        <td>${data[i].away_score}</td>
        <td>${data[i].tournament}</td>
        <td>${data[i].start_time}</td>
        <td>${data[i].kickoff}</td>
        <td>${data[i].status}</td>
      </tr>`;
       }
           
        })
    
 }
 

 
 

