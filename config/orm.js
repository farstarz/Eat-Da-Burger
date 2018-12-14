const connection = require('./connection.js');

// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// create orm object
let orm = {
    // function to get all from table
    selectAll: function(table, cb){
        let query = 'SELECT * FROM ' + table +';';
        connection.query(query,(err, data)=>{
            if(err) throw err;
            cb(data);
        });
    },
    // function to insert one row
    insertOne: function(table, cols, vals, cb){
        var query = "INSERT INTO " + table;

        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);
        connection.query(query, vals, (err, data)=>{
            if(err) throw err;
            console.log("orm works", data);
            cb(data);
        });
    },
    // function to update one row
    updateOne: function(table, objColVals, condition, cb){
        let query = 'UPDATE '+table;
        query += ' SET ';
        query += objToSql(objColVals);
        query += ' WHERE ';
        query += condition;
        query += ';';
        
        console.log(query);
        connection.query(query, (err, data)=>{
            if(err) throw err;
            cb(data);
        })
    }
}

// export orm object
module.exports = orm;