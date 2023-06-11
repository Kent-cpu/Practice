import {$authHost} from "./index";

export const getChecklists = async () => {
    const {data} = await $authHost.get('api/checklist');
    return data;
}