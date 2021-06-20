const fs = require("fs");


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
        var minD = 10000000;
        console.log("minD");
        console.log(minD);
        partner.offices.forEach((office) => {
          // console.log(office);
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
          (minD > dist)? (minD = dist):null;
        });
        minD <= value
        ? // console.log(`company distance ${dist}`);
         (result.push(partner),
          console.log(minD))
        : // result.push({ organization: partner.organization, officeLoc: office.location})
          console.log("not here");
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
  

// const getCompanyInRange = (value) =>{
//     try {
    
//         const data = fs.readFileSync('./partners.json', 'utf8');
    
//         // parse JSON string to JSON object
//         const partners = JSON.parse(data);
    
//         // print all companies
//         partners.forEach(partner => {
         
//         let dist = calculateDistance(partner.coordinates[0], partner.coordinates[1], 
//             partner.offices.coordinates[0], partner.offices.coordinates[0]);
//             (dist < value)?(console.log(`${partner.id}: ${partner.website}`)):
//             (console.log("not here"));
//             ;
//         });
    
//     } catch (err) {
//         console.log(`Error reading file from disk: ${err}`);
//     }
//     }

// //converting from degrees to radians
// const convertDegToRad = (degree) => {
//     return degree * Math.PI / 180;
// }
// //calculates the distance between two geographical points in km
// const calculateDistance = (la1, lo1, la2, lo2) => {
//     const R = 6371; // Radius of the earth in km

//     const rLa1 =  convertDegToRad(la1);
//     const rLo1 =  convertDegToRad(lo1);
//     const rLa2 =  convertDegToRad(la2);
//     const rLo2 =  convertDegToRad(lo2);

//     const latDifference = Math.abs(rLa2 - rLa1);
//     const lonDifference = Math.abs(rLo2 - rLo1);
   
//     const a = Math.sqrt( Math.pow(Math.cos(la2) * Math.sin(lonDifference), 2) + Math.pow( Math.cos(rLa1) * Math.sin(rLa2) - Math.sin(rLa1) * Math.cos(rLa2) * Math.cos(lonDifference),2));
//     console.log(a)
//     const b = Math.sin(rLa1) * Math.sin(rLa2) + Math.cos(rLa1) * Math.cos(rLa2) * Math.cos (lonDifference);
    
//     console.log(b)
//     const centralAngle = Math.atan(a/b);
//     console.log(centralAngle)
//     const distance  = R * centralAngle;
//     return distance;

// }


// console.log(calculateDistance(-33,151,52,-1.39));

// add the code below
module.exports = { getCompanyInRange };