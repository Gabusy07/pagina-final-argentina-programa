export class Project {
    private image: String;
    private linkProject: String;
    private id: number;
    private title: String;
    private description:String;

    constructor(id:number, title:String, linkProject:String, image:String, description:String){
        this.id=id;
        this.title = title;
        this.image=image;
        this.linkProject=linkProject;  
        this.description = description;  
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

    public getImage(): String {
        return this.image;
    }

    public getLinkProject(): String {
        return this.linkProject;
    }
}