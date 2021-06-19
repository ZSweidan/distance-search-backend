const fs = require("fs");
const http = require("http");
const { parse } = require("querystring");
const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === "/getRange") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString(); // convert Buffer to string
      });

      req.on("end", () => {
        console.log(body);
        getCompanyInRange(body);
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(getCompanyInRange(body)));
      });
    }
  }
});
server.listen(9000);

const getCompanyInRange = (value) => {
  const result = [];
  try {
    const locX = 51.5144636;
    const locY = -0.142571;
    const data = fs.readFileSync("./partners.json", "utf8");
    // parse JSON string to JSON object
    const partners = JSON.parse(data);
    // print all companies
    partners.forEach((partner) => {
      partner.offices.forEach((office) => {
        console.log(office);
        console.log("distance");
        const coordinates = office.coordinates;
        const coordinatesArray = coordinates.split(",");
        let dist = calculateDistance(
          locX,
          locY,
          parseInt(coordinatesArray[0]),
          parseInt(coordinatesArray[1])
        );
        console.log(dist);
        dist <= value
          ? // console.log(`company distance ${dist}`);
            result.push(partner)
          : // result.push({ organization: partner.organization, officeLoc: office.location})
            console.log("not here");
      });
    });
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
  return result;
};

//converting from degrees to radians
const convertDegToRad = (degree) => {
  return (degree * Math.PI) / 180;
};
//calculates the distance between two geographical points in km
const calculateDistance = (la1, lo1, la2, lo2) => {
  const R = 6371; // Radius of the earth in km

  const rLa1 = convertDegToRad(la1);
  const rLo1 = convertDegToRad(lo1);
  const rLa2 = convertDegToRad(la2);
  const rLo2 = convertDegToRad(lo2);
  const latDifference = Math.abs(rLa2 - rLa1);
  const lonDifference = Math.abs(rLo2 - rLo1);

  const a =
    Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
    Math.cos(rLa1) *
      Math.cos(rLa2) *
      Math.sin(lonDifference / 2) *
      Math.sin(lonDifference / 2);
       const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // const a = Math.sqrt(
  //   Math.pow(Math.cos(la2) * Math.sin(lonDifference), 2) +
  //     Math.pow(
  //       Math.cos(rLa1) * Math.sin(rLa2) -
  //         Math.sin(rLa1) * Math.cos(rLa2) * Math.cos(lonDifference),
  //       2
  //     )
  // );
  // console.log(a);
  // const b =
  //   Math.sin(rLa1) * Math.sin(rLa2) +
  //   Math.cos(rLa1) * Math.cos(rLa2) * Math.cos(lonDifference);

  // console.log(b);
  // const centralAngle = Math.atan(a / b);
  // console.log(centralAngle);
  const distance = R * centralAngle;
  return distance;
};

// console.log(calculateDistance(-33,151,52,-1.39));
