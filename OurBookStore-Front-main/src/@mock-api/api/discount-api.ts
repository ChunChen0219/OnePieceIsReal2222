import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { DiscountCoupon } from '../../app/main/apps/discount/DiscountApi';

let couponsDB = mockApi.components.examples.discount_coupons.value as DiscountCoupon[];

export const discountApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/discount/coupons').reply(() => {
		return [200, couponsDB];
	});

	mock.onPost('/discount/coupons').reply(({ data }) => {
		const newCoupon = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as DiscountCoupon;

		couponsDB.unshift(newCoupon);

		return [200, newCoupon];
	});

	mock.onDelete('/discount/coupons').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		couponsDB = couponsDB.filter((item) => !ids.includes(item.id));

		return [200, couponsDB];
	});

	mock.onGet('/discount/coupons/:id').reply((config) => {
		const { id } = config.params as Params;

		const coupon = _.find(couponsDB, { id });

		if (coupon) {
			return [200, coupon];
		}

		return [404, 'Requested coupon do not exist.'];
	});

	mock.onPut('/discount/coupons/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(couponsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(couponsDB, { id })];
	});

	mock.onDelete('/discount/coupons/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(couponsDB, { id });

		return [200, id];
	});
};
