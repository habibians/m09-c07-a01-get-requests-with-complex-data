# Assignment

- "Review The National Parks Services API documentation' and create an API 
key."
  - "Review the API Guide on Authentication' for ways to pass your API key as
  part of the request."

- "Review the /parks endpoint' and data model' to understand how it works."

- "Create a new app and push it to GitHub."

- "When you're done, submit the link to your GitHub repo at the bottom of the 
page."



# Requirements

- > "The user must be able to search for parks in one or more states."
  - Create an HTML page with a form. Give the form an `id` so that it can be 
  targeted.
  - Create a `checkboxes` input field. The values of the checkboxes should
  correspond to each `stateCode` offered by `/parks` endpoint.
  - Give the checkboxes field an id. `stateCodes`
  - Something like this should work: 
    - https://preview.tinyurl.com/t76jpxx
    - https://preview.tinyurl.com/rdwdnzo

  
- >"The user must be able to set the max number of results, with a default of
   10."
  - Create an input field in the mentioned `form`. This field will be used to
  limit the number of results returned. Use `limit` param.
  - Give this input field an id. `maxReslults`


- > "The search must trigger a call to NPS's API."
  - Create an event listener that is triggered when the the form is submitted.
  - Upon submission the listener should grab the values for `stateCodes` and
  `maxReslults`.
    - Test this by consoling out those values.

  - Create a function, `getParks()`, that calls NPS api.
  - This function should be called within the event listener function.
      - Test this by consoling out that the function ran.
  - We'll come back to `getParks()` in a moment.
    
  - I'll need a way to build the endpoint that I'll later use to call the
  fetchAPI with.
    - Create a function, `formatQueryParams(params)`, that consumes 
    `stateCodes` and `maxResults`, then returns a string. 
    
  - Now use the `fetch()` api to call the NPS api.
    - `baseUrl = https://developer.nps.gov/api/v1/parks`
    - `queryUrl = stateCode=#{stateCode}&limit=${limit}&api_key=${api_key}`
    - `queryUrl = stateCode=ca%2Caz&limit=10&api_key=U5hOgaPaznMv3nOoI3qmyYxC5fXU22VJI2nVscmr`
 

- > "The parks in the given state must be displayed on the page. Include at
least:"
  - > Full name
  - > Description
  - > Website URL

  -  Create a function, `displayResults`, that displays the response returned
  from `getParks`.

- "The user must be able to make multiple searches and see only the results for 
the current search."
