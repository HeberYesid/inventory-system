import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { KardexService } from './kardex.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('kardex')
@UseGuards(JwtAuthGuard)
export class KardexController {
  constructor(private readonly kardexService: KardexService) {}

  @Get()
  findByProduct(
    @Query('product_id') productIdStr?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const productId = productIdStr ? parseInt(productIdStr, 10) : undefined;
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    return this.kardexService.findByProduct(productId, fromDate, toDate);
  }
}
