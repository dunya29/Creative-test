import { onBeforeMount } from "vue"
import { directionApi, granteeApi, statusApi } from "@/api/api"
import { useCommonStore } from "@/store/common"

export const useProjectModule = () => {
	const storeCommon = useCommonStore()
	onBeforeMount(async () => {
		const results = await Promise.allSettled([
			statusApi.getItems(),
			directionApi.getItems(),
			granteeApi.getItems()
		]);
		results.forEach((result, index) => {
			if (result.status === 'fulfilled') {
				if (index === 0) {
					storeCommon.setStatus(result.value.data);
				} else if (index === 1) {
					storeCommon.setDirection(result.value.data);
				} else if (index === 2) {
					storeCommon.setGrantee(result.value.data);
				}
			} else {
				console.log(`Error in request ${index}:`, result.reason);
			}
		})
	})
}
