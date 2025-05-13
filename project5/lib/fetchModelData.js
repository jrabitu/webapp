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

function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    console.log("fetching ", url);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {

      if (xhr.status === 200) {
        try {
          const responseData = JSON.parse(xhr.responseText);
          resolve({ data: responseData });
        } catch (e) {
          reject(new Error(`JSON response (status: ${xhr.status})`));
        }
      } else {
        reject(new Error(`HTTP Error ${xhr.status}: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error"));
    };

    xhr.send();
  });
}

export default fetchModel;
