//queries


//get the ratings from user 4, using $lookup to join 2 collections and $project to display only the information we want
> db.ratings.aggregate([{$match: {user: {$eq :4}}} ,{$lookup: {from: "users", localField: "user", foreignField: "5", as: "rates" }},{$project: {_id:0, age:1, gender:1, occupation:1, user :1, movie : 1, rating:1, id:1}}])
		//result
		{ "user" : 4, "movie" : 11, "rating" : 4 }
		{ "user" : 4, "movie" : 50, "rating" : 5 }
		{ "user" : 4, "movie" : 258, "rating" : 5 }
		{ "user" : 4, "movie" : 260, "rating" : 4 }
		{ "user" : 4, "movie" : 264, "rating" : 3 }
		{ "user" : 4, "movie" : 288, "rating" : 4 }
		{ "user" : 4, "movie" : 271, "rating" : 4 }
		{ "user" : 4, "movie" : 210, "rating" : 3 }
		{ "user" : 4, "movie" : 300, "rating" : 5 }
		{ "user" : 4, "movie" : 294, "rating" : 5 }
		{ "user" : 4, "movie" : 301, "rating" : 5 }
		{ "user" : 4, "movie" : 303, "rating" : 5 }
		{ "user" : 4, "movie" : 324, "rating" : 5 }
		{ "user" : 4, "movie" : 327, "rating" : 5 }
		{ "user" : 4, "movie" : 328, "rating" : 3 }
		{ "user" : 4, "movie" : 329, "rating" : 5 }
		{ "user" : 4, "movie" : 356, "rating" : 3 }
		{ "user" : 4, "movie" : 354, "rating" : 5 }
		{ "user" : 4, "movie" : 357, "rating" : 4 }
		{ "user" : 4, "movie" : 359, "rating" : 5 }
		Type "it" for more



// get all the movies from 1994, using $regex to find a string among a field
db.movies.find({"title": {$regex: ".*1994.*"}},{title:1, _id:0})
		//result
		{ "title" : "Postino, Il (1994)" }
		{ "title" : "Crumb (1994)" }
		{ "title" : "Nadja (1994)" }
		{ "title" : "Clerks (1994)" }
		{ "title" : "Disclosure (1994)" }
		{ "title" : "Dolores Claiborne (1994)" }
		{ "title" : "Eat Drink Man Woman (1994)" }
		{ "title" : "Exotica (1994)" }
		{ "title" : "Ed Wood (1994)" }
		{ "title" : "Hoop Dreams (1994)" }
		{ "title" : "I.Q. (1994)" }
		{ "title" : "Legends of the Fall (1994)" }
		{ "title" : "Madness of King George, The (1994)" }
		{ "title" : "Natural Born Killers (1994)" }
		{ "title" : "Professional, The (1994)" }
		{ "title" : "Pulp Fiction (1994)" }
		{ "title" : "Priest (1994)" }
		{ "title" : "Quiz Show (1994)" }
		{ "title" : "Three Colors: Red (1994)" }
		{ "title" : "Ace Ventura: Pet Detective (1994)" }
		TBC...




//all the students that rated The 5th Element, using $lookup and $filter in $project to only display student ppl
db.ratings.aggregate([{$match : {movie : 250}}, {$lookup: {from : "users", localField: "user", foreignField: "id", as: "stu"}},{$project: {zip_code:1, _id:0, stu:{$filter: {input: "$stu", as: "xd", cond: {$eq: ["$$xd.occupation", "student"]}}}}}])
		//result
		...
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc47095c"), "id" : 221, "age" : 19, "gender" : "M", "occupation" : "student", "zip_code" : "20685" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc470962"), "id" : 226, "age" : 28, "gender" : "M", "occupation" : "student", "zip_code" : "92103" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc470975"), "id" : 246, "age" : 19, "gender" : "M", "occupation" : "student", "zip_code" : "28734" } ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc47097a"), "id" : 248, "age" : 25, "gender" : "M", "occupation" : "student", "zip_code" : "37235" } ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc470978"), "id" : 249, "age" : 25, "gender" : "M", "occupation" : "student", "zip_code" : "84103" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ ] }
		{ "stu" : [ ] }
		{ "stu" : [ ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc470989"), "id" : 270, "age" : 18, "gender" : "F", "occupation" : "student", "zip_code" : "63119" } ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc47098f"), "id" : 276, "age" : 21, "gender" : "M", "occupation" : "student", "zip_code" : "95064" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc4709a0"), "id" : 286, "age" : 27, "gender" : "M", "occupation" : "student", "zip_code" : "15217" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ { "_id" : ObjectId("589b4796c6298ec5fc4709a5"), "id" : 291, "age" : 19, "gender" : "M", "occupation" : "student", "zip_code" : "44106" } ] }
		{ "stu" : [ ] }
		{ "stu" : [ ] }
		TBC... //cannot undisplay the empty sets


//what genre Jaws is, using $match and $lookup
db.movie_genres.aggregate([{$match: {movie:234}},{$lookup:{from : "genres", localField: "genre", foreignField: "id", as: "kind"}},{$project:{_id:0, kind:{genre:1}}}])
		// result
		{ "kind" : [ { "genre" : "Action" } ] }
		{ "kind" : [ { "genre" : "Horror" } ] }


//title of the film from the url
db.movies.find({"IMDBURL":"http://us.imdb.com/M/title-exact?imdb-title-120338"},{title:1,_id:0})
		//result
		{ "title" : "Titanic (1997)" }



