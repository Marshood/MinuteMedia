const express = require('express')
const app = express();
const port = 3000;
const fs = require("fs");
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(express.static('public'))
app.use(express.static('Data'))


// path for csv files
var first_file = process.argv[2];
var second_file = process.argv[3];

const csvFilePathresult_played = "Data/result_played.csv"
const csvFilePathresult_upcoming = "Data/result_upcoming.csv"

if (first_file != undefined && second_file != undefined && first_file != null && second_file != null && second_file != "" &&
    second_file != "") {
    csvFilePathresult_played = first_file;
    csvFilePathresult_upcoming = second_file;
}

// read the files and save to JSON file 
var result_played = readFileCsv(csvFilePathresult_played)
    // let json = JSON.stringify(result_played);
    // fs.writeFileSync('result_played.json', json);
var result_upcoming = readFileCsv(csvFilePathresult_upcoming)
    // json = JSON.stringify(result_upcoming);
    // fs.writeFileSync('result_upcoming.json', JSON.stringify(result_upcoming));
    //read the Data and save to Json format
function readFileCsv(path) {
    //read the files and save to JSON file 
    var readFile = fs.readFileSync(path)
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        .map(e => e.split(',').map(e => e.trim()));

    return readFile;
}
app.post('/matchesFilter', function(req, res) {
    const {
        tournament,
        Status,
        team
    } = req.body;
    const result = [];

    if (tournament != 'All' && Status == 'All' && team == 'All') {
        for (let i = 1; i < result_played.length; i++) {
            if (result_played[i][4] == tournament) {
                // adding to the result array
                result.push({
                    "home_team": result_played[i][0],
                    "away_team": result_played[i][2],
                    "home_score": result_played[i][1],
                    "away_score": result_played[i][3],
                    "tournament": result_played[i][4],
                    "start_time": result_played[i][5],
                    "kickoff": 'played',
                    "status": 'played',
                })
            }
        }
        for (let i = 1; i < result_upcoming.length; i++) {
            if (result_upcoming[i][2] == tournament) {
                // adding to the result array
                result.push({
                    "home_team": result_upcoming[i][0],
                    "away_team": result_upcoming[i][1],
                    "home_score": 'upcoming',
                    "away_score": 'upcoming',
                    "tournament": result_upcoming[i][2],
                    "start_time": result_upcoming[i][3],
                    "kickoff": result_upcoming[i][4],
                    "status": 'upcoming',
                })
            }
        }
    } else if (tournament == 'All' && Status == 'All' && team != 'All') {
        for (let i = 1; i < result_played.length; i++) {
            if (result_played[i][0] == team || result_played[i][2] == team) {
                // adding to the result array
                result.push({
                    "home_team": result_played[i][0],
                    "away_team": result_played[i][2],
                    "home_score": result_played[i][1],
                    "away_score": result_played[i][3],
                    "tournament": result_played[i][4],
                    "start_time": result_played[i][5],
                    "kickoff": 'played',
                    "status": 'played',
                })
            }
        }
        for (let i = 1; i < result_upcoming.length; i++) {
            if (result_upcoming[i][0] == team || result_upcoming[i][1] == team) {

                // adding to the result array
                result.push({
                    "home_team": result_upcoming[i][0],
                    "away_team": result_upcoming[i][1],
                    "home_score": 'upcoming',
                    "away_score": 'upcoming',
                    "tournament": result_upcoming[i][2],
                    "start_time": result_upcoming[i][3],
                    "kickoff": result_upcoming[i][4],
                    "status": 'upcoming',
                })
            }
        }
    } else if (tournament == 'All' && Status != 'All' && team == 'All') {
        if (Status == 'upcoming') {
            for (let i = 1; i < result_upcoming.length; i++) {
                // adding to the result array
                result.push({
                    "home_team": result_upcoming[i][0],
                    "away_team": result_upcoming[i][1],
                    "home_score": 'upcoming',
                    "away_score": 'upcoming',
                    "tournament": result_upcoming[i][2],
                    "start_time": result_upcoming[i][3],
                    "kickoff": result_upcoming[i][4],
                    "status": 'upcoming',
                })

            }
        } else {
            for (let i = 1; i < result_played.length; i++) {

                result.push({
                    "home_team": result_played[i][0],
                    "away_team": result_played[i][2],
                    "home_score": result_played[i][1],
                    "away_score": result_played[i][3],
                    "tournament": result_played[i][4],
                    "start_time": result_played[i][5],
                    "kickoff": 'played',
                    "status": 'played',
                })

            }
        }
    } else if (tournament != 'All' && Status != 'All' && team == 'All') {
        if (Status == 'upcoming') {
            for (let i = 1; i < result_upcoming.length; i++) {
                // adding to the result array
                if (result_upcoming[i][2] == tournament) {
                    result.push({
                        "home_team": result_upcoming[i][0],
                        "away_team": result_upcoming[i][1],
                        "home_score": 'upcoming',
                        "away_score": 'upcoming',
                        "tournament": result_upcoming[i][2],
                        "start_time": result_upcoming[i][3],
                        "kickoff": result_upcoming[i][4],
                        "status": 'upcoming',
                    })

                }
            }
        } else {
            for (let i = 1; i < result_played.length; i++) {
                if (result_played[i][4] == tournament) {
                    result.push({
                        "home_team": result_played[i][0],
                        "away_team": result_played[i][2],
                        "home_score": result_played[i][1],
                        "away_score": result_played[i][3],
                        "tournament": result_played[i][4],
                        "start_time": result_played[i][5],
                        "kickoff": 'played',
                        "status": 'played',
                    })
                }
            }
        }



    } else if (tournament != 'All' && Status == 'All' && team != 'All') {
        for (let i = 1; i < result_played.length; i++) {
            if (result_played[i][4] == tournament && (result_played[i][0] == team || result_played[i][2] == team)) {
                // adding to the result array
                result.push({
                    "home_team": result_played[i][0],
                    "away_team": result_played[i][2],
                    "home_score": result_played[i][1],
                    "away_score": result_played[i][3],
                    "tournament": result_played[i][4],
                    "start_time": result_played[i][5],
                    "kickoff": 'played',
                    "status": 'played',
                })
            }
        }
        for (let i = 1; i < result_upcoming.length; i++) {
            if (result_upcoming[i][2] == tournament && (result_upcoming[i][0] == team || result_upcoming[i][1] == team)) {
                // adding to the result array
                result.push({
                    "home_team": result_upcoming[i][0],
                    "away_team": result_upcoming[i][1],
                    "home_score": 'upcoming',
                    "away_score": 'upcoming',
                    "tournament": result_upcoming[i][2],
                    "start_time": result_upcoming[i][3],
                    "kickoff": result_upcoming[i][4],
                    "status": 'upcoming',
                })
            }
        }


    } else if (tournament == 'All' && Status != 'All' && team != 'All') {

        if (Status == 'upcoming') {
            for (let i = 1; i < result_upcoming.length; i++) {
                // adding to the result array
                if (result_upcoming[i][0] == team || result_upcoming[i][1] == team) {
                    result.push({
                        "home_team": result_upcoming[i][0],
                        "away_team": result_upcoming[i][1],
                        "home_score": 'upcoming',
                        "away_score": 'upcoming',
                        "tournament": result_upcoming[i][2],
                        "start_time": result_upcoming[i][3],
                        "kickoff": result_upcoming[i][4],
                        "status": 'upcoming',
                    })

                }
            }
        } else {
            for (let i = 1; i < result_played.length; i++) {
                if (result_played[i][0] == team || result_played[i][2] == team) {
                    result.push({
                        "home_team": result_played[i][0],
                        "away_team": result_played[i][2],
                        "home_score": result_played[i][1],
                        "away_score": result_played[i][3],
                        "tournament": result_played[i][4],
                        "start_time": result_played[i][5],
                        "kickoff": 'played',
                        "status": 'played',
                    })
                }
            }
        }
    } else if (tournament != 'All' && Status != 'All' && team != 'All') {
        if (Status == 'upcoming') {
            for (let i = 1; i < result_upcoming.length; i++) {
                // adding to the result array
                if (result_upcoming[i][2] == tournament && (result_upcoming[i][0] == team || result_upcoming[i][1] == team)) {
                    result.push({
                        "home_team": result_upcoming[i][0],
                        "away_team": result_upcoming[i][1],
                        "home_score": 'upcoming',
                        "away_score": 'upcoming',
                        "tournament": result_upcoming[i][2],
                        "start_time": result_upcoming[i][3],
                        "kickoff": result_upcoming[i][4],
                        "status": 'upcoming',
                    })

                }
            }
        } else {
            for (let i = 1; i < result_played.length; i++) {
                if (result_played[i][4] == tournament && (result_played[i][0] == team || result_played[i][2] == team)) {
                    result.push({
                        "home_team": result_played[i][0],
                        "away_team": result_played[i][2],
                        "home_score": result_played[i][1],
                        "away_score": result_played[i][3],
                        "tournament": result_played[i][4],
                        "start_time": result_played[i][5],
                        "kickoff": 'played',
                        "status": 'played',
                    })
                }
            }
        }


    } else {
        for (let i = 1; i < result_played.length; i++) {
            result.push({
                "home_team": result_played[i][0],
                "away_team": result_played[i][2],
                "home_score": result_played[i][1],
                "away_score": result_played[i][3],
                "tournament": result_played[i][4],
                "start_time": result_played[i][5],
                "kickoff": 'played',
                "status": 'played',

            })
        }
        for (let i = 1; i < result_upcoming.length; i++) {

            // adding to the result array
            result.push({
                "home_team": result_upcoming[i][0],
                "away_team": result_upcoming[i][1],
                "home_score": 'upcoming',
                "away_score": 'upcoming',
                "tournament": result_upcoming[i][2],
                "start_time": result_upcoming[i][3],
                "kickoff": result_upcoming[i][4],
                "status": 'upcoming',
            })

        }
    }
    res.send(JSON.stringify(result))

});
// to get the teams to fill the combo box
app.get('/GetListOfTeams', function(req, res) {
    let teams = [];
    for (let i = 1; i < result_played.length; i++) {
        if (!teams.includes(result_played[i][0])) {
            teams.push(result_played[i][0]);
        }
        if (!teams.includes(result_played[i][2])) {
            teams.push(result_played[i][2]);
        }
    }
    res.send(JSON.stringify(teams))
});
// to get the tournament names to fill the combox
app.get('/GetListOftournament', function(req, res) {
    let tournament = [];
    for (let i = 1; i < result_played.length; i++) {
        if (!tournament.includes(result_played[i][4])) {
            tournament.push(result_played[i][4]);
        }
    }
    res.send(JSON.stringify(tournament))
});
// to get all the matches to fill the table
app.get('/GetAllData', function(req, res) {

    let AllData = [];
    for (let i = 1; i < result_played.length; i++) {
        AllData.push({
            "home_team": result_played[i][0],
            "away_team": result_played[i][2],
            "home_score": result_played[i][1],
            "away_score": result_played[i][3],
            "tournament": result_played[i][4],
            "start_time": result_played[i][5],
            "kickoff": 'played',
            "status": 'played',

        })
    }
    for (let i = 1; i < result_upcoming.length; i++) {

        // adding to the result array
        AllData.push({
            "home_team": result_upcoming[i][0],
            "away_team": result_upcoming[i][1],
            "home_score": 'upcoming',
            "away_score": 'upcoming',
            "tournament": result_upcoming[i][2],
            "start_time": result_upcoming[i][3],
            "kickoff": result_upcoming[i][4],
            "status": 'upcoming',
        })

    }
    res.send(JSON.stringify(AllData))
});

app.listen(port, () => {
    console.log("App is Listening to -> " + port)
})