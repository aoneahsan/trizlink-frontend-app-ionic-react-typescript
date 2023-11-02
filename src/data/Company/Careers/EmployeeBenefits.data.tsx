// Type
import { type ZaionsInpageColType } from '@/types/InPageComponentTypes/ZaionsInpageCol.type';

// Images
import {
  iconLargeBeachPalmWater,
  iconLargePavingPiggyDollars,
  iconLargePerformanceMoneyIncrease,
  iconLargeRailRoadFastTrain,
  iconLargeSavingMoneySeedling,
  MedicalInstrumentStethoscope
} from '@/assets/images';

export const ZaionsEmployeeBenefitsData: ZaionsInpageColType[] = [
  {
    id: '1',
    title: '401k Match',
    text: 'Invest in your future. We offer a 401(k) savings plan with company match so you can plan for the time ahead.',
    icon: iconLargePavingPiggyDollars
  },
  {
    id: '2',
    title: 'Medical, Vision, & Dental',
    text: 'In addition to our full benefits package, employees receive 24/7 access to a team of doctors and insurance guides that can answer questions, virtually diagnose or treat you as needed.',
    icon: MedicalInstrumentStethoscope
  },
  {
    id: '3',
    title: 'Stock Options',
    text: 'We’re committed to your investment in us and the growth of our company. We offer stock options for all employees.',
    icon: iconLargePerformanceMoneyIncrease
  },
  {
    id: '4',
    title: 'Competitive Salary',
    text: 'We’re proud to offer our employees salaries that compete with leading companies in our industry.',
    icon: iconLargeSavingMoneySeedling
  },
  {
    id: '5',
    title: 'Commuter benefits',
    text: 'Our HQ is in NYC, but that doesn’t mean you need to be. We offer commuter benefits whether you take a car, bike or train to work.',
    icon: iconLargeRailRoadFastTrain
  },
  {
    id: '6',
    title: 'Paid Vacation',
    text: 'Our work/life balance is important to us. We offer paid vacation so you have time for your other passions.',
    icon: iconLargeBeachPalmWater
  }
];
