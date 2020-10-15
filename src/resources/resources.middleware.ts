import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { DataAccessService } from "../data-access/data-access.service";

@Injectable()
export class ResourcesMiddleware implements NestMiddleware {
  private _resources:Array<string>;

  constructor(private _dataAccessService:DataAccessService){
  }
  use(req: Request, res: Response, next: Function) {
    this._resources = this._resources || this._dataAccessService.getAvialableModelsList();
    if(this._resources.indexOf(req.params.resources) == -1){
        res.status(400).send("error");
        return;
    }
    next();
  }
}
