import { Injectable } from '@angular/core';
import { PriorityTypes } from '../../../models/priorityTypes';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  constructor() { }

  public getIconName(priority: PriorityTypes | string): string {
    switch (priority as PriorityTypes) {
      case PriorityTypes.Low:
        return 'stat_minus_1';
      case PriorityTypes.Medium:
        return 'remove';
      case PriorityTypes.High:
        return 'stat_1';
      case PriorityTypes.Blocker:
        return 'block';
      default:
        return '';
    }
  }
}
