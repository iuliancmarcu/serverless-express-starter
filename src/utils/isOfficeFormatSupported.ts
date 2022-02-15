import { TargetFormat } from './convertPdfToOffice';

function isSupportedOfficeFormat(format: string): format is TargetFormat {
  return Object.values(TargetFormat).some((v) => v === format.toLowerCase());
}

export default isSupportedOfficeFormat;
