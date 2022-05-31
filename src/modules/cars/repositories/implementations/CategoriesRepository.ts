import { Category } from '../../models/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    const data = {
      name,
      description,
      created_at: new Date(),
    };

    Object.assign(category, data);

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const findCategory = this.categories.find((category) => category.name === name);

    return findCategory;
  }
}

export { CategoriesRepository };
