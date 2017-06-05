db.training.update(
    { "_id": "5913b4e5b19aa2630157d507" },
    {
        $push: {
            "trainees": {
                $each: [
                    {
                        "psno": 721413,
                        "status": "c",
                        "status_date": "Monday, March 21, 2016 11:19 PM",
                        "target_date": "Thursday, May 26, 2016 12:06 AM"
                    },
                    {
                        "psno": 721418,
                        "status": "c",
                        "status_date": "Thursday, February 9, 2017 10:05 AM",
                        "target_date": "Monday, April 4, 2016 7:43 AM"
                    },
                    {
                        "psno": 721418,
                        "status": "c",
                        "status_date": "Thursday, November 17, 2016 3:07 AM",
                        "target_date": "Monday, January 4, 2016 10:43 AM"
                    },
                    {
                        "psno": 721423,
                        "status": "a",
                        "status_date": "Tuesday, April 25, 2017 3:50 PM",
                        "target_date": "Tuesday, March 21, 2017 9:03 AM"
                    },
                    {
                        "psno": 721423,
                        "status": "a",
                        "status_date": "Monday, August 22, 2016 11:39 PM",
                        "target_date": "Monday, August 8, 2016 8:14 AM"
                    },
                    {
                        "psno": 721420,
                        "status": "c",
                        "status_date": "Saturday, August 20, 2016 12:18 PM",
                        "target_date": "Tuesday, May 24, 2016 10:03 AM"
                    }]
            }
        }
    }
)


db.training.find(
    { "_id": "5913b4e510adad41cc4216d1" },
    { "trainees": { $elemMatch: { "status": "c" } } }
)

db.training.aggregate([
    { $match: { "_id": "5913b4e510adad41cc4216d1" } },
    {
        $project: {
            trainees: {
                $filter: {
                    input: '$trainees',
                    as: 'trainees',
                    cond: { $eq: ['$$trainees.status', 'c'] }
                }
            },
            _id: 1
        }
    }
])

db.training.aggregate(
    [
        { $match: { "_id": "5913b4e510adad41cc4216d1" } },
        { $unwind: "$trainees" },
        { $match: { "trainees.status": "c" } },
        {
            $lookup:
            {
                from: "trainee",
                localField: "trainees.psno",
                foreignField: "_id",
                as: "trainees.trainee_details"
            }
        },
        { $unwind: "$trainees.trainee_details" },
        {
            $project: {
                "psno": "$trainees.psno",
                "status_date": "$trainees.status_date",
                "target_date": "$trainees.target_date",
                "first_name": "$trainees.trainee_details.name.first",
                "last_name": "$trainees.trainee_details.name.last",
                "opco": "$trainees.trainee_details.opco",
                "email": "$trainees.trainee_details.email",
                "phone": "$trainees.trainee_details.phone"
            }
        }
    ]
).pretty()

db.training.findAndModify({
    query: { "_id": "5913b4e5079caaa510eddf55", "trainees.psno": { $in: ["721423"] } },
    update: { $set: { "trainees.[].status": "n" } }
})


db.training.findAndUpdate({
    query: { "_id": "5913b4e510adad41cc4216d1", "trainees.psno": "721424" },
    update: { $set: { "trainees.$.status": "n" } }
})

db.training.find({ status: true, trainees: { $gt: { $size: 0 } } }, { tname: 1 })

db.trainee.aggregate(
    [
        { $match: { 'name.first': { '$regex': 'han', '$options': 'i' } } },
        {
            $lookup:
            {
                from: "training",
                localField: "_id",
                foreignField: "training.trainees.psno",
                as: "trainee.training"
            }
        }
    ]
);

db.training.aggregate(
    [
        { $unwind: "$trainees" },
        { $match: { "trainees.psno": "721425" } },
        {
            $project:
            {
                "tname":1,
                "status":"$trainees.status"
            }
        }
    ]
)