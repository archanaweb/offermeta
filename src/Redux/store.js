import { configureStore } from '@reduxjs/toolkit';
import managerReducer  from './ManagerSlice';
import publisherReducer from './PublisherSlice';
import OffersReducer from './OffersSlice';
import advertiserReducer from './AdvertiserSlice';
import PostBackReducer from './PostBackSlice';
import LangingPageReducer from './LangingPageSlice';
import ImpressionReducer from './ImpressionSlice';
import ProfitReducer from './ProfitSlice';
import CountryListReducer from './CountryListSlice';
import EventValueReducer from './EventValueSlice';
import UpdateSidebarReducer from './UpdateSidebarSlice';
import ConversionStatusReducer from './ConversionStatusSlice';
import PerformanceReducer from './PerformanceSlice';
import conversionFilterReducer from './ConversionFilterSlice';
import ClickFilterReducer from './ClickFilterSlice';
import sentLogsFilterReducer from './SentlogFilterSlice';
import ImpressionFilterReducer from './ImpressionFilterSlice';
import PlanReducer from './PlanSlice';
import ProfileReducer from './ProfileSlice';
import IpAddressReducer from './IpSlice';
import AdvertiserManagerReducer from './AdvertiserManagerSlice';
import PublisherPostbackReducer from './PublisherPostbackSlice';
import DomainReducer from './DomainSlice';
import managerConversionFilterReducer  from './ManagerConversionFilterSlice';
import pubConversionFilterReducer from './PubConversionFilterSlice';
import parErOfferFilterReduces from './PartnerReportFilter';

export default configureStore({
  reducer: {
    manager: managerReducer,
    publisher: publisherReducer,
    offers: OffersReducer,
    advertiser: advertiserReducer,
    postback: PostBackReducer,
    landing: LangingPageReducer,
    impression: ImpressionReducer,
    profit: ProfitReducer,
    country: CountryListReducer,
    eventvalue: EventValueReducer,
    sidebarbackground: UpdateSidebarReducer,
    conversionStatus: ConversionStatusReducer,
    performance: PerformanceReducer,
    conversionFilter: conversionFilterReducer,
    clickFilter: ClickFilterReducer,
    sentLogsFilter: sentLogsFilterReducer,
    impressionFilter: ImpressionFilterReducer,
    plan: PlanReducer,
    profile: ProfileReducer,
    ipaddress: IpAddressReducer,
    advertiserManager: AdvertiserManagerReducer,
    publisherPostback: PublisherPostbackReducer,
    subAdminUserData: DomainReducer,
    managerConversionFilters: managerConversionFilterReducer,
    pubConversionFilters: pubConversionFilterReducer,
    parEventReportFilters: parErOfferFilterReduces,
  },
})