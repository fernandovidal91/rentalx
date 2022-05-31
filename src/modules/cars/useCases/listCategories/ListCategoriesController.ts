import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  private listCategoriesUseCase: ListCategoriesUseCase;

  constructor(listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  handle(req: Request, res: Response): Response {
    const allCategories = this.listCategoriesUseCase.execute();

    return res.json(allCategories);
  }
}

export { ListCategoriesController };
