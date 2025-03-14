import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Controller('tutorial')
export class TutorialController {
  private dataPath = join(process.cwd(), 'dist', 'assets', 'data');

  @Get(':lang')
  getTutorialData(@Param('lang') lang: string) {
    const filePath = join(this.dataPath, `tutorial-data.${lang}.json`);
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  @Post(':lang')
  updateTutorialData(@Param('lang') lang: string, @Body() updatedData: any) {
    const filePath = join(this.dataPath, `tutorial-data.${lang}.json`);
    writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return { message: `Updated ${lang} tutorial data saved successfully.` };
  }
}