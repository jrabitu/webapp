function fetchModel(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const parsed = JSON.parse(xhr.responseText);
          resolve({ data: parsed });
        } catch (err) {
          reject(new Error(`Invalid JSON response: ${err.message}`));
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error(`Network error while fetching ${url}`));
    };

    xhr.send();
  });
}

export default fetchModel;


/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 * @returns a Promise that should be filled with the response of the GET request
 * parsed as a JSON object and returned in the property named "data" of an
 * object. If the request has an error, the Promise should be rejected with an
 * object that contains the properties:
 * {number} status          The HTTP response status
 * {string} statusText      The statusText from the xhr request
 */
// function fetchModel(url) {
//   return new Promise(function (resolve, reject) {
//     console.log(url);
//     setTimeout(() => reject(new Error(
//       { status: 501, statusText: "Not Implemented" })), 
//       0
//     );
//     // On Success return:
//     // resolve({data: getResponseObject});
//   });
// }

// export default fetchModel;
