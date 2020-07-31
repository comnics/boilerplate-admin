const mariadb = require('mariadb');
const config = require('../config')

module.exports = function() {
    const pool = mariadb.createPool({
        host: config.DBHost,
        port: config.DBPort,
        user: config.DBUser,
        password: config.DBPassword,
        database: config.database,
        connectionLimit: 5
    }); 

    return {
        getConnection: function (cb) {
            pool.getConnection().then((conn) =>{
                cb(conn);
            });
        },
        end: function(callback){
          pool.end(callback);
        }
    }
}();


/*
async function getUserList(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        rows = await conn.query('SELECT * FROM users');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}

async function findOneAndUpdate(selectCondition, updateSets, cb){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        sql = "UPDATE users SET ";
        for (var key in updateSets) {
            if (updateSets.hasOwnProperty(key)){
                sql += `${key} = '${updateSets[key]}'`;
            }
        };

        sql += ` WHERE 1=1 `
        for (var key in selectCondition) {
            if (selectCondition.hasOwnProperty(key)){
                sql += ` AND ${key} = '${selectCondition[key]}'`;
            }
        };
        console.log(sql);

        rows = await conn.query(sql);
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }

}
 */