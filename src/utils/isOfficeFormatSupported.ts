import { TargetFormat } from './convertPdfToOffice';

function isSupportedOfficeFormat(format: string): format is TargetFormat {
  return Object.values(TargetFormat).includes(format.toLowerCase() as any);
}

export default isSupportedOfficeFormat;
