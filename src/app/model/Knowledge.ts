export class Knowledge {

    constructor(name: String, date: String, progressbar : String){
        this.name = name;
        this.date = date;
        this.progressbar = progressbar;
    }
    

    public id!: number;
    public name!: String;
    public progressbar!: String;
    public width!: number;
    public date!: String;


}