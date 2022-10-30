export class User {

    constructor(){}
    public user (name: String, lastname: String, nickname: String, email: String, password: String, rol:String[]){
        this.name = name;
        this.lastname = lastname;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.rol = rol;

    }

    public getRol():String[]{
        return this.rol;
    }

    public getPoints():number{
        return this.points;
    }

    public setPoints(points: number):void{
        this.points = points;
    }

    public getAvatar():String{
        return this.avatar;
    }

    public setAvatar(avatar: String):void{
        this.avatar = avatar;
    }

    public id!: BigInt;
    public name!: String;
    public lastname!: String;
    public nickname!: String;
    public email!: String;
    public password!: String;
    private rol!: String[];
    private points!: number;
    private avatar!: String;

}