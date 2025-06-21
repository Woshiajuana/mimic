import { Intention, withPlus } from '@app/db';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { PagerIntentionDto } from './dto/pager-intention.dto';

@Injectable()
export class IntentionService {
  constructor(
    @InjectRepository(Intention)
    private readonly intentionRepository: Repository<Intention>,
  ) {}

  async pager(pagerIntentionDto: PagerIntentionDto) {
    const { pageIndex, pageSize, keyword, userId, valuationId } =
      pagerIntentionDto;

    const queryBuilder = withPlus(
      this.intentionRepository.createQueryBuilder('intention'),
    );

    const [list, count] = await queryBuilder
      .andWherePlus(`intention.userId = :userId`, { userId }, !!userId)
      .andWherePlus(
        `intention.valuationId = :valuationId`,
        { valuationId },
        !!valuationId,
      )
      .andWherePlus(
        new Brackets((qb) =>
          qb.orWhere(`intention.mobile LIKE :keyword`, {
            keyword: `%${keyword}%`,
          }),
        ),
        undefined,
        !!keyword,
      )
      .orderBy('intention.createdAt', 'DESC')
      .offset(((pageIndex || 1) - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();

    return { list, count };
  }
}
