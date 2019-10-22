function analyticsMiddleware(data, request, response) {

    console.log("Inside analytics middleware");

    console.log(JSON.stringify(data));
    console.log(request)
    // response.json({name: "Invalid request"});
}

export default analyticsMiddleware;
