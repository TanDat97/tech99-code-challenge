import { Request, Response } from 'express';
import { BaseController } from '@core';
import { UserService } from './service';

export class UserController extends BaseController {
  public service: UserService;
  constructor() {
    super();
    this.service = new UserService();
  }

  getList = async (req: Request, res: Response, next) => {
    const result = await this.service.getList(req.query as any);
    res.status(200).send({
      code: 200,
      message: 'Get list data success',
      data: result,
    });
  };

  getDetail = async (req: Request, res: Response, next) => {
    const result = await this.service.getDetail(parseInt(req.params.id));
    res.status(200).send({
      code: 200,
      message: 'Get Detail data success',
      data: result,
    });
  };

  create = async (req: Request, res: Response, next) => {
    const result = await this.service.create(req.body as any);
    res.status(200).send({
      code: 200,
      message: 'Create data success',
      data: result,
    });
  };

  update = async (req: Request, res: Response, next) => {
    const result = await this.service.update(parseInt(req.params.id), req.body as any);
    res.status(200).send({
      code: 200,
      message: 'Update data success',
      data: result,
    });
  };

  delete = async (req: Request, res: Response, next) => {
    const result = await this.service.delete(parseInt(req.params.id));
    res.status(200).send({
      code: 200,
      message: 'Delete data success',
      data: result,
    });
  };
}
