export class Project {
    public image: String;
    public linkProject: String;
    public id: number;
    public title: String;
    public description:String;
    public enabled:Boolean

    constructor(id:number, title:String, linkProject:String, image:String, description:String, enabled:Boolean){
        this.id=id;
        this.title = title;
        this.image=image;
        this.linkProject= linkProject;  
        this.description = description;  
        this.enabled= enabled;
    }
}