import { getTransferValidations } from './Transfer/validations';
import { getSenderValidations } from './Sender/validations';
import { getBeneficiaryValidations } from './Beneficiary/validations';
import { getBankBeneficiaryValidations } from './BankBeneficiary/validations';
import { getAMLValidations } from './AMLDeclaration/validations';

export const getTransferSWIFTValidations = () => {
    return [
        ...getSenderValidations(),
        ...getBankBeneficiaryValidations(),
        ...getBeneficiaryValidations(),
        ...getTransferValidations(),
        ...getAMLValidations()
    ];
};
