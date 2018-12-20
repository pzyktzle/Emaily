# Emaily

Email Marketing Campaign Platform (with credit card payments)

### Notes

When we do token-based authentication, such as OpenID, OAuth, or OpenID Connect, we receive an access_token (and sometimes id_token) from a trusted authority. Usually we want to store it and send it along with HTTP Requests for protected resources. How do we do that?

Option 1 is to store the token(s) in a cookie. This handles storage and also automatically sends the token(s) to the server in the Cookie header of each request. The server then parses the cookie, checks the token(s), and responds accordingly. A cookie is a name-value pair, that is stored in a web browser, and that has an expiry date and associated domain.

Another option is to store a bearer token in local/session storage, and then manually set the Authorization header of each request. In this case, the server reads the header and proceeds just like with a cookie. A bearer token is a value that goes into the Authorization header of any HTTP Request. It is not automatically stored anywhere, it has no expiry date, and no associated domain. It's just a value.

The biggest difference between bearer tokens and cookies is that the browser will automatically send cookies, where bearer tokens need to be added explicitly to the HTTP request. Also, cookies make it more difficult for non-browser based applications (like mobile to tablet apps) to consume your API.
