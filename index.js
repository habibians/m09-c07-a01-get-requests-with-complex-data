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

function formatQueryString(params) {
  console.log('formatQueryString() ran');

  // create arbitrary object to store params in
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  console.log(queryItems);
  console.log(queryItems.join('&'));
  return queryItems.join('&')
}

function getParks(stateCodes, maxResults) {
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

  console.log(url);
}