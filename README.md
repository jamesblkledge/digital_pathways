# Digital Pathways

Ada. National College for Digital Skills end of launchpad project - for the SDLC module.

#### Installation Guide:

1. Firstly, clone the following repository using the following command:

```bash
$ git clone https://github.com/jamesblkledge/digital_pathways
```

2. Now we need to install node. If you have it installed already, skip to step 3. Otherwise, download and install node [here](https://nodejs.org/en/download) for your operating system.

3. Next, change into the newly cloned repository:

```bash
$ cd digital_pathways
```

4. Now that we're in the correct directory and have node installed, run the following command:

```bash
$ npm i
```

> This will make sure that all of the node modules required are installed.

5. Next, edit the ```index.js``` file in the root directory and navigate to line 16. Here you will need to modify the following code with the server and database credentials that you will be using; i.e. your own server IP address and the name of your database user:

```javascript
let connection = mysql.createConnection({
    host: '<SERVER IP>',
    user: '<INSTANCE USER>',
    password: '<INSTANCE PASSWORD>',
    database: '<DATABASE NAME>'
});
```

6. Afterwards, create the database structure using the code inside of the ```database-schema.sql```. You will need to edit the following lines of SQL (lines 1-3 and 48 respectively):

```sql
CREATE DATABASE <DATABASE NAME>;

USE <DATABASE NAME>;
```

> Choose what you want to call the database.


```sql
INSERT INTO Student (EmailAddress, Password, FirstName, LastName, SixthFormYear, Location, ProfilePicture) VALUES
('<EMAIL>', '<PASSWORD>', '<FIRST NAME>', '<LAST NAME>', '<SCHOOL YEAR>', '<LOCATION>', '<PROFILE PICTURE URL>');
```

> Insert as many student records as you would like. Don't input any sensitive information since none of it will be encrypted, including passwords.

7. Once you have followed the steps above and everything is working properly, launch the project with the following command (whilst in the root directory):

```bash
$ node index.js
```

8. Lastly, simply head over to ```localhost:3000``` in your browser and voilà, the web application should now be up and running!
