import { execSync } from 'child_process';
import { parse } from 'path';

enum CompressResolution {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

const resolutionSettings: Record<CompressResolution, string> = {
  [CompressResolution.LOW]: 'screen',
  [CompressResolution.MEDIUM]: 'ebook',
  [CompressResolution.HIGH]: 'printer',
};

export function isValidCompressResolution(res: string): res is CompressResolution {
  return Object.values(CompressResolution).some((v) => v === res.toLowerCase());
}

const GS_PATH = '/opt/bin/gs';

function compressPdf(filePath: string, resolution: CompressResolution): string {
  const pdfSetting = resolutionSettings[resolution];

  const resultFilename = `${parse(filePath).name}_compressed.pdf`;

  execSync(
    `cd /tmp && ${GS_PATH} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${pdfSetting} -dNOPAUSE -dBATCH -sOutputFile=${resultFilename} ${filePath}`,
  );

  return `/tmp/${resultFilename}`;
}

export default compressPdf;
