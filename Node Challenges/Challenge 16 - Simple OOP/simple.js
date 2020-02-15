class Tyre{
    constructor(tyreBrand, tyreSize, tyrePrice){
        this.tyreBrand = tyreBrand;
        this.tyreSize  = tyreSize;
        this.tyrePrice = tyrePrice;  
    }
}

class Car{
    constructor(seat, tyre, door, window){
        this.seat = seat;
        this.tyre = tyre;
        this.door = door;
        this.window = window;
        this.engine = Car.getEngine(); 
    }

    static getEngine(){
        let engineName = ['Phoenix', 'Kuro', 'Aka'];
        let engineNumber = Math.floor(Math.random() * (2 - 0) + 0);
        let tyre =  engineName[engineNumber];
        return tyre;
    }
}

class Honda extends Car {
    constructor(){
        super(4, new Tyre('Roda Cap Tiga Kaki', '75 mm', 1000000), 4, 6);
    }
}

class Yamaha extends Car {
    constructor(){
        super( 6, new Tyre('Roda Cinta', '13 mm', 1300000), 6, 6);
    }
}

class CarFactory {
    constructor (){
        this.cars = []
    }

    static perMonthCars(){
        return Math.floor(Math.random() * (5 - 1) + 1);
    }

    produceCar(){
        // Honda Cars
        for(let i = 0; i < CarFactory.perMonthCars(); i++){
            this.cars.push(new Honda());
        }

        //Yamaha Cars
        for(let i = 0; i < CarFactory.perMonthCars(); i++){
            this.cars.push(new Yamaha());
        }
    }

    produceResult(){
       this.cars.forEach((car, index) => {
           console.log(`Car Factory result : ${car.tyre.tyreBrand}, ${car.engine}`)
       }) 
    }
}

let carFactory = new CarFactory();
carFactory.produceCar();
carFactory.produceResult();