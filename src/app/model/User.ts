export class User {

    constructor(){}
    public user (name: String, lastname: String, nickname: String, email: String, password: String, roles:any){
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.roles = roles;

    }



    public id!: BigInt;
    public name!: String;
    public lastname!: String;
    public nickname!: String;
    public email!: String;
    public password!: String;
    public roles!: string[];
    public points!: number;
    public avatar!: String;

}