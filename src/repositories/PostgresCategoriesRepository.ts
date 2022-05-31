import { Category } from '../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from './ICategoriesRepository';

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }

  list(): Category[] {
    console.log('lista');
    return null;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}

export default new PostgresCategoriesRepository();
