//Get the current response from the postman global object which will be of type json.
const response = pm.response.json();
//Do the pm.test to perform a test with a note, which can be anything, and a callback performing the test.
pm.test("Check that the status code is 200",()=>{
    //use chai language  on the pm object.
    pm.response.to.have.status(200);
});

//now failing the test on purpoise
//To check GET methods

pm.test("check if the status code is 201", () => {
    //use chai language on on the response VARIABLE. 
    response.to.have.status(201);
})


//Do the pm.test to perform a test with a note, which can be anything, and a callback performing the test.
pm.test("check if the response is an object",()=>{
    //use chai language to test the pm object
    //test if the response in an object
    pm.expect(response).to.be.an('object');
})


//now failing the test on purpoise
pm.test("check if the response is an array", () => {
    //use chai language on on the response VARIABLE.
    //test if the response is an array
    pm.expect(response).to.be.an('array');
});


//to be run against http://localhost:5000/api/products  ,to check one of the POST methods :

//in body tab in postman app, to chose "raw" and add this object:
{
    "name":"bag1",
    "description":"very nice bag",
    "price": 50
}

//in tests:
//body to a variable because we test to see if it has the correct properties. the pm.request.body.raw is a string
const requestBody=pm.request.body.raw;
//responseTime to a variable because we are testing how long it takes to get a response
const resTime=pm.response.responseTime;

//check the amount of time it takes to create the data
pm.test('check if the amount of time it takes to create the data is less than 200 milliseconds', ()=> {
    pm.expect(resTime).to.be.below(200);
});

//check that the requestBody has a certain string(properties we are checking for) - we are checking if it includes "name":"bag1". Because the raw data of the body is a string we check for a string
pm.test('Name of the created product is named correctly', function(){
    pm.expect(requestBody).to.include('"name":"bag1"');
});

//we make a failing test on purpoise
pm.test("Newly created product has correct description", () => {
    pm.expect(requestBody).to.include('"description":"bag1"');
});


//tests for auth0
//Set the request body to be a variable since we will check it a auth0_id is being passed in
const requestBody=pm.request.body.raw;

//set the time of the response to be a variable, since we are checking if responseTime is lower than a specified number
const resTime = pm.response.responseTime;

//initiat the test to check the response time
pm.test('Check if response time is lower than 200 milliseconds', () => {
    pm.expect(resTime).to.be.below(200);
})

//test if the request body has a auth0_id, via include
pm.test('Check if the requestBody string includes a auth0_id', () => {
    pm.expect(requestBody).to.include('"sub":"github|23343715"')
})

//make the test fail on purpoise by checking if auth0_id contains wrong property
pm.test('Check if the requestBody string includes a wrong property for auth0_id', ()=>{
    pm.expect(requestBody).to.include('"sub":"Ali Quasem')
})


//tests for update product
//check if we have the right id, by setting the requestUrl to request.url.toString()
const requestUrl = pm.request.url.toString()
//test if we got a correct name from our requestBody
const requestBody = pm.request.body.raw;
//test the responseTime
const resTime = pm.response.responseTime

pm.test('Test if response time is less than 200 milliseconds', () => {
    pm.expect(resTime).to.below(200);
})

//test if requestBody contains correct property
pm.test('Test if the name is -bag- by checking if in includes "bag"', ()=>{
    console.log(requestBody)
    pm.expect(requestBody).to.include('"name": "bag"');
})

//test if the url contains the right id
pm.test('Test if the url includes correct id', ()=>{
    pm.expect(requestUrl).to.include('5cc2ffa865f0942cf09d374e');
})

//test to fail on purpoise
pm.test('test if requestTime is more than 200 milliseconds',()=>{
    pm.expect(resTime).to.above(200);
})


//tests for deleting products
//get the current response from the postman global object, that will be of type JSON
let response = pm.response.json();

const requestUrl = pm.request.url;

//pm.test with a note just to check it works and with a callback performing the test
pm.test('Check that the status code is 200',()=>{
    pm.respone.to.have.status(200);
})

//pm.test with a note just to check it works and with a callback performing the test
pm.test('Check that the url has the right id', ()=>{
    //convert the requestUrl to a string and see if it includes the correct id
    pm.expect(requestUrl.toString()).to.include('5cc33f73e73a8c49a48524c7')
})

//test that will fail on purpoise
pm.test('Check if the response is an array',()=>{
    pm.expect(response).to.be.an('array');
})