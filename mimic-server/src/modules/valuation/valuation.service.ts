import { Valuation, withPlus } from '@app/db';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { PagerValuationDto } from './dto/pager-valuation.dto';

@Injectable()
export class ValuationService {
  constructor(
    @InjectRepository(Valuation)
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async pager(pagerValuationDto: PagerValuationDto) {
    const { pageIndex, pageSize, keyword, userId } = pagerValuationDto;

    const queryBuilder = withPlus(
      this.valuationRepository.createQueryBuilder('valuation'),
    );

    const [list, count] = await queryBuilder
      .andWherePlus(`valuation.userId = :userId`, { userId }, !!userId)
      .andWherePlus(
        new Brackets((qb) =>
          qb.orWhere(`valuation.vehicleName LIKE :keyword`, {
            keyword: `%${keyword}%`,
          }),
        ),
        undefined,
        !!keyword,
      )
      .orderBy('valuation.createdAt', 'DESC')
      .offset(((pageIndex || 1) - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();

    return { list, count };
  }
}
