import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Celebrity } from '../celebrity/celebrity.entity';
import { Repository } from 'typeorm';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Celebrity)
    private celebrityRepo: Repository<Celebrity>,
  ) {}

  async generateCelebrityPdf(id: number): Promise<Buffer> {
    const celeb = await this.celebrityRepo.findOne({ where: { id } });
    if (!celeb) throw new NotFoundException('Celebrity not found');

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial; padding: 20px; }
            h1 { color: #1d3557; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>${celeb.name}</h1>
          <p><span class="label">Category:</span> ${celeb.category}</p>
          <p><span class="label">Country:</span> ${celeb.country}</p>
          <p><span class="label">Instagram:</span> ${celeb.instagram || 'N/A'}</p>
          <p><span class="label">Fanbase:</span> ${celeb.fanbase}</p>
          <p><span class="label">Setlist/Topics:</span> ${celeb.setlist || 'N/A'}</p>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true, // ✅ fixed
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return Buffer.from(buffer); // ✅ fixed
  }
}
