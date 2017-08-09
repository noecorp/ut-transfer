import { registerRoute } from 'ut-front/react/routerHelper';

export default () => {
    let mainRoute = 'ut-transfer:home';
    registerRoute(mainRoute).path('/transfer');
    registerRoute('ut-transfer:partners').path('partners').parent(mainRoute);
    registerRoute('ut-transfer:transfers').path('transfers').parent(mainRoute);
    registerRoute('ut-transfer:transfersBudget').path('budget').parent('ut-transfer:transfers');
    registerRoute('ut-transfer:transfersBudgetCreate').path('create').parent('ut-transfer:transfersBudget');
    registerRoute('ut-transfer:transfersSWIFT').path('swift').parent('ut-transfer:transfers');
    registerRoute('ut-transfer:transfersSWIFTCreate').path('create').parent('ut-transfer:transfersSWIFT');
    return mainRoute;
};
