export class User {

    constructor(){

    }
    public user (name: String, lastname: String, nickname: String, email: String, password: String){
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;

    }



    public setName(name: String){
        this.name = name;
    }

    public getName():String{
        return this.name;
    }

    public setLastname(lastname: String){
        this.lastname = lastname;
    }

    public getLastname():String{
        return this.lastname;
    }

    public setNickname(nickname: String){
        this.nickname = nickname;
    }

    public getNickname():String{
        return this.nickname;
    }

    public setEmail(email: String){
        this.email = email;
    }

    public getEmail():String{
        return this.email;
    }

    public setPassword(password: String){
        this.password = password;
    }

    public getPassword():String{
        return this.password;
    }


    public getId():String{
        return this.name;
    }
    

    private id!: BigInt;
    private name!: String;
    private lastname!: String;
    private nickname!: String;
    private email!: String;
    private password!: String;


}