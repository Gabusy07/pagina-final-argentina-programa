export class Language {

    constructor(name: String, date: String){
        this.name = name;
        this.date_start = date;   

    }
    

    public setName(name: String){
        this.name = name;
    }

    public getName():String{
        return this.name;
    }


    public getProgressbar():String{
        return this.progressbar;
    }


    public getWidth():number{
        return this.width;
    }

    public setDate(date: String){
        this.date_start = date;
    }

    public getDate():String{
        return this.date_start;
    }


    public getId():String{
        return this.name;
    }
    

    private id!: BigInt;
    private name!: String;
    private progressbar!: String;
    private width!: number;
    private date_start!: String;


}