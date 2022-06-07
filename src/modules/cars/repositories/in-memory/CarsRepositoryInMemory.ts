import { Car } from '../../infra/typeorm/entities/Car';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findAvailable(brand?:string, category_id?: string, name?: string): Promise<Car[]> {
    return this.cars
      .filter((car) => {
        if (
          car.available
          || (brand && car.brand === brand)
          || (category_id && car.category_id === category_id)
          || (name && car.name === name)
        ) {
          return car;
        }

        return null;
      });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
