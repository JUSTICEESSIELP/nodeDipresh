The HTTP 404 Not Found response status code indicates that the server could not find a client-requested webpage

A 400 Bad Request error is an HTTP status code that describes an error caused by an invalid request sent to the server.






jwt.sign ()  // used when you are creating the login Controller . After you have found the unique 


remember when you go the jwt website the JWT token has parts 

1. algo of hash that is encoded 
2. payload is the part that has to do with the data the user would provide in the jwt.sign() dont include the password . so all these is encoded in a hashform
3. the verify signature 


the method has 3 params 
  - object having the users information like username, email but dont password 
  - the access token secret 
  - the duration of the access token 






After signing the jwt signature and res.send() it we need to middle to verfy the JWT when someone is trying to access a protected route. 

pass the access in the header of the route that we want to protect 
Authorization  : Bearer <accessToken>

or make it a Bearer Token#   n o d e D i p r e s h  
 