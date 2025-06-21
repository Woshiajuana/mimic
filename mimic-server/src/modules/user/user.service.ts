import { User, withPlus } from '@app/db';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { PagerUserDto } from './dto/pager-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async pager(pagerUserDto: PagerUserDto) {
    const { pageIndex, pageSize, keyword } = pagerUserDto;

    const queryBuilder = withPlus(
      this.userRepository.createQueryBuilder('user'),
    );

    const [list, count] = await queryBuilder
      .andWherePlus(
        new Brackets((qb) =>
          qb.orWhere(`user.id LIKE :keyword`, {
            keyword: `%${keyword}%`,
          }),
        ),
        undefined,
        !!keyword,
      )
      .orderBy('user.createdAt', 'DESC')
      .offset(((pageIndex || 1) - 1) * pageSize)
      .limit(pageSize)
      .getManyAndCount();

    return { list, count };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);
  }
}
