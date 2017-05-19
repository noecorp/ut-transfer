import {registerRoute} from 'ut-front/react/routerHelper';

export default () => {
    let mainRoute = 'ut-transfer:bulkBatch';
    let paymentRoute = 'ut-transfer:bulkPayment';
    registerRoute(mainRoute).path('bulk/batch/:batchTypeName');
    registerRoute('ut-transfer:bulkBatchDebit').path('bulk/batch/debit');
    registerRoute('ut-transfer:bulkBatchCredit').path('bulk/batch/credit');
    registerRoute('ut-transfer:bulkBatchCreditMerchants').path('bulk/batch/merchants');
    registerRoute(paymentRoute).path('bulk/batch/:batchTypeName/:batchId');
    return mainRoute;
};
