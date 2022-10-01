export class User {

    constructor (name: String, lastname: String, nickname: String, email: String, password: String){
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;


    }

    name!: String;
    lastname!: String;
    nickname!: String;
    email!: String;
    password!: String;


}