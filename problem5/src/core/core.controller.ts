import { CoreService } from './core.service';

export abstract class BaseController {
  constructor() {}
  public service: CoreService;
}
