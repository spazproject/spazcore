// Basically just ripped from JazzRecord  HTML5Adapter class

function SpazLocker(db, account) {
  this.db = openDatabase(db);
  this.account = account;
  this.ready = false;

  var locker = this;
  var query = "CREATE TABLE IF NOT EXISTS `" + account + "` (id INTEGER PRIMARY KEY AUTOINCREMENT, tweet_id INTEGER, in_reply_to_id INTEGER, text TEXT, timestamp TEXT)";
  
  sc.helpers.dump(query);
  
  this.db.transaction(function(tx) {
    tx.executeSql(query, [], function(tx, resultSet) {
      locker.ready = true;
    });
  });
}

SpazLocker.prototype = {
  run: function(query, success, failure) {
    this.db.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, resultSet) {
          var rows = [];
          for(var i = 0, j = resultSet.rows.length; i < j; i++) {
            rows.push(resultSet.rows.item(i));
          }
          if(success)
            success(rows);
        }, function(tx, err) {
          if(failure)
            failure(err.message);
          else
            sc.helpers.dump("There was an error: " + err.message);
        });
    });
  },

  count: function(success, failure) {
    var query = "SELECT COUNT(*) FROM " + this.account;
    this.db.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, resultSet) {
        if(success)
          success(resultSet.rows.item(0)["COUNT(*)"]);
        }, function(tx, err) {
        if(failure)
          failure(err.message);
        else
          sc.helpers.dump("There was an error: " + err.message);
      });
    });
  },

  store: function(data, success, failure) {
    var tweet_id = data.tweet_id || "NULL";
    var in_reply_to_id = data.in_reply_to_id || "NULL";
    var text = "NULL";
    if(data.text)
      text = "'" + data.text + "'";
    var timestamp = data.timestamp || "NULL";
    
    var query = "INSERT INTO " + this.account + " (tweet_id, in_reply_to_id, text, timestamp) VALUES(" + 
      tweet_id + ", " +
      in_reply_to_id + ", " +
      text + ", " +
      timestamp + ")";
    
    sc.helpers.dump(query);
    this.db.transaction(function(tx) {
      tx.executeSql(query, [], function(tx, resultSet) {
        if(success)
          success(resultSet.insertId);
        }, function(tx, err) {
        if(failure)
          failure(err.message);
        else
          sc.helpers.dump("There was an error: " + err.message);
      });
    });
  },
  
  retrieve: function(options, success, failure) {
    var col = "id", val = options;
    if(typeof options === "object") {
      col = options.col;
      val = options.val;
      success = options.success;
      failure = options.failure;
    }
    var query = "SELECT * FROM " + this.account + " WHERE " + col + "=" + val;
    sc.helpers.dump(query);
    this.run(query, success, failure);
  },
  
  vanquish: function(options, success, failure) {
    var col = "id", val = options;
    if(typeof options === "object") {
      col = options.col;
      val = options.val;
      success = options.success;
      failure = options.failure;
    }
    var query = "DELETE FROM " + this.account + " WHERE " + col + "=" + val;
    sc.helpers.dump(query);
    this.run(query, success, failure);
  }
};