var friends = require("../data/friends");

module.exports = function (app) {
    // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

    app.get("/api/friends", function (request, response) {
        // console.log("List all friends");
        response.json(friends)
    })

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post('/api/friends', (req, res) => {
        // console.log("friends:", friends);
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };


        // loop through friends and get compatability score
        friends.forEach(friend => {
            absDiff = 0;
            friend.scores.forEach((questionScore, questionNum) => {
                // console.log("Question Score", questionScore);
                // console.log("index:", questionNum);

                // get the difference for each score
                // console.log("my score:", req.body.scores[questionNum]);
                // console.log("friend score:", questionScore)
                absDiff += Math.abs(parseInt(req.body.scores[questionNum]) - parseInt(questionScore));
                // console.log('absolute difference:', absDiff);
            });

            if (absDiff <= bestMatch.friendDifference) {
                bestMatch.name = friend.name;
                bestMatch.photo = friend.photo;
                bestMatch.friendDifference = absDiff;
            }
        });

        friends.push(req.body);
        res.json(bestMatch);
    });

};