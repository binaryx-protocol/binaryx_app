import {Controller, Get, Inject, Post, Req, Res,HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import {ConfigService} from "@nestjs/config";
import {AssetService} from "./asset.service";
import {Asset} from "./asset.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {validate} from "./asset.validator";

@Controller('assets')
export class AssetsController {
  @Inject(ConfigService)
  private readonly config: ConfigService

  @Inject(AssetService)
  private readonly assetService: AssetService;

  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const attrs = request.body.attrs
    const { isValid, errors } = await validate(attrs)
    if (!isValid) {
      response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors })
    } else {
      const resource = await this.assetsRepository.save(attrs)
      response.json({ resource })
    }
  }

  @Get()
  async index(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log('request.params.id', request.params.id)
    const resources = await this.assetsRepository.find()
    response.json({ resources })
  }

  @Get(':id')
  async show(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    console.log('request.params.id', request.params.id)
    const resource = await this.assetsRepository.findOne(request.params.id)
    if (!resource) {
      response.status(HttpStatus.NOT_FOUND)
    } else {
      response.json({ resource })
    }
  }
}
