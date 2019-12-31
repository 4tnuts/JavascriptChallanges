class carFactory{
    constructor(){
        this.carNumbers = Math.floor((Math.random() * 6) + 1);
    }
    buildCar(){
        let carResult = [];
        let queue = 0;
        let createVolksWagen = new VolksWagen();
        let createChevrolet = new Chevrolet();
        for(let i = 0; i < this.carNumbers ; i++){
            if(queue === 0){
                carResult.push(createChevrolet.buildChevrolet());
                queue++;
            }else{
                carResult.push(createVolksWagen.buildVW());
            }
        }
        console.log(`${this.carNumbers} Cars Permonth`);
        console.log(carResult);
    }
}

class car{
    constructor(){
        this.tire = new tyre();
        this.kursi = Math.floor((Math.random() * 4) + 2);
        this.pintu = Math.floor((Math.random() * 4) + 2);
    }
   warranty(){
       const year = `${Math.floor((Math.random() * 6) + 1)} years warranty`;
       return year;
   }
}

class tyre{
    constructor(){
        const tireSizes = ['Big', 'Medium', 'Small'];
        const tireBrands = ['Neptun', 'Zeus','Athena'];
        this.size = tireSizes[Math.floor(Math.random() * 3)];
        this.brand = tireBrands[Math.floor(Math.random() * 3)];
    }
}

class VolksWagen extends car{
    buildVW(){
        let nameCar = ['Combi','Golf','Beetle'];
        let carResult = {
            name : nameCar[Math.floor(Math.random() * 3)],
            brand : 'VolksWagen',
            tire   : {
                brand : this.tire.brand,
                size :this.tire.size
            },
            kursi : this.kursi,
            pintu : this.pintu,
            warranty : this.warranty()
        }
        return carResult;
    }
}


class Chevrolet extends car{
    buildChevrolet(){
        let nameCar = ['Camaro','Cruze','Impala'];
        let carResult = {
            name : nameCar[Math.floor(Math.random() * 3)],
            brand : 'Chevrolet',
            tire   : {
                brand : this.tire.brand,
                size :this.tire.size
            },
            kursi : this.kursi,
            pintu : this.pintu,
            warranty : this.warranty()
        }
        return carResult;
    }
}

let cars = new carFactory();
cars.buildCar();

