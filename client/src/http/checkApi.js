import {$authHost} from "./index";


// userId, company, status, dateTest, checklists
export const saveCheck = async (userId, company, status, dateTest, checklists) => {
    await $authHost.post('api/check', {userId, company, status, dateTest, checklists});
}