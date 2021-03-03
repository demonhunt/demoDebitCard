function ConnectEbiz() { }
ConnectEbiz.setConfig = function (getState) {
    let config = null;
    let user = getState().user.userInfor;
    if(user.old_ebiz_ip==null) return null
    let temp = user.old_ebiz_ip.split("\\");
    let server = temp[0];
    let instance = temp[1];
    config = {
        server: server,
        username: user.old_ebiz_username,
        password: user.old_ebiz_password,
        database: user.old_ebiz_db_name,
        timeout: 5,
        instance: instance != undefined ? instance : "null"
    };

//     config = {
//     server: '192.168.1.10', //ip address of the mssql database
//     username: 'khothongminh', //username to login to the database
//     password: 'khotmdt.fahasa', //password to login to the database
//     database: 'TEST_KIEMKE', //the name of the database to connect to
//     // port: 1433, //OPTIONAL, port of the database on the server
//     timeout: 10, //OPTIONAL, login timeout for the server
//     instance: "null",
// }

    // config = {
    //     server: '192.168.1.10', //ip address of the mssql database
    //     username: 'tmdt1', //username to login to the database
    //     password: 'abc@123', //password to login to the database
    //     database: 'NS_LACXUAN_KIEMKE', //the name of the database to connect to
    //     instance: "null",
    //     // port: 1433, //OPTIONAL, port of the database on the server
    //     timeout: 10, //OPTIONAL, login timeout for the server
    // }

    return config
}

module.exports = ConnectEbiz
