'use strict';

const api_key = 'U5hOgaPaznMv3nOoI3qmyYxC5fXU22VJI2nVscmr';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

let form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('addEventListener() ran');

  // get reference to element containing toppings checkboxes
  let stateCodeElementReference = document.getElementById('which-states');

  // get reference to input elements in toppings container element
  let stateCode = stateCodeElementReference.getElementsByTagName('input');

  // push the stateCode values into an array
  let stateCodes = [];

  // push each stateCode into stateCodes
  for (let i = 0, len = stateCode.length; i < len; i++) {
    if (stateCode[i].checked) {
      stateCodes.push(stateCode[i].value)
    }
  }

  let maxResults = document.getElementById('max-results').value;

  getParks(stateCodes, maxResults)

});

function getParks(stateCodes, maxResults = 10) {
  console.log('getParks() ran');
  console.log(`stateCodes are: ${stateCodes} and maxResults is: ${maxResults}`);
  // stateCode=ca%2Caz&limit=10&api_key=U5hOgaPaznMv3nOoI3qmyYxC5fXU22VJI2nVscmr

  const params = {
    stateCode: stateCodes,
    limit: maxResults,
    api_key: api_key,
  };

  const queryUrl = formatQueryString(params);
  const url = baseUrl + '?' + queryUrl;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))

}

function displayResults(responseJson) {
  console.log('displayResults() ran');
  console.log(responseJson);

  clearResults();

  for (let i = 0; i < responseJson.data.length; i++) {
    console.log(responseJson.data[i].fullName);
    console.log(responseJson.data[i].description);
    console.log(responseJson.data[i].url);

    let newElement = document.createElement('div');
    newElement.innerHTML = `
                            <p>fullName is: ${responseJson.data[i].fullName}</p>
                            <p>description is: ${responseJson.data[i].description}</p>
                            <p>url is: ${responseJson.data[i].url}</p>
`;

    let referenceElement = document.querySelector('div#listResults');

    insertAfter(newElement, referenceElement)
  }

}

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function clearResults() {
  console.log('clearResults() ran');

  // let c = document.getElementById("listResults");
  // while (c.lastChild) c.removeChild(c.lastChild);


}

function formatQueryString(params) {
  console.log('formatQueryString() ran');

  // create arbitrary object to store params in
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  console.log(queryItems);
  console.log(queryItems.join('&'));
  return queryItems.join('&')
}

