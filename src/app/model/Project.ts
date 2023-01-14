export class Project {
    public image: String;
    public linkProject: String;
    private id: number;
    public title: String;
    public description:String;

    constructor(id:number, title:String, linkProject:String, image:String, description:String){
        this.id=id;
        this.title = title;
        this.image=image;
        this.linkProject=linkProject;  
        this.description = description;  
    }

    public getID():number{
        return this.id;
    }

}