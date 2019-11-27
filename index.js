'use strict';

const api_key = 'ENTER API KEY';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

let form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();

  let stateCodeElementReference = document.getElementById('which-states');
  let stateCode = stateCodeElementReference.getElementsByTagName('input');
  let stateCodes = [];

  for (let i = 0, len = stateCode.length; i < len; i++) {
    if (stateCode[i].checked) {
      stateCodes.push(stateCode[i].value)
    }
  }

  let maxResults = document.getElementById('max-results').value;
  getParks(stateCodes, maxResults)

});

function getParks(stateCodes, maxResults = 10) {
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
  console.log(responseJson);

  for (let i = 0; i < responseJson.data.length; i++) {
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

function formatQueryString(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&')
}