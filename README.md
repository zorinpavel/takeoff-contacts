<h1>Takeoff API</h1>

<ul>
    <li><h3>Register new API user</h3></li>
    <ol>
        <li><b>Create new user</b><br>POST /users<br>
            {
            "name": "API user",
            "email": "apiuser@apiuser.com",
            "password": "apiUserPassword"
            }<br>
            Use "tokens" as Bearer token
        </li>
        <li><b>Login</b><br>POST /users/login<br>
            {
            "email": "apiuser@apiuser.com",
            "password": "apiUserPassword"
            }
        </li>
        <li><b>Update user</b><br>PATCH /users/me<br>
            {
            "password": "newUserPassword"
            }
        </li>
        <li><b>Delete user</b><br>DELETE /users/me</li>
    </ol>
    <li><h3>Use API</h3></li>
    <ol>
        <li><b>Create contact</b><br>POST /contacts<br>
            {
            "firstName": "John",
            "lastName": "Doe",
            "phoneNumber": "+7 904 892 3499",
            }
        </li>
        <li>GET /contacts</li>
        <li>PATCH /contacts/&lt;_id&gt;<br>
            {
            "phoneNumber": "+7 904 892 3494",
            }
        </li>
        <li>GET /contacts/&lt;_id&gt;</li>
        <li>DELETE /contacts/&lt;_id&gt;</li>
    </ol>
</ul>
