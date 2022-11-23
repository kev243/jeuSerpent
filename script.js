
function Dog(nom, color,age){
    this.nom=nom;
    this.color=color;
    this.age=age;
    this.aboie= function()
    {
        console.log("wouaf "+ this.nom)
    }
}
var petitiCaniche=new Dog("chouchou", "white",4);
var petitiPitbul=new Dog("chihi", "black",6);

petitiCaniche.aboie()