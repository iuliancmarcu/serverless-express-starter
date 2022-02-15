import { execSync } from 'child_process';

import { unpack, defaultArgs } from '@shelf/aws-lambda-libreoffice';
import { cleanupTempFiles } from '@shelf/aws-lambda-libreoffice/lib/cleanup';
import { getConvertedFilePath } from '@shelf/aws-lambda-libreoffice/lib/logs';

const INPUT_PATH = '/opt/lo.tar.br';
const OUTPUT_PATH = '/tmp/instdir/program/soffice.bin';

export enum TargetFormat {
  DOC = 'doc',
  PPT = 'ppt',
}

const targetFilters: Record<TargetFormat, { in: string; out: string }> = {
  [TargetFormat.DOC]: { in: 'writer_pdf_import', out: 'doc' },
  [TargetFormat.PPT]: { in: 'impress_pdf_import', out: 'ppt' },
};

async function convertPdfToOffice(filename: string, format: TargetFormat) {
  cleanupTempFiles();
  await unpack({ inputPath: INPUT_PATH });

  const { in: inFilter, out: outFilter } = targetFilters[format];
  const cmd = `cd /tmp && ${OUTPUT_PATH} ${defaultArgs.join(
    ' ',
  )} --infilter="${inFilter}" --convert-to ${outFilter} --outdir /tmp /tmp/${filename.split(/\ /).join(' ')}`;

  let logs;
  // due to unknown issue, we need to run command twice
  try {
    logs = execSync(cmd);
  } catch (e) {
    logs = execSync(cmd);
  }

  execSync(`rm /tmp/${filename.split(/\ /).join(' ')}`);
  cleanupTempFiles();

  return getConvertedFilePath(logs.toString('utf8'));
}

export default convertPdfToOffice;
