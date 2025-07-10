import { SiffrumServiceModelBase } from '../../base/siffrum-service-model-base';

export class BannerSM extends SiffrumServiceModelBase<number> {
  title!: string;
  description!: string;
  imageBase64!: string;
  link?: string;
  ctaText?: string;
  bannerType!: 'Slider' | 'ShortAdd' | 'LongAdd' | 'Sales' | 'Voucher';
  isVisible: boolean = true;
}
