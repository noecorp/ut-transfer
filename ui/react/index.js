import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { getRoute } from 'ut-front/react/routerHelper';
import registerRoutes from './registerRoutes';
import {
    Partner,
    TransferBudgetDetails,
    TransferBudgetCreate,
    TransferSWIFTCreate,
    TransferPrint
} from './pages';

export const mainRoute = registerRoutes();

export const UtTransferRoutes = () => {
    return (
        <Route path={getRoute('ut-transfer:home')}>
            <Route path={getRoute('ut-transfer:partners')} component={Partner} />
            <Route path={getRoute('ut-transfer:transfers')}>
                <Route path={getRoute('ut-transfer:transfersBudget')} >
                    <IndexRoute component={TransferBudgetCreate} />
                    <Route path={getRoute('ut-transfer:transfersBudgetDetails')} component={TransferBudgetDetails} />
                    <Route path={getRoute('ut-transfer:transfersBudgetCreate')} component={TransferBudgetCreate} />
                </Route>
                <Route path={getRoute('ut-transfer:transfersSWIFT')} >
                    <IndexRoute component={TransferSWIFTCreate} />
                    <Route path={getRoute('ut-transfer:transfersSWIFTCreate')} component={TransferSWIFTCreate} />
                </Route>
            </Route>
        </Route>
    );
};

export const UtTransferMasterRoutes = () => {
    return (
        <Route path={getRoute('ut-transfer:home')}>
            <Route path={getRoute('ut-transfer:transfers')}>
                <Route path={getRoute('ut-transfer:printTransfer')} component={TransferPrint} />
            </Route>
        </Route>
    );
};
