import React from 'react';


const HelpPage = () => (
    <div className="content-container content-body">
        <h1>Need help?</h1>
        <h3>Register new API user</h3>
        <ul>
            <li><b>Create new user</b><br />POST /users<br />
                <pre>
                &#123;<br />
                    &nbsp;&nbsp;name: 'API user',<br />
                    &nbsp;&nbsp;email: 'apiuser@apiuser.com',<br />
                    &nbsp;&nbsp;password: 'apiUserPassword'<br />
                &#125;
                </pre>
                <br />
                <br />
                Then authenticate with Bearer <i>authToken</i>
            </li>
            <li><b>Update user</b><br />PATCH /users/me<br />
                <pre>
                &#123;<br />
                    &nbsp;&nbsp;name: 'User Name'<br />
                &#125;
                </pre>
            </li>
            <li><b>Delete user</b><br />DELETE /users/me</li>
        </ul>

        <h3>Use API</h3>
        <ul>
            <li><b>Create contact</b><br />POST /contacts<br />
                <pre>
                &#123;<br />
                    &nbsp;&nbsp;name: 'John Doe',<br />
                    &nbsp;&nbsp;email: 'doe.john@gmail.com',<br />
                    &nbsp;&nbsp;phone: '+7 904 892 3499',<br />
                    &nbsp;&nbsp;position: 'Manager',<br />
                &#125;
                </pre>
            </li>
            <li><b>Get contacts list</b><br />GET /contacts</li>
            <li><b>Update contact</b><br />PATCH /contacts/&lt;_id&gt;<br />
                <pre>
                &#123;<br />
                    &nbsp;&nbsp;phone: '+7 904 892 3494',<br />
                &#125;
                </pre>
            </li>
            <li><b>Get contact by id</b><br />GET /contacts/&lt;_id&gt;</li>
            <li><b>Delete contact by id</b><br />DELETE /contacts/&lt;_id&gt;</li>
        </ul>
    </div>
);

export default HelpPage;
