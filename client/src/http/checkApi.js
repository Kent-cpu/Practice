import {$authHost} from "./index";

export const saveCheck = async (userId, company, status, dateTest, checklists) => {
    await $authHost.post('api/check', {userId, company, status, dateTest, checklists});
}
export const getChecks = async (userId) => {
    const {data} = await $authHost.get(`api/check?userId=${userId}`);
    return data.checks;
}

export const getCheck = async (checkId) => {
    const {data} = await $authHost.get(`api/check/${checkId}`);
    return data;
}