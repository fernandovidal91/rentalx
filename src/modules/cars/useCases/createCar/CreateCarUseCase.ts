import { inject, injectable } from 'tsyringe';
import { Car } from '../../infra/typeorm/entities/Car';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(data.license_plate);

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = await this.carsRepository.create(data);

    return car;
  }
}

export { CreateCarUseCase };
