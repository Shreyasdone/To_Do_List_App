import { connection as con } from "../database/db.js";

export const createUser = (firstName, lastName, email, password) => {
    let query = "INSERT INTO user (first_name, last_name, email, password) VALUES (?,?,?,?)";
    console.log("password----------->",password);
    con.query(query,[firstName,lastName,email,password], (err,result)=> {
        if(err) {
            console.error("Error occured while adding user:",err);
            return;
        }
        console.log(`User ${firstName} added successfully!!`);
    });
};

export const getUserByEmail = async (email) => {
    return new Promise((resolve,reject)=>{
        let query = "SELECT * FROM user WHERE email = ?";
        con.query(query, [email], (err,result)=>{
            if(err) {
                console.log("Error Occurred while fetching user by email",err);
                return reject(err);
            }
            resolve(result[0]);
        })
    });
}

export const getUserById = async (id) => {
    return new Promise((resolve,reject)=>{
        let query = "SELECT * FROM user WHERE _id = ?";
        con.query(query, [id], (err,result)=>{
            if(err) {
                console.log("Error Occurred while fetching user by id",err);
                return reject(err);
            }
            resolve(result[0]);
        })
    });
}