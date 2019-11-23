let mysql = require('mysql');
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let path = require('path');

let id, data, lastVisited, jobtitle, selector;
let shouldGetQuestions = true;
let total = 0;

let app = express();

app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

let connection = mysql.createConnection({
    host: '<SERVER IP>',
    user: '<INSTANCE USER>',
    password: '<INSTANCE PASSWORD>',
    database: '<DATABASE NAME>'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.render('index');
});




/*----------------------------------------------------------------------------------------------------------------------------------------------------/
/-----------------------------------------------------------------------------------------------------------------------------------------------------/
/----------------------------------------------------------------------------------------------------------------------------------------------------*/




app.post('/index', (request, response) => {
    response.render('index');

    response.end();
})

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/about', (request, response) => {
    lastVisited = 'about';

    response.render('about');

    response.end();
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/jargonBuster', (request, response) => {
    response.render('jargonBuster', { lastPage: lastVisited });

    response.end();
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/home', (request, response) => {
    let username = request.body.username;
    let password = request.body.password;
    
    if (!request.session.loggedin) {
        if (username.toLowerCase() && password) {
            connection.query('SELECT * FROM Student WHERE EmailAddress = ? AND Password = ?', [username, password], (error, result) => {
                if (error) throw error;
                if (result) {
                    if (result.length > 0) {

                        data = result[0];
                        id = data.StudentID;
                        
                        lastVisited = 'home';
                        request.session.loggedin = true;

                        response.render('home', { 
                            name: `hello, ${data.FirstName.toLowerCase()}`,
                            profilePicture: data.ProfilePicture,
                            interestedSector: data.InterestedSector
                        });

                    } else {
                        response.render('index', { incorrectPassword: 'incorrect username or password!'});
                    }
                    response.end();
                }
            });
        } else {
            response.end();
        }
    } else {
        lastVisited = 'home';

        connection.query('SELECT * FROM Student WHERE StudentID = ?', [id], (error, result) => {
            response.render('home', {
                name: `hello, ${data.FirstName.toLowerCase()}`,
                profilePicture: data.ProfilePicture,
                interestedSector: result[0].InterestedSector
            });
        });
    }
});

app.get('/home', (request, response) => {
    if (request.session.loggedin) {
        lastVisited = 'home';

        response.render('home', {
            name: `hello, ${data.FirstName.toLowerCase()}`,
            profilePicture: data.ProfilePicture,
            interestedSector: data.InterestedSector
        });
    } else {
        response.render('index');
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/caseStudies', (request, response) => {
    shouldGetQuestions = lastVisited === 'topJobs' ? false : true;
    response.render('caseStudies', { lastPage: lastVisited });

    response.end();
});

app.get('/caseStudies', (request, response) => {
    if (request.session.loggedin) {
        response.render('caseStudies', { lastPage: lastVisited });
    } else {
        response.render('index');
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/skills', (request, response) => {
    response.render('skills', {
        fullName: `${data.FirstName.toLowerCase()} ${data.LastName.toLowerCase()}`,
        location: data.Location.toLowerCase(),
        sixthFormYear: `year ${data.SixthFormYear} student`,
        profilePicture: data.ProfilePicture
    });

    response.end();
});

app.get('/skills', (request, response) => {
    if (request.session.loggedin) {
        response.render('skills', {
            fullName: `${data.FirstName.toLowerCase()} ${data.LastName.toLowerCase()}`,
            location: data.Location.toLowerCase(),
            sixthFormYear: `year ${data.SixthFormYear} student`,
            profilePicture: data.ProfilePicture
        });
    } else {
        response.render('index');
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/survey', (request, response) => {
    shouldGetQuestions = true;
    response.render('survey', { firstName: data.FirstName.toLowerCase() });

    response.end();
});

app.get('/survey', (request, response) => {
    if (request.session.loggedin) {
        response.render('survey', { firstName: data.FirstName.toLowerCase() });
    } else {
        response.render('index');
    }
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/topJobs', (request, response) => {
    lastVisited = 'topJobs';
    
    if (shouldGetQuestions) {
        total = 0;

        let answerA = parseInt(request.body.answerA);
        let answerB = parseInt(request.body.answerB);
        let answerC = parseInt(request.body.answerC);
        let answerD = parseInt(request.body.answerD);
        let answerE = parseInt(request.body.answerE);

        total += (answerA + answerB + answerC + answerD + answerE);

        connection.query('DELETE FROM QuizResults WHERE StudentID = ?', [id]);
        connection.query('INSERT INTO QuizResults VALUES (?, ?, ?, ?, ?, ?)', [id, answerA, answerB, answerC, answerD, answerE]);

        selector = total >= 10 ? 1 : 2;
    }

    connection.query('SELECT * FROM Job ORDER BY ?', [selector], (error, result) => {
        jobtitle = `welcome future ${result[0].Title}!`;
        connection.query('UPDATE Student SET InterestedSector = ? WHERE StudentID = ?', [jobtitle, id]);

        response.render('topJobs', { 
            firstName: data.FirstName.toLowerCase(),
            jobTitle_A: result[0].Title,
            jobSalary_A: result[0].Salary,
            jobDescription_A: result[0].Description,
            jobTitle_B: result[1].Title,
            jobSalary_B: result[1].Salary,
            jobDescription_B: result[1].Description
        });

        response.end();
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------//

app.post('/logout', (request, response) => {
    request.session.loggedin = false;
    response.render('index', { incorrectPassword: 'you have successfully logged out' });

    response.end();
});




/*----------------------------------------------------------------------------------------------------------------------------------------------------/
/-----------------------------------------------------------------------------------------------------------------------------------------------------/
/----------------------------------------------------------------------------------------------------------------------------------------------------*/




app.listen(3000);