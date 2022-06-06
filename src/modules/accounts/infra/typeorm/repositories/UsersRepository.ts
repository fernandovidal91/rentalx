import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '../../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    id, name, password, email, driver_license, avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id, name, password, email, driver_license, avatar,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };