import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { Filter } from './filter.interface';
import { IQuery } from './query.interface';
import { Train } from './train.interface';

@Injectable()
export class AppService {
  fullSchedule: Train[] = [];
  requestNo = 0;
  constructor() {
    const cities = JSON.parse(
      readFileSync(resolve('src', 'cities.json'), 'utf8'),
    );
    const usedNums = [];
    const batchSize = Math.floor(Math.random() * 999) + 1;
    for (let i = 0; i < batchSize; i++) {
      const departureCity =
        cities[Math.floor(Math.random() * cities.length)].city;
      let arrivalCity = cities[Math.floor(Math.random() * cities.length)].city;
      while (departureCity === arrivalCity)
        arrivalCity = cities[Math.floor(Math.random() * cities.length)].city;
      let number = Math.floor(Math.random() * 999) + 1;
      while (usedNums.includes(number))
        number = Math.floor(Math.random() * 999) + 1;
      const departureTime = Math.floor(Math.random() * 24 * 60);
      const travelTime = Math.floor(Math.random() * 3 * 24 * 60) + 100;
      this.fullSchedule.push({
        number,
        departureCity,
        arrivalCity,
        departureTime,
        travelTime,
        seatsAvailable: Math.floor(Math.random() * 100),
      });
    }
    console.log('Train entries generated', this.fullSchedule.length);
  }

  getHello(): string {
    return `
      <h2>Hello user!</h2>
      <p>Welcome to train playground. You have a task of creating customizable train schedule.<br/>
      You can get playground's API by address <code>/api</code>.<br/>
      Good luck and happy coding!
      </p>
    `;
  }

  getSchedule(query: IQuery): Train[] {
    const filters: Filter[] = [];
    for (const key in query) {
      switch (key) {
        case 'from':
          filters.push({
            parameter: 'departureCity',
            target: query[key],
            condition: 'equal',
          });
          break;
        case 'to':
          filters.push({
            parameter: 'arrivalCity',
            target: query[key],
            condition: 'equal',
          });
          break;
        case 'before':
          const vals = query[key].split('-');
          try {
            filters.push({
              parameter: 'departureTime',
              target: parseInt(vals[0]) * 60 + parseInt(vals[1]),
              condition: 'lessequal',
            });
          } catch {
            console.log(`bad query parameter "${key}": ${query[key]}`);
          }
          break;
        case 'after':
          const valsa = query[key].split('-');
          try {
            filters.push({
              parameter: 'departureTime',
              target: parseInt(valsa[0]) * 60 + parseInt(valsa[1]),
              condition: 'moreequal',
            });
          } catch {
            console.log(`bad query parameter "${key}": ${query[key]}`);
          }
          break;
        case 'seatsMore':
          filters.push({
            parameter: 'seatsAvailable',
            target: query[key] as number,
            condition: 'more',
          });
          break;
        case 'seatsLess':
          filters.push({
            parameter: 'seatsAvailable',
            target: query[key] as number,
            condition: 'less',
          });
          break;
        case 'numberFrom':
          filters.push({
            parameter: 'number',
            target: query[key] as number,
            condition: 'moreequal',
          });
          break;
        case 'numberTo':
          filters.push({
            parameter: 'number',
            target: query[key] as number,
            condition: 'lessequal',
          });
          break;
      }
    }
    let returnList = this.fullSchedule;
    filters.forEach((filter) => {
      returnList = returnList.filter(
        (item) =>
          (filter.condition === 'equal' &&
            item[filter.parameter] === filter.target) ||
          (filter.condition === 'less' &&
            item[filter.parameter] < filter.target) ||
          (filter.condition === 'more' &&
            item[filter.parameter] > filter.target) ||
          (filter.condition === 'lessequal' &&
            item[filter.parameter] <= filter.target) ||
          (filter.condition === 'moreequal' &&
            item[filter.parameter] >= filter.target),
      );
    });
    console.log(
      `Request: ${++this.requestNo}; Total: ${
        this.fullSchedule.length
      }, Filtered: ${returnList.length}`,
    );
    return returnList;
  }
}
