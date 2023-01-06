export class Project {
    private image: String;
    private linkProject: String;
    private id: number;
    private title: String;

    constructor(id:number, title:String, linkProject:String, image:String){
        this.id=id;
        this.title = title;
        this.image=image;
        this.linkProject=linkProject;    
    }

    public getID(): number | undefined {
        return this.id;
    }

    public getTitle(): String {
        return this.title;
    }

    public getImage(): String {
        return this.image;
    }

    public getLinkProject(): String {
        return this.linkProject;
    }
}