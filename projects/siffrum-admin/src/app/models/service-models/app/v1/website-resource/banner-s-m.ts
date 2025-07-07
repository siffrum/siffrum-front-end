import { SIMSServiceModelBase } from '../../base/sims-service-model-base';

export class BannerSM extends SIMSServiceModelBase<number> {
  title!: string;
  description!: string;
  imageBase64!: string;
  link?: string;
  ctaText?: string;
  bannerType!: 'Slider' | 'ShortAdd' | 'LongAdd' | 'Sales' | 'Voucher';
  isVisible: boolean = true;
}
