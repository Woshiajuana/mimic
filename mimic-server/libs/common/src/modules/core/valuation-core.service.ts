import { ValuationType } from '@app/db';
import { Injectable } from '@nestjs/common';

import { CoreService } from './core.service';

@Injectable()
export class ValuationCoreService {
  constructor(private readonly coreService: CoreService) {}

  async query(data: {
    type: ValuationType;
    levelId: string;
    firstRegistrationDate: string;
    mileage: string;
    province: string;
    city: string;
    bodyColor?: string;
    transferCount?: string;
    operatingNature?: string;
    facade?: string;
    condElect?: string;
    interior?: string;
    addAmount?: string;
  }) {
    const res = await this.coreService.request<any>(
      'AssistBusinessTransaction/',
      {
        predict_type: data.type,
        vehiclecate: data.levelId,
        registeryearmonth: data.firstRegistrationDate.replace(/\//g, ''),
        displaymileage: data.mileage,
        province: data.province,
        city: data.city,
        bodycolor: data.bodyColor,
        transfernumber: data.transferCount,
        usingmodel: data.operatingNature,
        facade: data.facade,
        condelect: data.condElect,
        interior: data.interior,
        addamount: data.addAmount,
      },
      {
        method: 'POST',
      },
    );
    return res;
  }
}
