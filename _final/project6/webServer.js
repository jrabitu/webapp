/**
 * This builds on the webServer of previous projects in that it exports the
 * current directory via webserver listing on a hard code (see portno below)
 * port. It also establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch
 * any file accessible to the current user in the current directory or any of
 * its children.
 *
 * This webServer exports the following URLs:
 * /            - Returns a text status message. Good for testing web server
 *                running.
 * /test        - Returns the SchemaInfo object of the database in JSON format.
 *                This is good for testing connectivity with MongoDB.
 * /test/info   - Same as /test.
 * /test/counts - Returns the population counts of the cs142 collections in the
 *                database. Format is a JSON object with properties being the
 *                collection name and the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the
 * database:
 * /user/list         - Returns an array containing all the User objects from
 *                      the database (JSON format).
 * /user/:id          - Returns the User object with the _id of id (JSON
 *                      format).
 * /photosOfUser/:id  - Returns an array with all the photos of the User (id).
 *                      Each photo should have all the Comments on the Photo
 *                      (JSON format).
 */

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const async = require("async");

const express = require("express");
const app = express();

// Load the Mongoose schema for User, Photo, and SchemaInfo
const User = require("./schema/user.js");
const Photo = require("./schema/photo.js");
const SchemaInfo = require("./schema/schemaInfo.js");

// XXX - Your submission should work without this line. Comment out or delete
// this line for tests and before submission!
//const cs142models = require("./modelData/photoApp.js").cs142models;
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/cs142project6", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// We have the express static module
// (http://expressjs.com/en/starter/static-files.html) do all the work for us.
app.use(express.static(__dirname));

//root route
app.get("/", function (request, response) {
  response.send("Simple web server of files from " + __dirname);
});

/**
 * Use express to handle argument passing in the URL. This .get will cause
 * express to accept URLs with /test/<something> and return the something in
 * request.params.p1.
 * 
 * If implement the get as follows:
 * /test        - Returns the SchemaInfo object of the database in JSON format.
 *                This is good for testing connectivity with MongoDB.
 * /test/info   - Same as /test.
 * /test/counts - Returns an object with the counts of the different collections
 *                in JSON format.
 */

//test route to fheck db connection and schema info
app.get("/test/:p1", function (request, response) {
  // Express parses the ":p1" from the URL and returns it in the request.params
  // objects.
  console.log("/test called with param1 = ", request.params.p1);

  const param = request.params.p1 || "info";

  if (param === "info") {
    // Fetch the SchemaInfo. There should only one of them. The query of {} will
    // match it.
    SchemaInfo.find({}, function (err, info) {
      if (err) {
        // Query returned an error. We pass it back to the browser with an
        // Internal Service Error (500) error code.
        console.error("Error in /user/info:", err);
        response.status(500).send(JSON.stringify(err));
        return;
      }
      if (info.length === 0) {
        // Query didn't return an error but didn't find the SchemaInfo object -
        // This is also an internal error return.
        response.status(500).send("Missing SchemaInfo");
        return;
      }

      // We got the object - return it in JSON format.
      console.log("SchemaInfo", info[0]);
      response.end(JSON.stringify(info[0]));
    });
  } else if (param === "counts") {
    // In order to return the counts of all the collections we need to do an
    // async call to each collections. That is tricky to do so we use the async
    // package do the work. We put the collections into array and use async.each
    // to do each .count() query.
    const collections = [
      { name: "user", collection: User },
      { name: "photo", collection: Photo },
      { name: "schemaInfo", collection: SchemaInfo },
    ];
    async.each(
      collections,
      function (col, done_callback) {
        col.collection.countDocuments({}, function (err, count) {
          col.count = count;
          done_callback(err);
        });
      },
      function (err) {
        if (err) {
          response.status(500).send(JSON.stringify(err));
        } else {
          const obj = {};
          for (let i = 0; i < collections.length; i++) {
            obj[collections[i].name] = collections[i].count;
          }
          response.end(JSON.stringify(obj));
        }
      }
    );
  } else {
    response.status(400).send("Bad param " + param);
  }
});

//**************************************************************** */
/**
 * URL /user/list - Returns all the User objects. steeepppp 1
 */
// app.get("/user/list", function (request, response) {
//   response.status(200).send(cs142models.userListModel());
// });
// app.get("/user/list", async function (request, response) {
//   try{
//     const users = await User.find({},'_id', 'first_name', 'last_name').lean();
//     response.status(200).send(users);
//   } catch (err) {
//     console.error(err);
//     response.status(500).send("Internal Server Error");
//   }
// });

app.get("/user/list", async function (request, response) {
  try {
    const users = await User.find({}, "_id first_name last_name").lean();
    if (!users || users.length === 0) {
      console.log("No users found.");
      response.status(400).send("No users found.");
      return;
    }
    response.status(200).send(users);
  } catch (err) {
    console.error("Error fetching user list:", err);
    response.status(500).send("Internal Server Error");
  }
});


app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne(
      { _id: userId },
      "_id first_name last_name location description occupation"
    ).lean();
    if (!user) {
      // 400 if user not found
      res.status(400).send({ error: "User not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(400).send({ error: "Invalid user ID format" });
  }
});

/**
 * URL /user/:id - Returns the information for User (id).
//  */
// app.get("/user/:id", function (request, response) {
//   const id = request.params.id;
//   const user = cs142models.userModel(id);
//   if (user === null) {
//     console.log("User with _id:" + id + " not found.");
//     response.status(400).send("Not found");
//     return;
//   }
//   response.status(200).send(user);
// });

//later version of /user/:id
// app.get("/user/:id", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findOne(
//       { _id: userId },
//       "_id first_name last_name location description occupation"
//     ).lean();
//     if (!user) {
//       res.status(400).send({ error: "Invalid user ID" });
//     } else {
//       res.status(200).send(user);
//     }
//   } catch (err) {
//     console.error("Error fetching user by ID:", err);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });



/**
 * URL /photosOfUser/:id - Returns the Photos for User (id).
 */
// app.get("/photosOfUser/:id", function (request, response) {
//   const id = request.params.id;
//   const photos = cs142models.photoOfUserModel(id);
//   if (photos.length === 0) {
//     console.log("Photos for user with _id:" + id + " not found.");
//     response.status(400).send("Not found");
//     return;
//   }
//   response.status(200).send(photos);
// });

// 

app.get("/photosOfUser/:id", async function (request, response) {
  const userId = request.params.id;
  try {
    const photos = await Photo.find({ user_id: userId }).lean();
    if (photos.length === 0) {
      console.log("Photos for user with _id:" + userId + " not found.");
      response.status(400).send("No photos found for this user ID");
      return;
    }

    const updatedPhotos = await Promise.all(
      photos.map(async (photo) => {
        const updatedComments = await Promise.all(
          photo.comments.map(async (comment) => {
            const user = await User.findOne(
              { _id: comment.user_id },
              "_id first_name last_name"
            ).lean();
            return {
              _id: comment._id,
              comment: comment.comment,
              date_time: comment.date_time,
              user: user,
            };
          })
        );

        return {
          _id: photo._id,
          user_id: photo.user_id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          comments: updatedComments,
        };
      })
    );

    response.status(200).send(updatedPhotos);
  } catch (err) {
    console.error("Error fetching photos of user:", err);
    response.status(400).send("Invalid user ID format");
  }
});




const server = app.listen(3000, function () {
  const port = server.address().port;
  console.log(
    "Listening at http://localhost:" +
      port +
      " exporting the directory " +
      __dirname
  );
});
