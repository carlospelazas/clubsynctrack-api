import { Controller } from '@nestjs/common';
import { SessionDatesService } from './session-dates.service';

@Controller('session-dates')
export class SessionDatesController {
  constructor(private readonly sessionDatesService: SessionDatesService) {}
}
