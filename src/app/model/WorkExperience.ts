export class WorkExperience {
    private description: String;
    private place: String;
    private id: number;
    private title: String;

    constructor(id:number, title:String, place:String, description:String){
        this.id=id;
        this.title = title;
        this.description=description;
        this.place=place;    
    }

    public getID(): number | undefined {
        return this.id;
    }

    public getTitle(): String {
        return this.title;
    }

    public getDescription(): String {
        return this.description;
    }

    public getPlace(): String {
        return this.place;
    }
}