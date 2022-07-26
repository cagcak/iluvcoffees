import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @Public()
  // root(@Res() res: Response) {
  //   return res.render('index', { message: 'Hello world!' });
  // }

  @Get()
  @Public()
  @Render('index')
  root() {
    return { message: 'Hello world!', app: 4343 };
  }
}
