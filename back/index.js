
const config = require('./config/config');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
const port = config.port
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const {Client} = require('pg')
const con = new Client(config.db)

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.post('/auth', async (request, response) => {
    try {
        let userID = request.body.userID;

        let fio = request.body.fio;
        var sql = `select userid from users where userid = ${userID}`
        const res = await con.query(sql);

        if (res.rows.length == 0) {
            sql = `INSERT INTO users (userid, parentid, fio) values (${userID},1,'${fio}')`
            const createRes = await con.query(sql);

        }
        let sqlSelect = `select * from users where userid = ${userID}`
        const selectRes = await con.query(sqlSelect);
        response.send({data: selectRes.rows[0]})
    } catch (e) {
        console.error(e)
        response.send({error: e});
    }
})

app.post('/check_rules', async (request, response) => {
    try {
        let userID = request.body.userID;
        var sql = `UPDATE users
SET rules_check = true where userid = ${userID}`
        const res = await con.query(sql);

        response.send({status: "OK"})
    } catch (e) {
        console.error(e)
        response.send({error: e});
    }
})

app.post('/get_books', async (request, response) => {
    try {
        let userID = request.body.userID;

        var sql = `Select *  from sentbooks WHERE  userID =${userID}`;

        const selectRes = await con.query(sql);
        response.send({data: selectRes.rows})
    } catch (e) {
        console.error(e)
        response.send({error: e});
    }
})

app.post('/send_books', async (request, response) => {
    try {
        let userID = request.body.userID;
        let recipientID = request.body.recipientID;
        var sql = `INSERT INTO sentbooks (userid,delivered,senderid) values (${recipientID},0,${userID})`

        const selectRes = await con.query(sql);
        response.send({status:"OK"})
    } catch (e) {
        console.error(e)
        response.send({error: e});
    }
})
/*app.get('/check_user', (request, response) => {
    let userID = request.body.userID;
    let parentID = request.body.parentID;

    var sql = 'select userID from users where userID = ?'
    con.query(sql, [userID], function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            sql = "INSERT INTO users (userID, parentID) values ?"
            var values = [[userID, parentID]];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            })
        }
    })

    sql = 'select parents.parentID from users as users \
            INNER JOIN users as parents\
            ON users.parentID = parents.userID\
            where users.userID = ?';

    con.query(sql, [Number(userID)], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            response.send(result[0].parentID.toString());
        } else {
            response.send({});
        }
    })
})

app.get('/send_book', (request, response) => {
    let userID = request.query.userID;
    let bookDescription = request.query.bookDescription;

    var sql = 'Insert Into sentBooks (userID, BookDescription, delivered) VALUES ?';

    var values = [[Number(userID), bookDescription, false]];

    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        response.send("Success");
    })
})

app.get('/get_books', (request, response) => {
    let userID = Number(request.query.userID);

    var sql = 'Select BookDescription from sentBooks WHERE delivered = 0 and userID = ?';

    con.query(sql, [userID], function (err, result) {
        if (err) throw err;
        response.send(JSON.stringify([...result]));
    })
})
*/
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
